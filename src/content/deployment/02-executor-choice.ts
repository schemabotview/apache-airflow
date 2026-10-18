import type { Section } from '../types'

export const executorChoice: Section = {
  id: 'executor-choice',
  title: 'Local, Celery and Kubernetes executors',
  scene: 'executor-choice',
  focus: 'compare',
  slide: `## What each executor takes on

The **executor** turns queued task instances into running processes. Each built-in option takes on different work, and leaves different work to you.

### The three
- **LocalExecutor** — subprocesses on the scheduler host; no extra infrastructure
- **CeleryExecutor** — a message broker and a fleet of workers you run and scale
- **KubernetesExecutor** — one pod per task on a cluster; isolation per task

### Combining them
- Airflow can run **more than one** executor at once
- A task picks one with \`executor=\`, such as Kubernetes for a heavy month build
- Each executor added is more infrastructure to **operate** and monitor
- Keep the default executor right for most tasks; route only the exceptions`,
  narration:
    "The executor is the part of the scheduler that turns queued task instances into running processes, and each built-in executor takes on different work. The local executor starts tasks as subprocesses on the scheduler's own host. There is no extra infrastructure, and also no way to grow beyond that host. The Celery executor puts tasks on a message queue, and a fleet of workers that you run picks them up. You operate the broker and the workers, and you scale by adding workers. The Kubernetes executor asks a cluster for a new pod for each task instance. Every task is isolated and can request its own resources, but each one pays a start-up cost, and you need a cluster. You do not have to pick just one. Airflow can run several executors side by side, and a task can choose with the executor argument, so most tasks run on Celery workers while the heavy monthly build gets its own Kubernetes pod. Each executor you add is more infrastructure to operate and monitor, though. Make the default right for most tasks and route only the exceptions. Next, what all components must share.",
}
