// Density probe. `npm run check` guards the overflow side of a frame; this guards the EMPTY side —
// a frame that builds green, reads correctly and leaves half its pane unused. It renders every
// section route in headless Chromium at 1920×1080 with ?capture=1 and measures the DOM against the
// density targets in CLAUDE.md:
//
//   slide   .slide-panel__scaler height ÷ .slide-panel height          0.80–0.95
//   bind    max(node-union width ÷ pane width, height ÷ pane height)   ≥ 0.85
//   area    node-union width × height ÷ pane area                      ≥ 0.55
//   eyebrow no .react-flow__node overlapping .reel-head                 clear
//
// These are TARGETS, not thresholds (CLAUDE.md). A board that is sparse on purpose says so in its
// section file with a `// density-accept: <reason>` comment, and is reported ACCEPTED, not FAIL.
// Edge labels landing on cards are not measured here — look at the route.
//
//   npm run density                 every course
//   npm run density -- first-dag    one course (or several)
//
// Chromium: puppeteer's own download, or PUPPETEER_EXECUTABLE_PATH when the download was skipped.
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { createServer } from 'vite'
import puppeteer from 'puppeteer'

const SLIDE = [0.8, 0.95]
const BIND_MIN = 0.85
const AREA_MIN = 0.55

// Routes by convention: src/content/<course>/NN-<section>.ts ⇄ #/<course>-<section>.
const only = process.argv.slice(2)
const sections = readdirSync('src/content', { withFileTypes: true })
  .filter((d) => d.isDirectory() && (!only.length || only.includes(d.name)))
  .flatMap((d) =>
    readdirSync(join('src/content', d.name))
      .filter((f) => /^\d+-.+\.ts$/.test(f))
      .sort()
      .map((f) => {
        const src = readFileSync(join('src/content', d.name, f), 'utf8')
        const id = (src.match(/\bid: '([\w-]+)',/) || [])[1]
        const accept = (src.match(/\/\/ density-accept: (.+)/) || [])[1]
        return { route: `${d.name}-${id}`, accept }
      }),
  )
if (!sections.length) {
  console.error(`✗ no sections found${only.length ? ` for: ${only.join(', ')}` : ''}`)
  process.exit(1)
}

const server = await createServer({ server: { port: 5199, strictPort: true }, logLevel: 'error' })
await server.listen()
const browser = await puppeteer.launch({ executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })

const rows = []
try {
  for (const { route, accept } of sections) {
    await page.goto(`http://localhost:5199/?capture=1#/${route}`, { waitUntil: 'networkidle0' })
    await page.waitForSelector('.react-flow__node', { timeout: 10000 })
    await new Promise((r) => setTimeout(r, 800)) // fitView settles after the first paint
    const m = await page.evaluate(() => {
      const R = (e) => e.getBoundingClientRect()
      const pane = R(document.querySelector('.react-flow'))
      const panel = R(document.querySelector('.slide-panel'))
      const scaler = R(document.querySelector('.slide-panel__scaler'))
      const head = document.querySelector('.reel-head')
      const nodes = [...document.querySelectorAll('.react-flow__node')].map(R)
      const x0 = Math.min(...nodes.map((n) => n.left)), x1 = Math.max(...nodes.map((n) => n.right))
      const y0 = Math.min(...nodes.map((n) => n.top)), y1 = Math.max(...nodes.map((n) => n.bottom))
      const w = (x1 - x0) / pane.width, h = (y1 - y0) / pane.height
      const hb = head && R(head)
      return {
        slide: scaler.height / panel.height,
        bind: Math.max(w, h),
        area: w * h,
        eyebrow: !hb || !nodes.some((n) => n.top < hb.bottom && n.left < hb.right && n.right > hb.left),
      }
    })
    const misses = [
      (m.slide < SLIDE[0] || m.slide > SLIDE[1]) && 'slide',
      m.bind < BIND_MIN && 'bind',
      m.area < AREA_MIN && 'area',
      !m.eyebrow && 'eyebrow',
    ].filter(Boolean)
    rows.push({ route, ...m, misses, accept, verdict: !misses.length ? 'PASS' : accept ? 'ACCEPTED' : 'FAIL' })
  }
} finally {
  await browser.close()
  await server.close()
}

const pct = (v) => v.toFixed(2)
console.log('verdict    slide  bind  area  eyebrow  route')
for (const r of rows) {
  const note = r.misses.length ? `  ← ${r.misses.join(', ')}${r.accept ? ` (accepted: ${r.accept})` : ''}` : ''
  console.log(
    `${r.verdict.padEnd(9)}  ${pct(r.slide)}   ${pct(r.bind)}  ${pct(r.area)}  ${(r.eyebrow ? 'clear' : 'HIT').padEnd(7)}  ${r.route}${note}`,
  )
}
const failed = rows.filter((r) => r.verdict === 'FAIL').length
console.log(failed ? `\n✗ ${failed} of ${rows.length} frame(s) under the density targets` : `\n✓ ${rows.length} frame(s) within density targets`)
process.exit(failed ? 1 : 0)
