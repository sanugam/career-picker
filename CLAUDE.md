# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CareerPicker is a single-page web application that helps users discover career pathways based on their ATAR/GPA scores and interests. The application is built entirely in vanilla HTML, CSS, and JavaScript with no build system or external dependencies.

## Maintaining This Documentation

**IMPORTANT**: After making significant architectural changes or major modifications to the codebase, you MUST update this CLAUDE.md file to reflect the changes.

**Update CLAUDE.md when:**
- File structure or line number references change significantly
- New key functions or modules are added
- Architecture or state management patterns change
- Data models are modified (profession structure, state object, etc.)
- New development workflows or commands are introduced
- Significant refactoring affects multiple sections of code
- New features change user flows or core functionality

**What to update:**
- Line number references in code location comments
- Function names and their purposes
- File structure documentation
- Architecture diagrams or descriptions
- Code examples that reference changed APIs
- Development command instructions

**Keep the documentation accurate and helpful for future Claude sessions working on this codebase.**

## Development Commands

### Running the Application
```bash
# Open the application in your default browser (macOS)
open index.html

# Or on Linux
xdg-open index.html
```

There is no build process, bundler, or package manager. Simply open `index.html` in a web browser.

### Browser Verification with Chrome DevTools MCP
**CRITICAL**: After EVERY UI change (HTML, CSS, or JavaScript modification), you MUST verify the changes using the Chrome DevTools MCP server. Visual and interactive changes cannot be validated through code review alone.

**MCP Server Configuration:**
This project uses the Chrome DevTools MCP server for browser automation. The configuration is located at `.cursor/mcp.json` and provides access to Chrome DevTools capabilities.

**Available Tools via MCP:**
- `chrome_navigate`: Navigate to URLs (including local file:// paths)
- `chrome_screenshot`: Capture screenshots of the current page
- `chrome_click`: Click elements by selector
- `chrome_fill`: Fill form inputs
- `chrome_evaluate`: Execute JavaScript in the page context
- `chrome_console`: Read console logs and errors

**Automated Verification Process:**
1. Navigate to `file://$(pwd)/index.html` using `chrome_navigate`
2. Capture screenshots using `chrome_screenshot` to verify visual rendering
3. Use `chrome_console` to monitor JavaScript errors
4. Test interactive elements using `chrome_click` and `chrome_fill`
5. Verify responsive behavior using `chrome_screenshot` at different viewport sizes

**Required Actions After Each UI Change:**
- Navigate to the local index.html file
- Capture screenshot(s) of the affected area(s)
- Check browser console for errors or warnings using `chrome_console`
- Test any interactive elements that were modified
- Verify layout at key breakpoints (desktop: 1920x1080, tablet: 768x1024, mobile: 375x667)

**Verification Checklist:**
- [ ] Page loads successfully without errors
- [ ] Layout and styling render correctly (verify via screenshot)
- [ ] Interactive elements function as expected
- [ ] No JavaScript console errors or warnings (check via chrome_console)
- [ ] Responsive behavior works at different viewport sizes

**You MUST complete this verification and report findings to the user before considering any UI change complete.**

**Note:** The Chrome DevTools MCP server requires Node.js/npx to be installed and will automatically launch a Chrome instance when invoked. After configuration changes, restart Cursor for the MCP server to become available.

## MCP Configuration

This project includes a Model Context Protocol (MCP) server configuration for browser automation during development.

### Chrome DevTools MCP Server

**Configuration File:** `.cursor/mcp.json`

The project is configured with the Chrome DevTools MCP server, which provides programmatic access to Chrome browser capabilities. This enables automated testing and verification of UI changes without manual browser interaction.

**Server Details:**
- **Server Name:** `chrome-devtools`
- **Package:** `chrome-devtools-mcp@latest` (via npx)
- **Flags:** `--headless --isolated`
  - `--headless`: Runs Chrome without a visible window (useful for automated testing)
  - `--isolated`: Uses a separate Chrome profile to avoid interfering with personal browsing

**Available MCP Tools:**
When the MCP server is active, the following tools become available:
- Navigation and page interaction
- Screenshot capture
- Console log monitoring
- JavaScript execution in page context
- Element interaction (click, fill, etc.)

**Usage:**
The MCP server is automatically loaded when you open this project in Cursor. After making UI changes to index.html, use the MCP tools to verify the changes in Chrome.

**Requirements:**
- Node.js and npx must be installed
- Cursor IDE (or compatible MCP client)
- Chrome browser installed on the system

## Architecture

### File Structure
The entire application is contained in a single file: [index.html](index.html)

**Structure within index.html:**
- Lines 1-1350: Embedded CSS styles
- Lines 1351-2074: JavaScript utility functions and UI render logic
- Lines 1678-1920: `BASE` - curated professions with detailed metadata
- Lines 1921-2074: `CATEGORY_SEEDS` - profession templates for generating variants
- Lines 2075-2180: `buildProfessionList()` - generates 200+ professions from BASE + variants
- Lines 2183-2300: `SUBJECTS_LIST` - studies/interests data for matching
- Lines 3800+: HTML structure and DOM elements

### State Management
Global state object (line 1353):
```javascript
const state = {
  mode: null,                  // "ATAR" | "GPA"
  intent: null,                // "score-first" | "job-first"
  score: 0,
  salary: "couple",            // "self" | "couple" | "family" | "growth"
  selectedProfession: null,    // profession object
  studiesAndInterests: [],     // array of subject IDs
  filters: { study, ps, da, io },
  showAdvancedFilters: false,
  contextMerged: false
};
```

### Two User Flows

**Flow A (Score-First):**
1. User enters ATAR/GPA score
2. System generates ranked list of eligible professions
3. User can refine by profession, lifestyle goal, and filters
4. Optional: merge by adding a dream job to evaluate

**Flow B (Job-First):**
1. User selects a specific profession from dropdown
2. User enters their ATAR/GPA score
3. System evaluates eligibility with "reality check"
4. Shows whether score meets requirements

### Profession Data Model
Each profession object has:
- `name`: Display name
- `cat`: Category (Health, Tech, Business, Law, etc.)
- `minATAR`, `minGPA`: Minimum score requirements
- `study`: Duration ("0-1" | "2-3" | "4+")
- `ps`: People/Systems preference ("people" | "systems" | "any")
- `da`: Desk/Active ("desk" | "active" | "any")
- `io`: Indoor/Outdoor ("indoor" | "outdoor" | "any")
- `salary`: Band ("low" | "mid" | "high" | "elite")
- `tags`: Array of keywords
- `why`: Reasons to consider this career
- `start`: How to get started
- `evidence`: Formal requirements, rules, variations

### Scoring Algorithm (line 2282)
The `scoreProfession()` function ranks professions using:
1. **Eligibility check** (50 points if score meets requirements)
2. **Salary bias** (0-12 points based on lifestyle goal match)
3. **Studies match** (0-15 points for matching subjects)
4. **Search term match** (0-10 points for text similarity)
5. **Filters match** (penalties for mismatched filters)

Higher scores = better match. Results are sorted by score descending.

## Key Functions

### Rendering Functions
- `renderIntentFork()` (line 1395): Shows score-first vs job-first decision
- `renderSearchRow()` (line 1464): Renders input fields based on flow
- `renderResults()` (line 2394): Displays ranked profession cards
- `renderCard()` (line 2437): Generates individual profession card HTML

### Search & Filtering
- `runSearch(scrollToResults)` (line 2888): Main search orchestrator
- `buildShortlist()` (line 2343): Filters + scores + sorts professions
- `passesFilters(p)` (line 2246): Checks profession against active filters
- `isEligibleByScore(p)` (line 2240): Score requirement check

### Data Processing
- `buildProfessionList()` (line 2075): Generates profession database from BASE + variants
- `attachDefaults(p)` (line 2160): Normalizes profession objects
- `scoreProfession(p)` (line 2282): Calculates match score

## Adding New Professions

### Option 1: Add to BASE array (line 1678)
For detailed, curated professions with complete metadata:
```javascript
{
  name: "Profession Name",
  cat: "Category",
  minATAR: 70.0,
  minGPA: 65,
  study: "2-3",
  ps: "people",
  da: "desk",
  io: "indoor",
  salary: "mid",
  tags: ["tag1", "tag2", "tag3"],
  why: ["Reason 1", "Reason 2"],
  start: ["Step 1", "Step 2"],
  evidence: {
    formal: ["..."],
    rule: ["..."],
    varies: ["..."]
  }
}
```

### Option 2: Add to CATEGORY_SEEDS array (line 1921)
For professions that should generate variants (Assistant, Coordinator, Officer, Specialist, Senior):
```javascript
["Profession Name", "Category", minATAR, "study", "ps", "da", "io", "salary", ["tag1", "tag2"]]
```

This will automatically generate 5 variants with adjusted requirements.

## Modifying Styles

All CSS is embedded in `<style>` tags starting at line 7. Key CSS variables (line 8-28):
- `--brand`, `--brand2`: Primary blue colors
- `--accent`, `--accent2`: Booking.com yellow highlights
- `--bg`, `--card`: Background colors
- `--shadow`, `--shadow-hover`: Drop shadows

## Common Tasks

### Adjusting Score Requirements
Modify `minATAR` and `minGPA` values in BASE or CATEGORY_SEEDS arrays.

### Changing Salary Bias Weights
Edit `salaryBiasPoints()` function (line 1382).

### Adding New Subjects
Add to `SUBJECTS_LIST` array (line 2183) with:
```javascript
{
  id: "unique-id",
  name: "Display Name",
  categories: ["Health", "Science"],
  tags: ["tag1", "tag2"]
}
```

### Modifying Filters
State filters are in `state.filters` (line 1360). Filter logic is in `passesFilters()` (line 2246).

## Debugging Tips

1. **Check browser console** for JavaScript errors
2. **State inspection**: Add `console.log(state)` to see current state
3. **Scoring debug**: Add `console.log(score, p.name)` in `scoreProfession()` to see match scores
4. **Search issues**: Check `buildShortlist()` (line 2343) for filtering logic

## Git Workflow
This repository uses git. Current branch: `main`

### Automatic Commit Hook
**IMPORTANT**: This project benefits from a user-level hook that automatically commits changes after each Claude Code turn.

**Hook Configuration:**
The hook is configured at the user level in Claude Code settings, applying to all git repositories. This ensures all changes are automatically committed with descriptive commit messages after each Claude Code interaction.

**Hook Setup (User-Level):**
Configure the hook in your user-level Claude Code settings. The exact location depends on your installation:
- CLI: `~/.config/claude-code/settings.json`
- VSCode Extension: User Settings → Claude Code → Hooks

Add or update the `afterTurn` hook:

```json
{
  "hooks": {
    "afterTurn": "git add -A && git diff --cached --quiet || git commit -m \"Auto-commit: Changes from Claude Code turn $(date +%Y-%m-%d_%H:%M:%S)\n\nCo-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>\""
  }
}
```

**What this hook does:**
1. Stages all changes in the current repository (`git add -A`)
2. Checks if there are staged changes (`git diff --cached --quiet`)
3. If changes exist, commits them with a timestamped message
4. Includes co-authorship attribution to Claude

**Benefits:**
- Automatic version control after each interaction across all projects
- Complete audit trail of all changes
- Easy rollback if needed
- No manual commit management required

**Note**: This user-level hook runs automatically after each Claude Code turn in any git repository, so you don't need to manually commit changes.
