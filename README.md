# StreamBTW

Live HD streaming for PPV and sporting events — membership plans, auth, Stripe billing, and an admin dashboard.

Built with **Next.js 14**, **NextAuth**, **MongoDB**, **Stripe**, and **Tailwind CSS**.

## Screenshots

### Home
![StreamBTW home](docs/screenshots/home.jpg)

### Sign in
![StreamBTW login](docs/screenshots/login.jpg)

### Sign up
![StreamBTW signup](docs/screenshots/signup.jpg)

### Features section
![StreamBTW features](docs/screenshots/features.jpg)

### Stripe — membership plans
![StreamBTW Stripe plans](docs/screenshots/stripe-plans.jpg)

### Stripe — packages (admin)
![StreamBTW Stripe packages](docs/screenshots/stripe-packages.jpg)

### Stripe — balance (admin)
![StreamBTW Stripe balance](docs/screenshots/stripe-balance.jpg)

### Stripe — transactions (admin)
![StreamBTW Stripe transactions](docs/screenshots/stripe-transactions.jpg)

## Features

- Public landing page with live-sports branding
- Email/password auth via NextAuth (credentials)
- Membership / subscription checkout with Stripe
- Member schedule and media player views
- Admin dashboard (users, packages, leagues, teams, games, channels, transactions)

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14 (Pages Router) |
| UI | React 18, Tailwind CSS |
| Auth | NextAuth.js |
| Database | MongoDB + Mongoose |
| Payments | Stripe |
| Bot protection | Google reCAPTCHA |

## Getting started

### Prerequisites

- Node.js 18+
- A MongoDB database (Atlas or local)
- Stripe account (test keys are fine for local)
- reCAPTCHA keys (optional for some flows)

### Setup

```bash
git clone https://github.com/umeraamir69/Smester-Project-.git
cd Smester-Project-
cp .env.example .env
# fill in values in .env
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.example` to `.env` and set at least:

- `MONGODB_URI` — Mongo connection string
- `AUTH_SECRET` / `JWT_SECRET_KEY` — random secrets for sessions/JWT
- `NEXTAUTH_URL` — `http://localhost:3000` locally
- `STRIPE_PUBLISHABLE_KEY` / `STRIPE_SECRET_KEY` — Stripe keys
- `RECAPTCHA_SITE_KEY` / `RECAPTCHA_SECRET_KEY` — if using captcha

Never commit `.env`. It is gitignored.

### Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # run production build
npm run lint     # ESLint
```

## Project layout

```
components/          # UI (home, auth, dashboard)
src/pages/           # Routes + API handlers
  auth/              # Login, create account
  dashboard/         # Admin panels
  api/               # Auth, Stripe, CRUD APIs
public/images/       # Static assets
docs/screenshots/    # README screenshots
```

## Security note

This repository was previously tracking a real `.env`. That file is no longer in the tree. **Rotate every secret that was ever committed** (Stripe, MongoDB, JWT, NextAuth, reCAPTCHA) before using this project in production.

## License

Private / academic semester project unless otherwise stated.
