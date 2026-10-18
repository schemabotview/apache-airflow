import type { Section } from '../types'

export const integrationCases: Section = {
  id: 'integration-cases',
  title: 'Integration cases for retries, mapping, assets and publication',
  scene: 'integration-cases',
  focus: 'cases',
  slide: `## Test the behaviours that matter in production

Integration tests run the pipeline against **real** engines in a **disposable** environment, and check the behaviours earlier chapters said must hold.

### Cases worth having
- **Repeat** a run: the day still has exactly 40 rows
- **Kill** a write midway: the retry leaves a correct, complete day
- **Empty** shop list: publish still runs and says so
- **Bad** totals: the gate fails and yesterday stays live
- **Asset** event carries the right day; a backfill sends no invoices

### The environment
- Created per test run and thrown away afterwards
- The **same** database engine and SQL dialect as production
- A fake partner API that records every call it receives`,
  narration:
    "Integration tests are where the promises of the earlier chapters get checked. They run the pipeline, or large parts of it, against real engines in a disposable environment, and each case states the evidence that passes it. Run the first of March twice, and the day must still have exactly forty rows. Kill the build task in the middle of a write, and after the retry the day must be correct and complete, with the live table untouched in between. Give it an empty shop list, and publish must still run and report zero shops, rather than being skipped silently. Feed it refunds that are eight percent off, and the gate must fail with yesterday's summary still live. Check that the producer's asset event carries the right day, and that a backfill run sends nothing to the partner. The environment matters as much as the cases. Create it for each test run and throw it away afterwards. Use the same database engine and SQL dialect as production; a different engine tests a different program. And replace the partner with a fake that records every call. Next, packaging the code.",
}
