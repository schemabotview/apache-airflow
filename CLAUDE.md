# CLAUDE.md — apache-airflow

> The workspace-level `CLAUDE.md` (one level up, in `graphl-workspace`) holds the invariants that
> span every repo. This file is only what is true *here*.

## What this repo is

The GraphL concept app for **Apache Airflow** (reference family 3.1.x, `airflow.sdk` authoring
interfaces). One concept, twelve courses, 84 sections, following `APACHE-AIRFLOW-COURSE-PLAN.md`
chapter for chapter. `AUTHORING-PLAN.md` is the working plan: course ids, scene strategy, budgets and
the density check. A **section** is `(scene, slide, narration)` and is one segment of the course
video. One section = one slide.

The render engine is `@graphlearning/flow`; the app shell is `@graphlearning/shell`. Both are
**published packages pinned by version** (`flow@^1.2.0`, `shell@^0.8.0`). This repo's own surface is
`src/content/`, `src/scenes/`, `src/main.tsx` and `src/theme.css` — nothing else.

## Route contract and course arc

Routes are `#/<courseId>-<sectionId>`; `#/` is the catalog. Course ids, in syllabus order:

| # | course id | chapter |
| --- | --- | --- |
| 1 | `first-dag` | Workflow Orchestration and a First DAG |
| 2 | `execution` | Architecture and the Execution Lifecycle |
| 3 | `scheduling` | Scheduling, Data Intervals, and Run Identity |
| 4 | `task-design` | Task Design, Data Exchange, and External Systems |
| 5 | `dynamic-work` | Dependencies, Branches, and Dynamic Work |
| 6 | `idempotency` | Retries, Idempotency, and Publication Correctness |
| 7 | `backfills` | Catchup, Backfills, and Controlled Recovery |
| 8 | `assets` | Waiting, Assets, and Cross-Workflow Coordination |
| 9 | `testing` | Testing, Packaging, and Workflow Evolution |
| 10 | `deployment` | Deployment, Capacity, and Secure Access |
| 11 | `observability` | Observability and Operational Diagnosis |
| 12 | `integrated` | Integrated Architecture and Operational Evolution |

The recurring example is the daily retail-order pipeline (extract → validate → stage → transform →
publish). Its nodes come from one shared factory so the same card looks the same in every course.

**Scene inventory** (`src/scenes/`):

| scene | course · section | shape |
| --- | --- | --- |
| `shared/pipeline.ts` | every course | the five pipeline task nodes (`extract`, `validate`, `stage`, `transform`, `publish`) |
| `orders-dag` | first-dag · dependency-graphs | pipeline column beside a rejected cycle |
| `orchestration-boundary` | first-dag · orchestration-boundaries | Airflow decides → other systems do → what green means |
| `run-hierarchy` | first-dag · runs-and-attempts | definition → runs → task instances → attempts |
| `first-taskflow` | first-dag · first-taskflow | the DAG file as a code card → graph + parse/run time |
| `local-demo` | first-dag · local-demo | terminal card → demo assumptions → what it does not prove |
| `reading-a-run` | first-dag · reading-a-run | grid table, attempt log, numbered retry side effect |

The shell's catalog throws on an empty course registry, so a repo can never sit at zero courses.

## Invariants — do not break

- **Never write `x` or `y`.** Scenes are declarative: nodes, edges, nesting. `computeLayout` is not
  exported, so there is no way around this, and that is the point — reproducible frames.
- **Do not reimplement the shell.** `SectionView`, `CourseIndex`, `SlidePanel` and the hooks are
  withheld on purpose. The route contract (`#/<courseId>-<sectionId>`, `?capture=1`,
  `window.__scene.plan()`) is what every recorder drives, and it holds only if every repo composes
  the pieces identically.
- **`SiteHeader` goes on the catalog page only** — never on a section. A section is a video frame.
- **Three stylesheets, in cascade order**, imported in `main.tsx`. The order is load-bearing:
  1. `@graphlearning/flow/styles.css` — react-flow plus the IBM Plex faces the engine is
     *calibrated* to. `codeMetrics` sizes code nodes from a measured 9.02px glyph advance, so a
     different monospace face mis-sizes every code card. Carries the `.tok-*` colours.
  2. `@graphlearning/shell/styles.css` — the shell paints the canvas (`--bg: #1a1d23`; SceneView
     draws its dots at `#2a2f38` assuming a dark surface).
  3. `./theme.css` — this repo's three brand tokens. **Last, or the brand loses to the defaults.**
- **`file:../ui-flow` / `file:../ui-shell` must never be committed.** Local engine work only; CI has
  no sibling checkout.
- **Narration is never hand-produced.** `.tts` → `.wav` via Colab + Chatterbox only.

## Layout rules the frames actually care about

`npm run check` (`scripts/check-content.mjs`) models four silent failures — each builds green and
breaks only on screen. Its comments carry the measured constants; the short version:

- **Leaf cards are a fixed 210×96** with a ~134px text column. Only containers grow to fit. Keep the
  `label` to 2 wrapped lines; 2 label lines + 2 sub lines fits. Watch unbreakable tokens — `_`, `.`
  and `/` are **not** break opportunities in CSS, so `snake_case` and paths overflow sideways in a
  way the height model cannot see.
- **Slides do not scale to fit.** Type size is fixed by the frame (`zoom = paneWidth / 806`,
  width-proportional only), so an over-long slide **clips at the bottom** with no error.
  `check` fails over 1000 modelled design px; the band below gives the floor too. Bullets cost far
  more than prose of the same length.
- **A `focus:` that names no node in its scene is a silent no-op** — nothing lights up.
- **`icon:` names are NOT guarded.** The engine's lucide registry is `Record<string, LucideIcon>`
  and does not enumerate its keys, so a wrong name type-checks, passes `check`, builds, and renders
  a card with no glyph. There are ~75 valid keys; copy one off an existing scene rather than
  guessing a lucide name (`volume`, `move`, `maximize` and `git` are all absent, for instance).
- **A section with no wav narrates silence** and records a silent segment. Audio resolves purely by
  convention: `public/audio/<course>/<section-id>.wav`.

What `check` does *not* model: an edge label landing on top of a card, or whether the frame is too
empty. Look at the route.

### Density targets — the frame must use the space it has

The guarded failure is a slide that overflows. The unguarded one is its opposite: a frame that
builds green, reads correctly, and leaves half its pane empty. Against the ~1080 design px pane:

| | target | why |
| --- | --- | --- |
| slide height | **80–95 %** of the pane (≈ 865–1025px; `SLIDE_H_MAX` caps the top at 1000) | below 80 % the right half looks empty; above ~95 % it risks clipping |
| scene, binding axis | ≥ 0.85 of the pane | the board should reach the edge it is limited by |
| scene, area | ≥ 0.55 of the pane (w × h) | a wide board that fills the width but a third of the height wastes the pane |
| eyebrow | no node under the top-left eyebrow label | boards that bind on height run up to y≈30 |

Levers: **add real content, not padding**; **restack** a board toward the pane's ~1:1 aspect; lower
scene `padding` to 0.04 for boards that float, **raise** it (0.12–0.17) for tall boards that touch
the eyebrow.

`npm run density` measures all four on the rendered routes (headless Chromium, 1920×1080,
`?capture=1`; set `PUPPETEER_EXECUTABLE_PATH` if puppeteer's own browser was not downloaded). A board
that is sparse on purpose carries `// density-accept: <reason>` in its section file. The two ratios
come from one repo's ~80 frames of diagram-and-code-card boards. Targets, not thresholds.

Calibration from the `first-dag` pilot: the `check` slide model **over**-estimates this repo's slides
by 10–15 %. Slides modelling 942–993px rendered at 0.84–0.90 of the pane; ones modelling under ~900
rendered under 0.80. So author to **940–995 modelled px**, then confirm with `density`.

Engine behaviours the pilot hit (flow 1.3.0):
- A container with `edges` **ignores `cols`** and stacks its children in one line. For a 2×2 of
  steps, drop the edges and number the cards with `badge: '01'…`.
- Two opposed edges between the same pair route the return edge **through both cards' labels**.
  Use one edge with `bidirectional: true`.
- `dir:` on a scene edge does not move its target; to stack two boards, nest them in one container.

## Guards before handing over

```sh
npm run build && npx tsc --noEmit && npm run check && npm run density
```

All four are a **floor, not proof** — they pass on frames that are visually wrong. The rendered
route is the real bar, and the owner reviews it.

## Working agreement

- **Author the whole unit, then hand over the route.** Scenes, slides and narration together.
- **No ASCII sketches of scenes.** A sketch cannot show what the layout engine will do, which is the
  only thing worth looking at.
- **No silent scaffolding**, no work outside the ask. Say plainly what was built, what was verified,
  and what was left out.
