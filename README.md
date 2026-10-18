# apache-airflow

The GraphL concept app for **Apache Airflow** — twelve courses from a first DAG to reliable data
orchestration, built on Airflow 3.1.x and the `airflow.sdk` authoring interfaces. Served at
`graphl.in/apache-airflow/`.

- `APACHE-AIRFLOW-COURSE-PLAN.md` — the syllabus: audience, learning spine, 12 chapters / 84 sections.
- `AUTHORING-PLAN.md` — how that syllabus becomes scenes, slides and narration, and the density check.
- `CLAUDE.md` — the route contract, course ids, invariants and layout budgets.

Scaffolded from `schemabotview/content-repo-template`.

## The content model

- **concept ⊃ course ⊃ section.** One syllabus chapter is one course; one section is
  `(scene, slide, narration)` and one segment of the course video.
- **Left = scene, right = slide.** The scene is a react-flow diagram *or* a code card, rendered by
  `@graphlearning/flow`. The slide is markdown.
- **Scenes are declarative.** Nodes, edges and nesting only — never `x` or `y`.
- Narration wavs come from a Colab + Chatterbox pass (`scripts/colab_generate_audio.ipynb`), never by
  hand, into `public/audio/<course>/<section-id>.wav`.

## Running and verifying

```sh
npm install
npm run dev          # http://localhost:5173 — routes are #/<course>-<section>
npm run build && npx tsc --noEmit && npm run check
npm run density      # rendered frames against the density targets (headless Chromium)
```

All four are a floor, not proof: the rendered route is the real bar.

## Before the first deploy

Settings → Pages → Source = **GitHub Actions**, and list the site in `ui-graphl`'s `catalog.json`.
