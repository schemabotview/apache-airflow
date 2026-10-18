import type { Section } from '../types'

export const deferrable: Section = {
  id: 'deferrable',
  title: 'Deferrable operators, triggers and triggerer capacity',
  scene: 'deferral',
  focus: 'triggerer',
  slide: `## Waiting in the triggerer

A **deferrable** operator hands its wait to a **trigger**: a small async check that runs in the **triggerer**, not on a worker. The task resumes when the trigger fires.

### What changes
- \`deferrable=True\` on a supporting operator, such as \`S3KeySensor\`
- While waiting the task is **deferred** and holds no worker slot
- One triggerer process runs **many** triggers in one async event loop
- The sensor's \`timeout\` still applies to the whole wait

### What it needs
- A **triggerer** that is running and monitored, sized by its capacity setting
- An operator or sensor that **supports** deferral; not every one does
- If the triggerer is down, deferred tasks wait until it returns or they time out`,
  narration:
    "Deferral takes waiting off the workers entirely. A deferrable operator, at the moment it would start waiting, hands the wait to a trigger: a small piece of asynchronous code that knows how to watch for one thing, such as a key appearing in a bucket or a Spark job finishing. That trigger runs in the triggerer, the component we met in chapter two, and the task is marked deferred, holding no worker slot at all. When the trigger fires, the scheduler puts the task back in line and it resumes on a worker to finish. For the refunds file, the change is one argument: deferrable equals true on the S3 key sensor. The timeout still applies to the whole wait. The economics are very different, because one triggerer process runs hundreds of triggers together in a single event loop. But deferral has its own requirements. The triggerer must be running and monitored, and its capacity setting decides how many triggers it will take. The operator must support deferral; not every one does. And if the triggerer is down, deferred tasks simply wait, until it returns or their timeout expires. Next, assets.",
}
