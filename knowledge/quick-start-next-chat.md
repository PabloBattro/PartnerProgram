# PartnerProgram - Quick Start for New Chats

Use this file when starting a fresh chat so the assistant has project context immediately.

## 1) Fast workflow (recommended)

1. Open this file and `project-context-summary-2026-02-13.md`.
2. In a new chat, paste the template from section 2.
3. Add your specific request at the end (for example: "Implement Payoneer visual refactor now").

## 2) Copy/paste template for a new chat

```text
You are helping me on the PartnerProgram project in this workspace.

Before coding, read:
- PartnerProgram/knowledge/project-context-summary-2026-02-13.md
- PartnerProgram/knowledge/quick-start-next-chat.md

Rules:
- Do not restart architecture decisions unless I ask.
- Continue from the current codebase state.
- Keep changes minimal and production-minded.
- After edits, run lint checks for touched files.

My request:
[PASTE YOUR REQUEST HERE]
```

## 3) Request templates

### A) Continue implementation

```text
Continue implementation from current state.
Focus only on: [feature].
Files likely involved: [file paths if known].
Please make edits directly and then summarize what changed.
```

### B) UI pass

```text
Do a focused UI pass for brand consistency.
Keep layout/content intact unless required.
Target components: [list].
Match the existing Payoneer visual direction already discussed.
```

### C) Review mode

```text
Do a code review only (no implementation yet).
Prioritize bugs, regressions, security, and missing validation/tests.
Give findings by severity and file.
```

## 4) How to keep this current

- After each major milestone, ask:
  - "Update `knowledge/project-context-summary-2026-02-13.md` with what we just changed."
- If scope changes a lot, create a new dated summary file and keep old ones for history.


