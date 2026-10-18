import type { Section } from '../types'

export const upgradesSection: Section = {
  id: 'upgrades',
  title: 'Version upgrades, provider compatibility and rollback',
  scene: 'upgrades',
  focus: 'rollback',
  slide: `## Upgrade like any other change

An Airflow upgrade changes the scheduler, the API, the **metadata schema** and often the providers. Treat it as a tested change with a rollback plan.

### Before production
- Read the **release notes** and migration guide for breaking changes
- Lint DAG code; ruff's \`AIR\` rules flag Airflow 2 imports and patterns
- Upgrade **staging** first, with a copy of production metadata
- Run the integrity and integration tests against the new versions

### Rollback is a restore
- Back up the metadata DB **just before** \`airflow db migrate\`
- The image rolls back by redeploying the old one
- The schema may not reverse: rolling back means **restoring** the backup
- Work done since then needs reconciling, as after any restore`,
  narration:
    "Airflow versions move on, and so do providers, so plan upgrades as ordinary changes with a test path and a rollback plan. An upgrade changes more than code: the scheduler, the API, often the providers, and the schema of the metadata database. Start by reading the release notes and, for a major version, the migration guide, looking for breaking changes. Lint the DAG code: the ruff linter includes rules, prefixed AIR, that flag Airflow 2 imports and patterns that changed in Airflow 3. Upgrade staging first, ideally with a copy of production's metadata, so the database migration itself is tested on realistic data. Then run the integrity and integration tests from chapter nine against the new versions. Rollback deserves honesty. The image is easy: redeploy the old one. The metadata schema is not. Database migrations are not always reversible, so the reliable way back is to restore the backup taken just before running the migration. And anything that ran between the upgrade and the rollback then needs reconciling, exactly like the restore in the previous section. Next, the final question.",
}
