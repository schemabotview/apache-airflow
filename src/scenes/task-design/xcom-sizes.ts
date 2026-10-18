import type { Scene } from '@graphlearning/flow'

// §3 — where a TaskFlow return value goes, and what belongs in it.
export const xcomSizes: Scene = {
  id: 'xcom-sizes',
  title: 'XCom: what to pass between tasks',
  flow: 'TB',
  nodes: [
    {
      id: 'path',
      label: 'A return value, between two tasks',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'producer', label: 'Extract orders', sub: 'returns a path', pattern: 'service', icon: 'filecode' },
        { id: 'store', label: 'XCom', sub: 'serialized, stored', pattern: 'storage', icon: 'database' },
        { id: 'consumer', label: 'Validate', sub: 'receives it', pattern: 'service', icon: 'shieldcheck' },
      ],
      edges: [
        { source: 'producer', target: 'store', label: 'return' },
        { source: 'store', target: 'consumer', label: 'argument' },
      ],
    },
    {
      id: 'fit',
      kind: 'table',
      label: 'Does it belong in an XCom?',
      sub: 'default backend: the metadata database',
      headers: ['value', 'size', 'verdict'],
      values: [
        ['"s3://shop-raw/orders/…csv"', 'bytes', 'yes: a reference the next task resolves'],
        ['row_count = 48213', 'bytes', 'yes: a fact about the output'],
        ['["shop-01", …, "shop-40"]', 'small', 'yes: a short list to fan out over'],
        ['the orders DataFrame', 'gigabytes', 'no: write it to storage, pass the path'],
        ['an open DB connection', '—', 'no: cannot be serialized at all'],
      ],
    },
  ],
  edges: [{ source: 'path', target: 'fit', dashed: true }],
}
