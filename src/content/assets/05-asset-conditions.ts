import type { Section } from '../types'

export const assetConditions: Section = {
  id: 'asset-conditions',
  title: 'Multiple-asset conditions and event metadata',
  scene: 'asset-conditions',
  focus: 'events',
  slide: `## An event is not a partition

A consumer can wait for **several** assets: \`&\` for all of them, \`|\` for any. But what arrives is a set of **events**, and an event alone does not say which day it covers.

### Combining assets
- \`orders_staged & refunds_staged\` runs once **both** have new events
- \`|\` runs when **either** updates
- Events that arrive before the run starts are **batched** into one run
- \`AssetAlias\` lets a task name its asset at run time

### Carrying identity with the event
- A rerun of 02-26 updates \`orders_staged\` too, and joins the same batch
- So the producer attaches the **day** to the event's \`extra\`
- The consumer reads its **triggering events** and checks each day it is given
- Then it checks that both inputs for that day are actually **complete**`,
  narration:
    "Some consumers need more than one input. Daily margin needs both staged orders and staged refunds, so its schedule combines the two assets with an ampersand, meaning it runs once both have new events. A vertical bar means either. Now look at the events behind one daily margin run. Orders for the first of March were staged just after midnight. Then, at ten past nine, someone reran the twenty-sixth of February, which also updated staged orders. Refunds for the first arrived at eleven. Events that arrive before the consumer starts are batched, so this single run was triggered by all three. If daily margin simply assumes yesterday, it computes the first of March and ignores the repaired day. If it recomputes everything, it may combine refunds for one day with orders for another. The fix is to carry identity with the event. The producer attaches the day to the event's extra field, and the consumer reads its triggering events and handles each day it was given. Then, as always, it checks that both inputs for that day are actually complete before using them. Next, other ways to connect DAGs.",
}
