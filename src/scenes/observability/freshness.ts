import type { Scene } from '@graphlearning/flow'

// §5 — measure the data itself, from outside the pipeline, against a deadline someone agreed.
export const freshness: Scene = {
  id: 'freshness',
  title: 'Freshness, completeness and deadlines',
  flow: 'TB',
  nodes: [
    {
      id: 'check',
      kind: 'code',
      filename: 'a freshness check, run by a separate monitor every 15 minutes',
      label: `SELECT day, count(DISTINCT shop) AS shops
FROM sales_daily
WHERE day = (SELECT max(day) FROM sales_daily)
GROUP BY day;
-- page if day < yesterday after 06:00 UTC,
--      or shops < the active shop count`,
    },
    {
      id: 'contract',
      kind: 'table',
      label: 'The agreed promise',
      headers: ['output', 'fresh by', 'complete means', 'owner'],
      values: [
        ['sales_daily', '06:00 UTC', 'every active shop', 'data platform'],
        ['finance_report', '08:00 UTC', 'margin for every shop', 'finance data'],
      ],
    },
    {
      id: 'why',
      label: 'Why outside the pipeline',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'no-run', label: 'No run', sub: 'nothing fails, no alert', pattern: 'warn', icon: 'circleslash' },
        { id: 'green', label: 'Green but wrong', sub: 'tasks passed', pattern: 'warn', icon: 'circlecheck' },
        { id: 'down', label: 'Airflow down', sub: 'cannot alert on itself', pattern: 'warn', icon: 'power' },
      ],
    },
  ],
  edges: [
    { source: 'check', target: 'contract' },
    { source: 'contract', target: 'why', dashed: true },
  ],
}
