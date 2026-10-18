import type { Section } from '../types'

export const secretsSection: Section = {
  id: 'secrets',
  title: 'Connections, secret backends, least privilege and rotation',
  scene: 'secrets',
  focus: 'least',
  slide: `## Credentials: where they live and what they allow

In production, connections and sensitive variables should live in a **secrets backend**, such as Vault or a cloud secret manager, not in the metadata database.

### How lookup works
- Airflow checks the **secrets backend** first
- Then environment variables, then the metadata DB
- DAG code only ever names a **connection id**

### Least privilege and rotation
- One connection per job: \`warehouse_read\` for checks, \`warehouse_write\` for the build
- Each credential can do **only** what its tasks need
- Audit who **read** which secret, in the backend's own logs
- Log masking is a backstop, not a control
- Rotate credentials in the backend; no DAG change, no redeploy
- Rotation is easier when no one ever copied the secret into code`,
  narration:
    "Chapter four said DAG code should name a connection id and never a password. Deployment decides where that password actually lives. In production, connections and sensitive values belong in a secrets backend, such as HashiCorp Vault or a cloud provider's secret manager, configured in Airflow's secrets section. When a task asks for a connection, Airflow checks the secrets backend first, then environment variables, then the metadata database. The second half of the job is least privilege. Do not create one all-powerful warehouse login. Give each job its own connection, with only the rights it needs. The quality gate only reads, so it uses a read-only connection. The build writes one table, so its connection can write that table and nothing else. The partner connection can post invoices and do nothing else. If one of them leaks, the damage is bounded. Rotation follows from this design. Because DAG code only names connection ids, rotating a credential is a change in the backend, with no DAG edit and no redeploy, as long as nobody has copied the secret into code along the way. Next, who can do what.",
}
