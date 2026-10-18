import type { Section } from '../types'

export const variablesAndParams: Section = {
  id: 'variables-and-params',
  title: 'Variables, Params and run configuration',
  scene: 'params-variables',
  focus: 'compare',
  slide: `## Configuring a run

**Variables**, **Params** and **run configuration** all feed values into tasks. They differ in scope, and in whether anything checks them.

### Choose by scope
- A **Variable** is deployment-wide, such as the orders bucket name
- A **Param** belongs to one DAG, with a default and a schema
- **Run conf** supplies values for one triggered run, checked against the Params
- Variables can also come from a **secrets backend** or the environment

### Habits
- Read Variables **inside tasks**, at run time, not at the top of the file
- Give Params a **type**, so a bad trigger fails before any task runs
- Credentials belong in **connections**, not Variables
- Run conf is visible to anyone who can view the run`,
  narration:
    "Not everything a task needs is a credential. Some of it is ordinary configuration, and Airflow offers three places for it, which differ mainly in scope. A Variable is deployment-wide: any DAG can read it, which suits something like the name of the orders bucket. A Param belongs to one DAG. It has a default, and it can have a schema, so in the example, shops must be an array of strings. And run configuration is the set of values supplied when a particular run is triggered; it is validated against the DAG's Params. A few habits keep this safe. Read Variables inside tasks, where they are fetched once at run time. A Variable read at the top of the file is fetched on every parse, which we saw is often. Give Params a type, so that a person triggering a run with a misspelled shop list gets an error before any task starts, rather than a half-finished run. And do not store credentials as Variables; that is what connections, with their secrets backends, are for. Next, templates.",
}
