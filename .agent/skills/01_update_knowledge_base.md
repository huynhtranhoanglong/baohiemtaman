---
name: 01_update_knowledge_base
description: Mandatory instruction for continuously updating the project knowledge base during brainstorming and development.
---

# Knowledge Base Updating Skill

As an AI Agent working on this project, your core responsibility alongside writing code or answering questions is to maintain the project's memory. The user will frequently brainstorm, refine ideas, and make decisions in natural language (often in Vietnamese or English).

## Required Actions During Conversations:

1. **Active Listening & Capture**: Whenever the user confirms an idea, makes a decision, changes a requirement, or adds new constraints, you MUST recognize this as a state change in the project.
2. **Anti-Hallucination Check**: Before updating the knowledge base, IF the user's input is incomplete, vague, or missing necessary details to form a complete understanding, you MUST explicitly ask the user to clarify or provide the missing context. DO NOT invent or assume information ("hallucinate") to fill the gaps.
3. **Immediate Update**: Once the context is fully clear, you MUST proactively use your file editing tools (like `replace_file_content` or `write_to_file`) to update `PROJECT_KNOWLEDGE_BASE.md` (and any other relevant architecture/design documents) to reflect the new truth.
4. **Use English for Documentation**: Regardless of the language the user speaks to you in (e.g., Vietnamese), ALL updates written to the `PROJECT_KNOWLEDGE_BASE.md` and related context files MUST be in **English**. 
5. **Maintain the Changelog**: Every time you update the `PROJECT_KNOWLEDGE_BASE.md`, you MUST append a brief, timestamped note to the "Changelog / History" section at the bottom of the file detailing what was changed.
6. **Acknowledge the Update**: After successfully updating the files, explicitly tell the user that the knowledge base has been updated with their latest ideas.

## Why this is critical:
Future agents (or future sessions of yourself) rely ENTIRELY on `PROJECT_KNOWLEDGE_BASE.md` as the Single Source of Truth to understand the project. If you fail to capture a decision here, that knowledge will be lost when this specific conversation ends.
