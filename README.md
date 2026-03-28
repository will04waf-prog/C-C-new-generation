# C&C New Generation Home Improvement

A modern, animated marketing website for C&C New Generation — a professional home improvement company specializing in fencing, remodeling, masonry, painting, and ceramic tile work.

## Tech Stack

- **React 19** with TypeScript
- **Vite 6** for fast builds
- **Tailwind CSS 4** for styling
- **Motion (Framer Motion)** for animations
- **ElevenLabs** conversational AI widget
- **LeadConnector** webhook for contact form submissions

## Features

- Interactive 3D blueprint hero animation with mouse-tracking parallax
- Animated particle system (canvas-based, 3D projection)
- Portfolio gallery with lightbox — Fencing, Remodeling, Brickwork, Ceramic, Painting
- Contact form that submits leads via webhook
- ElevenLabs AI voice chat widget
- Fully responsive (mobile-first)

## Getting Started

**Prerequisites:** Node.js 18+

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment file and add your Gemini API key:
   ```bash
   cp .env.example .env.local
   ```
   Then set `GEMINI_API_KEY` in `.env.local`.

3. Run the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## Contact

Email: cconstruccion.23@gmail.com
