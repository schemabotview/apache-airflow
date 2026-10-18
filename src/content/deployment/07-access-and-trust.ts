import type { Section } from '../types'

export const accessAndTrust: Section = {
  id: 'access-and-trust',
  title: 'Auth managers, permissions, trusted authors and isolation limits',
  scene: 'trust-boundaries',
  focus: 'authors',
  slide: `## UI permissions are not a sandbox

The **auth manager** controls what UI and API users may see and do. It does **not** control what DAG code can do once it runs.

### Three kinds of user
- **UI and API users** — view, trigger and clear, per DAG, as granted
- **DAG authors** — anyone who can change DAG files; their code runs on workers
- **Deployment admins** — own config, secrets, images and the database
- The auth manager is pluggable: a simple one locally, FAB or others in production

### The isolation limit
- DAG code runs with the **worker's** rights and can reach what the worker can
- Tasks from different DAGs may share the same workers
- So DAG authors are **trusted** users by design
- Review DAG changes like production code; separate deployments for untrusted teams`,
  narration:
    "Access control in Airflow has a boundary that is easy to misread. The auth manager, which is pluggable in Airflow 3, controls what users of the UI and the API may see and do: which DAGs they can view, whether they can trigger runs or clear tasks. That covers the first kind of user. The second kind is the DAG author, meaning anyone who can change the DAG files that a deployment reads. Their code is not limited by UI permissions at all. It runs on workers, with the worker's rights, so it can reach whatever the worker can reach, including connections that other DAGs use, and tasks from different DAGs may run on the same workers. That is why Airflow's security model treats DAG authors as trusted users. The third kind, the deployment admins, own the configuration, secrets, images and the metadata database. The practical consequences follow. Review DAG changes with the same care as production code, because they are production code. And if teams must not be able to affect each other at all, give them separate deployments, rather than relying on UI permissions inside one. Next, who runs Airflow itself.",
}
