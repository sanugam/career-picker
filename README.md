# CareerPicker

A smart, single-page web application that helps students discover career pathways based on their ATAR/GPA scores and interests.

## Overview

CareerPicker matches users with suitable careers by analyzing their academic scores, lifestyle goals, study preferences, and interests. The app features an intelligent scoring algorithm that ranks professions based on eligibility and personal fit.

## Features

- **Dual User Flows**
  - **Score-First**: Enter your score and discover eligible careers
  - **Job-First**: Pick your dream job and see if your score qualifies

- **Smart Matching**
  - Eligibility checking based on ATAR/GPA requirements
  - Lifestyle goal alignment (self, couple, family, growth)
  - Studies and interests matching
  - Advanced filtering (study duration, people/systems, desk/active, indoor/outdoor)

- **200+ Professions**
  - Curated database across Health, Tech, Business, Law, Science, Creative, and more
  - Detailed career information including requirements, pathways, and evidence
  - Salary bands and career progression insights

- **Reality Check**
  - Evaluate if your dream job is within reach
  - See exactly what's required to qualify
  - Alternative suggestions for similar careers

## Getting Started

### Running the Application

No installation required! Simply open the file in your browser:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

Or double-click `index.html` to open it in your default browser.

### How to Use

1. **Choose Your Path**
   - Start with your score to discover options, OR
   - Start with a specific profession to check eligibility

2. **Enter Your Details**
   - ATAR (0-100) or GPA (0-100) score
   - Lifestyle goal (affects salary preferences)
   - Studies and interests (optional, improves matching)

3. **Refine Results**
   - Search by profession name
   - Filter by study duration, work style, environment
   - Toggle advanced filters for precise matching

4. **Explore Careers**
   - View detailed career cards with requirements
   - Read "Why this career?" insights
   - Check "How to start" pathways
   - Review formal requirements and variations

## Technology Stack

- **Pure HTML/CSS/JavaScript** - No frameworks or build tools
- **Single-file architecture** - Everything in `index.html`
- **Vanilla JavaScript** - No external dependencies
- **Responsive design** - Works on desktop, tablet, and mobile

## Project Structure

```
career-shortlist/
├── .cursor/
│   └── mcp.json     # MCP server configuration for browser automation
├── index.html       # Complete application (HTML + CSS + JS)
├── CLAUDE.md        # Developer documentation and architecture guide
└── README.md        # This file
```

## For Developers

This project is built entirely in vanilla web technologies with no build process. All code lives in a single HTML file for simplicity.

### Key Components

- **State Management**: Global state object tracks user inputs and filters
- **Scoring Algorithm**: Multi-factor ranking system for career matching
- **Profession Database**: 200+ careers with detailed metadata
- **Dynamic Rendering**: Pure JavaScript DOM manipulation

### Development Workflow

1. Make changes to `index.html`
2. Refresh browser to see changes
3. No compilation or build step needed

For detailed architecture, code organization, and contribution guidelines, see [CLAUDE.md](CLAUDE.md).

### Browser Verification

After making UI changes, test in Chrome to verify:
- Visual rendering and layout
- Interactive functionality
- Console errors
- Responsive behavior

## Data Model

Each profession includes:
- Name and category
- Minimum ATAR/GPA requirements
- Study duration
- Work preferences (people/systems, desk/active, indoor/outdoor)
- Salary band
- Tags for matching
- Career insights and pathways

## Contributing

This is a personal project, but suggestions and improvements are welcome. Please ensure all changes:
- Maintain the single-file architecture
- Use vanilla JavaScript (no frameworks)
- Include proper documentation
- Test across different browsers

## License

Copyright © 2024-2026. All rights reserved.

## Support

For questions or issues, please refer to the [CLAUDE.md](CLAUDE.md) documentation or open an issue in the repository.
