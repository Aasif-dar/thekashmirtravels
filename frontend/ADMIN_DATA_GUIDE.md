# Admin data guide

What each part of the public website expects from the backend / admin, and what
it shows when that data doesn't exist yet.

**Destinations and Journeys contain no sample data**: they come only from
MongoDB and show a quiet empty state until real records are added.
**Experiences, Testimonials, Gallery and FAQs currently show temporary fictional
content** from `src/data/addData.ts` (marked `TEMPORARY UI DATA`) until real
data replaces it. Delete that file and point those fields at real data (or `[]`
to show the empty states below) when you're ready.

How to read the tables: **Field** is the name used in the code today.
**Your suggested name** maps it to the wording in your brief, and `—` marks a
field you suggested that does **not exist yet** (adding one needs a change to the
model, the zod schema, the admin form and the page that displays it). Values in
the "Hint" column are examples of what to enter — they are not stored anywhere
in the site.

Where things live:

| Content | Today | Edited in |
|---|---|---|
| Destinations, Journeys | MongoDB (`destinations`, `journeys`) | `/admin` |
| Booking / trip requests | MongoDB (`requests`) | `/admin/requests` (read-only + delete) |
| Admin account | MongoDB (`admins`) | `npm run create-admin -- <email> <password>` |
| Experiences, Testimonials, Gallery, Site settings, Contact details | Static TypeScript in `src/data/` | Code, then redeploy |
| Images | Admin uploads → Cloudinary (URL stored). Built-in site photos → `public/images/kashmir/` | `/admin` / repo |

Lists are ordered by creation date (oldest first). There is **no `published`
flag** and **no `sortOrder`** yet: a saved record is public immediately, and
order can't be changed except by recreating records. Both are worth adding.

---

## 1. Destinations

Shown on: home page (featured ones only, or all if none are featured; the first 4 fill the large grid, extras
below), `/destinations`, and `/destinations/[slug]`.
Empty state: **"No destinations available yet."**

| Field | Your suggested name | Required | Hint |
|---|---|---|---|
| `title` | name | yes | "Srinagar" |
| `slug` | slug | yes | `srinagar` — lowercase letters, numbers, hyphens; used in the URL; unique |
| `tagline` | shortDescription | no | "The cultural heart of Kashmir." (shown on cards, as the eyebrow on the destinations page) |
| `description` | description | no | Long text. Separate paragraphs with a blank line |
| `coverImage` {`src`,`alt`} | heroImage | yes | Card image on the home page. Upload one image and add alt text |
| `galleryImages` [{`src`,`alt`}] | galleryImages | no | The **first** gallery image is the large photo on `/destinations`; the rest appear as a grid on the detail page |
| `country`, `region` | location | no | "India" / "Kashmir" |
| `highlights` [string] | activities | no | One per line: "Sunrise shikara ride on Dal Lake" |
| `featured` | featured | no | Yes → shown on the home page. If none are featured the home page shows all |
| — | bestTimeToVisit | — | not implemented |
| — | recommendedDuration | — | not implemented |
| — | published | — | not implemented (see note above) |
| — | sortOrder | — | not implemented |

## 2. Journeys (tour packages)

Shown on: home page (featured ones only, or all if none are featured), `/journeys`, `/journeys/[slug]`, and on a
destination's page when the journey links to it. Each has a **Book this journey**
button.
Empty state: **"Our journeys are being prepared."**

| Field | Your suggested name | Required | Hint |
|---|---|---|---|
| `title` | title | yes | |
| `slug` | slug | yes | unique, URL-safe |
| `description` | shortDescription / description | no | One text field, used as the summary on cards and the detail page |
| `duration` | duration | no | "5 Nights / 6 Days" |
| `price` | startingPrice | no | Number, INR per person. **Leave empty to show "Price on request"** |
| `forWhom` | — | no | One line: who it suits |
| `destinations` [slug] | destinations | no | Tick the linked destinations. The order ticked is the route order shown on the card ("A · B · C") |
| `coverImage` | coverImage | yes | Card image |
| `heroImage` | — | no | Large banner on the detail page; falls back to the cover |
| `images` | galleryImages | no | Grid on the detail page |
| `itinerary` [day] | itinerary | no | See below |
| `inclusions` [string] | inclusions | no | One per line |
| `exclusions` [string] | exclusions | no | One per line |
| `goodToKnow` [string] | goodToKnow | no | One per line |
| `featured` | featured | no | Yes → shown on the home page |
| — | published, sortOrder | — | not implemented |

### Itinerary days (ordered array on each journey)

Rendered in array order as the timeline on the journey page.

| Field | Your suggested name | Hint |
|---|---|---|
| `day` | day | "Day 01" (free text, so the label is up to you) |
| `title` | title | "Arrival in Srinagar" |
| `description` | description | "Airport pickup and transfer to your stay." |
| `location` | location | "Srinagar" |
| `stay` | accommodation | "Hotel or houseboat" — shown as "Stay — …" |
| — | activities, meals, image, sortOrder | not implemented (order = position in the list) |

## 3. Experiences

Shown on: home page and `/experiences`. **Not in the database yet** — the list is
`experiences` in `src/data/experiences.ts`, currently filled with temporary
content from `addData.ts`.
Empty state (when the list is `[]`): **"New experiences are coming soon."**

| Field in code | Your suggested name | Hint |
|---|---|---|
| `title` | title | |
| `description` | shortDescription | One or two sentences |
| `image` {`src`,`alt`,`location`} | image | A photo from `public/images/kashmir/` (see `src/data/images.ts`) |
| — | slug, description (long), galleryImages, location, category, featured, published, sortOrder | not implemented. Suggested categories: Nature, Culture, Food, Adventure, Heritage, Local Life |

To manage these from the admin you would add an `Experience` model + API + admin
pages, mirroring Destinations.

## 4. Testimonials

Shown on: home page. **Not in the database yet** — `testimonials` in
`src/data/site.ts`, currently filled with temporary fictional content from
`addData.ts`.
Empty state (when the list is `[]`): **"Traveler stories will appear here."**

| Field in code | Your suggested name | Hint |
|---|---|---|
| `quote` | review | The customer's words |
| `name` | customerName | |
| `location` | customerLocation | City |
| — | rating, customerImage, published, sortOrder | not implemented |

Only add testimonials from real customers who agreed to be quoted.

## 5. Gallery

Shown on: home page. **Not in the database yet** — `site.gallery.photos` in
`src/data/site.ts`, a list of images from `src/data/images.ts` (the site's own
Kashmir photographs). It currently points at the 12 temporary photos in
`addData.ts` (these reuse existing local images). If that list is emptied the section shows
**"Gallery coming soon."**

| Field in code | Your suggested name | Hint |
|---|---|---|
| `image.src` | image | Local path under `public/images/kashmir/` |
| `image.alt` | altText | Describe the photo |
| `image.location` | location | Shown on hover |
| — | title, category, published, sortOrder | not implemented |

## 6. Booking and trip requests

Created by the public forms ("Book this journey" modal and `/plan-trip`) via
`POST /api/requests`; saved to MongoDB, emailed to `REQUEST_TO_EMAIL`, then the
visitor is sent to WhatsApp with a summary. Listed in `/admin/requests`
(newest first, with a **Details** toggle, and a delete button). Nothing is
displayed to the public.

| Field | Your suggested name | Notes |
|---|---|---|
| `name` | name | |
| `email` | email | Used as the email reply-to |
| `phone` | phone | |
| `travelDate` (booking) / `travelDates` (custom) | travelDate | Booking: a date. Custom: free text, e.g. "Early April" |
| `travellers` | numberOfTravelers | 1–50 |
| `destinations` [{slug,title}] (custom) | destination | Multi-select |
| `journey` {slug,title,duration,price} (booking) | journey | Looked up on the server from the journey the visitor picked |
| `notes` | message | |
| `tripLength`, `budget` (custom) | — | Extra fields on the custom-trip form |
| `type` | — | `booking` or `custom` |
| `status` | status | Stored as `new` / `contacted` / `closed`. **Your list** (New, Contacted, In Progress, Confirmed, Completed, Cancelled) would need the enum changed in `src/models/Request.ts` and an admin control to change it — today `status` is stored but not editable in the admin |
| `createdAt` | createdAt | |
| `emailSent`, `ipHash` | — | Internal: whether the owner email went out; hashed IP used for the rate limit (5 per hour) |

## 7. Site settings and contact details

**Static today** — `src/data/site.ts` and `src/data/contact.ts`. Not editable in
the admin. The contact values in the repo are **placeholders** (the phone is
`+91 00000 00000` and the WhatsApp number is `910000000000`), so replace them
before launch — every WhatsApp button uses `contact.whatsappNumber`.

| Setting | Your suggested name | Where |
|---|---|---|
| Brand name | websiteName | `site.brandName` |
| Logo | logo | `site.logo` (text today; optional image) |
| Tagline | tagline | `site.tagline` |
| Hero headline / text / image | heroTitle, heroDescription | `site.hero` |
| SEO title / description / keywords / share image | SEO title, SEO description | `site.seo` |
| Phone | phone | `contact.phone` |
| WhatsApp | WhatsApp | `contact.whatsappNumber` (digits only, country code first) |
| Email | email | `contact.email` |
| Address | address | `contact.address`, `contact.location` |
| Instagram | Instagram | `contact.instagram`, `contact.instagramUrl` |
| Facebook | Facebook | `contact.facebookUrl` |
| Google Maps | Google Maps | `contact.mapsUrl` |
| Favicon | favicon | `src/app/favicon.ico` |
| FAQs | — | `site.faqs` (temporary content from `addData.ts`; no page displays it yet) |

Currently displayed: brand name, hero, intro, footer text, `email`, `location`,
Instagram and the WhatsApp links. `phone`, `address`, `facebookUrl` and `mapsUrl`
are defined but no component shows them yet.

---

## Images

- **Admin uploads** go to Cloudinary; only the URL is stored in MongoDB. This is why
  `res.cloudinary.com` stays in the `images.remotePatterns` of `next.config.ts` —
  removing it would break every image you upload.
- **Built-in site photos** (hero, about, gallery, experiences) are local files in
  `public/images/kashmir/`, registered in `src/data/images.ts`.
- Always fill in alt text; it is used for accessibility and SEO.
