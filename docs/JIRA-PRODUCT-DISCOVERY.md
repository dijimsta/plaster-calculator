# Jira Product Discovery (JPD)

Conventions for how we use Jira Product Discovery (JPD) for Ideas. For software project (Epic/Task) conventions, see
[JIRA.md](JIRA.md).

## Creating ideas

### Where work lives

See the table in [README.md](../README.md#jira) for which Jira Product Discovery projects we currently use and what
each covers. Ideas link out to the software project epic that delivers them, once scoped — see
[Scoping child tickets](JIRA.md#scoping-child-tickets) for how that epic gets broken down.

### Idea template

Use this structure for an Idea's description. "What we're doing" is the full product spec — the business
requirements and design, written by whoever scopes the idea (typically a designer or PM) without needing to know how
delivery will eventually be broken down. It should be detailed enough that whoever later scopes delivery can derive
the epic and its Tasks from it directly:

```markdown
## What we're doing

[The full spec: what the feature does, screens and states it covers, and how it behaves. Include a description of the design — which Claude Design file, and what it covers — not just a link to it.]

## Why we're doing it

[The problem this solves and who has it — the evidence, not just an assertion.]

## What success looks like

- [Observable outcomes that tell you the idea achieved its intent.]
```

An Idea usually needs more room than a Task to explain scope — add an `### Out of scope` subsection under "What
we're doing" for anything you considered and explicitly decided not to include.

## Idea status

Ideas move through six statuses, tracking a feature from raw capture through to a proven outcome:

- **Parking lot** — captured, but nobody is actively researching or building it. The resting state for anything not
  currently being worked; anything deprioritized moves back here rather than sitting in a later status.
- **Discovery** — actively researching the idea: talking to users, checking feasibility, scoping a solution.
  Nothing has been committed to a software project yet. Starting a design in
  [Claude Design](https://claude.ai/design) for the idea counts as starting Discovery — move the status at the same
  time you start the design file, not after it's finished.
- **Ready for delivery** — discovery is done and the idea is scoped enough to build, but delivery hasn't started.
  Move here only once both of the following are true, checked explicitly rather than assumed:
    - **Design ready** — the Claude Design file covers every screen and state the spec calls for, not just the happy
      path.
    - **Spec ready** — "What we're doing" is the full product spec described in **Idea template**, above, detailed
      enough for whoever scopes delivery to derive the epic and its Tasks from it directly.
- **Delivery** — the delivery epic exists and is being built. Move the Idea here when the epic moves In Progress,
  and link the epic key in the Idea's description.
- **Impact** — the build has shipped, and we're watching whether it achieved what the Idea set out to do.
- **Done** — impact has been measured or otherwise confirmed, and the idea is fully closed out.

RICE estimates get filled in during Discovery — see **Prioritizing ideas**, below.

The drift we've hit most often: an Idea left in **Delivery** after its delivery epic is already Done. When you close
out an epic, check whether it has a parent Idea and move that too.

## Prioritizing ideas

Every Idea should carry a RICE estimate so ideas can be compared on the same basis:

- **Reach** — how many customers, or how much of the business, this touches over a fixed period.
- **Impact** — how much it moves the goal per person reached.
- **Confidence** — how sure we are about the Reach and Impact numbers.
- **Effort** — the person-time it will take to deliver.

RICE score = (Reach × Impact × Confidence) ÷ Effort. Estimate all four during Discovery, before moving an Idea to
Ready for delivery, and revise them if new information changes the picture.

## Keeping ticket content accurate

Same principles as software project tickets — see
[Keeping ticket content accurate](JIRA.md#keeping-ticket-content-accurate) in JIRA.md.
