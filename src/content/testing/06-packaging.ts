import type { Section } from '../types'

export const packagingSection: Section = {
  id: 'packaging',
  title: 'Packaging shared code and pinning dependencies',
  scene: 'packaging',
  focus: 'install',
  slide: `## The same code and versions everywhere

DAG code runs on the DAG processor, on workers and in tests. They must all have **the same** Airflow, providers, Python and shared libraries.

### Package shared code
- Put shared logic in an **installable** package, not copied files
- DAG files import it; they contain wiring, not logic
- Version the package and install it into the image

### Pin everything
- Install Airflow with its published **constraints** file for your exact patch and Python
- Pin provider packages and your own dependencies too
- Build **one** image for scheduler, DAG processor and workers
- Never \`pip install\` from inside a task at run time
- Upgrade on purpose: change the pins, run the tests, then ship`,
  narration:
    "DAG code does not run in one place. The DAG processor imports it, workers execute it, and your tests load it too. If those places have different versions of Airflow, providers, Python or your own libraries, a DAG can parse in one and fail in another. So two habits. First, package shared code. Put orders lib in an installable package with its own project file, rather than copying helper modules between DAG folders. DAG files import it and contain only wiring. Version the package and install it into the image, so every component has the same build. Second, pin everything. Airflow publishes a constraints file for each release and Python version, listing versions known to work together; install against the one for your exact patch. Pin provider packages and your own dependencies as well. Build a single image that the scheduler, the DAG processor and the workers all use. And treat upgrades as changes like any other: change the pins, run the tests, then ship, rather than letting a fresh install pick up whatever was released last night. Next, getting changes to production.",
}
