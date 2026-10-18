import type { Scene } from '@graphlearning/flow'

// §1 — from a file in a bundle to a serialized DAG or an import error, and the top-level code that
// runs on every parse.
export const dagProcessing: Scene = {
  id: 'dag-processing',
  title: 'Parsing, serialization and import errors',
  flow: 'TB',
  nodes: [
    { id: 'bundle', label: 'DAG bundle', sub: 'dags/daily_orders.py', pattern: 'storage', icon: 'folder' },
    {
      id: 'processor',
      label: 'DAG processor',
      sub: 'imports every file, again and again',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'parse', label: 'Parse', sub: 'run top-level code', pattern: 'service', icon: 'filecode' },
        { id: 'serialize', label: 'Serialize', sub: 'graph to JSON', pattern: 'service', icon: 'braces' },
      ],
    },
    {
      id: 'outcomes',
      label: 'One of two outcomes',
      pattern: 'external',
      cols: 2,
      children: [
        { id: 'serialized', label: 'Serialized DAG', sub: 'in the metadata DB', pattern: 'storage', icon: 'database' },
        { id: 'import-error', label: 'Import error', sub: 'shown in the UI', pattern: 'warn', icon: 'bug' },
      ],
    },
    {
      id: 'top-level',
      kind: 'code',
      filename: 'dags/daily_orders.py — runs on every parse',
      label: `import requests

# top level: executed each time the file is parsed
rates = requests.get(RATES_URL).json()

@dag(schedule="@daily", start_date=START)
def daily_orders():
    ...`,
    },
  ],
  edges: [
    { source: 'bundle', target: 'processor' },
    { source: 'processor', target: 'outcomes' },
    { source: 'outcomes', target: 'top-level', dashed: true, label: 'why parsing is slow' },
  ],
}
