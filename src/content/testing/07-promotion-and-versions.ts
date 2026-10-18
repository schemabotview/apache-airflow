import type { Section } from '../types'

export const promotionAndVersions: Section = {
  id: 'promotion-and-versions',
  title: 'CI review, promotion, DAG bundles and version-aware reruns',
  scene: 'promotion',
  focus: 'versions',
  slide: `## From review to production, and what runs mid-deploy

A DAG change should move through **review**, **CI** and a **staging** environment before production. Airflow 3 also records which DAG **version** each run used.

### Promotion
- CI runs integrity, unit and integration tests on every change
- **Staging** uses the real engine with copied, not live, data
- Production deploys a **tagged** bundle, then is watched
- Roll back by redeploying the **previous** tag

### Deploying during a run
- A **versioned** bundle, such as Git, lets a running run finish on the code it started with
- A **local folder** bundle has only one version: remaining tasks get the new code
- The UI records each run's DAG **graph** version either way
- Recorded history does not mean old **code** can still run`,
  narration:
    "The last step is getting a change into production safely. A DAG change should go through review and CI, where the integrity, unit and integration tests run, then through a staging environment that uses the real engine with copied data, and only then into production, as a tagged release that someone watches after it lands. Airflow 3 adds something useful here. DAG code is read from DAG bundles, and the scheduler records which DAG version each run used. That matters when you deploy while a run is in progress. With a versioned bundle, such as one backed by Git, a run that is already going can finish on the code version it started with. With a plain local folder there is only one version, the files on disk, so the remaining tasks of that run pick up the new code halfway through. Either way, the UI shows which version of the graph each run had. But be careful not to read too much into that history. Recorded versions of the graph do not mean the old code is still available to run, unless the bundle keeps it. Next chapter: deployment.",
}
