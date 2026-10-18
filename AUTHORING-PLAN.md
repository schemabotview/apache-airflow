# Authoring plan — Apache Airflow

How `APACHE-AIRFLOW-COURSE-PLAN.md` (12 chapters / 84 sections) becomes 12 GraphL courses of
`(scene, slide, narration)` sections, and how each frame is checked for density before handover.

## 1. Mapping

| syllabus | repo |
| --- | --- |
| chapter | course, `src/content/<courseId>/` + `src/scenes/<courseId>/` (ids in `CLAUDE.md`) |
| numbered section | one section file `NN-<section-id>.ts` — one slide, one scene, one narration |
| objective / outcome / bridge | slide `##` lead-in on §1, closing section's last `###`, narration's last sentence |
| worked illustrations | the scenes: each listed illustration lands on the section it explains |
| sources and scope | not authored as frames; specialist boundaries stay out of slides |

Sections stay one-to-one with the syllabus (6, 7, 7, 8, 7, 7, 7, 7, 7, 8, 7, 6). No section is split
or merged without the owner's say, because the syllabus counts are the conceptual scope.

## 2. Section shape

Every section follows the syllabus teaching method, compressed into one frame:

- **Slide** — `##` title, one-sentence claim, then two `###` blocks (the mental model; the failure
  contrast or the decision rule), 2–4 bullets each. Prose over bullets where it fits: bullets model
  far taller per character.
- **Scene** — the evidence: a diagram (components, states, timelines, interval calendars) or a code
  card (TaskFlow with `airflow.sdk`, config, a supplied log line). `focus:` lights the node the
  narration is about.
- **Narration** — ~130–180 words of flowing prose, ending on the bridge to the next section. Says
  what the slide cannot: why, the failure case, the limit of the claim.

## 3. Scene strategy

- **Shared pipeline factory** `src/scenes/shared/pipeline.ts`: `extract-orders`, `validate`,
  `stage`, `transform`, `publish-summary` (+ `shop` mapped variant). Spread into scenes so the
  running example is identical from course 1 to 12; ids are in scope for every `focus:`.
- **Scene kinds per course**, chosen for the claim being shown:
  - code cards: first-dag, task-design, dynamic-work (`expand/partial`), testing
  - state and component diagrams: execution, deployment, observability, integrated
  - interval timelines as `LR` chains of interval nodes (no coordinates): scheduling, backfills
  - failure-window boards (attempt → write → crash → retry): idempotency, task-design §8, assets
- **Code cards are illustrative, not run** — the course plan says one Airflow patch must be verified
  before runnable lessons. Every card uses Airflow 3 public imports (`from airflow.sdk import dag,
  task, Asset`), and no card imports internal models. Legacy Airflow 2 forms appear only in an
  explicit migration contrast.
- **Card-budget hazards specific to Airflow** (`check` flags these, but authoring around them saves
  a pass): labels hold ≤14-char unbreakable tokens, subs ≤20. So `KubernetesExecutor` (18),
  `max_active_runs` (15), `data_interval_start` (19), `TriggerDagRunOperator` and dotted import
  paths do not fit a label — write them as words ("Kubernetes executor") in the label and put the
  identifier in a code card or a sub that fits.

## 4. Density check

`npm run check` only guards the *overflow* side. The density targets in `CLAUDE.md` guard the
*empty* side and are checked on every section, in two layers.

**Layer 1 — static, while writing.** The `check` slide model (`slideHeight`) on each slide, against
the band **865–1000 modelled px**. Over 1000 fails `check`. Under 865 means add a real block (the
failure contrast, a decision rule), not padding.

**Layer 2 — rendered, before handover.** A headless-Chromium probe over every route at 1920×1080
with `?capture=1`, measuring the DOM:

| metric | measured as | target |
| --- | --- | --- |
| slide fill | `.slide-panel__scaler` height ÷ `.slide-panel` height | 0.80–0.95 |
| scene binding axis | max(node-union width ÷ pane width, height ÷ pane height) | ≥ 0.85 |
| scene area | node-union width × height ÷ pane area | ≥ 0.55 |
| eyebrow clear | no `.react-flow__node` under `.reel-head` | true |

A prototype probe already runs against this scaffold. On the template's demo sections it reports:

```
FAIL demo-what-a-section-is  slide 0.61  bind 0.89  area 0.27  eyebrow clear
FAIL demo-scene-kinds        slide 0.72  bind 0.89  area 0.70  eyebrow clear
```

So the demo frames themselves sit under target: a short slide, and a wide `LR` board filling under a
third of the pane height. Model vs render on the same slides: 739 vs 659 px and 777 vs 778 px. The
model can run high, so a slide at the bottom of the band can still render under 80 %. Layer 2 is the
check that counts.

**Fix loop per failing frame** (levers from `CLAUDE.md`): add real content; restack a wide board
toward ~1:1 (`flow: 'TB'`, a container with `cols`, split a chain into two rows); `padding: 0.04` for
floating boards, 0.12–0.17 for tall boards that touch the eyebrow. A board that is sparse on purpose
(a single code card, a two-state contrast) is recorded in the report with a reason, not padded.

**Report per course** at handover: one row per route with the four numbers, PASS/FAIL/accepted, plus
a screenshot of each route reviewed by eye (edge labels over cards are not measurable).

## 5. Order of work

1. **Pilot — course 1 `first-dag` (6 sections).** Shared pipeline factory, six scenes, slides,
   narration; delete the demo course in the same change. Run build/tsc/check + the density probe +
   screenshots, and hand over the six routes. This calibrates the slide band and the scene kinds
   before 78 more sections copy them.
2. **Courses 2–12, one per change**, in syllabus order (each depends on the vocabulary of the last).
   Each lands with its scenes, slides, narration, `titles.json` entry, density report and route list.
3. **Audio** — one Colab + Chatterbox pass per finished course; after that `check` requires every wav
   in that course.
4. **Deploy** — enable Pages, add the `catalog.json` listing in `ui-graphl`.

## 6. Decisions for the owner

- **Brand**: `--brand #017cee` (Airflow logo blue), `--accent-2 #00c7d4` (teal). Swap if the GraphL
  catalog already uses blue for a neighbour.
- **Course ids** in `CLAUDE.md` — they become public URLs, so they should be settled before the pilot.
- **Commit the density probe** as `scripts/density.mjs` / `npm run density` (it uses the `puppeteer`
  already in devDependencies), or keep it as a local review tool.
- **Airflow patch** to name on code cards (3.1.x family is fixed; a single patch is not yet verified).
