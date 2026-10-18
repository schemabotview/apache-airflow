import type { Section } from '../types'

export const assets: Section = {
  id: 'assets',
  title: 'Assets, producer outlets and consumer schedules',
  scene: 'asset-flow',
  focus: 'flow',
  slide: `## Scheduling on data, not on time

An **asset** names a piece of data, usually by URI. A producer task declares it as an **outlet**; a consumer DAG is **scheduled** on it, and runs after it is updated.

### How it fits together
- \`Asset("s3://shop-marts/sales_summary/")\` names the summary
- \`publish_summary\` lists it in \`outlets\`
- When that task **succeeds**, Airflow records an **asset event**
- \`finance_report\` has \`schedule=[sales_summary]\`, so the event starts a run

### What it buys, and what it does not
- The producer does not need to know who consumes its output
- Consumers start when data is updated, not at a guessed clock time
- The URI is a **name**: Airflow does not check the data at that location
- An event means the producing task succeeded, **not** that the data is right`,
  narration:
    "Sensors wait by checking. Assets take a different approach: scheduling on data, rather than on time. An asset is a name for a piece of data, usually a URI, such as the location of the sales summary. A producer task declares the asset as an outlet. When that task succeeds, Airflow records an asset event: a note that the summary was updated. And a consumer DAG can use the asset as its schedule. Finance report is scheduled on the sales summary, so each asset event starts a finance report run, here at forty-one minutes past midnight, right after the summary was published, rather than at a clock time somebody guessed would be late enough. The producer does not need to know who its consumers are, which keeps teams decoupled. Two cautions, though. The URI is only a name: Airflow does not look at the data at that location, or even check that it exists. And an asset event means the producing task succeeded. It does not mean the data is complete or correct, which is why the quality gate from chapter six belongs before the task that emits the event. Next, waiting on more than one asset.",
}
