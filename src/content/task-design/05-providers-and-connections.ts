import type { Section } from '../types'

export const providersAndConnections: Section = {
  id: 'providers-and-connections',
  title: 'Providers, hooks, connections and authentication',
  scene: 'connections',
  focus: 'conn-id',
  slide: `## Reaching external systems

**Providers** are packages that add operators and hooks for one system. A **hook** is a client; a **connection** holds where that system is and how to authenticate.

### The chain
- A task or operator creates a **hook** for one system
- The hook asks for a **connection id**, such as \`"warehouse"\`
- Airflow resolves that id at run time from a secrets backend, an environment variable or the metadata DB
- Install only the providers you use; each brings its own **dependencies**

### Keep credentials out of code
- DAG code names a **connection id**, never a password
- Each environment maps the same id to **its own** credentials
- Rotate credentials in the backend; the DAG code does not change
- Logs mask connection secrets, but code that prints them still leaks them`,
  narration:
    "Tasks rarely work alone; they talk to warehouses, object stores and APIs. Airflow organises that through providers, hooks and connections. A provider is a separately installed package for one system, such as Postgres or Amazon, and it supplies the operators and hooks for it. A hook is a client: it knows how to open a session with that system and run something. And a connection is configuration: where the system is and how to authenticate to it. The chain runs like this. A task creates a hook, the hook asks for a connection by id, here the word warehouse, and at run time Airflow resolves that id. It looks in a secrets backend if one is configured, then in environment variables, then in the metadata database. The point of that indirection is that DAG code never contains a password. It names a connection id, and each environment, development, staging, production, maps that same id to its own credentials. Airflow masks known secrets in logs, but code that prints a credential still leaks it. Next, configuration that is not a credential.",
}
