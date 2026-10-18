import type { Section } from '../types'

export const taskLogs: Section = {
  id: 'task-logs',
  title: 'Task-attempt logs, run identity and redaction',
  scene: 'task-logs',
  focus: 'fields',
  slide: `## Logs you can trace

Airflow keeps a log for **each attempt** of each task instance. Whether that log helps in an incident depends on what the task writes into it.

### Write the identity in
- The **run id** and the **day** the task is processing
- The **external** ids it creates or finds: a Spark app, a query, a request key
- What it **decided**: attached to an existing job, replaced a partition
- Use \`key=value\` pairs, so logs can be **searched**

### Keep secrets out
- Airflow **masks** known secret values, such as connection passwords, as \`***\`
- It cannot mask a secret it does not know about
- Never log full connection strings, tokens or personal data
- Masking is a backstop for mistakes, not permission to log secrets`,
  narration:
    "Chapter eleven is about operating pipelines: knowing what is happening and diagnosing what went wrong. It starts with the most direct evidence there is, the task log. Airflow keeps a separate log for every attempt of every task instance, so the second attempt of build sales for the first of March has its own log, next to the first. Whether that log helps at three in the morning depends on what the task writes into it. Write the identity in: the run id and the day being processed, so a log line copied into a chat still says which run it came from. Write the external ids the task creates or finds, such as the Spark application id, the warehouse query id or the request key, because those are how you cross over to the other system's logs. And write what the task decided: here, that it found the existing job and attached to it, rather than submitting a new one. On the other side, keep secrets out. Airflow masks secret values it knows about, such as connection passwords, replacing them with asterisks. It cannot mask a secret it was never told about, so never log full connection strings or tokens. Next, where logs live.",
}
