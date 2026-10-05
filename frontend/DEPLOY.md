# Deploying to Vercel (free tier)

All commands run from the `frontend/` folder.

## 1. MongoDB Atlas
1. Create a free **M0** cluster at <https://cloud.mongodb.com>.
2. **Database Access** → add a database user (username + password).
3. **Network Access** → **Add IP Address** → **Allow access from anywhere** (`0.0.0.0/0`). Vercel uses changing IPs, so this is required.
4. **Connect → Drivers** → copy the connection string and put the database name in it, e.g.
   `mongodb+srv://USER:PASS@cluster0.xxxxx.mongodb.net/fastpacker?retryWrites=true&w=majority`
   (URL-encode special characters in the password.)

## 2. Cloudinary
1. Create a free account at <https://cloudinary.com>.
2. Dashboard → **API Keys**: note the **Cloud name**, **API key** and **API secret**.

## 3. Gmail App Password (request emails)
1. Sign in to the Gmail account that will send the emails and turn on **2-Step Verification** (Google Account → Security).
2. Open <https://myaccount.google.com/apppasswords>, create an app password named e.g. "Fastpacker site", and copy the 16-character code (spaces don't matter).
3. Set `GMAIL_USER` to that Gmail address, `GMAIL_APP_PASSWORD` to the code, and `REQUEST_TO_EMAIL` to where you want to receive requests (can be the same address).

## 4. JWT secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 5. Environment variables
Copy `.env.example` to `.env.local` for local work, and add the same variables in
Vercel → Project → **Settings → Environment Variables**:

`MONGODB_URI`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `JWT_SECRET`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `REQUEST_TO_EMAIL`

## 6. Deploy
1. Push the repo to GitHub and **Import** it in Vercel.
2. Set **Root Directory** to `frontend`. Framework preset: Next.js.
3. Click **Deploy**.

## 7. Create the admin
There is no signup. Create (or reset) the admin in the database with (uses `MONGODB_URI` from `.env.local`):
```bash
npm run create-admin -- you@example.com "a-strong-password"
```
Running it again for the same email updates the password.

## 8. Add your content
The project ships with **no sample data**: until you add real records, the public pages show quiet "coming soon" empty states. Sign in at `/admin` and add your destinations and journeys. See `ADMIN_DATA_GUIDE.md` for what each section expects.

## 9. Use it
- Admin: `https://<your-domain>/admin` — sign in with the email and password from step 7. Change the password under **Password** in the admin header.
- Saving in the admin refreshes the public pages immediately; otherwise they refresh hourly.
- Brand, hero, gallery, testimonials, FAQs and SEO live in `src/data/site.ts`; contact details in `src/data/contact.ts`. Edit and redeploy.

## Booking and trip requests
- "Book this journey" (modal) and `/plan-trip` both POST to `/api/requests`: the request is saved to MongoDB, emailed to `REQUEST_TO_EMAIL` (reply-to is the customer), and the browser then opens WhatsApp with a summary.
- If the email fails the customer still sees success; check the Vercel function logs. Requests are always listed under **Requests** in the admin.
- Spam protection: a hidden honeypot field and a limit of 5 requests per IP per hour.
- Set the real WhatsApp number in `src/data/contact.ts` (`whatsappNumber`).

## Demo mode (local only)
Run the whole site and admin without MongoDB, Cloudinary or Gmail:

1. In `.env.local` set `DEMO_MODE=true` and leave `MONGODB_URI` unset.
2. Run `npm run dev`, then sign in at `/admin` with **demo@admin.local** / **demo1234** (shown in a banner on the login page and in the admin header).

What it does: an empty in-memory store (no sample data) that resets when the dev server restarts; full admin CRUD works against it and shows up on the public pages immediately; image upload accepts a picked file (kept as a small in-memory data URL) or a pasted URL; request emails are printed to the server console instead of sent, while the WhatsApp link still opens. Changing the password is disabled.

**Safety:** demo mode never activates when `NODE_ENV=production` (including `next start`) or when the `VERCEL` env var is set, and it switches off as soon as `MONGODB_URI` is set. In those cases `DEMO_MODE` is ignored with a console warning and the app behaves exactly as in production, so a leaked variable cannot open the admin. Do not add `DEMO_MODE` to Vercel. Restart the dev server after changing it.

## Notes
- If `MONGODB_URI` is missing or the DB is unreachable, public pages render their empty states (nothing is substituted) and the error is logged. The admin panel shows the error instead.
- All variables in `.env.local` are server-side only. Never prefix `MONGODB_URI` or any other secret with `NEXT_PUBLIC_`.
- Images are uploaded straight from the browser to Cloudinary; only URLs are stored in MongoDB.
