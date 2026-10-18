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

**Scene inventory** (`src/scenes/<course>/`, one scene per section; `shared/pipeline.ts` holds the five
pipeline task nodes `extract`, `validate`, `stage`, `transform`, `publish`):

| scene | course · section |
| --- | --- |
| `orders-dag` | first-dag · dependency-graphs |
| `orchestration-boundary` | first-dag · orchestration-boundaries |
| `run-hierarchy` | first-dag · runs-and-attempts |
| `first-taskflow` | first-dag · first-taskflow |
| `local-demo` | first-dag · local-demo |
| `reading-a-run` | first-dag · reading-a-run |
| `dag-processing` | execution · dag-processing |
| `scheduler-loop` | execution · scheduler |
| `executor-options` | execution · executors |
| `api-server` | execution · api-server |
| `triggerer-wait` | execution · triggerer |
| `task-states` | execution · task-states |
| `three-kinds-of-state` | execution · metadata-vs-data |
| `run-triggers` | scheduling · run-triggers |
| `schedule-forms` | scheduling · cron-and-timedelta |
| `interval-anatomy` | scheduling · data-intervals |
| `catchup-activation` | scheduling · start-date-catchup |
| `dst-intervals` | scheduling · timezones |
| `interval-io` | scheduling · interval-io |
| `timetable-semantics` | scheduling · timetables |
| `granularity` | task-design · granularity |
| `taskflow-operators` | task-design · taskflow-and-operators |
| `xcom-sizes` | task-design · xcom |
| `shared-storage` | task-design · shared-storage |
| `connections` | task-design · providers-and-connections |
| `params-variables` | task-design · variables-and-params |
| `templating` | task-design · templating |
| `external-job` | task-design · external-jobs |
| `explicit-inferred` | dynamic-work · explicit-and-inferred |
| `branching` | dynamic-work · branching |
| `trigger-rules` | dynamic-work · trigger-rules |
| `task-groups` | dynamic-work · task-groups |
| `parse-vs-runtime` | dynamic-work · parse-vs-runtime |
| `expand-partial` | dynamic-work · expand-partial |
| `mapping-limits` | dynamic-work · mapping-limits |
| `retry-policy` | idempotency · retries-and-timeouts |
| `append-vs-replace` | idempotency · idempotent-tasks |
| `atomic-publish` | idempotency · atomic-publication |
| `side-effects` | idempotency · duplicate-side-effects |
| `concurrent-runs` | idempotency · concurrent-runs |
| `quality-gate` | idempotency · quality-gates |
| `callbacks` | idempotency · callbacks |
| `recovery-mechanisms` | backfills · recovery-mechanisms |
| `affected-intervals` | backfills · affected-intervals |
| `backfill-create` | backfills · backfill-policy |
| `backfill-capacity` | backfills · backfill-capacity |
| `clearing-scope` | backfills · clearing-scope |
| `replay-changes` | backfills · replay-changes |
| `staged-repair` | backfills · staged-repair |
| `sensor-limits` | assets · sensors |
| `slot-occupancy` | assets · poke-and-reschedule |
| `deferral` | assets · deferrable |
| `asset-flow` | assets · assets |
| `asset-conditions` | assets · asset-conditions |
| `cross-dag` | assets · cross-dag |
| `event-driven` | assets · event-driven |
| `logic-split` | testing · separate-logic |
| `dag-integrity` | testing · dag-integrity |
| `unit-tests` | testing · unit-tests |
| `local-execution` | testing · local-execution |
| `integration-cases` | testing · integration-cases |
| `packaging` | testing · packaging |
| `promotion` | testing · promotion-and-versions |
| `execution-models` | deployment · execution-models |
| `executor-choice` | deployment · executor-choice |
| `shared-infrastructure` | deployment · shared-infrastructure |
| `pools-concurrency` | deployment · pools-and-concurrency |
| `throughput` | deployment · throughput |
| `secrets` | deployment · secrets |
| `trust-boundaries` | deployment · access-and-trust |
| `managed-or-self` | deployment · managed-or-self |
| `task-logs` | observability · task-logs |
| `remote-logs` | observability · remote-logs |
| `health-vs-progress` | observability · health-vs-progress |
| `metrics` | observability · metrics |
| `freshness` | observability · freshness-alerts |
| `diagnosis` | observability · diagnosis |
| `incident` | observability · incident-response |
| `end-to-end` | integrated · end-to-end |
| `coordinating-engines` | integrated · coordinating-engines |
| `dag-boundaries` | integrated · dag-boundaries |
| `outage-planning` | integrated · outage-planning |
| `upgrades` | integrated · upgrades |
| `when-airflow-fits` | integrated · when-airflow-fits |

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
- **`badge` renders only on container headers.** On a leaf card it is ignored, so a leaf badge must
  never carry content (a time, a map index): put that in the `sub`. Grid order carries sequence.
- A **3-column card row under a table** is wider than the table, sets the board width, and shrinks the
  table's type. Stack those cards (`cols: 1` or `2`) so the table sets the width.
- An **`LR` chain of 4+ cards** makes a thin board with low area; prefer `TB`, or a `cols: 2` grid.
- `padding: 0.04` helps wide boards; on a tall (height-bound) board it pushes nodes under the
  eyebrow, which `density` reports as HIT. Leave tall boards at the default padding.
- First drafts consistently rendered at 0.70–0.78: write slides with two ### blocks of 4–5 bullets.

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
