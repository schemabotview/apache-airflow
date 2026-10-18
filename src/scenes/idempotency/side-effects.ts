import type { Scene } from '@graphlearning/flow'

// §4 — an email and a partner API call: side effects that cannot be replaced, only de-duplicated.
export const sideEffects: Scene = {
  id: 'side-effects',
  title: 'Duplicate side effects and request identifiers',
  flow: 'TB',
  nodes: [
    {
      id: 'kinds',
      label: 'Effects a retry cannot take back',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'email', label: 'Email sent', sub: 'twice to finance', pattern: 'warn', icon: 'bell' },
        { id: 'post', label: 'Invoice POST', sub: 'two invoices', pattern: 'warn', icon: 'receipt' },
        { id: 'charge', label: 'Refund issued', sub: 'paid out twice', pattern: 'warn', icon: 'copy' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'a stable request id from the run',
      label: `@task
def send_invoices(day: str, dag_run=None, ti=None):
    key = f"{ti.dag_id}:{ti.task_id}:{dag_run.run_id}"
    if partner.find_request(key):           # already sent?
        return "already sent"
    partner.post_invoices(day, idempotency_key=key)`,
    },
    {
      id: 'rules',
      label: 'What makes it safe',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'stable-key', label: 'Stable key', sub: 'same on every attempt', pattern: 'storage', icon: 'fingerprint' },
        { id: 'server-dedup', label: 'Server dedups', sub: 'if the API supports it', pattern: 'service', icon: 'shieldcheck' },
        { id: 'lookup-first', label: 'Look up first', sub: 'when it does not', pattern: 'service', icon: 'search' },
      ],
    },
  ],
  edges: [
    { source: 'kinds', target: 'code' },
    { source: 'code', target: 'rules' },
  ],
}
