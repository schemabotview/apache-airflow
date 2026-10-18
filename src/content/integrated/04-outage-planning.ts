import type { Section } from '../types'

export const outagePlanning: Section = {
  id: 'outage-planning',
  title: 'Outages, external-job recovery, metadata restoration and replay limits',
  scene: 'outage-planning',
  focus: 'restore',
  slide: `## Plan the recovery before the outage

Every recovery has a **limit**. Write each plan down before you need it, and say plainly what it cannot fix.

### Four failures to plan for
- **Warehouse down** — retries, then a backfill that must not swamp it
- **Worker lost mid-job** — recoverable only if the job is **named**
- **Metadata restored** to an older backup — Airflow forgets recent runs

### After a metadata restore
- Runs after the backup are **forgotten**, and the scheduler sees gaps
- Work runs **again**; idempotent tasks make that safe, others duplicate
- Asset events since the backup are **lost**, so consumers may not start
- **Reconcile** the outputs against the data, not against Airflow's states`,
  narration:
    "Recovery plans are best written before the outage, and every one of them has a limit worth saying out loud. If the warehouse is down for six hours, tasks retry and then fail, and a backfill repairs the gap, but the backfill itself must be paced so that it does not swamp the warehouse the moment it returns. If a worker is lost in the middle of a Spark job, the next attempt can recover it, but only if the job has a stable name to look up. If raw input files have expired, no orchestration can help: a replay needs its inputs. The subtle one is restoring the metadata database. Suppose it is restored from a two o'clock backup after a failure at five. Airflow now has no record of anything that happened between two and five. Those runs are forgotten, the scheduler sees gaps, and work runs again. Idempotent tasks make that safe; anything that appends or sends will duplicate. Asset events from those hours are gone, so consumers that were waiting for them may never start. So after a restore, reconcile the outputs against the data itself, not against Airflow's states. Next, upgrades.",
}
