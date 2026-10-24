# Yash Krushi Seva Kendra (यश कृषि सेवा केंद्र)

Production-ready storefront + admin portal for an agricultural inputs store — fertilizers, pesticides, seeds, and farm tools.

Built with **React 18 + Vite + Tailwind CSS + Lucide Icons**. Ships with a realistic mock dataset and a fully working admin CRUD backed by `localStorage`, so it runs immediately with zero backend setup — and is structured so a real backend (Supabase/Node) can be dropped in later (see "Going to a real backend" below).

## Quick Start

```bash
npm install
npm run dev       # http://localhost:5173
```

Build for production:

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

## Deploying

**Vercel:** import the repo, framework preset "Vite", build command `npm run build`, output dir `dist`. No env vars required for the mock-data version.

**Netlify:** build command `npm run build`, publish directory `dist`.

## Admin Portal

Visit `/#admin` (or click "Admin Login" in the header).

```
Username: admin
Password: yash@2026
```

> ⚠️ These are demo credentials hardcoded in `src/context/StoreContext.jsx` for the mock-data version. Replace with real authentication (Supabase Auth, NextAuth, JWT, etc.) before going to production with real inventory/pricing data.

Admin features:
- **Dashboard** — total products, low/out-of-stock alerts, daily inquiry count, total inventory value.
- **Inventory** — add/edit/delete products (image via URL), inline price editing, +/- stock toggles, search.
- **Inquiries & Orders** — every "Order via WhatsApp" click on the storefront logs an inquiry here; mark Pending → Fulfilled.

## Editing Store Details

Phone number, WhatsApp number, and address live in `src/context/StoreContext.jsx` under `STORE_INFO` — update these to your real store details before deploying.

## Project Structure

```
src/
  components/
    admin/            Admin portal (login, layout, dashboard, inventory, inquiries, product form)
    Header.jsx         Nav, search, category links, language switch, admin login
    ContactBar.jsx     Call / WhatsApp / location quick bar
    Hero.jsx           Seasonal banner + CTAs
    ProductCatalog.jsx Search + filter + grid orchestration
    Filters.jsx        Category / crop / brand filters
    ProductCard.jsx     Catalog card with stock badge
    ProductModal.jsx    Product detail modal + WhatsApp order
    StockBadge.jsx      In Stock / Low Stock / Out of Stock badge
    Advisory.jsx        Seasonal advisory & pest alert bulletin board
    Calculator.jsx      Fertilizer (N-P-K) requirement calculator
    Footer.jsx
  context/
    StoreContext.jsx    Products, inquiries, admin auth, CRUD, stats (localStorage-backed)
    LanguageContext.jsx English/Marathi toggle
  data/
    products.json       20 realistic Indian agri-input SKUs (fertilizers, pesticides, seeds, tools)
    advisories.json      Seasonal advisory/pest-alert bulletin entries
    cropNorms.json        N-P-K per-acre norms used by the calculator
    translations.js       EN/MR string dictionary
  utils/helpers.js       Currency formatting, WhatsApp link + message builders, stock-status logic
```

## Data Persistence (mock-data mode)

All product, stock, and inquiry data is seeded from `src/data/products.json` and then persisted to the browser's `localStorage` (`ykk_products_v1`, `ykk_inquiries_v1`) so admin edits survive page reloads. Use **"Reset Demo Data"** in the Inventory tab to restore the original seed catalog at any time.

## Going to a Real Backend (Supabase example)

The mock layer is isolated entirely inside `src/context/StoreContext.jsx`. To connect Supabase:

1. Create `products` and `inquiries` tables mirroring the shape in `src/data/products.json`.
2. Replace the `useState(() => loadFromStorage(...))` initializers with a `useEffect` that calls `supabase.from('products').select('*')`.
3. Replace `addProduct` / `updateProduct` / `deleteProduct` / `adjustStock` / `addInquiry` / `updateInquiryStatus` bodies with the equivalent `supabase.from(...).insert/update/delete` calls.
4. Swap the demo `login()` for `supabase.auth.signInWithPassword()`.

No other component needs to change — they all consume the context via `useStore()`.

## Design System

- **Primary:** Deep Forest Green `#166534` / `#15803d`
- **Accent:** Emerald `#059669`, Sun Yellow `#EAB308`
- **Background:** Mint off-white `#F0FDF4` with a subtle dot-grid texture
- **Type:** Fraunces (display/headings) + Manrope (body) + JetBrains Mono (labels/eyebrows)
- **Signature motif:** the "furrow divider" — a repeating dashed line styled like tilled soil rows, used to separate the hero from the page body.

## Notes on Content

- Product dosage, safety, and hazard information reflects commonly published label guidance for these product categories in India but **must be verified against the current CIB&RC-approved label** before being relied on for actual crop protection decisions. Update `src/data/products.json` with your verified, current label data before launch.
- Images are stock photography placeholders (Unsplash) — swap `image` / `gallery` URLs in the admin Inventory form (or directly in `products.json`) with real product photography.
