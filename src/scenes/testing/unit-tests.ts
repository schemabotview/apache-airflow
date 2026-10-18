import type { Scene } from '@graphlearning/flow'

// §3 — deterministic inputs, a faked external interface, and the supplied test results.
export const unitTests: Scene = {
  id: 'unit-tests',
  title: 'Unit tests with deterministic inputs',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'tests/test_summary.py',
      label: `def test_refunds_are_excluded():
    rows = [
        {"shop": "shop-01", "amount": 10.0, "status": "paid"},
        {"shop": "shop-01", "amount": 4.0, "status": "refunded"},
    ]
    assert summarise(rows) == {"shop-01": 10.0}

def test_extract_uses_the_interval(monkeypatch):
    calls = []
    monkeypatch.setattr(orders_lib, "list_files", calls.append)
    extract_for_day(date(2026, 3, 1))
    assert calls == ["orders/2026-03-01.csv"]`,
    },
    {
      id: 'results',
      kind: 'table',
      label: 'Supplied results, before a fix',
      headers: ['test', 'result', 'what it found'],
      values: [
        ['test_refunds_are_excluded', 'pass', '—'],
        ['test_extract_uses_the_interval', 'FAIL', 'read 2026-03-02: off by a day'],
        ['test_summary_twice_is_same', 'FAIL', 'appended: rows doubled'],
      ],
    },
  ],
  edges: [{ source: 'code', target: 'results' }],
}
