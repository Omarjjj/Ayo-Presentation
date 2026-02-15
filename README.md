# AYO Presentation

This is the presentation website for the AYO project.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open your browser at `http://localhost:5173`.

## Navigation

- **Space** or **Right Arrow**: Next slide
- **Left Arrow**: Previous slide
- **Demo Slide**: Use the interactive demo. Press Left Arrow to go back to the previous slide.

## Structure

- `src/components/Presentation.tsx`: Main presentation component handling navigation and layouts.
- `src/data/slides.tsx`: Content of the slides.
- `src/demo`: The integrated UI prototype (Demo App).
- `public/umlDiagrams`: Diagram images.
- `public/LogoVideos`: Video assets.

## Deploy to Vercel

1. **Connect the repo** to Vercel (e.g. [Omarjjj/Ayo-Presentation](https://github.com/Omarjjj/Ayo-Presentation)).
2. **Set Root Directory** (required if the repo root is not this folder):
   - Project → **Settings** → **General** → **Root Directory**
   - Click **Edit**, set to **`ayo-presentation`**, then **Save**.
3. **Build settings** (usually auto-detected for Vite):
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. **Redeploy** after saving. The `vercel.json` in this folder configures SPA rewrites so the app loads correctly.

If you still see **404 NOT FOUND**, confirm you’re using the exact deployment URL from the Vercel dashboard and that the latest deployment succeeded.

## Notes

- The presentation uses a dark theme with purple accents as requested.
- Diagrams are interactive or auto-advancing.
- The demo app is fully integrated at the end.
