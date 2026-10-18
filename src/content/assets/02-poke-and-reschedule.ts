import type { Section } from '../types'

export const pokeAndReschedule: Section = {
  id: 'poke-and-reschedule',
  title: 'Poke and reschedule modes and worker slots',
  scene: 'slot-occupancy',
  focus: 'modes',
  slide: `## What a waiting sensor costs

A sensor's **mode** decides whether it keeps a worker slot while it waits. With many sensors and long waits, that choice decides whether real work can run.

### Poke
- Checks, then **sleeps in place**, holding its worker slot
- Forty shop sensors waiting three hours hold **forty slots** all morning
- Cheap and fast when the wait is **seconds**
- Every check also **costs** the system it asks

### Reschedule
- Checks, then **releases** its slot until the next check
- Shows as \`up_for_reschedule\` between checks
- Each check is a short new execution, with start-up cost
- Suits waits of **minutes to hours**, checked every few minutes
- For hours of waiting across many sensors, prefer **deferral**`,
  narration:
    "A sensor that is waiting is still a task, and the question is what it holds while it waits. That is decided by its mode. In poke mode, the sensor checks, then sleeps in place, keeping its worker slot the whole time. One sensor doing that for a few seconds costs nothing. Now picture one sensor per shop, forty of them, each waiting up to three hours for its file. In poke mode they hold forty worker slots all morning, mostly asleep, while the tasks that have real work to do sit in the queue. In reschedule mode, the sensor checks, and if the condition is not yet true, it releases its slot and asks to be scheduled again after the poke interval. Between checks it shows the up for reschedule state and holds nothing. The cost is that each check is a short new execution, with its own start-up time, so it suits waits of minutes to hours, checked every few minutes. And when waits are long and sensors are many, there is a better option still, which is to stop using workers for waiting at all. Next, deferral.",
}
