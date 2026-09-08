# Forge Fitness — Full-Stack Gym Website

A complete gym/fitness website: a React + Vite frontend and an Express + MongoDB backend, wired together with a REST API.

```
forge-fitness/
  frontend/    React + Vite website (unchanged design — see previous build)
  backend/     Express + MongoDB REST API
```

## 1. Prerequisites

- **Node.js** 18+ and npm — https://nodejs.org
- **MongoDB** — either:
  - Installed locally (https://www.mongodb.com/try/download/community), or
  - A free MongoDB Atlas cluster (https://www.mongodb.com/cloud/atlas/register) — easier if you don't want to install anything locally.

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/forge-fitness
JWT_SECRET=some_long_random_string
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

- If you're running MongoDB locally, the default `MONGO_URI` above works as-is — just make sure MongoDB is running (`mongod`, or start it via your OS's service manager / MongoDB Compass).
- If you're using Atlas, copy the connection string it gives you (Database → Connect → Drivers) and paste it as `MONGO_URI` — it looks like `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/forge-fitness`.
- `JWT_SECRET` can be any long random string — for example, generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.

**Seed the database** with sample memberships, trainers, programs, testimonials, and an admin login:

```bash
npm run seed
```

This prints the admin email/password it created (default `admin@forgefitness.in` / `ChangeMe123!` unless you set `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` in `.env` first). Change this password before using it anywhere real.

**Start the API:**

```bash
npm run dev
```

You should see:

```
MongoDB connected: <host>
Forge Fitness API listening on http://localhost:5000
```

Visit `http://localhost:5000/` in a browser — you should see `{"success":true,"message":"Forge Fitness API is running"}`.

## 3. Frontend setup

In a new terminal:

```bash
cd frontend
npm install
cp .env.example .env
```

`.env` just needs:

```
VITE_API_URL=http://localhost:5000/api
```

**Start the site:**

```bash
npm run dev
```

Open the printed URL (usually `http://localhost:5173`). Programs, trainers, membership plans and testimonials now load from MongoDB through the API. The "Book Free Trial" and "Send a Message" forms in the Contact section save directly to the database.

> If the backend isn't running, the site still works — it falls back to built-in placeholder content for the display sections, but the forms will show an error until the backend is reachable.

## 4. Admin Dashboard

Once both servers are running, go to:

```
http://localhost:5173/admin
```

Log in with the admin credentials printed by `npm run seed` (default `admin@forgefitness.in` / `ChangeMe123!`).

**Leads:**
- Overview stats (total trial bookings, new leads, total contact messages)
- Every free trial booking — name, phone, email, program, preferred date/time, message, submitted date — with a status dropdown (`new` → `contacted` → `converted`/`cancelled`) and delete
- Contact form messages, with delete

**Content management** — full add/edit/delete for:
- Memberships (name, price, duration, features, "Most Popular" flag, description)
- Trainers (name, specialization, experience, image URL, bio)
- Programs (name, category, image URL, description)
- Testimonials (name, rating, avatar URL, message)

Changes here show up on the public site immediately (it reads the same `GET` endpoints).

**Settings tab:** change your own password while logged in (needs your current password).

**Forgot password:** click "Forgot your password?" on the login screen, enter your email, and a reset link is generated. Since no SMTP is configured by default, the backend **prints the reset link straight to its terminal** instead of failing — look for a block like:

```
--- EMAIL NOT CONFIGURED — printing message instead ---
To: admin@forgefitness.in
Subject: Reset your Forge Fitness admin password
You requested a password reset. Click this link ... http://localhost:5173/admin/reset-password?token=...
```

Copy that link into your browser to set a new password. To send real emails instead (e.g. for a live deployment), fill in `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM` in `backend/.env` — Gmail works well with an [App Password](https://myaccount.google.com/apppasswords). Reset links expire after 30 minutes.

This whole admin area is a plain client-side part of the same Vite app, routed by URL path (`/admin`, `/admin/forgot-password`, `/admin/reset-password`) — no extra build step, no router library, and it reuses `src/services/api.js` for every call.

## 5. Trying it end-to-end

1. With both servers running, go to the **Contact** section and submit "Book Free Trial" — you should see a success message.
2. Check it saved: log in as admin and call the protected trial list endpoint, or just check MongoDB directly (e.g. with MongoDB Compass, or `mongosh forge-fitness` then `db.trials.find().pretty()`).
3. Log in as admin to get a token:
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@forgefitness.in","password":"ChangeMe123!"}'
   ```
4. Use the returned `token` to call protected routes, e.g.:
   ```bash
   curl http://localhost:5000/api/trials -H "Authorization: Bearer <token>"
   curl http://localhost:5000/api/admin/stats -H "Authorization: Bearer <token>"
   ```

## 6. API reference

| Method | Route | Access | Purpose |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Admin login → JWT |
| GET | `/api/auth/me` | Admin | Current admin profile |
| PUT | `/api/auth/change-password` | Admin | Change password (needs current password) |
| POST | `/api/auth/forgot-password` | Public | Request a password reset link |
| PUT | `/api/auth/reset-password/:token` | Public | Set a new password using a valid reset token |
| GET | `/api/memberships` | Public | List membership plans |
| POST/PUT/DELETE | `/api/memberships[/:id]` | Admin | Manage plans |
| GET | `/api/trainers`, `/api/trainers/:id` | Public | List / get trainers |
| POST/PUT/DELETE | `/api/trainers[/:id]` | Admin | Manage trainers |
| GET | `/api/programs` | Public | List programs |
| POST/PUT/DELETE | `/api/programs[/:id]` | Admin | Manage programs |
| GET | `/api/testimonials` | Public | List testimonials |
| POST/PUT/DELETE | `/api/testimonials[/:id]` | Admin | Manage testimonials |
| POST | `/api/trials` | Public | Submit a free trial booking |
| GET | `/api/trials` | Admin | List trial bookings (`?status=new` to filter) |
| PUT | `/api/trials/:id/status` | Admin | Update a booking's status |
| DELETE | `/api/trials/:id` | Admin | Delete a booking |
| POST | `/api/contact` | Public | Submit a contact message |
| GET | `/api/contact` | Admin | List contact messages |
| DELETE | `/api/contact/:id` | Admin | Delete a contact message |
| GET | `/api/admin/stats` | Admin | Dashboard counts |

All admin routes require an `Authorization: Bearer <token>` header from `/api/auth/login`.

## 7. What was NOT built

- The admin dashboard covers leads (trial bookings + contact messages) and full content management (memberships, trainers, programs, testimonials) — but there's no rich image upload; image fields are plain URL text inputs (paste a link to an already-hosted image). Adding real file uploads would need a storage service (e.g. Cloudinary, S3) wired in separately.
- No public user registration — only a single seeded admin account. There's also no UI for creating a *second* admin account — that would need to be added to the User model/routes if multiple gym staff need separate logins.
- WhatsApp/Call buttons stay pure `wa.me` / `tel:` links (no backend involved), as specified — edit the numbers directly in `frontend/src/sections/Contact.jsx` and `frontend/src/components/MobileActionBar.jsx`.

## 8. Deploying

- Backend: any Node host (Render, Railway, Fly.io, etc.) + MongoDB Atlas. Set the same env vars there.
- Frontend: any static host (Vercel, Netlify) after `npm run build` in `frontend/`. Set `VITE_API_URL` to your deployed backend's URL before building.
- Update `CLIENT_URL` in the backend `.env` to your deployed frontend's URL so CORS allows it.
