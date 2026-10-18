import type { Section } from '../types'

export const stagedRepair: Section = {
  id: 'staged-repair',
  title: 'Reconciling outputs, suppressing side effects and staging repairs',
  scene: 'staged-repair',
  focus: 'plan',
  slide: `## Repair in stages, and keep it quiet

A large repair should be **visible before it is live**, and it should not repeat effects meant for the original day: invoices, emails, partner calls.

### A staged repair
- **Replay** into a shadow table, not over the live one
- **Reconcile** the shadow against the live output and the source
- **Switch** a month at a time, each an atomic partition swap
- **Tell** consumers which days changed, and why
- Keep the shadow until consumers **confirm** the new numbers

### Suppress side effects in replays
- Check \`dag_run.run_type\`: a backfill run is \`"backfill"\`
- A short-circuit task skips sending on replayed runs
- Decide per effect: some must resend, most must not
- Only the reconciliation proves the repair; green runs do not`,
  narration:
    "For a large repair, say a whole quarter, do not overwrite the live tables and hope. Stage it. Replay into a shadow table that nobody reads. Reconcile the shadow against two things: the live output, so you can see exactly which days change and by how much, and the source system, so you can see the repaired numbers are right. Then switch over a month at a time, each switch an atomic partition swap, so a problem found in one month does not reach the next. And tell the people who consume the data which days changed and why, because their reports from February just moved. The second concern is side effects. Some tasks exist to act on the original day: sending invoices, emailing finance, calling a partner. Replaying them a month later sends those effects again. The run type tells a task how its run was started, and a backfill run's type is backfill, so a short circuit task can skip sending on replays. Decide this per effect; occasionally a corrected figure must be resent. And remember that green backfill runs prove only that tasks ran. The reconciliation is what proves the repair. Next chapter: waiting and coordination.",
}
