import type { Scene } from '@graphlearning/flow'

// §2 — the same task run twice: an append doubles the day, a partition replacement does not.
export const appendVsReplace: Scene = {
  id: 'append-vs-replace',
  title: 'Idempotent tasks',
  flow: 'TB',
  nodes: [
    {
      id: 'append',
      kind: 'code',
      filename: 'not idempotent',
      label: `INSERT INTO sales_daily
SELECT day, shop, sum(amount) FROM staging.orders
WHERE day = %(day)s GROUP BY day, shop;`,
    },
    {
      id: 'replace',
      kind: 'code',
      filename: 'idempotent: the day is replaced as a whole',
      label: `BEGIN;
DELETE FROM sales_daily WHERE day = %(day)s;
INSERT INTO sales_daily
SELECT day, shop, sum(amount) FROM staging.orders
WHERE day = %(day)s GROUP BY day, shop;
COMMIT;`,
    },
    {
      id: 'outcome',
      kind: 'table',
      label: 'Rows for 03-01 after each attempt',
      sub: '40 shops',
      headers: ['attempts', 'append', 'replace'],
      values: [
        ['1', '40', '40'],
        ['2 (a retry)', '80', '40'],
        ['3 (a rerun next week)', '120', '40'],
      ],
    },
  ],
  edges: [
    { source: 'append', target: 'replace', dashed: true, label: 'versus' },
    { source: 'replace', target: 'outcome' },
  ],
}
