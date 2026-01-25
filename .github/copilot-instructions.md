# CareerPicker Project Instructions

## Project Overview
Single-page career exploration tool built as a monolithic HTML file (~2300 lines) with embedded CSS and vanilla JavaScript. No build process, frameworks, or dependencies—direct browser execution.

## Architecture

### Structure
- **One file, three sections**: HTML structure → CSS (`<style>`) → JavaScript (`<script>`)
- **State-driven UI**: Single global `state` object drives all UI updates (intent, mode, score, filters, selected profession)
- **Dual-intent flow**: 
  - **Score-first**: User enters ATAR/GPA → see matching careers
  - **Job-first**: User searches career → evaluate if achievable with their score

### Key Components
- **Intent fork** ([index.html](index.html#L1001-1038)): Dynamic entry paths that adapt based on existing state
  - Shows both cards initially (neither score nor job selected)
  - Hides score-first card if mode already selected
  - Hides job-first card if profession already selected
  - Auto-advances to results if both exist
- **Mode modal** ([index.html](index.html#L950-1050)): ATAR vs GPA selection overlay
- **Search row** ([index.html](index.html#L1010-1200)): Dynamic grid that rebuilds based on `state.intent`
- **Profession dropdown** ([index.html](index.html#L1650-1750)): Filterable typeahead with keyboard navigation
- **Results cards** ([index.html](index.html#L1850-2100)): Expandable career listings with scoring logic

### Data Model
Hardcoded `PROFESSIONS` array (~220 careers) at [index.html](index.html#L1120-1600):
```javascript
{name, cat, minATAR, minGPA, study, ps, da, io, salary,
 tags[], why[], start[], evidence{formal[], rule[], varies[]}}
```

## Critical Patterns

### State Management
All UI derived from:
```javascript
state = {
  mode: "ATAR"|"GPA",
  score: Number,
  intent: "score-first"|"job-first",
  selectedProfession: Object|null,
  filters: {study, ps, da, io},
  salary: "single"|"couple"
}
```
**Never** mutate DOM directly—update `state`, then call `renderSearchRow()` or `runSearch()`.

### Dynamic Rendering
When `state.intent` changes, `renderSearchRow()` rebuilds `.searchGrid` HTML and re-attaches all event listeners. This is intentional—keeps flow logic isolated.

`renderIntentFork()` dynamically shows/hides intent cards based on existing state:
- Neither mode nor job → Show both cards
- Has mode, no job → Show only "dream job" card
- Has job, no mode → Show only "know my score" card  
- Has both → Skip straight to results

### Scoring Logic
- Convert GPA↔ATAR: `convertScore(val, from, to)` ([index.html](index.html#L950-970))
- Tax calculation: `calcTax(gross, state)` uses 2024 AU brackets ([index.html](index.html#L980-1000))
- Match %: `Math.max(0, 100 - Math.abs(userScore - minScore) * 2)` ([index.html](index.html#L1750))

## Development Workflow

### Testing
1. Open [index.html](index.html) directly in browser (no server needed)
2. Use browser DevTools console to inspect `state` object
3. Test both flows: Click "Know my score" vs "Know my dream job"

### Common Tasks
- **Add career**: Append to `PROFESSIONS` array with all required fields
- **Adjust cutoffs**: Modify `minATAR`/`minGPA` in profession objects
- **Change styling**: Edit CSS variables in `:root` ([index.html](index.html#L8-28))
- **Update filters**: Modify `setFilter()` and filter pill rendering ([index.html](index.html#L1400-1450))

### Debugging
- Missing event handlers? Check if element exists before attaching (dynamic rendering issue)
- Wrong scores? Verify `state.mode` matches input format (ATAR has decimals, GPA doesn't)
- Dropdown broken? Ensure `renderDropList()` called after `openDrop()`

## Style Conventions

### CSS
- **Booking.com-inspired design**: Gold accents (`--accent: #ffb400`), blue gradients, elevated shadows
- **No classes for state**: Use `.classList.add('open')`, `.classList.add('selected')`
- **Mobile-first grid**: `.searchGrid` uses `grid-template-columns` with responsive sizing

### JavaScript
- **No semicolons** in most places (existing pattern)
- **Minimal abstractions**: Direct DOM manipulation via `$('id')` helper
- **Comments mark sections**: `// ---------- Section Name ----------`

## External Dependencies
**None**. No npm, no CDN imports. Pure HTML/CSS/JS.

## Files
- [index.html](index.html): Production file (use this)
- [index.html.backup](index.html.backup): Previous version
- [index.txt](index.txt): Alternative/older version with different styling
- [README.md](README.md): Minimal project name only

## Don't
- ❌ Split into separate files (defeats single-file architecture)
- ❌ Add frameworks (React, Vue, etc.)
- ❌ Use build tools or transpilers
- ❌ Create abstraction layers over the global state
- ❌ Assume elements exist at load time (many are dynamically created)
