# Jira

Conventions for how we use Jira for software project tickets — Epics, Tasks, and Subtasks — beyond the branch name,
PR title, and commit message conventions already covered in [AGENTS.md](../AGENTS.md#branching) (see also
[Commit Messages](../AGENTS.md#commit-messages)). For Jira Product Discovery conventions, see
[JIRA-PRODUCT-DISCOVERY.md](JIRA-PRODUCT-DISCOVERY.md).

## Creating tickets

### Where work lives

See the table in [README.md](../README.md#jira) for which Jira software projects we currently use and what each
covers. That list will grow, so the conventions below aren't tied to any one project's key.

Epics group related Tasks and Subtasks. Link commits, branches, and PRs to the specific Task or Subtask a change
addresses, not just its Epic, per [AGENTS.md](../AGENTS.md#branching).

### Epic template

Use this structure for an Epic's description. It should read at a higher level than a Task — someone who hasn't
opened any of its child Tasks should still understand the initiative:

```markdown
## What we're doing

[The initiative as a whole, and the pieces it breaks into, in the order they land. Leave implementation detail to each child Task's own description.]

## Why we're doing it

[The problem or opportunity that justifies doing this at all.]

## What success looks like

- [Outcomes that hold once every child Task is done — not a restatement of the Tasks themselves.]
```

### Scoping child tickets

When breaking an Epic into child Tasks, size each one so it ships safely on its own:

- **One Task, one PR.** If landing a Task takes more than one PR, it's scoped too broadly — split it into separate
  Tasks before you start.
- **One Task, one app, function, or library.** Scope a Task to a single app, function, or library — the same units
  used for commit scopes in [AGENTS.md](../AGENTS.md#commit-messages). A change that crosses those boundaries is
  multiple Tasks, one per area.
- **Never break the codebase.** Every commit and PR should leave `main` working, so any of them can be reverted on
  its own. If a Task can't land safely in one shot — e.g. a breaking API change with callers elsewhere in the repo —
  split it into safely-iterable steps (new path in, callers migrated, old path out) instead of one unsafe cutover.

Write each Task's description using the **Task template**, below.

### Delivering an Epic as a stack

When an agent delivers an Epic's child Tasks as a `gh stack` (one branch/PR per Task, in dependency order), implement
each Task in its own subagent rather than one subagent working through the whole stack — this keeps each subagent's
context focused on a single Task's ticket description and files, instead of accumulating the full epic's context
across every layer. Run these subagents **sequentially, not in parallel**: stacked branches share one working tree,
so the next Task's branch depends on the previous one's commit already existing. After each subagent commits, rebase
the stack (`gh stack rebase --no-trunk` is enough if nothing has been pushed yet) before checking out the next
branch — creating all stack branches with a single `gh stack init` does not chain their commits automatically, so
skipping this leaves upper branches missing the lower branches' work until an explicit rebase.

### Task template

Use this structure for a Task's description, scoped to exactly what this one ticket covers in the single app,
function, or library it touches — see **Scoping child tickets**, above:

```markdown
## What we're doing

[The concrete change to make in this component — what's added, changed, or removed.]

## Why we're doing it

[The problem or motivation — what's missing or broken without this.]

## What success looks like

- [Observable criteria that tell you this ticket is actually done.]
```

Link to the Epic or related Tasks for context that belongs to them instead of repeating it here.

## Keeping status accurate

Tickets move through three statuses: To Do, In Progress, Done.

- Move a ticket to **In Progress** when you start actively working on it, not when it's created or assigned to you.
  When a batch of tickets is queued up together — e.g. one PR per child Task in a stack delivering an Epic —
  transition each child only as work on its own branch begins, not all of them up front when the batch starts. Doing
  them all at once makes an Epic's real progress unreadable: it looks fully in review when only the first few
  Tasks have any code behind them.
- Move a ticket to **Done** when the work has shipped — merged to `main` (and deployed, if applicable) — not when a
  PR is opened or approved. Transition it as you finish the change, not as an afterthought.
- If you stop working on a ticket before it's done (blocked, reprioritized, etc.), move it back to **To Do** rather
  than leaving it in In Progress. In Progress should reflect what's actually being worked on right now, not a
  history of everything ever started.

### Epic status

Epic status is the one we've let go stale the most, so treat it as its own checklist item, not a side effect of
updating the child Task:

- An Epic moves to **In Progress** once its first child Task starts, and stays In Progress as long as any child Task
  is open.
- If the Epic delivers a Jira Product Discovery Idea (its summary or description references a `PCPD-*` key, or the
  Idea's own description links to this Epic), transition that Idea to **Delivery** in the same sitting — see
  [Idea status](JIRA-PRODUCT-DISCOVERY.md#idea-status). It's easy to update the Epic and forget the Idea sits one
  level further up; check for one explicitly rather than assuming there isn't one.
- Don't mark an Epic **Done** until every child Task under it is Done — check the child list, don't assume.
- When you close out the last open Task under an Epic, transition the Epic itself in the same sitting. It's easy to
  update the Task and walk away without circling back.

## Keeping ticket content accurate

- If scope changes while you're implementing a ticket, update its description or acceptance criteria to match what
  actually shipped. Don't leave stale requirements in place once the implementation has deviated from them — the
  next reader (including an agent) should be able to trust the ticket describes real behavior.
- If a ticket is blocked, say so in a comment: what it's blocked on, and by what.
- If work on a ticket is abandoned rather than completed, say so in a comment explaining why, rather than leaving it
  to sit silently in an early or in-progress status.
