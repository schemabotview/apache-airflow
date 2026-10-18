import type { Section } from '../types'

export const templating: Section = {
  id: 'templating',
  title: 'Templated fields, rendering and injection',
  scene: 'templating',
  focus: 'safe',
  slide: `## Templates render late; values stay values

An operator's **templated fields** accept Jinja such as \`{{ ds }}\`. Airflow renders them just **before execution**, from the run's context.

### How rendering works
- At parse time the template is just **text**
- Just before the task executes, Airflow renders it for **this** run
- Only fields listed in the operator's \`template_fields\` are rendered
- A task instance's **rendered** view shows exactly what ran

### Values, not code
- Pass SQL values as **bound parameters**, never by pasting into the query
- Pass shell values through \`env\`, and quote them in the command
- A Param pasted into a command lets a trigger **run its own** commands`,
  narration:
    "Operators take their run-specific values through templates. A templated field accepts Jinja, such as ds in double braces, and Airflow renders it just before the task executes, using the run's context. At parse time the template is just text, which is why it can refer to a run that does not exist yet. And only the fields an operator lists as templated are rendered, so a template in any other argument stays literally as written. The more important lesson is about what rendering is allowed to produce. In the safe version, the day goes into the SQL as a bound parameter: the query text never changes, and the database receives the value separately. The shop goes into the shell command through an environment variable, quoted in the command. Now look at the unsafe version underneath, which pastes the shop parameter straight into the command text. Anyone who can trigger the DAG with a shop of x semicolon rm, can run commands of their own on your worker. Keep values as values. Next, the hardest task to get right.",
}
