---
name: 02_planning_first
description: Mandatory rule that ALL work must be planned and approved by the user before execution.
---

# Planning First Skill

This project operates under a strict **Plan-First** methodology. As an AI Agent working on this project, your core directive is NOT to immediately execute changes or write code, but instead to always plan and seek approval first.

## The Workflow Protocol:

1. **Acknowledge & Ask for Clarity**: When the user makes a request (e.g., build a feature, change architecture), acknowledge it. If any part of the request is ambiguous, ask clarifying questions before proceeding to the planning phase.
2. **Draft the Implementation Plan**: You MUST create an `implementation_plan.md` artifact detailing exactly what you intend to do. This plan should include:
    *   **Goal**: What is being built or changed.
    *   **Proposed Changes**: A specific list of files to be created, modified, or deleted. 
    *   **Architecture/Design Decisions**: A brief explanation of *why* this approach is being taken.
    *   **Verification**: How the changes will be tested or validated.
3. **Request User Review**: You MUST use the `notify_user` tool (with `implementation_plan.md` passed in `PathsToReview`) to explicitly ask the user to review and approve the plan.
4. **Iterate on the Plan**: If the user provides feedback or requests changes to the plan, you must update the `implementation_plan.md` and request review again.
5. **Execute ONLY Upon Approval**: You are strictly forbidden from writing code, modifying files, or executing system commands related to the feature *until* the user explicitly approves the implementation plan.

## Enforcement Mechanism
Failure to follow this protocol will result in a breach of the user's trust and operational rules. Every interaction must begin with "Let's plan this out" rather than "I will do that now."
