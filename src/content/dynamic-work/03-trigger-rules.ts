import type { Section } from '../types'

export const triggerRules: Section = {
  id: 'trigger-rules',
  title: 'Trigger rules, leaf tasks and hidden failures',
  scene: 'trigger-rules',
  focus: 'verdict',
  slide: `## A cleanup task can hide a failure

A DAG run's final state is decided by its **leaf tasks**: the ones with nothing downstream. A cleanup leaf with \`all_done\` can make a failed run look **green**.

### Run 03-04
- \`build_sales\` fails, so \`publish_summary\` becomes **upstream_failed**
- \`drop_scratch\` runs with \`all_done\` and succeeds; it is the only leaf
- The DAG run is marked **success**, and nobody is alerted
- A DAG-level failure callback never fires either

### Keeping the failure visible
- Mark cleanup a **teardown** with \`as_teardown()\`; teardowns are ignored when judging the run
- Or add a watcher leaf with \`one_failed\` that fails on purpose
- Prefer \`all_success\` unless a task must run **regardless**
- Check what a run's leaves are whenever its state looks wrong`,
  narration:
    "Trigger rules decide when a single task may run, but they also affect something less obvious: the state of the whole DAG run. A run's final state is decided by its leaf tasks, the ones with nothing downstream. Now follow run three-four. Build sales fails, so publish summary is upstream failed. But the DAG also has a cleanup task, drop scratch, which removes temporary tables. It has the trigger rule all done, so that it always runs, and it succeeds. It is the only leaf in the graph, so the run is marked as a success, and an alert that waits for failed runs never fires. There are two clean fixes. Mark the cleanup as a teardown task. Teardowns run even after failures, and they are deliberately ignored when Airflow judges the run, so the failure in build sales still decides it. Or add a watcher leaf with the rule one failed, which only runs when something upstream failed, and then fails on purpose. The table underneath lists the rules you will meet most. Next, grouping tasks.",
}
