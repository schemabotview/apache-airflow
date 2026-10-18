import type { Section } from '../types'

export const sensors: Section = {
  id: 'sensors',
  title: 'Sensors, polling intervals and time limits',
  scene: 'sensor-limits',
  focus: 'limits',
  slide: `## Waiting with a sensor

A **sensor** is a task that waits for a condition, such as a file landing, by checking it repeatedly. It succeeds when the condition is true.

### The partner refunds file
- The partner drops \`refunds/<day>.csv\` sometime after midnight
- \`wait_for_refunds\` checks every **5 minutes**
- It gives up after **6 hours** of waiting, then the run fails visibly

### Three limits, three meanings
- \`poke_interval\` — the gap between checks
- \`timeout\` — the **whole** wait; exceeding it fails without retrying
- \`execution_timeout\` — **one** attempt; exceeding it can be retried
- \`soft_fail\` marks a timed-out sensor **skipped** instead of failed
- A sensor proves the file **exists**, not that it is complete or correct`,
  narration:
    "Chapter eight is about readiness: knowing when the data a task needs is actually there. The oldest tool for that is the sensor, a task that waits for a condition by checking it repeatedly, and succeeds when the condition becomes true. Our pipeline now needs the partner's refunds file, which lands in a shared bucket sometime after midnight. Wait for refunds checks for the day's file every five minutes. Three different time limits surround it, and they are easy to confuse. Poke interval is just the gap between checks. Timeout is the whole wait: if six hours pass without the file, the sensor fails, and it does not retry, because more retries would just be more waiting. Execution timeout limits a single attempt, as for any task, and that failure can be retried. Soft fail changes the outcome of a timeout from failed to skipped, which suits optional inputs. And one caution that runs through this chapter: a sensor proves that a file exists. It does not prove the file is complete, or correct, so a partner still writing it can pass the check. Next, what a waiting sensor costs.",
}
