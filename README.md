# Stamp Card — Customer App

The customer-facing web app for Stamp Card, a digital loyalty card for small shops. A customer scans the shop's QR code, fills in a short form and adds the loyalty pass to their phone's wallet.

Built with React and Vite. It talks to the [stampcard-backend](https://github.com/Kontogiannis-dev/stampcard-backend) API. Staff use a separate app: [stampcard-owner](https://github.com/Kontogiannis-dev/stampcard-owner).

## How it works

1. **Onboarding** (`/onboard/:shopId`): the customer enters first name, last name and phone number. The backend creates the card, or returns the existing one if that phone number already joined.
2. **Wallet** (`/wallet/:identifier`): the customer taps **Add to Wallet** to install the pass. The pass QR contains only the card identifier, which the cashier scans to add stamps.

## Quick start

You need Node.js and the backend running. The backend README explains how to start it with one command (`docker compose up`).

```bash
git clone https://github.com/Kontogiannis-dev/stampcard-frontend.git
cd stampcard-frontend
npm install
npm run dev
```

Open http://localhost:5174/onboard/1 (the demo shop has id 1).

Without any configuration, the app expects the backend at `http://localhost:8000` and serves over plain HTTP.

## Configuration

Copy `.env.example` to `.env` to change the defaults. Every variable is optional.

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Backend base URL. Defaults to `http://localhost:8000` |
| `CERT_PATH`, `KEY_PATH` | Paths to a local HTTPS certificate and key (for example from mkcert). When unset, the dev server uses plain HTTP |

Without Google credentials, the backend runs its wallet in mock mode, so **Add to Wallet** returns a placeholder link instead of a real pass.

## Project structure

```
src/main.jsx      -> routes
src/Onboard.jsx   -> onboarding form
src/Wallet.jsx    -> "Add to Wallet" screen
src/config.js     -> API base URL
src/App.css       -> shared styles
```

## Known limitations

- The shop id comes from the URL, and only one shop is seeded in the backend.
- No Apple Wallet yet (it needs a paid Apple Developer account).