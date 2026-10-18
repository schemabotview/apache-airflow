import type { Section } from '../types'

export const taskflowAndOperators: Section = {
  id: 'taskflow-and-operators',
  title: 'TaskFlow functions, operators and dependencies',
  scene: 'taskflow-operators',
  focus: 'graph',
  slide: `## TaskFlow and operators in one DAG

A task can be **your Python function**, decorated with \`@task\`, or an **operator**: a ready-made task class from a provider, configured with arguments.

### Choosing between them
- Use \`@task\` when the step is your own Python logic
- Use an **operator** when a provider already does the job, such as running SQL
- Both are tasks: same states, retries, logs and dependencies
- Mixing both styles in one DAG is normal

### Two ways to declare a dependency
- **From data** — passing one task's output to another implies the order
- **Explicitly** — \`a >> b\` sets order when no data passes between them
- An operator's output can be passed on too, through its \`.output\``,
  narration:
    "So far every task has been a TaskFlow function. That is one of two ways to write a task. The other is an operator: a ready-made task class, usually from a provider package, which you configure with arguments rather than code. In the excerpt, build sales is a SQL execute query operator, pointed at the warehouse connection and a SQL file. Choose by where the logic lives. If the step is your own Python, write a task function. If a provider already knows how to do the job, such as running a query against a warehouse, use its operator rather than reimplementing it. Either way, the result is a task with the same states, retries and logs. Dependencies can also be declared two ways. When you pass one task's output into another, as with extract and stage, the dependency follows from the data. When no data passes, as between staging and the warehouse build, you state the order explicitly with the shift operator. And when an operator does produce a value, its output attribute lets you pass it on. Next, what actually travels between tasks.",
}
