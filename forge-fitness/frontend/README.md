# Forge Fitness — Gym Website

A modern, conversion-focused gym/fitness website frontend built with React + Vite.

## Getting Started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
```

## Customizing for your gym

- **Text & copy**: edit the content directly inside each file in `src/sections/` and `src/components/` (e.g. gym name in `Navbar.jsx` / `Footer.jsx`, address & phone in `Contact.jsx`, plans in `Membership.jsx`).
- **Images**: every image URL lives in one place — `src/assets/images.js`. Swap any Unsplash placeholder URL for your own photo URL, or drop your images into `src/assets/images/` and import them there instead.
- **Colors & fonts**: all design tokens (colors, fonts, spacing) are defined as CSS variables at the top of `src/index.css` under `:root`. Change `--ember` to re-theme the accent color across the whole site.
- **WhatsApp / phone number**: update the `tel:` and `wa.me/` links in `src/sections/Contact.jsx` and `src/components/MobileActionBar.jsx`.
- **Google Map**: replace the embed URL in `src/sections/Contact.jsx`'s `<iframe>` with your gym's actual Google Maps embed link.

## Structure

```
src/
  assets/images.js     # all placeholder image URLs in one place
  components/          # Navbar, Footer, mobile action bar, shared icons
  sections/             # Hero, Programs, Membership, Testimonials, etc.
  App.jsx              # assembles all sections
  index.css            # design tokens + global styles
```

## Backend integration

This frontend now talks to a real backend (see `../backend`). All API calls live in `src/services/api.js`. Set `VITE_API_URL` in `.env` (copy from `.env.example`) to point at your running backend. If the backend isn't reachable, the display sections (Programs, Trainers, Membership, Testimonials) fall back to built-in placeholder content automatically — but the "Book Free Trial" / "Send a Message" forms in the Contact section require the backend to be running to actually submit.

See the top-level `../README.md` for full setup instructions covering both frontend and backend together.

## Notes

- Built with React 19 + Vite, plain CSS (no framework), and `lucide-react` for icons.
- Fully responsive with a mobile hamburger menu and a sticky Call / WhatsApp / Book Trial bar on small screens.
