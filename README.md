# CampusPrime 🎓

**India's WhatsApp-First School Management Platform**

> Manage fees, attendance, results & parent communication — no app download needed.

---

## 🚀 Quick Setup (15 minutes)

### 1. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com) → Create project `campusprime-XXXXX`
2. Enable **Authentication** → Email/Password + Google Sign-In
3. Enable **Firestore Database** → Start in production mode
4. Enable **Storage**
5. Copy your Firebase config → paste into `js/firebase-config.js`

### 2. Firestore Security Rules
1. In Firebase Console → Firestore → Rules tab
2. Copy the contents of `firestore.rules` and paste → Publish

### 3. Firestore Backups (CRITICAL — do this before going live)
1. Firebase Console → Firestore → Export/Import
2. Set up daily scheduled export to Cloud Storage
3. Or run: `gcloud firestore export gs://your-bucket-name --async`

### 4. Razorpay Setup
1. Create account at [razorpay.com](https://razorpay.com)
2. Get your API key from Dashboard → Settings → API Keys
3. Replace `rzp_live_XXXXXXXXXXXXXXXX` in `js/firebase-config.js`
4. Update WhatsApp number: replace `91XXXXXXXXXX` in `index.html` and `pages/dashboard.html`

### 5. Deploy to Vercel
1. Push this repo to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Add your custom domain `campusprime.in` in Vercel settings
4. Configure DNS in Hostinger to point to Vercel

### 6. Google Search Console
1. Verify ownership at [search.google.com/search-console](https://search.google.com/search-console)
2. Submit `https://campusprime.in/sitemap.xml`

---

## 📁 File Structure

```
campusprime/
├── index.html              ← Landing page (public)
├── sitemap.xml             ← SEO sitemap
├── robots.txt              ← SEO robots config
├── vercel.json             ← Vercel routing + security headers
├── firestore.rules         ← Firebase security rules (UPLOAD TO FIREBASE)
├── js/
│   └── firebase-config.js  ← Firebase + Razorpay config (EDIT THIS FIRST)
└── pages/
    ├── login.html          ← Login page
    ├── signup.html         ← Signup with 3-step wizard
    ├── dashboard.html      ← Full school admin dashboard
    └── privacy.html        ← Privacy Policy (DPDP Act 2023 compliant)
```

---

## ✅ Pre-Launch Checklist

### Security (do BEFORE going live)
- [ ] Upload `firestore.rules` to Firebase Console
- [ ] Enable Firestore scheduled backups
- [ ] Test: create 2 school accounts, verify they cannot see each other's data
- [ ] Enable Firebase AppCheck (reCAPTCHA Enterprise) in Firebase Console

### Config
- [ ] Replace Firebase config in `js/firebase-config.js`
- [ ] Replace Razorpay key in `js/firebase-config.js`
- [ ] Replace WhatsApp number (`91XXXXXXXXXX`) in `index.html` and `dashboard.html`
- [ ] Replace placeholder school names in `index.html` testimonials

### SEO
- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Add OG image at `/og-image.png` (1200×630px)
- [ ] Add favicon at `/favicon.ico`

### Legal
- [ ] Update Privacy Policy email/address in `pages/privacy.html`
- [ ] Create `pages/terms.html` (Terms of Service)
- [ ] Create `pages/refund.html` (Refund Policy)

---

## 💰 Pricing (configured in dashboard)

| Plan        | Students  | Price/month |
|-------------|-----------|-------------|
| Starter     | Up to 500 | ₹999        |
| Growth      | Up to 2000| ₹1,999      |
| Institution | Unlimited | ₹4,999      |

All plans: 30-day free trial, no credit card required.

---

## 🛠 Tech Stack

- **Frontend:** Vanilla HTML + CSS + JS (no npm, works from mobile)
- **Auth:** Firebase Authentication (Email + Google)
- **Database:** Firebase Firestore (NoSQL, multi-tenant)
- **Storage:** Firebase Storage
- **Payments:** Razorpay (subscriptions)
- **Hosting:** Vercel + custom domain
- **WhatsApp:** WhatsApp Web links (wa.me) — no API cost

---

## 📞 Support

Built by 18Spar · [hello@campusprime.in](mailto:hello@campusprime.in)
