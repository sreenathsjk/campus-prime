// js/firebase-config.js
// ─────────────────────────────────────────────────────
// Replace the values below with your actual Firebase project config.
// Get them from: Firebase Console → Project Settings → Your Apps
// ─────────────────────────────────────────────────────

const FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "campusprime-XXXXX.firebaseapp.com",
  projectId:         "campusprime-XXXXX",
  storageBucket:     "campusprime-XXXXX.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

// ─────────────────────────────────────────────────────
// Initialize Firebase (compat SDK — works in plain HTML)
// ─────────────────────────────────────────────────────
firebase.initializeApp(FIREBASE_CONFIG);

const auth = firebase.auth();
const db   = firebase.firestore();
const storage = firebase.storage();

// ─────────────────────────────────────────────────────
// Auth helpers
// ─────────────────────────────────────────────────────

/**
 * Redirects to login if user is not authenticated.
 * Call this at the top of every protected page.
 */
function requireAuth(callback) {
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = '/pages/login.html';
      return;
    }
    callback(user);
  });
}

/**
 * Returns the current user's school (tenant) ID from Firestore profile.
 * Cached in sessionStorage for performance.
 */
async function getSchoolProfile(userId) {
  const cached = sessionStorage.getItem('schoolProfile');
  if (cached) return JSON.parse(cached);

  const doc = await db.collection('schools').doc(userId).get();
  if (!doc.exists) return null;

  const profile = { id: doc.id, ...doc.data() };
  sessionStorage.setItem('schoolProfile', JSON.stringify(profile));
  return profile;
}

/**
 * Clears session and signs out.
 */
async function signOut() {
  sessionStorage.clear();
  await auth.signOut();
  window.location.href = '/pages/login.html';
}

// ─────────────────────────────────────────────────────
// Razorpay payment helper
// ─────────────────────────────────────────────────────

const RAZORPAY_KEY = "rzp_live_XXXXXXXXXXXXXXXX"; // Replace with your live key

/**
 * Opens Razorpay checkout.
 * @param {Object} opts - { amount (in paise), name, email, phone, description, onSuccess }
 */
function openRazorpay(opts) {
  const rzp = new Razorpay({
    key: RAZORPAY_KEY,
    amount: opts.amount,           // in paise: ₹999 = 99900
    currency: "INR",
    name: "CampusPrime",
    description: opts.description || "School Management Subscription",
    prefill: {
      name:  opts.name  || "",
      email: opts.email || "",
      contact: opts.phone || ""
    },
    theme: { color: "#1d4ed8" },
    handler: function(response) {
      if (opts.onSuccess) opts.onSuccess(response);
    }
  });
  rzp.open();
}
