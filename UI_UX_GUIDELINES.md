# UI & UX GUIDELINES: TAM AN INSURANCE LANDING PAGE

## 1. TECHNICAL SPECS (OVERALL)
- **Model:** Mobile-constrained Web App (Aspect ratio 9:19.5). Max-width container of 450px.
- **Color System:**
  - Primary: `#0253af` (Tam An dark blue, used for Headers, Buttons, Active Steps, Links).
  - Background: `#f4f5f7` (Global page background).
  - Surface: `#ffffff` (Background for Cards/Containers).
  - Text: `#1a1a1a` (Titles/Headings), `#4b5563` (Sub-content/Secondary text).
- **Visual Style:** 
  - Consistent Border-radius of `12px`.
  - Soft Box-shadow: `0 4px 6px -1px rgb(0 0 0 / 0.1)`.

## 2. COMPONENT DETAILS BY FLOW

### A. Header & Progress Bar (Sticky Top)
- **Header:** Title "Bảo hiểm Xe máy bắt buộc" (Font size: 18px, Bold).
- **Progress Bar:** 3 numbered circular indicators connected by a thin horizontal line. The active step has a solid filled circle with `#0253af`.

### B. Step 1: Input Form Home (Reference: IMG_1299, 1300, 1301)
- **Section 1: Hero Card**
  - Illustration placeholder at the top.
  - Below is the "Quyền lợi chi trả" (Coverage Benefits) Card: Title + Shield Icon + 3-line list of benefits + ">" button to open the sub-page modal.
- **Section 2: Input Form**
  - **Vehicle Type Chips:** 3 adjacent selectable buttons. The active button has a `#0253af` border and light pink/blue background.
  - **Inputs:** Floating label style (label floats over the border) or situated right above the input box. Gap between fields is `16px`.
- **Section 3: Insurer Selection**
  - 2-column Grid layout. Each cell is a white Card with the insurer's Logo in the middle and the name below.
  - **Active State:** Bold `#0253af` border (2px) with a checkmark icon in the top-right corner.

### C. Step 2: Confirmation Screen
- **Interface:** Summary displayed as a "Property Pair List" (Label on the left - Bolder Value on the right).
- Grouped into 3 main information blocks separated by light horizontal dividers.

### D. Step 3: Success State (Completion)
- **UI Card:** Large white card with rounded corners, centered on the screen.
- **Content:** Fireworks or large green checkmark icon at the top. "Thank You" text and Email notification message highlighted in bold `#0253af`.
- **Action:** Primary button "Mua cho xe khác" (Buy for another vehicle).

## 3. MODALS & SUB-PAGES (INTERACTIONS)

### 3.1. Benefit Summary Page (Reference: IMG_1303)
- **Signature UI:** 2-column comparison table (Third Party vs. Vehicle Owner).
- Uses a green circular icon with a white checkmark (Covered) and a red circular icon with a white X (Not Covered).
- **Accordion (Exclusions):** Bold title, clicking expands to a bulleted list, evenly left-aligned.

### 3.2. Guide Modal (Reference: IMG_1305)
- **UI Slider:** A rectangular container holding images of vehicle registration cards (new/old), with left/right buttons or swipe functionality.
- Pagination dots below the image showing the current slide position.
- At the bottom: FAQ list (Questions & Answers).

## 4. AI AGENT LOGIC RULES
- **Sticky Footer:** The total price bar and action button must always stick to the bottom and never be covered by scrollable content.
- **State Logic:**
  - When clicking "Mua cho xe khác" (Buy for another vehicle): Clear the fields `OwnerName`, `Address`, `VehiclePlate`, and `EngineNumber`.
  - Retain the fields: `UserEmail`, `UserPhone`.
- **Validation:** 
  - License Plate input automatically converts to UPPERCASE.
  - Phone number input only accepts digits.
