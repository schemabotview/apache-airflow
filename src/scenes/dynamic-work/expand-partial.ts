import type { Scene } from '@graphlearning/flow'

// §6 — partial fixes arguments, expand fans out, a downstream task reduces; and the empty case.
export const expandPartial: Scene = {
  id: 'expand-partial',
  title: 'expand, partial and reduce',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'one mapped task per shop',
      label: `shops = list_active_shops()                # ["shop-01", "shop-02", "shop-03"]
counts = load_shop.partial(day=day).expand(shop=shops)
total = sum_counts(counts)                 # receives all three results`,
    },
    {
      id: 'mapped',
      label: 'load_shop, mapped',
      sub: 'one task instance per element',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'm0', badge: '[0]', label: 'shop-01', sub: '1,204 rows', pattern: 'service', icon: 'box' },
        { id: 'm1', badge: '[1]', label: 'shop-02', sub: '988 rows', pattern: 'service', icon: 'box' },
        { id: 'm2', badge: '[2]', label: 'shop-03', sub: '1,530 rows', pattern: 'service', icon: 'box' },
      ],
    },
    {
      id: 'reduce',
      label: 'sum_counts',
      sub: 'one task, all results in map order',
      pattern: 'storage',
      icon: 'sigma',
    },
    {
      id: 'empty',
      label: 'When the list is empty',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'zero', label: 'Zero instances', sub: 'mapped task skipped', pattern: 'warn', icon: 'circleslash' },
        { id: 'spread', label: 'Skip spreads', sub: 'unless rules allow', pattern: 'warn', icon: 'workflow' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'mapped', label: 'run time' },
    { source: 'mapped', target: 'reduce' },
    { source: 'reduce', target: 'empty', dashed: true },
  ],
}
