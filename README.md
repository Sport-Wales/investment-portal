

# Sport Wales Investment Portal

A React-based portal streamlining Sport Wales' partner investment process. Built with Vite, React, and Tailwind CSS, following Sport Wales Brand Guidelines (SWBG).

## Overview

The Investment Portal transforms Sport Wales' partner investment process from a manual, multi-system workflow into a unified digital platform. It enables:
- Role-based authentication (Staff/Partner access)
- Customized dashboards for different user types
- Digital management of partner applications
- Capability framework assessment and tracking
- Quarterly accountability monitoring
- Staff evaluation and assessment tools
- Bilingual accessibility (English/Welsh)
- Progress tracking and reporting

## Key Features

### Authentication & Access
- Role-based login system:
  - Staff access via standard login
  - Partner access via unique URL tokens (e.g., `/sw?v=TOKEN`)
- Secure authentication flow
- Session management
- Dynamic header based on user role

### Dashboards
- Staff Dashboard:
  - Overview of all partners
  - Risk assessment indicators
  - Meeting requests tracking
  - Partner activity monitoring
  - Action items and notifications

- Partner Dashboard:
  - Progress overview
  - Task completion status
  - Upcoming deadlines
  - Meeting schedule
  - Document status

## Investment Process Workflow

### Partner Journey
1. Organisation Details
   - Basic organisation information
   - Contact details
   - Document submissions

2. Capability Framework
   - Five core principles assessment
   - Evidence upload functionality
   - Status tracking (Met/Not Met/Help Needed)
   - Supporting documentation

3. Accountability Management
   - Quarterly progress logs
   - Financial information
   - Progress tracking
   - Supporting evidence

4. Final Steps
   - Review submission
   - Sign-off process
   - Offer letter acceptance

### Staff Journey
1. Application Review
   - Partner submission review
   - Assessment input
   - Progress monitoring

2. Evaluation Process
   - Framework assessment review
   - Recommendations input
   - Conditions setting

3. Sign-off and Approval
   - Final review
   - Offer generation
   - Partner communication

## Quick Start

### Prerequisites
- Node.js installed (v18 or higher)
- npm (comes with Node.js)
- Git for version control

### Setup Steps

1. Create a new Vite project:
```bash
npm create vite@latest investment-portal -- --template react
cd investment-portal
```

2. Install dependencies:
```bash
npm install react-router-dom @headlessui/react lucide-react @fortawesome/fontawesome-free
npm install -D tailwindcss postcss autoprefixer
```

3. Initialise Tailwind CSS:
```bash
npx tailwindcss init -p
```

## Project Structure

```
investment-portal/
├── public/              # Static assets
│   └── favicon.svg
├── src/
│   ├── components/     
│   │   ├── forms/
│   │   │   └── InvestmentForm/
│   │   │       ├── tasks/           # Task components
│   │   │       ├── shared/          # Shared components
│   │   │       └── validation/      # Validation logic
│   │   ├── main/                    # Layout components
│   │   └── ui/                      # UI components
│   ├── context/                     # Form context
│   ├── data/                        # Static data
│   ├── pages/                       # Page components
│   ├── styles/                      # Global styles
│   └── utils/                       # Helper functions
├── index.html          
├── package.json        
├── vite.config.js      
├── postcss.config.js   
├── tailwind.config.js  
└── README.md          
```

### Key Components

#### 1. InvestmentForm
Main form component handling:
- Multi-step form progression
- Task state management
- Form validation
- Progress tracking

#### 2. Task Components
Individual task components for:
- Organisation Details
- Capability Framework
- Accountability Log
- Financial Information
- Evaluation Tools
- Sign-off Process

#### 3. Form Context
Global state management for:
- Form data
- Progress tracking
- Validation states
- Task navigation

## Configuration Files

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})
```

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sw-blue': '#164B64',
        'sw-red': '#E32434',
        'sw-green': '#299D91',
        'sw-yellow': '#F6B207'
      }
    },
  },
  plugins: [],
}
```

### package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Add to index.html
```html
<link 
  rel="stylesheet" 
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
/>
```

### Add to src/styles/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deployment

### Deploy to Netlify:

1. Update netlify.toml for Vite:
```toml
[build]
  command = "npm run build"
  publish = "dist"    # Vite uses 'dist' instead of 'build'

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Deploy options:
   - Connect your GitHub repository to Netlify for automatic deployments
   - Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy
```

## Features
- Vite for faster development
- React Router for navigation
- Tailwind CSS styling
- Lucide React icons
- HeadlessUI components
- Form context for state management
- Bilingual support
- Accessibility compliance

## License
This project is licensed under the MIT License.

## Support
For support, email [your-email] or raise an issue in the repository.

## Important Notes
- Vite uses `dist` instead of `build` for production builds
- Use `npm run dev` for development (not `npm start`)
- Environment variables must be prefixed with `VITE_`
- Ensure bilingual content is complete before deployment
- Follow Sport Wales brand guidelines for any style modifications