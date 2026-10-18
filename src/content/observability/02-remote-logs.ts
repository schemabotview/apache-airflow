import type { Section } from '../types'

export const remoteLogs: Section = {
  id: 'remote-logs',
  title: 'Remote log access, missing logs and retention',
  scene: 'remote-logs',
  focus: 'missing',
  slide: `## Where logs go, and why one goes missing

With **remote logging**, workers write task logs to shared storage, and the UI reads them back through the API server. A missing log is itself evidence.

### Why a log is missing
- Logs of a **running** task are served by its worker until upload
- The worker was **killed** before the log was uploaded
- The task **never started**: check its state history
- **Retention** removed it, by a storage lifecycle rule
- A component writes or reads a **different** remote path
- The API server lacks **permission** to read the bucket
- Test log access after **every** infrastructure change

### Retention
- Keep logs long enough to **outlive** an incident and its review
- Not forever: logs can contain data that needs a deletion policy`,
  narration:
    "Logs have to live somewhere that outlasts the worker that wrote them. With remote logging, a worker writes the task's log while it runs and uploads it to shared storage, such as an object store, and the UI reads it back through the API server. When the UI says a log cannot be found, that is evidence too, and there are a handful of usual causes. The worker may have been killed, for example for running out of memory, before it could upload the log; the pod or host events will show it. The task may never have started at all, in which case its state history will show it going from queued to failed. Retention may have removed it, if a lifecycle rule on the bucket deletes old objects. One component may be configured with a different remote path from the others, which is why remote logging settings belong in the shared image and configuration. Or the API server may simply lack permission to read the bucket. Retention itself is a decision. Keep logs long enough to outlive an incident and its review, and not forever, because logs can contain data that has its own deletion rules. Next, health.",
}
