# ⚡ Quick Deployment (5 Steps) - Vercel + Railway

## 📋 What You'll Deploy

```
Frontend (Next.js)  → Vercel    (Free)
Backend (Node.js)   → Railway   (~$7/month)
Database (MongoDB)  → Atlas     (Free)
Payments           → Stripe     (Live keys needed)
Email              → Gmail      (App password needed)
```

---

## ✅ Pre-Deployment Checklist

Before starting, make sure you have:

- [ ] GitHub account (with repository pushed)
- [ ] Vercel account (or create with GitHub)
- [ ] Railway account (or create with GitHub)
- [ ] MongoDB Atlas account (or will create)
- [ ] Stripe account (for live keys)
- [ ] Gmail account with 2FA enabled

---

## 🚀 STEP 1: Push Code to GitHub (5 minutes)

### 1.1 Open Terminal
```bash
cd f:\.NET_Projects\Smart_AI
```

### 1.2 Initialize Git (if not done)
```bash
git init
git add .
git commit -m "SmartAI - Hackathon Application"
git branch -M main
```

### 1.3 Create GitHub Repository
1. Go to: https://github.com/new
2. Name: `smartai`
3. Click **Create Repository**
4. Copy the commands shown

### 1.4 Push Code
```bash
git remote add origin https://github.com/Mariyamlaghari/Smart_AI.git
git push -u origin main
```

**Expected:** Your code now on GitHub ✅

---

## 🌐 STEP 2: Deploy Frontend on Vercel (10 minutes)

### 2.1 Go to Vercel
1. Visit: https://vercel.com
2. Click **"Sign Up"**
3. Use GitHub (Authorize)

### 2.2 Import Project
1. Dashboard → **"New Project"**
2. Select **smartai** repository
3. Click **Import**

### 2.3 Configure
```
Root Directory: frontend
Framework: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### 2.4 Add Environment Variables

Click **Environment Variables** and add:
```
NEXT_PUBLIC_API_URL = https://smartai-backend.up.railway.app/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_YOUR_KEY
NEXT_PUBLIC_APP_NAME = SmartAI
```

### 2.5 Deploy
Click **Deploy** and wait ~5 minutes...

**Expected Output:**
```
✅ Frontend URL: https://smartai-XXXXXX.vercel.app
```

---

## 🔗 STEP 3: Deploy Backend on Railway (15 minutes)

### 3.1 Go to Railway
1. Visit: https://railway.app
2. Click **"Start Project"**
3. Use GitHub (Authorize)

### 3.2 Create Project
1. Click **"New Project"**
2. Select **smartai** from GitHub
3. Click **Deploy**

### 3.3 Configure Service
1. Click **Settings**
2. Root Directory: `backend`
3. Install Command: `npm install`
4. Start Command: `npm start`

### 3.4 Add Environment Variables 

**IMPORTANT:** Set these:

```
MONGODB_URI = mongodb+srv://smartai_user:PASSWORD@smartai-prod.xxxxx.mongodb.net/smartai?retryWrites=true&w=majority
STRIPE_SECRET_KEY = sk_live_YOUR_KEY
STRIPE_PUBLISHABLE_KEY = pk_live_YOUR_KEY
EMAIL_SERVICE = gmail
EMAIL_USER = your-email@gmail.com
EMAIL_PASSWORD = your-app-password
JWT_SECRET = your-secret-key-123456
NODE_ENV = production
PORT = 5000
CORS_ORIGIN = https://smartai-XXXXXX.vercel.app
```

### 3.5 Deploy
Click **Deploy** and wait ~5 minutes...

**Expected Output:**
```
✅ Backend URL: https://smartai-backend.up.railway.app
```

---

## 🗄️ STEP 4: Setup MongoDB Atlas (10 minutes)

### 4.1 Create Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click **Register**
3. Sign up with email

### 4.2 Create Cluster
1. Click **Create** → **Build a Cluster**
2. Select **Free Tier (M0)**
3. Provider: **AWS**
4. Region: **us-east-1**
5. Cluster Name: `smartai-prod`
6. Click **Create Cluster**

**Wait ~3 minutes...**

### 4.3 Create Database User
1. Click **Security** → **Database Access**
2. Click **Add New Database User**
3. Username: `smartai_user`
4. Password: `Create_Strong_Password_123!`
5. Permissions: **Read and write to any database**
6. Click **Add User**

### 4.4 Setup IP Whitelist
1. Click **Network Access**
2. Click **Add IP Address**
3. Select **Allow Access from Anywhere** (0.0.0.0/0)
4. Click **Confirm**

### 4.5 Get Connection String
1. Click **Connect** (near cluster name)
2. Select **Connect Your Application**
3. Copy the connection string:
```
mongodb+srv://smartai_user:<password>@smartai-prod.xxxxx.mongodb.net/smartai?retryWrites=true&w=majority
```

4. Replace `<password>` with your actual password

### 4.6 Update Railway
1. Go to Railway dashboard
2. Select smartai project
3. Click **Variables**
4. Find `MONGODB_URI`
5. Paste the connection string from Atlas

**Railway will auto-redeploy** ✅

---

## 🔑 STEP 5: Get Live API Keys (5 minutes)

### 5.1 Stripe Live Keys

1. Go to: https://stripe.com
2. Login → Dashboard
3. Click **"API Keys"** or **Developers**
4. Toggle to **"Live Keys"** (not test)
5. Copy:
   - **Secret Key** (starts with `sk_live_`)
   - **Publishable Key** (starts with `pk_live_`)

### 5.2 Gmail App Password

1. Go to: https://myaccount.google.com
2. Click **Security** (left sidebar)
3. Search for **"App Passwords"**
4. Select **Mail** and **Windows**
5. Google shows **16-character password**
6. Copy this password

### 5.3 Update Vercel & Railway

**Vercel (Frontend):**
1. Dashboard → smartai → Settings → Environment Variables
2. Update:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_YOUR_KEY
   ```
3. Deployments → Redeploy latest

**Railway (Backend):**
1. Dashboard → smartai → Variables
2. Update:
   ```
   STRIPE_SECRET_KEY = sk_live_YOUR_KEY
   EMAIL_USER = your-email@gmail.com
   EMAIL_PASSWORD = 16-char-app-password
   ```
3. Auto-redeploy starts

---

## ✅ VERIFICATION

### Test Frontend
```
https://smartai-XXXXX.vercel.app
```
- [ ] Page loads
- [ ] Signup form works
- [ ] Pricing displays
- [ ] No console errors (F12)

### Test Backend
```
https://smartai-backend.up.railway.app/api/health
```
- [ ] Returns JSON
- [ ] Shows "API is running"

### Test Full Flow
1. **Signup** → New account + welcome email ✅
2. **Login** → Access dashboard ✅
3. **Check DB** → User in MongoDB Atlas ✅
4. **Payment** → Test card accepted ✅
5. **AI Tool** → Credits decrease ✅

---

## 🎯 Your Live URLs

After successful deployment:

```
🌐 Frontend:    https://smartai-XXXXX.vercel.app
🔗 API:         https://smartai-backend.up.railway.app/api
📊 Dashboard:   https://vercel.com/dashboard
⚙️ Railway:     https://railway.app/dashboard
🗄️ Database:    https://cloud.mongodb.com
💳 Stripe:      https://stripe.com/dashboard
```

---

## 🐛 Quick Fixes

| Problem | Fix |
|---------|-----|
| Frontend won't load | Check `NEXT_PUBLIC_API_URL` in Vercel env |
| API not responding | Check `MONGODB_URI` and `NODE_ENV=production` |
| User signup fails | Check MongoDB Atlas whitelist IP |
| Emails not sending | Check Gmail app password (16 chars, not regular password) |
| Payment fails | Check Stripe LIVE keys (not test keys) |
| Database empty | Seed manually or run: `npm run seed` |

---

## 🚀 You're Live!

Your SmartAI application is now deployed and accessible worldwide!

Visit: **https://smartai-XXXXX.vercel.app** 🎉

---

## 📞 Support

- Vercel Issues: https://vercel.com/docs
- Railway Issues: https://docs.railway.app
- MongoDB Issues: https://docs.atlas.mongodb.com
- Stripe Issues: https://stripe.com/docs

---

**Congratulations on deploying your hackathon project!** 🏆
