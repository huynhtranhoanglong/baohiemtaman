# Tam An Insurance (Bảo hiểm Tâm An) - Knowledge Base & Requirements

*This file serves as the Single Source of Truth (SSOT) for all project goals, requirements, constraints, and contextual information. Any AI assistant or agent working on this project MUST read and understand this document before proposing solutions or making changes.*

## 1. Project Overview
**Tam An Insurance** (project iterations: BBH 01, BBH 02, etc.) aims to sell compulsory and voluntary motorcycle insurance in Vietnam through targeted Facebook Ads. The system will initially focus on a primary sales funnel driving traffic to a custom Landing Page, collecting user data, and facilitating order fulfillment. The target vehicles include: motorcycles over 50cc, motorcycles under 50cc, and electric motorcycles. Customers can purchase compulsory insurance independently, or as a combo with voluntary insurance.

## 2. Core Business Logic & Goals
- **Product & Pricing**:
  - **Motorcycles over 50cc**: Compulsory (66k/1yr, 132k/2yrs, 198k/3yrs). Compulsory + Voluntary combo (86k/1yr, 172k/2yrs, 258k/3yrs).
  - **Motorcycles under 50cc**: Compulsory (60.5k/1yr, 121k/2yrs, 181.5k/3yrs). Compulsory + Voluntary combo (80.5k/1yr, 161k/2yrs, 241.5k/3yrs).
  - **Electric motorcycles**: Compulsory (60.5k/1yr, 121k/2yrs, 181.5k/3yrs). Compulsory + Voluntary combo (80.5k/1yr, 161k/2yrs, 241.5k/3yrs).
- **Insurance Provider / Partner**: Global Care (intermediary) distributing policies from 4 specific providers: MIC, DBV Insurance, PVI Insurance, and TechcomInsurance. Customers can choose any of these 4 providers when purchasing. See `INSURANCE_PROVIDERS.md` for details on each partner.
- **Unit Economics**: Commission varies depending on the specific product and chosen insurance provider, ranging from 25,000 VND to 50,000 VND per unit. The core optimization metric is to keep Customer Acquisition Cost (CAC / CPA) below this varied commission margin.
- **Target Audience**: Young demographic (familiar with online payments) with interests related to traffic laws, motorcycles, and related topics. The targeting strategy will heavily involve A/B testing different interests to optimize Conversion Rate (CR) and Cost Per Action (CPA).
- **Fulfillment**: The administrator logs into the Global Care app to input collected customer details. The Global Care system automatically handles sending the payment email and Final E-certificate to the customer, while recording commission for the Admin.

## 3. Technical Scope & Customer Funnel
**Phase 1 Software Scope**: Build a high-converting Landing Page deployed on **Vercel** with a custom domain (`baohiemtaman.com`). Form submissions from the landing page will be synced directly to a **Google Sheet** for data management. We will use **Next.js (App Router)** for the frontend and **Vercel Serverless Functions (Next.js API Routes)** integrated with the **Google Sheets API** for the backend. The design of this Landing Page will be based on the principles laid out in `UI_UX_GUIDELINES.md` (Momo app flow), **but the final UI/UX design is currently NOT finalized and is subject to further discussion.**

**Customer Funnel (Phase 1):**
1. User clicks Facebook Ad.
2. User lands on the Landing Page (needs to be highly persuasive with clear information).
3. User fills out an order form on the Landing Page. The form has two flows:
    - **Has license plate**: Required fields are License Plate, Chassis Number, Engine Number, Vehicle Owner's Full Name, Phone Number, Email, and Address. Optional: VAT invoice request.
    - **No license plate**: Required fields are the same as above, but License Plate is NOT required.
4. Data is collected and sent to the administrator.
5. Admin manually inputs the customer data into the Global Care app to create an order.
6. System Automation: The Global Care system takes over, automatically sending an email containing payment information to the customer.
7. Customer completes payment based on the instructions in the email.
8. System Automation: The Global Care system automatically sends the final E-certificate (insurance certificate) to the customer's email and records the commission for the Admin. This concludes the fulfillment process.

## 4. Workflows & Specific Rules
- **Language**: All documentation, including this Knowledge Base, Skills, Workflows, plans, and communication with the user MUST be written in **Vietnamese**. This supersedes any previous rules requiring English documentation.
- **Anti-Hallucination (No Assumptions)**: Before capturing knowledge or making updates, the agent MUST explicitly ask the user for any missing, necessary context. The agent is strictly prohibited from inventing or assuming details ("hallucinating") to fill in gaps.
- **Active Knowledge Capture**: ONLY AFTER all necessary context is gathered and clear, the agent MUST proactively update this `PROJECT_KNOWLEDGE_BASE.md` whenever the user makes a decision, changes a requirement, or adds a constraint during conversations. 
- **Plan-First Execution**: The agent is STRICTLY PROHIBITED from executing changes or writing code immediately. For every request, the agent MUST first create an `implementation_plan.md` artifact and request user approval before proceeding to the execution phase.

---
**Changelog / History:**
- Created initial knowledge base structure.
- Added rules for English documentation, active knowledge capture, and Plan-First execution workflow.
- Added explicit Anti-Hallucination rule requiring prompt clarification of ambiguous/missing details before any KB updates.
- Updated Sections 1, 2, and 3 with the core business model, Global Care/DBV partnership details, the Facebook Ads -> LP -> Manual fulfillment funnel, and scoped Phase 1 to building the Landing Page.
- Updated KB with extensive new details mapping product pricing to vehicle categories, updated fulfillment logic (Global Care system automation), variable commissions, and new form fields for different plate registration flows.
- Updated project name to "Tam An Insurance" and added backend/infrastructure requirements (Vercel deployment, baohiemtaman.com custom domain, and Google Sheets integration).
