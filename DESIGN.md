# Nicholas Method 81 — Design System Specification

## Brand Identity & Overview
- **Product Name**: Nicholas Method 81
- **Domain**: Mining Engineering / Rock Mechanics & Method Selection (Nicholas 1981 Methodology)
- **Aesthetic**: Technical, precise, utilitarian, and clean industrial mining aesthetic. High contrast, warm earthen and mineral undertones with distinct visual hierarchy.

## Color Palette (Tailwind CSS v4 Tokens)
Defined in `src/styles/index.css`:
- **Primary Accent**: `#a4cf82` (Olive/Lime Mineral Green — used for primary actions, badges, top scores)
- **Secondary Accent**: `#f0e76f` (Pale Sulphur Yellow — highlights, secondary indicators)
- **Tertiary Accent**: `#ecb65f` (Ochre Gold — borders, intermediate indicators, scrollbar)
- **Quaternary Accent**: `#e89951` (Terracotta / Earth Orange — warnings, underground alerts)
- **Background**: `#fbfdfa` (Off-white / Alabaster Light)
- **Text Primary**: `#0e0701` (Deep Charcoal / Pitch Black)
- **Border**: `#ecb65f`

## Typography Guidelines
- **Display & Headlines (`font-boldonse`)**: Boldonse (Display typography for H1, H2, brand title, and major section dividers).
- **Data & Numbers (`font-mono`)**: JetBrains Mono (Exclusively for scoring tables, inputs, RMR/RQD/UCS values, rank numbers, NM-0x badges).
- **Interface & Body (`font-prompt`)**: Prompt (Clean sans-serif for labels, explanations, navigation, and chat responses).

## Layout & Components
1. **Header / Navigation**: Fixed minimal floating bar with status indicator, quick actions, and documentation anchor.
2. **Hero Section**: Parallax geological layer illustration with prominent titular text (`font-boldonse`).
3. **Nicholas Calculator**:
   - Parameter inputs: Dropdowns and numeric steppers with clear unit indicators.
   - Live Score Matrix: Deterministic ranking list with progress bars, visual badges, and score breakdowns.
4. **AI Assistant Drawer**: Slide-over panel connecting to Gemini for technical reasoning and geotechnical commentary.
