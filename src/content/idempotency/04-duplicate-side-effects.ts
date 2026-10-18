import type { Section } from '../types'

export const duplicateSideEffects: Section = {
  id: 'duplicate-side-effects',
  title: 'Duplicate side effects and request identifiers',
  scene: 'side-effects',
  focus: 'code',
  slide: `## Effects you cannot overwrite

An email, an invoice sent to a partner, a refund: these cannot be replaced like a partition. A retry **repeats** them unless something recognises the repeat.

### Give every effect a stable key
- Build a request key from the **run**: DAG id, task id and run id
- Every attempt and every rerun of that run produces the **same** key
- Batch effects per run, so one key covers the whole send
- If the API accepts an **idempotency key**, the server drops duplicates

### When the API does not
- **Look up** the key before sending, and skip if it was sent
- Record sent keys somewhere durable, not in an XCom
- Accept the small window between sending and recording, and reconcile it
- Airflow cannot make an external effect happen **exactly once**`,
  narration:
    "Some tasks change things that cannot simply be overwritten. Sending the daily figures to finance by email. Posting invoices to a partner's API. Issuing refunds. A retry of these does not replace anything: it repeats it, and two invoices are not the same as one. The tool here is a stable request key. Build it from the run itself, the DAG id, the task id and the run id, so that every attempt and every rerun of that run produces exactly the same key. If the partner's API accepts an idempotency key, send it, and the server will recognise and drop the duplicate. If it does not, look the key up before sending, and skip the send if it has already happened. Record the sent keys somewhere durable; an XCom will not do, because it is cleared when the task runs again. There remains a small window, between the send succeeding and you recording it, so reconcile against the partner's records from time to time. And be honest about the limit: Airflow schedules attempts. It cannot make an external effect happen exactly once. Next, two runs at the same time.",
}
