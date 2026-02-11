# 🚀 SmartAI Deployment Guide (Vercel + Railway)

## 📋 Deployment Overview

```
Frontend (Next.js)     -->  Vercel (Free Tier)
Backend (Node.js)      -->  Railway (Paid ~$5/month)
Database (MongoDB)     -->  MongoDB Atlas (Free Tier)
Storage (Images)       -->  Cloudinary (Free Tier)
Email                  -->  Gmail/Nodemailer
Payments               -->  Stripe
```

---

## ⏱️ Total Time: ~45 minutes

1. Prepare code: 5 min
2. Deploy Frontend (Vercel): 10 min
3. Deploy Backend (Railway): 15 min
4. Configure Database (MongoDB Atlas): 10 min
5. Test Production: 5 min

---

## 🔴 PART 1: Prepare Code for Deployment

### 1.1 Clean Up Code
```bash
# Remove localhost references
# Remove test data
# Check .gitignore includes node_modules and .env
# Ensure backend/Procfile exists (Created)
# Ensure backend/railway.json exists (Created)
# Ensure frontend/vercel.json exists (Created)
```

### 1.2 Create .env Files from Examples

**backend/.env.example** (Already have? Copy to .env)
```
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartai

# Stripe
STRIPE_SECRET_KEY=sk_live_your_real_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_real_key

# Email
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# General
JWT_SECRET=your-secure-secret-key
PORT=5000
NODE_ENV=production

# CORS
CORS_ORIGIN=https://smartai-frontend.vercel.app
```

**frontend/.env.production** (Create this)
```
NEXT_PUBLIC_API_URL=https://smartai-backend-railway.app/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_real_key
NEXT_PUBLIC_APP_NAME=SmartAI
```

### 1.3 Update API URLs in Frontend

Edit: `frontend/lib/api-client.ts`
```typescript
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### 1.4 Create GitHub Repository

```bash
cd f:\.NET_Projects\Smart_AI

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - SmartAI hackathon application"

# Add remote (use your GitHub account)
git remote add origin https://github.com/Mariyamlaghari/Smart_AI.git

# Push to GitHub
git branch -M main
git push -u origin main

> **⚠️ Troubleshooting 403 Error:**
> If you see `Permission denied to [wrong-username]`, it means your computer is logged into the wrong GitHub account.
>
> **Solution 1 (Easiest):** Force the correct username:
> `git remote set-url origin https://YOUR_CORRECT_USERNAME@github.com/username/repo.git`
>
> **Solution 2 (Windows):**
> Open **Credential Manager** > **Windows Credentials** > Find `github.com` > **Remove**.
```

---

## 🟢 PART 2: Deploy Frontend on Vercel (10 minutes)

### Step 2.1: Sign Up on Vercel
1. Go to: https://vercel.com
2. Click **"Sign Up"**
3. Use GitHub account (recommended)
4. Authorize Vercel to access GitHub

### Step 2.2: Import Project

1. Go to: https://vercel.com/dashboard
2. Click **"New Project"**
3. Select your **smartai** repository
4. Click **"Import"**

### Step 2.3: Configure Environment Variables

**Root Directory:** `frontend` (important!)

**Environment Variables:**
```
NEXT_PUBLIC_API_URL = https://smartai-backend-railway.app/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_your_key
NEXT_PUBLIC_APP_NAME = SmartAI
```

### Step 2.4: Deploy!

1. Build Command: `npm run build`
2. Start Command: `npm start`
3. Output Directory: `.next`
4. Click **"Deploy"**

**Wait ~3-5 minutes...**

### Expected Output:
```
✅ Build successful
✅ Deployment successful
🌐 Frontend URL: https://smartai-YOUR-ID.vercel.app
```

---

## 🟠 PART 3: Deploy Backend on Railway (15 minutes)

### Step 3.1: Sign Up on Railway
1. Go to: https://railway.app
2. Click **"Start Project"**
3. Sign up with GitHub
4. Authorize Railway

### Step 3.2: Create New Project

1. Dashboard → New Project
2. Select **"Deploy from GitHub repo"**
3. Select **smartai** repository
4. Click **"Deploy"**

### Step 3.3: Configure Service

1. Click **"Configure"**
2. Select **"Node.js"** template
3. Root Directory: `backend`
4. Install Command: `npm install`
5. Start Command: `npm start`

### Step 3.4: Add Environment Variables

Click **"Variables"** and add:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/smartai
STRIPE_SECRET_KEY = sk_live_your_real_key
STRIPE_PUBLISHABLE_KEY = pk_live_your_real_key
EMAIL_SERVICE = gmail
EMAIL_USER = your-email@gmail.com
EMAIL_PASSWORD = your-app-password
JWT_SECRET = your-secure-key
NODE_ENV = production
PORT = 5000
CORS_ORIGIN = https://smartai-YOUR-ID.vercel.app
```

### Step 3.5: Start Deployment

1. Click **"Deploy"**
2. Wait for build completion (~5 min)
3. Get your backend URL

### Expected Output:
```
✅ Build completed
✅ Deployment successful
🔗 Backend URL: https://smartai-backend.up.railway.app
```

---

## 🔵 PART 4: Setup MongoDB Atlas (Production Database)

### Step 4.1: Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click **"Register"**
3. Sign up with email

### Step 4.2: Create Cluster

1. Click **"Create"** → **"Build a Cluster"**
2. Select **"Free Tier"** (M0)
3. Select **"AWS"** → **"us-east-1"**
4. Cluster Name: `smartai-prod`
5. Click **"Create Cluster"**

**Wait ~3 minutes for cluster to be ready...**

### Step 4.3: Create Database User

1. Click **"Security"** → **"Database Access"**
2. Click **"Add New Database User"**
3. Username: `smartai_user`
4. Password: Create strong password
5. Permissions: **"Read and write to any database"**
6. Click **"Add User"**

### Step 4.4: Whitelist IP

1. Click **"Network Access"**
2. Click **"Add IP Address"**
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### Step 4.5: Get Connection String

1. Click **"Clusters"**
2. Click **"Connect"**
3. Select **"Connect Your Application"**
4. Copy connection string:
```
mongodb+srv://smartai_user:PASSWORD@smartai-prod.xxxxx.mongodb.net/smartai?retryWrites=true&w=majority
```

5. Replace:
   - `PASSWORD` with your actual password
   - `smartai` at the end = database name

### Step 4.6: Update Backend Configuration

Add to Railway environment variables:
```
MONGODB_URI = mongodb+srv://smartai_user:YOUR_PASSWORD@smartai-prod.xxxxx.mongodb.net/smartai?retryWrites=true&w=majority
```

---

## 🟣 PART 5: Get Real API Keys

### Stripe (Production Keys)

1. Go to: https://stripe.com
2. Sign up or login
3. Dashboard → **"API Keys"**
4. Go to **"Live Keys"** (not test)
5. Copy:
   - **Secret Key** → `STRIPE_SECRET_KEY`
   - **Public Key** → `STRIPE_PUBLISHABLE_KEY`

### Gmail (Email Notifications)

1. Go to: https://myaccount.google.com
2. Click **"Security"** (left sidebar)
3. Scroll to **"App Passwords"**
4. Select **"Mail"** and **"Windows"**
5. Google will give you **16-character password**
6. Use this as `EMAIL_PASSWORD`

```
EMAIL_USER = your-email@gmail.com
EMAIL_PASSWORD = 16-char-app-password-from-google
```

---

## 🚀 PART 6: Final Configuration

### Step 6.1: Update Frontend Environment

1. Go to Vercel Dashboard
2. Select **smartai** project
3. Click **"Settings"** → **"Environment Variables"**
4. Update:
```
NEXT_PUBLIC_API_URL = https://smartai-backend.up.railway.app/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_your_key
```

5. Redeploy: **"Deployments"** → Click latest → **"Redeploy"**

### Step 6.2: Update Backend Environment

1. Go to Railway Dashboard
2. Select **smartai** project
3. Click **"Variables"**
4. Update all keys (Stripe live, MongoDB Atlas, Gmail, etc.)
5. Automatic redeploy will start

### Step 6.3: Seed Production Database

You can now seed production database. Two options:

**Option A: Using MongoDB Compass (GUI)**
1. Download MongoDB Compass
2. Connect with Atlas connection string
3. Run seed script manually

**Option B: Using Script**
Create `backend/seed-production.js`:
```javascript
require('dotenv').config();
const mongoose = require('mongoose');
const SubscriptionPlan = require('./src/models/SubscriptionPlan');

const plans = [
  { name: 'Free', credits: 10, price: 0 },
  { name: 'Starter', credits: 100, price: 9.99 },
  { name: 'Pro', credits: 500, price: 29.99 },
  { name: 'Enterprise', credits: 2000, price: 99.99 }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    await SubscriptionPlan.deleteMany({});
    await SubscriptionPlan.insertMany(plans);
    console.log('✅ Production database seeded!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
```

Run once:
```bash
node seed-production.js
```

---

## ✅ PART 7: Testing Production

### Step 7.1: Test Frontend
```
https://smartai-YOUR-ID.vercel.app
```

Check:
- [ ] Page loads
- [ ] Can signup
- [ ] Can login
- [ ] Can see pricing
- [ ] Can view tools

### Step 7.2: Test Backend API
```
https://smartai-backend.up.railway.app/api/health
```

Should return:
```json
{
  "success": true,
  "message": "API is running"
}
```

### Step 7.3: Test Signup Flow
1. Open frontend
2. Sign up with new email
3. Check:
   - [ ] User created (check MongoDB Atlas)
   - [ ] Welcome email received
   - [ ] Redirect to dashboard works

### Step 7.4: Test Payment Flow
1. Go to pricing page
2. Select plan
3. Try payment with test card:
   ```
   4242 4242 4242 4242
   12/25
   123
   ```
4. Check:
   - [ ] Payment processes
   - [ ] Confirmation email
   - [ ] Credits increase
   - [ ] Payment saved in MongoDB

### Step 7.5: Test AI Tools
1. Go to any tool
2. Generate content
3. Check:
   - [ ] Output generated
   - [ ] Credits decrease
   - [ ] Data saved in database

---

## 🔧 Troubleshooting Deployment

### Issue: Frontend Build Fails
```
Fix:
1. Check .env variables correct
2. Check API URL accessible
3. Check TypeScript errors: npm run build
4. Redeploy in Vercel
```

### Issue: Backend Not Starting
```
Fix:
1. Check MongoDB connection string
2. Check all env variables set in Railway
3. Check Node version: 18+ needed
4. Restart Railway deployment
```

### Issue: API Calls Fail
```
Fix:
1. Check CORS_ORIGIN matches frontend URL
2. Check backend server responding: visit /api/health
3. Check env variables in backend
4. Check MongoDB Atlas IP whitelist (0.0.0.0/0 already set)
```

### Issue: Emails Not Sending
```
Fix:
1. Check EMAIL_USER and EMAIL_PASSWORD correct
2. Check 2FA enabled on Gmail
3. Check app password generated (16 chars)
4. Check SMTP settings in EmailService.js
```

### Issue: Payment Not Working
```
Fix:
1. Check Stripe keys are LIVE keys (not test)
2. Check CORS enabled for Stripe requests
3. Check webhook configured
4. Test with real card (or use test key)
```

---

## 🔐 Security Checklist

Before going live:

- [ ] All .env files use production values
- [ ] No API keys in GitHub (use environment variables)
- [ ] CORS_ORIGIN set to frontend URL only
- [ ] MongoDB Atlas IP whitelist 0.0.0.0/0 (or specific IPs)
- [ ] Stripe webhook configured
- [ ] Email credentials correct
- [ ] JWT_SECRET is strong
- [ ] HTTPS enabled on all URLs
- [ ] Rate limiting enabled
- [ ] Input validation enabled

---

## 📊 Deployed URLs Reference

After everything is deployed, you'll have:

```
Frontend:        https://smartai-YOUR-ID.vercel.app
Backend:         https://smartai-backend.up.railway.app
Database:        MongoDB Atlas (Atlas cloud)
Dashboard URLs:
- Vercel:        https://vercel.com/dashboard
- Railway:       https://railway.app/dashboard
- MongoDB:       https://cloud.mongodb.com/v2
- Stripe:        https://stripe.com/dashboard
```

---

## 💰 Cost Breakdown (Monthly)

```
Vercel:          FREE (Next.js is optimized)
Railway:         $7/month (starter plan)
MongoDB Atlas:   FREE (up to 512MB)
Stripe:          2.9% + 30¢ per transaction (only on real payments)
Gmail:           FREE (part of Google account)
Cloudinary:      FREE (up to 25 monthly credits)

TOTAL:           ~$7-10/month (only if making payments)
```

---

## 🚀 Production Deployment Script

Create `deploy.sh` (or `.bat` for Windows):

```bash
#!/bin/bash

echo "🚀 Starting SmartAI Production Deployment..."

# Push to GitHub
echo "📤 Pushing code to GitHub..."
git add .
git commit -m "Production deployment"
git push origin main

echo "⏳ Vercel will auto-deploy frontend..."
echo "⏳ Railway will auto-deploy backend..."
echo ""
echo "✅ Check deployment status:"
echo "   Frontend: https://vercel.com/dashboard"
echo "   Backend:  https://railway.app/dashboard"
echo ""
echo "🎉 Deployment started!"
```

---

## ✅ Final Verification Checklist

After deployment, verify everything works:

```
FRONTEND:
- [ ] Site loads: https://smartai-xxx.vercel.app
- [ ] Form validation works
- [ ] Signup form sends request
- [ ] Login form works
- [ ] Pricing page displays
- [ ] Payment form loads (Stripe)
- [ ] Tools pages accessible
- [ ] Profile upload works
- [ ] Responsive on mobile
- [ ] Console has no errors (F12)

BACKEND:
- [ ] API responds: /api/health
- [ ] Signup creates user in MongoDB
- [ ] Login returns valid JWT
- [ ] Payment processing works
- [ ] Email notifications send
- [ ] Tool API endpoints respond
- [ ] Database queries are fast
- [ ] No errors in logs

DATABASE:
- [ ] MongoDB Atlas has data
- [ ] User documents exist
- [ ] Subscription plans seeded
- [ ] Payment records saved
- [ ] Usage tracked

INTEGRATIONS:
- [ ] Stripe accepts test card and real payments
- [ ] Emails deliver to inbox
- [ ] Profile pictures upload & display
- [ ] AI tool outputs generate
- [ ] Credits system works
```

---

## 📞 Support Links

If you get stuck:

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **MongoDB Atlas:** https://docs.atlas.mongodb.com
- **Stripe Docs:** https://stripe.com/docs/api
- **Next.js Deployment:** https://nextjs.org/docs/deployment

---

## 🎉 You're Live!

Your application is now deployed and accessible worldwide! 🌍

**Key URLs to share:**
```
🌐 Frontend: https://smartai-YOUR-ID.vercel.app
🔗 API Docs: https://smartai-backend.up.railway.app/api
📊 Dashboard: https://dashboard.smartai.com (if custom domain)
```

---

## 📋 Post-Deployment Tasks

1. **Add Custom Domain** (Optional)
   - Vercel: Settings → Domains → Add custom domain
   - Railway: Settings → Domains

2. **Setup Analytics** (Optional)
   - Vercel Analytics: Built-in
   - Google Analytics: Add to frontend

3. **Monitor Performance** (Optional)
   - Railway: Dashboard monitoring
   - Vercel: Speed Insights

4. **Setup Backups** (Optional)
   - MongoDB Atlas: Automated backups enabled

5. **Document API Endpoints**
   - Create public API documentation
   - Add OAuth for third-party integrations

---

**Congratulations! Your SmartAI application is now LIVE! 🚀**

Visit: https://smartai-YOUR-ID.vercel.app

---

*Deployment completed. Ready for production use!*
