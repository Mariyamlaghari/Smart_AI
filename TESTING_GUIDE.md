# 🧪 SmartAI Full Application Testing Guide

## 📋 Pre-Testing Checklist

### ✅ What Works Without Database
- ✅ Frontend UI Components (all pages load)
- ✅ Form Validation
- ✅ Routing (navigation works)
- ✅ Responsive Design
- ✅ Authentication UI (forms)
- ✅ Payment UI (Stripe form loads)
- ✅ Profile UI (form displays)

### ⚠️ What Needs MongoDB
- ⚠️ User Registration (saves to DB)
- ⚠️ User Login (queries DB)
- ⚠️ Subscription Plans (reads from DB)
- ⚠️ Payment Processing (stores transactions)
- ⚠️ Profile Updates (persists data)
- ⚠️ AI Tools (tracks usage in DB)

---

## 🚀 Option 1: Install MongoDB Locally (RECOMMENDED)

### Option A: MongoDB Community Edition

**Download & Install:**
1. Go to: https://www.mongodb.com/try/download/community
2. Select Windows → Download MSI
3. Run installer → Complete setup
4. MongoDB will auto-start as service

**Start MongoDB (if not auto-started):**
```bash
mongod
```

Expected output:
```
[initandlisten] Listening on 27017
[initandlisten] Ready to accept connections
```

**Then test:**
```bash
cd backend
node test-connection.js
```

Should show:
```
✅ MongoDB Connected Successfully!
Host: localhost
Database: smartai
```

### Option B: MongoDB via Docker (if you have Docker)

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

---

## 🌐 Option 2: Use MongoDB Atlas (Cloud - Requires Fix)

**Issue:** IP Whitelist blocking

**Solution:**
1. Go to: https://cloud.mongodb.com/v2/
2. Click **"Network Access"** (left sidebar)
3. **DELETE old IP entry** (43.242.179.124/32)
4. Click **"+ ADD IP ADDRESS"**
5. Select **"Allow access from anywhere"** → `0.0.0.0/0`
6. Click **"CONFIRM"**
7. **WAIT 5 MINUTES** (important!)
8. Then test: `node test-connection.js`

---

## 📝 Complete Testing Checklist

### Step 1: Start Backend Server
```bash
cd backend
npm run dev
```

Expected output:
```
🚀 Server is running on http://localhost:5000
📡 API Health: http://localhost:5000/api/health
```

### Step 2: Start Frontend
```bash
cd frontend
npm run dev
```

Expected output:
```
▲ Next.js 14.0.0
- Local: http://localhost:3001
```

### Step 3: Test Each Feature

---

## ✅ Test 1: API Health Check

**URL:** http://localhost:5000/api/health

**Expected Response:**
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2026-02-11T10:30:00.000Z"
}
```

---

## ✅ Test 2: Frontend Landing Page

**URL:** http://localhost:3001

**Check:**
- [ ] Page loads
- [ ] Header shows "Sign In" & "Sign Up" buttons
- [ ] Features section visible
- [ ] Pricing section visible
- [ ] Footer loads

**Screenshot should look good** ✓

---

## ✅ Test 3: Signup Flow

### Step 1: Navigate to Signup
- Click **"Sign Up"** button in header
- URL: http://localhost:3001/signup
- Form should load with:
  - [ ] Name input
  - [ ] Email input
  - [ ] Password input
  - [ ] Confirm Password input
  - [ ] Sign Up button

### Step 2: Enter Test Data
```
Name: John Doe
Email: john@example.com
Password: Test@1234
Confirm: Test@1234
```

### Step 3: Click Sign Up
- [ ] Form submits
- [ ] Should redirect to /dashboard (after API response)
- **WITHOUT MongoDB:** Error on signup (expected)
- **WITH MongoDB:** User created, email sent, redirected

---

## ✅ Test 4: Login Flow

### Step 1: Navigate to Login
- Click **"Sign In"** in header
- URL: http://localhost:3001/login
- Form shows:
  - [ ] Email input
  - [ ] Password input
  - [ ] Sign In button

### Step 2: Try Login
```
Email: john@example.com
Password: Test@1234
```

- [ ] Form submits
- **WITHOUT MongoDB:** Error (expected)
- **WITH MongoDB:** Login works, redirected to dashboard

---

## ✅ Test 5: Pricing Page

**URL:** http://localhost:3001/pricing

**Check:**
- [ ] Page loads
- [ ] 4 pricing cards visible:
  - Free (10 credits) - $0
  - Starter (100 credits) - $9.99
  - Pro (500 credits) - $29.99
  - Enterprise (2000 credits) - $99.99
- [ ] "Upgrade Now" buttons present
- [ ] FAQ section displays
- [ ] Responsive on mobile

---

## ✅ Test 6: Payment Page

**URL:** http://localhost:3001/payment

**Check:**
- [ ] Page loads
- [ ] Stripe card form visible:
  - [ ] Card number field
  - [ ] Expiry date field
  - [ ] CVC field
- [ ] Order summary shows:
  - [ ] Plan name
  - [ ] Credits amount
  - [ ] Total price
- [ ] Pay button present

**Note:** Payment blocked without valid backend (expected)

---

## ✅ Test 7: Profile Page

**URL:** http://localhost:3001/profile (after login)

**Check:**
- [ ] Profile picture upload area shows
- [ ] Profile completion percentage bar visible
- [ ] Form fields:
  - [ ] Name (editable)
  - [ ] Email (read-only)
  - [ ] Phone (editable)
  - [ ] Bio (editable)
- [ ] Account Information section shows:
  - [ ] Account Type
  - [ ] Total Credits
  - [ ] Member Since
  - [ ] Next Credit Reset

---

## ✅ Test 8: Dashboard

**URL:** http://localhost:3001/dashboard (after login)

**Check:**
- [ ] Welcome message shows
- [ ] Credits display
- [ ] Stats cards visible
- [ ] Usage history table visible
- [ ] Navigation to tools available

---

## ✅ Test 9: AI Tools Pages

Navigate through each tool:

### 9.1 Article Writer
- **URL:** http://localhost:3001/tools/article-writer
- [ ] Form loads
- [ ] Inputs for: prompt, tone, word limit, language
- [ ] Generate button present

### 9.2 Blog Title Generator
- **URL:** http://localhost:3001/tools/blog-titles
- [ ] Form loads
- [ ] Inputs for: topic, count
- [ ] Generate button present

### 9.3 Image Generation
- **URL:** http://localhost:3001/tools/image-generation
- [ ] Form loads
- [ ] Inputs for: prompt, style, dimensions, quality
- [ ] Generate button present

### 9.4 Background Removal
- **URL:** http://localhost:3001/tools/background-removal
- [ ] Form loads
- [ ] Image upload field
- [ ] Process button present

### 9.5 Object Removal
- **URL:** http://localhost:3001/tools/object-removal
- [ ] Form loads
- [ ] Image upload field
- [ ] Coordinates input
- [ ] Process button present

### 9.6 Resume Reviewer
- **URL:** http://localhost:3001/tools/resume-reviewer
- [ ] Form loads
- [ ] Resume text area
- [ ] Job description optional field
- [ ] Review button present

---

## 🔌 API Testing (With Database)

Once MongoDB is working, test these endpoints:

### Auth APIs
```bash
# Register
POST http://localhost:5000/api/auth/register
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Test@1234",
  "confirmPassword": "Test@1234"
}

# Login
POST http://localhost:5000/api/auth/login
Body: {
  "email": "john@example.com",
  "password": "Test@1234"
}

# Get Profile
GET http://localhost:5000/api/auth/me
Headers: { "Authorization": "Bearer <token>" }
```

### Payment APIs
```bash
# Get Plans
GET http://localhost:5000/api/payments/plans

# Create Payment Intent
POST http://localhost:5000/api/payments/create-intent
Body: {
  "planId": "<plan_id>",
  "creditsAmount": 100
}
Headers: { "Authorization": "Bearer <token>" }

# Get Payment History
GET http://localhost:5000/api/payments/history
Headers: { "Authorization": "Bearer <token>" }
```

### AI Tools APIs
```bash
# Article Writer
POST http://localhost:5000/api/tools/article-writer
Body: {
  "prompt": "Write about AI",
  "tone": "professional",
  "wordLimit": 500,
  "language": "english"
}
Headers: { "Authorization": "Bearer <token>" }

# Background Removal
POST http://localhost:5000/api/tools/background-removal
Body: { "imageUrl": "https://..." }
Headers: { "Authorization": "Bearer <token>" }
```

---

## 🐛 Troubleshooting

### Issue: Frontend Shows 404
**Fix:**
```bash
cd frontend
npm run build
npm run dev
```

### Issue: API Calls Fail
**Check:**
1. Backend running? `npm run dev`
2. MongoDB running? `mongod`
3. .env file has correct values?
4. Check browser console (F12) for errors

### Issue: Stripe Form Not Loading
**Fix:**
- Add Stripe key to `.env.local`:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Issue: Email Not Sending
**Fix:**
- Gmail app password configured?
- 2FA enabled?
- EMAIL_USER & EMAIL_PASSWORD correct?

---

## 📊 Testing Summary Template

Copy this and fill as you test:

```
FEATURE TESTING RESULTS
======================

Landing Page: ✅ / ❌
Signup Form: ✅ / ❌
Login Form: ✅ / ❌
Pricing Page: ✅ / ❌
Payment Form: ✅ / ❌
Profile Page: ✅ / ❌
Dashboard: ✅ / ❌
Article Writer: ✅ / ❌
Blog Titles: ✅ / ❌
Image Generation: ✅ / ❌
Background Removal: ✅ / ❌
Object Removal: ✅ / ❌
Resume Reviewer: ✅ / ❌

Database Connection: ✅ / ❌
API Health Check: ✅ / ❌
Email Notification: ✅ / ❌
Stripe Integration: ✅ / ❌

Issues Found: 
- [Issue 1]
- [Issue 2]
- [Issue 3]
```

---

## 🎯 Next Steps

1. **Install MongoDB Locally** (15 min)
   - Download from mongodb.com
   - Start `mongod` command
   - Test connection

2. **Run Seed Script** (1 min)
   ```bash
   cd backend
   npm run seed
   ```

3. **Test Signup** (5 min)
   - Create account
   - Check email for welcome message

4. **Test Payment** (5 min)
   - Go to /pricing → /payment
   - Use test card: 4242 4242 4242 4242

5. **Test AI Tools** (10 min)
   - Use each tool
   - Verify credits deduct

---

**All features will work once MongoDB is connected!** ✅

Let me know if you face any issues during testing.
