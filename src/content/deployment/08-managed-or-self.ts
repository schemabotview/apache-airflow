import type { Section } from '../types'

export const managedOrSelf: Section = {
  id: 'managed-or-self',
  title: 'Self-managed versus managed Airflow',
  scene: 'managed-or-self',
  focus: 'owners',
  slide: `## Who runs Airflow itself?

You can run Airflow **yourself**, or use a **managed** service from a cloud or a vendor. The choice moves platform work, not pipeline responsibility.

### What moves to the provider
- Servers, upgrades and security patches
- Usually backups and availability of the metadata database
- In exchange: a supported subset of versions, executors and settings

### What never moves
- Your **DAG code**, its correctness and its tests
- Your **data**, your **secrets** and who may use them
- Incidents in your pipelines, and the recovery work from chapter seven

### Weighing it
- Team time saved against service fees
- Control over versions and config against convenience`,
  narration:
    "The last deployment decision is who runs Airflow itself. You can run it yourself, on your own servers or cluster, or use a managed service from a cloud provider or a vendor. The useful way to compare them is by ownership. A managed service takes over the servers, upgrades and security patches, and usually the backups and availability of the metadata database. In exchange, you get the versions, executors and settings the provider supports, rather than anything you like. What never moves, whichever you choose, is responsibility for your pipelines. Your DAG code, its correctness and its tests remain yours. So do your data, your secrets and the decisions about who may use them. And so do incidents: a managed service will keep the scheduler running, but it will not notice that refunds were dropped from the sales totals, or plan the backfill that repairs them. Weigh the choice on team time saved against service fees, and on control against convenience, and check practical fit: network access to your systems, your identity provider, and the regions you need. Next chapter: observability.",
}
