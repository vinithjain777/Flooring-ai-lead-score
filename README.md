# Gufy — Free Leads Health Check

A free lead health scoring quiz for flooring contractors to evaluate their pipeline quality.

## Features

- **7-Question Quiz**: Comprehensive assessment of lead generation, response speed, follow-up, retargeting, reviews, tracking, and pipeline consistency
- **Dynamic Scoring**: Weighted scoring system (0-100) with category breakdown
- **Personalized Insights**: AI-driven recommendations based on quiz responses
- **Lead Capture**: Integrated Calendly booking form for strategy calls
- **Dark Mode**: Automatic light/dark theme with user toggle
- **Mobile Responsive**: Optimized for all device sizes

## Quick Start

1. Clone the repository:

```bash
git clone https://github.com/vinithjain777/Flooring-ai-lead-score.git
cd Flooring-ai-lead-score
```

2. Open `index.html` in a browser or deploy to Vercel:

```bash
npm install -g vercel
vercel
```

## Deployment to Vercel

### Option 1: GitHub Integration (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Import Git Repository
4. Select your repository
5. Click "Deploy"

### Option 2: Vercel CLI

```bash
npm install -g vercel
cd your-project-directory
vercel
```

### Option 3: Direct Upload

1. Go to [vercel.com/new](https://vercel.com/new)
2. Drag and drop this folder or upload files
3. Click "Deploy"

## Configuration

**Calendly Integration:**
Update the Calendly URL in the JavaScript code:

```javascript
const calendlyUrl = "https://calendly.com/YOUR-USERNAME/strategy-call";
```

**Environment Variables:**
Create a `.env.local` file if using any external APIs:

```
VITE_CALENDLY_URL=https://calendly.com/your-username/strategy-call
```

## File Structure

```
.
├── index.html          # Main quiz application
├── vercel.json         # Vercel configuration
├── package.json        # Project metadata
├── .vercelignore       # Files to ignore during deployment
└── README.md           # This file
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance

- **Zero external dependencies** — Pure HTML/CSS/JavaScript
- **Instant load time** — Static asset delivery via Vercel CDN
- **100% Lighthouse score ready**

## Customization

### Update Branding

Edit the logo, colors, and company name in:

- CSS variables (`:root` section)
- HTML content (nav, hero section, footer)

### Modify Quiz Questions

Edit the question panels in the HTML (Q1–Q7 sections)

### Adjust Scoring Logic

Modify the `categories` array and `insights` object in the JavaScript

## License

MIT
