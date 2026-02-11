# 🔧 Deployment Troubleshooting Guide

## 🚨 Problem Solver Matrix

Find your issue and follow the fix!

---

## ❌ Frontend Deployment Issues (Vercel)

### Issue 1: Build Failed
```
Error: "npm run build" failed
```

**Causes & Fixes:**
```
1. TypeScript Errors
   → Fix: npm run build locally first
   → Check: tsconfig.json is correct
   → Fix: Remove type errors

2. Missing Environment Variables
   → Fix: Add to Vercel Environment Variables:
      - NEXT_PUBLIC_API_URL
      - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      - NEXT_PUBLIC_APP_NAME
   → Redeploy

3. Module Not Found
   → Fix: npm install locally
   → npm run build
   → Push to GitHub
   → Vercel will redeploy

4. Next.js Version Mismatch
   → Fix: Update frontend/package.json
   → Set: "next": "^14.0.0"
   → npm install
   → Push & redeploy
```

### Issue 2: Site Shows 404
```
Error: When I visit the URL, it shows "404 Not Found"
```

**Fixes:**
```
1. Build didn't complete
   → Check Vercel Deployments tab
   → Status should be "Ready"
   → If "Failed", check build logs

2. Root Directory Wrong
   → Fix: Settings → Root Directory
   → Change to: frontend
   → Save → Redeploy

3. Wrong Domain
   → Copy URL from Vercel dashboard
   → Should be: smartai-XXXXX.vercel.app
   → Not: smartai.com (unless custom domain setup)

4. Cache Issue
   → Ctrl+Shift+R (hard refresh)
   → Clear browser cache
   → Try incognito mode
```

### Issue 3: API Returns 404 Errors
```
Error: Network error when calling API
Console shows: "Failed to fetch from http//localhost:5000"
```

**Fixes:**
```
1. API URL Still Points to Localhost
   → Fix: Vercel → Settings → Environment Variables
   → Update: NEXT_PUBLIC_API_URL = https://smartai-backend.up.railway.app/api
   → Redeploy

2. Backend API Not Running
   → Check: https://smartai-backend.up.railway.app/api/health
   → Should return JSON
   → If 502: Backend crashed
   → Fix: Check Railway logs (see below)

3. CORS Error
   → Check browser console for CORS errors
   → Fix: Backend must have correct CORS_ORIGIN
   → Backend: CORS_ORIGIN = https://smartai-XXXXX.vercel.app
   → Redeploy backend

4. Network Timeout
   → API might be slow
   → Check Railway dashboard → Metrics
   → If high CPU/Memory: upgrade plan

How to Verify API is Working:
→ Visit: https://smartai-backend.up.railway.app/api/health
→ Should see JSON with success: true
```

### Issue 4: Form Data Not Being Sent
```
Error: Click button, nothing happens
Console shows: "Network error"
```

**Fixes:**
```
1. CORS Not Configured
   → Backend/server.js must have:
      cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
      })
   → Make sure backend redeployed ✅

2. API Endpoint Wrong URL
   → Check: lib/api-client.ts
   → Should have: process.env.NEXT_PUBLIC_API_URL
   → Redeploy frontend

3. API Not Responding
   → Check: Backend is running
   → Visit: https://smartai-backend.up.railway.app/api/health
   → If fails, fix backend (see Backend Issues below)
```

### Issue 5: Stripe Form Not Loading
```
Error: Stripe card form shows blank/error
```

**Fixes:**
```
1. Stripe Key Missing
   → Vercel Settings → Environment Variables
   → Add: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_YOUR_KEY
   → Redeploy

2. Wrong Stripe Key Format
   → Should start with pk_live_ (not sk_)
   → Should start with pk_test_ if in test mode
   → Copy from: https://stripe.com/dashboard → API Keys

3. Stripe JS Library Not Loaded
   → Check: app/layout.tsx has Stripe script
   → Verify: next.config.js configured correctly
   → Hard refresh: Ctrl+Shift+R

4. API Base URL Wrong
   → Stripe calls verifyPayment endpoint
   → Endpoint must exist and respond
   → Test: https://smartai-backend.up.railway.app/api/payments/confirm
   → Should return valid response
```

---

## ❌ Backend Deployment Issues (Railway)

### Issue 1: Build Failed
```
Error: "Build failed" in Railway dashboard
```

**Check Railway Logs:**

1. Click Project → Deployments
2. Click Failed Deployment
3. Go to Logs tab
4. Look for error messages

**Common Fixes:**
```
1. Module Not Found
   Error: Cannot find module 'xyz'
   → Fix: npm install locally
   → npm run build
   → Push to GitHub
   → Railway redeploys

2. Node Version Too Old
   Error: "async/await" not supported
   → Fix: backend/package.json → set "node": "18.0.0" or higher
   → Railway auto-detects from package.json

3. PORT Already in Use
   → Railway automatically handles
   → Should be fine, ignore

4. Environment Variable Missing
   → Check: Railway → Variables tab
   → All of these must exist:
      - MONGODB_URI
      - JWT_SECRET
      - STRIPE_SECRET_KEY
      - EMAIL_USER
      - EMAIL_PASSWORD
      - NODE_ENV = production
   → Add missing ones
   → Auto-redeploys

5. Database Connection Failed
   → Error: "Cannot connect to MongoDB"
   → Fix: Update MONGODB_URI to Atlas connection string
   → Rails auto-redeploys
```

### Issue 2: Server Crashes Immediately
```
Error: Deployment successful but service not running
Railway shows: "Crashed"
```

**How to See Error:**

1. Railway Dashboard → Logs
2. See error message
3. Scroll down to find actual error

**Common Fixes:**
```
1. Environment Variable Wrong
   MONGODB_URI = mongodb://localhost:27017/smartai (WRONG - local)
   → Fix: Use MongoDB Atlas connection string

2. Missing npm Script
   → In backend/package.json:
      "scripts": {
        "start": "node src/server.js",
        "dev": "nodemon src/server.js"
      }
   → Railway runs: npm start
   → Must exist!

3. Port Not Set
   → server.js must use: process.env.PORT || 5000
   → Not hardcoded to 5000
   → Railway assigns random port

4. Module Not Found
   → All required packages installed?
   → Check: npm install (before push)
   → Check: package.json has all dependencies

5. Database Down
   → Check: MongoDB Atlas is running
   → Status: https://cloud.mongodb.com/v2
   → White should be "Active"
```

### Issue 3: 502 Bad Gateway
```
Error: When accessing API, shows "502 Bad Gateway"
```

**Means:** Backend is not responding

**Fixes:**
```
1. Check if Backend is Running
   → Railway Logs tab
   → Should show "Server running on port..."
   → If not, see "Issue 2" above

2. Check Database Connection
   → Logs should show "MongoDB connected"
   → If not:
     → MONGODB_URI wrong?
     → Check: MongoDB Atlas whitelist IP
     → Visit: Atlas → Network Access
     → Should have 0.0.0.0/0 (allow anywhere)

3. Check Environment Variables
   → All required variables set?
   → Railway → Variables tab
   → Verify MONGODB_URI looks correct

4. Memory/CPU Limits
   → Railway → Metrics tab
   → CPU high? Memory high?
   → If yes: Upgrade plan
   → Free tier has limits

5. Restart Service
   → Railway → Settings → Redeploy
   → Might fix temporary issues
```

### Issue 4: API Works but Database Fails
```
Error: Registration succeeds but no user in database
```

**Fixes:**
```
1. Wrong Database URI
   → Check: MONGODB_URI in Railway env
   → Should be: mongodb+srv://user:pass@cluster.mongodb.net/smartai
   → Not: mongodb://localhost:27017 (that's local)

2. Database User Wrong
   → Check: MongoDB Atlas → Database Access
   → Username and password correct?
   → User has "Read and write" permissions?

3. Network Access Blocked
   → Check: MongoDB Atlas → Network Access
   → If IP not whitelisted: 
     → Add: 0.0.0.0/0 (anywhere)
     → Wait 5 minutes for changes
     → Try again

4. Database Full
   → Free tier has 512MB limit
   → Check: Atlas → Storage
   → If near limit: Clear test data or upgrade

5. Typo in MONGODB_URI
   → Double-check pwd, username
   → No space before/after
   → Correct cluster name
```

### Issue 5: Emails Not Sending
```
Error: User signs up but doesn't get welcome email
```

**Fixes:**
```
1. Wrong Gmail App Password
   → Using regular password? WRONG
   → Need: Gmail app password (16 chars)
   → Get: myaccount.google.com → Security → App Passwords
   → Generate new one
   → Update Railway ENV: EMAIL_PASSWORD = new-password

2. 2FA Not Enabled
   → Gmail must have 2FA enabled
   → Set it up: https://myaccount.google.com/security
   → Then generate app password

3. Email Address Wrong
   → Check: EMAIL_USER = correct@gmail.com
   → Typo? Fix it
   → Verify in Railway → Variables

4. Email Service Not Configured
   → Check: backend/src/services/EmailService.js
   → Using Nodemailer correctly?
   → Verify transport config

5. Check Logs
   → Railway → Logs
   → Search for "email"
   → See error message
   → Fix accordingly

Testing Email Manually:
→ Run locally: npm run dev
→ Sign up with test account
→ Check inbox/spam
→ If works local but not Railway:
  → EMAIL_PASSWORD needs updating in Railway
```

---

## ❌ Database Issues (MongoDB Atlas)

### Issue 1: Cannot Connect to Database
```
Error: "Could not connect to any servers in your MongoDB Atlas cluster"
```

**Fixes:**
```
1. IP Whitelist
   → Atlas → Network Access
   → Add: 0.0.0.0/0 (allow anywhere)
   → Wait 5+ minutes
   → Try again

2. Connection String Wrong
   → Copy from Atlas → Connect → Connect Your Application
   → Should be: mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/DATABASE
   → Verify no spaces, correct case
   → PASSWORD should not have special chars that break URL

3. Username/Password Wrong
   → Atlas → Database Access
   → Check user exists
   → Check password is correct
   → Make sure you copied full password during creation

4. Database Doesn't Exist
   → Atlas creates database on first insert
   → If no data, it might not show
   → After first user signup, check again

5. Cluster Not Running
   → Atlas → Clusters
   → Cluster should be green "Active"
   → If not, start it
   → Check: Cluster must exist
```

### Issue 2: Database Timeout
```
Error: "Timeout waiting for connection"
```

**Causes:** Database slow or unreachable

**Fixes:**
```
1. Connection Pool Exhausted
   → Too many simultaneous connections
   → Upgrade to paid Atlas tier
   → Or reduce concurrent connections

2. Free Cluster Slow
   → Free tier has poor performance
   → Accept slow queries
   → Or upgrade to paid tier

3. Network Issues
   → Check: Internet connection
   → Try: Restart Railway service
   → Wait: Sometimes just temporary

4. Retry
   → Most temporary
   → Just try API call again after 30 seconds
```

### Issue 3: Out of Storage
```
Error: "Database is full"
```

**Problem:** Free tier has 512MB limit

**Fixes:**
```
1. Delete Test Data
   → MongoDB Compass
   → Connect to Atlas
   → Delete test users/data
   → Should free up space

2. Upgrade Plan
   → Atlas → Clusters → Billing
   → Upgrade to M2 (paid tier)
   → ~$10/month

3. Archive Old Data
   → Export old data
   → Delete from database
   → Keep backup locally
```

---

## ❌ Payment Issues (Stripe)

### Issue 1: Payment Form Not Loading
```
Error: Stripe card element shows blank or error
```

**Fixes:**
```
1. Publishable Key Missing/Wrong
   → Vercel → Environment Variables
   → Add: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_YOUR_KEY
   → Copy from: https://stripe.com/dashboard/apikeys
   → Should start with pk_live_ (not sk_test_)
   → Redeploy

2. Stripe JS Not Loaded
   → app/layout.tsx should import Stripe
   → Check: <script src="https://js.stripe.com/..."></script>
   → Present? Yes
   → Hard refresh: Ctrl+Shift+R

3. CSP Headers Blocking
   → Add to next.config.js:
      headers: async () => [
        { key: 'script-src', value: "... https://js.stripe.com" }
      ]
```

### Issue 2: Payment Declines
```
Error: "Your card was declined"
```

**Using Test Card?**
```
✅ 4242 4242 4242 4242 = Always succeeds in test
✅ 5555 5555 5555 4444 = MasterCard test card
❌ 4000 0000 0000 0002 = Fails (intent)
```

**Fixes:**
```
1. Using Test Mode
   → Switch to LIVE keys from Stripe
   → pk_live_ and sk_live_
   → Update Vercel + Railway

2. Card Details Wrong
   → Expiry: Future date (12/26)
   → CVC: Any 3 digits
   → ZIP: Any 5 digits

3. Check Stripe Dashboard
   → https://stripe.com/dashboard
   → See why payment failed
   → Look at payment intent details

4. Test Endpoint First
   POST /api/payments/confirm
   {
     "paymentIntentId": "pi_xxx",
     "planId": "xxx"
   }
   → Should return success
```

### Issue 3: Payment Succeeds but No Credits Added
```
Error: Payment processed but user credits not updated
```

**Fixes:**
```
1. Backend Endpoint Failed Silently
   → Check: Backend logs for errors
   → Railway → Logs → search "payment"
   → See error message

2. User Not Found
   → JWT token expired?
   → User ID wrong?
   → Check: Authentication header

3. Payment Record Not Saved
   → Check: MongoDB → payments collection
   → Payment document exists?
   → If not, see backend logs

4. Credit Update Failed
   → User model not updated
   → Check: backend/src/controllers/paymentController.js
   → Verify confirmPayment function works

5. Webhook Not Configured
   → Stripe sends webhooks for real payments
   → Need: endpoint to receive webhooks
   → Add to: backend/src/routes/paymentRoutes.js
```

---

## ❌ General Issues

### Issue 1: CORS Errors
```
Error: "Access to XMLHttpRequest blocked by CORS policy"
```

**Fix for Backend:**

In `backend/src/server.js`:
```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

In `Railway Environment Variables`:
```
CORS_ORIGIN = https://smartai-XXXXX.vercel.app
```

Then redeploy backend.

### Issue 2: Token Expired
```
Error: "Unauthorized - Token expired"
```

**Fix:**
```
1. Clear localStorage
   → Open DevTools (F12)
   → Console: localStorage.clear()
   → Reload page

2. Login Again
   → Go to /login
   → Sign in with credentials
   → New token generated

3. Token Expiry Too Short
   → backend/src/config/auth.js
   → Change: expiresIn: '7d' (7 days)
   → Redeploy
```

### Issue 3: HTTPS Mixed Content Warning
```
Warning: "Mixed content... https page contains http resource"
```

**Fix:**
```
1. Update All URLs to HTTPS
   → Api calls must use https://
   → Vercel: automatic (https)
   → Railway: automatic (https)
   → Database: use MongoDB Atlas SSL

2. Update Environment Variables
   NEXT_PUBLIC_API_URL = https://smartai-backend.up.railway.app/api
   (not http://)
```

---

## 🆘 Emergency Support

### Logs Interpretation Guide

**Vercel Frontend Logs:**
```
✅ "Build completed successfully"    = Good
❌ "npm ERR!"                         = Fix errors locally
✅ "Deployment created"               = Site is live
❌ "504 Gateway Timeout"              = Backend issue
```

**Railway Backend Logs:**
```
✅ "Server running on port..."        = Backend started
❌ "Cannot find module"              = Missing package
❌ "Connection refused"              = Database down
✅ "MongoDB connected"               = Database ok
❌ "EADDRINUSE"                      = Port in use
```

**MongoDB Atlas Alerts:**
```
⚠️ Replication sync lagging           = Wait a moment
⚠️ Index creation in progress         = Normal
❌ Cluster M0 (free) limit reached    = Need to delete data or upgrade
```

---

## 📞 Getting Help

### Before Posting for Help, Try:

1. Check all logs (Vercel, Railway, MongoDB Atlas)
2. Verify all environment variables are set
3. Test endpoints manually with curl
4. Clear browser cache and localStorage
5. Restart the deployment

### Where to Get Help:

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **MongoDB Docs:** https://docs.atlas.mongodb.com
- **Stripe Support:** https://status.stripe.com

---

## ✅ Verification Checklist

Use to identify issues:

```
FRONTEND:
- [ ] Page loads without errors
- [ ] F12 Console has no red errors
- [ ] API calls go to correct URL (not localhost)
- [ ] Forms submit and get responses
- [ ] Can signup/login
- [ ] Can view all pages

BACKEND:
- [ ] API /health endpoint responds
- [ ] Database connected message in logs
- [ ] User data saves to MongoDB
- [ ] Email sends on signup
- [ ] Stripe payment endpoint exists
- [ ] All env variables set

DATABASE:
- [ ] Can connect from MongoDB Compass
- [ ] smartai database exists
- [ ] Can see user documents
- [ ] Can query data
- [ ] Data persists after restart

INTEGRATION:
- [ ] Stripe test payment processes
- [ ] Email arrives in inbox
- [ ] Profile picture uploads
- [ ] AI tool API works
- [ ] Credits decrease after tool use
```

---

**Happy Troubleshooting! You've got this! 🚀**
