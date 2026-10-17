# Apache Airflow — From Workflow Foundations to Reliable Data Orchestration

## Audience and prerequisites

For data engineers, analytics engineers, and platform engineers new to Airflow who can read Python functions, modules, exceptions, and decorators and use a command line. Basic SQL, HTTP, files/object storage, processes, and package environments support the examples. The [Python](PYTHON-COURSE-PLAN.md) and [SQL](SQL-COURSE-PLAN.md) plans provide foundations; Spark, Kubernetes, and cloud certification are not prerequisites.

Scope: workflow modelling, Airflow architecture, TaskFlow/operator authoring, scheduling, external integrations, conditional/dynamic work, correctness under retries, historical reprocessing, assets and waiting, testing, deployment, security, and diagnosis. Airflow coordinates bounded work; Kafka-style event transport and continuous stream processing remain separate subjects.

Reference family: **Apache Airflow 3.1.x**, fixed for conceptual consistency rather than presented as the newest release. Most inspected pages are 3.1.0; explicitly identified 3.1.2, 3.1.6, and 3.1.8 pages supplement unavailable pages. These are not a fully verified single-patch environment. Select and verify one patch, supported Python version, installation constraints, and provider versions before authoring runnable lessons. Use Airflow 3 public authoring interfaces such as `airflow.sdk`; avoid importing internal database models into tasks. Legacy Airflow 2 imports, dataset terminology, and SLA examples require explicit migration context.

Target capability: interpret DAG code, scheduling timelines, state transitions, logs, and operational evidence; design task boundaries; justify recovery and deployment decisions. Worked demonstrations support reasoning; individual learner mastery is not assessed.

Structure: **12 chapters / 84 sections**, with section counts of 6, 7, 7, 8, 7, 7, 7, 7, 7, 8, 7, 6. Counts reflect conceptual scope rather than equal teaching duration.

## Learning spine

First useful workflow → execution model → scheduling and data identity → task/data boundaries → conditional and dynamic graphs → repeat-safe processing → historical recovery → readiness and cross-workflow coordination → validation and delivery → deployment/security → diagnosis → integrated architecture.

A visible first run anchors the terminology. Architecture then separates parsing, scheduling, and execution. Scheduling comes before production task design because interval identity determines correct reads and writes. Branching and mapping build on those boundaries; retry correctness precedes backfill and coordinated publication. Deployment and diagnosis follow the workload and failure model they must support. This is a dependency-based teaching sequence rather than a copy of documentation navigation.

Recurring example: a daily retail-order pipeline reads interval-scoped source data, validates it, stages durable outputs, runs a warehouse transformation, and publishes sales summaries. Extend it with shop-level mapping, late files, API failures, duplicate submissions, asset updates, warehouse limits, and historical corrections. Provider-specific examples state their dependency/version assumptions; use small local or supplied illustrations before introducing remote infrastructure.

Teaching method: objective → mental model → annotated Python/configuration, diagram, timeline, or supplied UI/log evidence → expected behaviour → failure contrast → outcome and bridge. Learners may follow along; execution is optional. No submitted exercises, learner monitoring, deployment, or lesson implementation is included in this plan.

YouTube delivery: use chapters as playlist milestones and conceptual questions as video boundaries; section counts do not dictate video counts or durations. Start each video with its outcome and immediate prerequisites, keep code and interval diagrams readable, show a concrete result, and link to the next dependency. Reuse the pipeline for continuity while showing contrasting cases for transfer. Local demonstrations must identify their assumptions and production limits.

## Chapter 1 — Workflow Orchestration and a First DAG

Objective: Explain what Airflow coordinates and trace a small workflow to its output.

1. Pipelines as dependency graphs: tasks, edges, and acyclic structure
2. Orchestration versus transformation, streaming, and request-serving systems
3. DAG definitions, DAG runs, task instances, and attempts
4. A first TaskFlow pipeline with airflow.sdk: extract, validate, and publish
5. Local demonstration assumptions, isolated credentials, and explicit manual triggering
6. Read graph/grid views, task logs, and expected output; introduce retry side effects

Worked illustrations: A small daily-orders graph, annotated Python definition, and supplied run/log transcript. Show a failed validation preventing publication; distinguish graph construction from task execution. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Explain the first DAG and identify what its successful run does and does not establish.

Bridge: Next, trace code discovery, scheduling, and execution across Airflow components.

## Chapter 2 — Architecture and the Execution Lifecycle

Objective: Trace code discovery, scheduling, and execution across Airflow components.

1. DAG processing, parsing, serialization, and import errors
2. Scheduler responsibilities and dependency/resource checks
3. Executors, task processes, workers, and external execution environments
4. API server/UI, task execution interface, and metadata responsibilities
5. Triggerer responsibilities and the boundary between waiting and doing work
6. Task states: scheduled, queued, running, retrying, failed, skipped, and deferred
7. Control-plane metadata versus pipeline data and external job state

Worked illustrations: A component diagram following one task from discovery to logs; a queued task with no worker capacity; an external job continuing after its submitting process dies. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Locate a stalled task in the execution lifecycle and distinguish orchestration state from external work.

Bridge: Next, determine which data a run should process and when it becomes eligible.

## Chapter 3 — Scheduling, Data Intervals, and Run Identity

Objective: Determine which data a run should process and when it becomes eligible.

1. Time-based, manual, and asset-triggered runs: distinct scheduling contracts
2. Cron and timedelta schedules with explicit timetable assumptions
3. Data intervals, logical date, run identifier, and actual start time
4. start_date, interval completion, activation, and explicit catchup settings
5. Timezone-aware dates, UTC storage assumptions, and daylight-saving contrasts
6. Runtime context and interval-bound input/output selection
7. Timetables: trigger-time versus data-interval semantics and specialist extension boundaries

Worked illustrations: A dated calendar showing interval boundaries and delayed execution; a UTC versus Europe/London daylight-saving case; two distinct runs targeting the same business partition. Do not assume every timetable or asset-triggered run supplies the same interval semantics. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Explain scheduled-run timing and select business data from explicit context rather than the current wall clock.

Bridge: Next, build understandable task boundaries and pass durable references between them.

## Chapter 4 — Task Design, Data Exchange, and External Systems

Objective: Build understandable task boundaries and pass durable references between them.

1. Choose task granularity around independently retryable work
2. TaskFlow functions, traditional operators, and dependency declaration
3. XCom values, TaskFlow outputs, serialization, and size boundaries
4. Shared storage and table/object references versus worker-local files
5. Providers, hooks, connections, and external-system authentication
6. Variables, Params, and run configuration: scope and validation
7. Templated fields, rendering time, SQL parameters, and shell-injection avoidance
8. Submit, identify, monitor, and reconcile an external job across task attempts

Worked illustrations: Annotated TaskFlow/operator alternatives; a storage URI passed instead of a dataframe; tasks on different machines; an external job submitted twice after a timeout. Use parameterized queries and redacted connection examples. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Choose data-exchange and integration boundaries that survive worker changes and ambiguous external outcomes.

Bridge: Next, predict workflow behaviour when work is conditional or discovered at runtime.

## Chapter 5 — Dependencies, Branches, and Dynamic Work

Objective: Predict workflow behaviour when work is conditional or discovered at runtime.

1. Explicit dependencies versus dependencies inferred from TaskFlow outputs
2. Branching, short-circuiting, skipped tasks, and valid join points
3. Trigger rules and leaf tasks: how cleanup can hide an upstream failure
4. TaskGroups as organization rather than independent execution boundaries
5. Dynamic DAG generation at parse time versus runtime task mapping
6. expand/partial patterns, mapped outputs, reductions, and zero-length inputs
7. Bound mapping cardinality, stable identifiers, and resource fan-out

Worked illustrations: A branch-state truth table; a successful all_done leaf masking a middle failure; a mapped list of shop partitions with empty and oversized inputs. Contrast a Python loop constructing tasks with runtime expansion. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Predict branch/join states and explain when mapping is appropriate without confusing grouping with isolation.

Bridge: Next, make repeated attempts safe under partial failure and concurrent work.

## Chapter 6 — Retries, Idempotency, and Publication Correctness

Objective: Make repeated attempts safe under partial failure and concurrent work.

1. Transient versus permanent failure, bounded retries, backoff, and timeouts
2. Idempotent tasks and deterministic interval-scoped inputs
3. Partition replacement, upserts, staging, and atomic publication boundaries
4. Duplicate side effects, request identifiers, and external reconciliation
5. Concurrent runs, shared outputs, locks, and write conflicts
6. Data-quality checks, reconciliation, and publication gates
7. Callbacks, notifications, and cleanup: useful signals with execution limitations

Worked illustrations: Crash-after-write/before-success timelines; duplicate append versus partition replacement; two runs racing on the same partition; a quality gate that withholds publication. State database/object-store transaction assumptions explicitly. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Explain failure windows and justify a repeat-safe publication strategy without claiming Airflow provides exactly-once external effects.

Bridge: Next, reprocess historical data while protecting current workloads and output correctness.

## Chapter 7 — Catchup, Backfills, and Controlled Recovery

Objective: Reprocess historical data while protecting current workloads and output correctness.

1. Distinguish retry, task clearing, manual rerun, catchup, and backfill
2. Choose the affected intervals and inspect existing run/output state
3. Backfill reprocessing policy, dry-run interpretation, and run ordering
4. Backfill concurrency versus DAG concurrency and shared resource limits
5. Select upstream/downstream clearing scope and preserve diagnostic evidence
6. Code, schema, reference-data, and source-retention changes during replay
7. Reconcile outputs, suppress repeated side effects, and stage large repairs

Worked illustrations: A missing/failed/completed interval matrix; a backfill preview whose eventual runs depend on current state; a corrected transformation replaying historical partitions alongside live processing. Explain why clearing state does not undo external writes. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Choose a recovery mechanism and defend its interval, side-effect, capacity, and reconciliation boundaries.

Bridge: Next, coordinate readiness without confusing an orchestration signal with data correctness.

## Chapter 8 — Waiting, Assets, and Cross-Workflow Coordination

Objective: Coordinate readiness without confusing an orchestration signal with data correctness.

1. Sensors, polling intervals, and wait-time versus execution-time limits
2. Poke/reschedule approaches and worker-slot trade-offs
3. Deferrable operators, triggers, triggerer capacity, and supported integrations
4. Assets, producer outlets, consumer schedules, and emitted update events
5. Multiple-asset conditions and event metadata versus business partition identity
6. External DAG/task dependencies and explicit run triggering
7. Event-driven scheduling scope, compatible triggers, and bounded workflow execution

Worked illustrations: A worker-slot occupancy timeline; a deferred task resuming after an event; asset producers and consumers with stale or incomplete data. Show how an update signal can trigger work without proving an atomic snapshot or complete partition. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Compare readiness mechanisms and state the extra validation required before consuming signalled data.

Bridge: Next, explain what validation can establish before a DAG change reaches production.

## Chapter 9 — Testing, Packaging, and Workflow Evolution

Objective: Explain what validation can establish before a DAG change reaches production.

1. Separate business logic from orchestration definitions for focused testing
2. DAG import/structure checks, dependencies, identifiers, and parse-time side effects
3. Unit tests with deterministic inputs and mocked external interfaces
4. Template/context tests and local task/DAG execution limitations
5. Integration cases for retries, mappings, assets, and external publication
6. Package shared code and pin compatible Airflow/provider/Python dependencies
7. CI review, environment promotion, DAG bundles, and version-aware reruns

Worked illustrations: Supplied test results for a broken import, a wrong interval filter, and a repeated write; a dependency manifest; deployment during an active run. Distinguish graph/version tracking from availability of a particular historical code bundle. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Interpret validation evidence and identify which production behaviours remain untested by local success.

Bridge: Next, choose execution and trust boundaries for a realistic workload.

## Chapter 10 — Deployment, Capacity, and Secure Access

Objective: Choose execution and trust boundaries for a realistic workload.

1. Local, distributed worker, and per-task container execution trade-offs
2. LocalExecutor, CeleryExecutor, and KubernetesExecutor responsibility boundaries
3. Metadata database, logs, DAG distribution, and dependency consistency
4. Pools, slots, DAG/task concurrency, and external-service rate limits
5. Parsing/scheduling throughput, mapped-task scale, and resource bottlenecks
6. Connections and secret backends, least privilege, and credential rotation
7. Auth managers, UI/API permissions, trusted DAG authors, and isolation limits
8. Self-managed versus managed Airflow: availability, maintenance, and cost ownership

Worked illustrations: An executor comparison tied to workload assumptions; a pool limiting warehouse sessions; a deployment trust diagram; a redacted secret lookup. Label local demonstrations separately from production architecture. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Justify an executor/capacity design and distinguish user access controls from isolation of arbitrary DAG code.

Bridge: Next, diagnose failures using task, scheduler, and data-product evidence.

## Chapter 11 — Observability and Operational Diagnosis

Objective: Diagnose failures using task, scheduler, and data-product evidence.

1. Task-attempt logs, run identity, correlation identifiers, and secret redaction
2. Remote log access, missing logs, and retention expectations
3. Health checks and scheduler/worker/triggerer liveness versus useful progress
4. Metrics for parsing delay, queue time, task duration, retries, and backlog
5. Data freshness, completeness, publication deadlines, and actionable alerting
6. Diagnose absent runs, queued tasks, stuck waits, and repeated failures
7. Incident triage, safe intervention, and recovery verification

Worked illustrations: Supplied log/metric panels contrasting slow parsing, exhausted pools, and a stalled external service; a green DAG with stale business data; an incident timeline connecting symptoms to a bounded repair. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Form a diagnosis from multiple evidence sources and explain why healthy processes or green tasks do not establish data freshness.

Bridge: Next, evaluate a complete workflow and plan changes around recoverable business outcomes.

## Chapter 12 — Integrated Architecture and Operational Evolution

Objective: Evaluate a complete workflow and plan changes around recoverable business outcomes.

1. An end-to-end order pipeline: ingestion, validation, transformation, and publication
2. Coordinate SQL, dbt, Spark, and warehouse jobs without repeating their implementation courses
3. Choose DAG boundaries, ownership, asset contracts, and cross-team dependencies
4. Plan outages, external-job recovery, metadata restoration, and replay limits
5. Version upgrades, provider compatibility, migration checks, and rollback constraints
6. Compare orchestration alternatives and defend when Airflow fits the workload

Worked illustrations: An annotated architecture with run/data identities and failure ownership; a warehouse outage and phased backfill; a metadata-restore case requiring external output reconciliation; an upgrade review with explicit evidence gaps. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Critique an integrated orchestration design and explain the validation needed before claiming reliable recovery.

Bridge: Continue with a different workload, compare its scheduling and side-effect contracts, and validate current documentation and recovery evidence before operating a real deployment.

## Sources and scope

Official references inspected: [architecture](https://airflow.apache.org/docs/apache-airflow/3.1.0/core-concepts/overview.html), [TaskFlow tutorial](https://airflow.apache.org/docs/apache-airflow/3.1.0/tutorial/taskflow.html), [public interfaces](https://airflow.apache.org/docs/apache-airflow/3.1.0/public-airflow-interface.html), [DAG runs and intervals, 3.1.2](https://airflow.apache.org/docs/apache-airflow/3.1.2/core-concepts/dag-run.html), [XComs](https://airflow.apache.org/docs/apache-airflow/3.1.0/core-concepts/xcoms.html), [dynamic mapping](https://airflow.apache.org/docs/apache-airflow/3.1.0/authoring-and-scheduling/dynamic-task-mapping.html), [backfill](https://airflow.apache.org/docs/apache-airflow/3.1.0/core-concepts/backfill.html), [deferral](https://airflow.apache.org/docs/apache-airflow/3.1.0/authoring-and-scheduling/deferring.html), [assets, 3.1.6](https://airflow.apache.org/docs/apache-airflow/3.1.6/authoring-and-scheduling/asset-scheduling.html), [best practices](https://airflow.apache.org/docs/apache-airflow/3.1.0/best-practices.html), [executors](https://airflow.apache.org/docs/apache-airflow/3.1.0/core-concepts/executor/index.html), [security model](https://airflow.apache.org/docs/apache-airflow/3.1.0/security/security_model.html), and [logging/monitoring index, 3.1.8](https://airflow.apache.org/docs/apache-airflow/3.1.8/administration-and-deployment/logging-monitoring/index.html).

Book comparison: Harenslak and de Ruiter, *Data Pipelines with Apache Airflow* (first edition, 2021), and de Ruiter, Cabral, Geusebroek, van der Ende, and Harenslak, *Data Pipelines with Apache Airflow*, second edition. Publisher descriptions/available contents were inspected, not complete books. The second-edition publisher material targets Airflow 3; the first edition supplies historical teaching comparisons, not current API authority. Full evidence and access limitations are in the README.

Specialist boundaries: no exhaustive provider catalogue, Kubernetes/Helm or Celery administration, custom executor/auth-manager implementations, metadata database internals, custom timetable/trigger/plugin development, full streaming engines, or cloud-specific managed-service deployment. SQL/dbt/Spark transformations remain in their owner courses. Asset scheduling is an orchestration contract, not a substitute for data validation or transactional publication. DAG version metadata is not a guarantee that every bundle backend preserves runnable historical code. Deadline-alert API details and experimental rerun features are deferred pending dedicated version checks. No installation, example execution, benchmark, or restore was performed.
