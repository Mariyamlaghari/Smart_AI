# 🚀 SmartAI - Complete Testing Quick Start

## 🎯 Goal
Get your SmartAI application fully running with user auth, payments, and AI tools - all tested and working!

---

## ⏱️ Estimated Time: 30 minutes

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:

- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (optional)
- [ ] Admin access to Windows (for MongoDB)

**Missing something?** Download from:
- Node.js: https://nodejs.org (LTS recommended)
- Git: https://git-scm.com (optional)

---

## 🔧 Step 1: Install MongoDB (5 minutes)

### Option A: Automatic Install (RECOMMENDED)
1. Download: https://www.mongodb.com/try/download/community
2. Select **Windows x86_64** → Download `.msi` file
3. Double-click → Next → Next → **Finish**
4. MongoDB will auto-start as a Windows service

### Option B: Manual Start (if service not running)
Open PowerShell:
```powershell
mongod
```

Wait for:
```
[initandlisten] Listening on 27017
[initandlisten] Ready to accept connections
```

### Verify It Works:
```powershell
mongosh
```

Shows: `test> ` (type `exit` to quit)

---

## 🚀 Step 2: Start Backend Server (2 minutes)

Open **PowerShell/Terminal #1**:

```powershell
cd "f:\.NET_Projects\Smart_AI\backend"
npm run dev
```

**Expected Output:**
```
🚀 Server is running on http://localhost:5000
📡 API Health Check: http://localhost:5000/api/health
🔗 MongoDB: smartai database connected
✅ Ready for requests
```

**If MongoDB error:**
- [ ] MongoDB installed? (Check step 1)
- [ ] MongoDB running? (Check services or `mongod` command)
- [ ] .env file exists in backend folder?

---

## 🌐 Step 3: Start Frontend Server (2 minutes)

Open **PowerShell/Terminal #2**:

```powershell
cd "f:\.NET_Projects\Smart_AI\frontend"
npm run dev
```

**Expected Output:**
```
▲ Next.js 14.0.0
- Local:        http://localhost:3001
- Environments: .env.local
```

Open browser: http://localhost:3001

---

## ✅ Step 4: Test Signup (5 minutes)

### Frontend Test:
1. Browser: http://localhost:3001
2. Click **"Sign Up"** (top right)
3. Fill form:
   ```
   Name: Test User
   Email: test@example.com
   Password: Test@1234
   Confirm: Test@1234
   ```
4. Click **"Sign Up"**

### Expected Results:
✅ Page redirects to `/dashboard`
✅ Welcome email sent (check inbox)
✅ User appears in MongoDB
✅ Credits = 10 (Free plan)

**Can't see email?** Check spam folder or configure EMAIL settings in `.env`

---

## 🔓 Step 5: Test Login (2 minutes)

1. Click **"Sign In"** in header
2. Enter:
   ```
   Email: test@example.com
   Password: Test@1234
   ```
3. Click **"Sign In"**

### Expected:
✅ Redirects to `/dashboard`
✅ Shows "Welcome, Test User"
✅ Credits display: **10**

---

## 💳 Step 6: Test Pricing & Payment (5 minutes)

### View Pricing:
1. Go to: http://localhost:3001/pricing
2. See all 4 plans:
   - Free: 10 credits
   - Starter: 100 credits ($9.99)
   - Pro: 500 credits ($29.99)
   - Enterprise: 2000 credits ($99.99)

### Attempt Payment (Test Mode):
1. Click **"Upgrade Now"** under Starter plan
2. Browser → `/payment` page
3. See Stripe payment form
4. Fill:
   ```
   Card: 4242 4242 4242 4242
   Expiry: 12/25
   CVC: 123
   Name: Test User
   ```
5. Click **"Pay Now"**

### Result:
- ✅ Form submits (shows loading)
- ✅ Success message or error (test can fail without real Stripe keys, that's OK)
- ⚠️ Actually adding credits requires real Stripe keys

---

## 👤 Step 7: Test Profile (3 minutes)

1. Go to: http://localhost:3001/profile
2. See:
   ```
   Profile Picture Upload
   Name: Test User
   Email: test@example.com
   Phone: (empty)
   Bio: (empty)
   ```

### Update Profile:
1. Click **Edit** next to Name
2. Change to: `Updated Test User`
3. Enter Phone: `+1 (555) 123-4567`
4. Enter Bio: `Testing SmartAI`
5. Click **Save**

### Expected:
✅ Data saves
✅ Profile completion % increases
✅ Data persists after reload

---

## 🤖 Step 8: Test AI Tools (5 minutes)

### 8.1 Article Writer
1. Go: http://localhost:3001/tools/article-writer
2. Enter:
   ```
   Topic: "Benefits of AI"
   Tone: Professional
   Word Limit: 500
   Language: English
   ```
3. Click **Generate**

**Result:**
- ✅ Article generated
- ✅ Credits deduct: 10 → 9
- ✅ Content saved

### 8.2 Blog Title Generator
1. Go: http://localhost:3001/tools/blog-titles
2. Enter:
   ```
   Topic: "Artificial Intelligence"
   Number: 5
   ```
3. Click **Generate**

**Result:**
- ✅ 5 titles generated
- ✅ Credits deduct: 9 → 8

### 8.3 Background Removal
1. Go: http://localhost:3001/tools/background-removal
2. **Upload any image** (PNG/JPG)
3. Click **Remove Background**

**Result:**
- ✅ Process starts
- ✅ Credits deduct: 8 → 7

### 8.4 Image Generation
1. Go: http://localhost:3001/tools/image-generation
2. Enter:
   ```
   Description: "A beautiful sunset"
   Style: Digital Art
   ```
3. Click **Generate**

**Result:**
- ✅ Image generated
- ✅ Credits: 7 → 6

### 8.5 Object Removal
1. Go: http://localhost:3001/tools/object-removal
2. Upload image
3. Click **Remove Object**

**Result:**
- ✅ Process starts
- ✅ Credits: 6 → 5

### 8.6 Resume Reviewer
1. Go: http://localhost:3001/tools/resume-reviewer
2. Paste resume text or upload file
3. Click **Review**

**Result:**
- ✅ Feedback generated
- ✅ Credits: 5 → 4

---

## 📊 Step 9: Verify Dashboard (2 minutes)

1. Go: http://localhost:3001/dashboard
2. Check:
   - [ ] Welcome message displays
   - [ ] Credits show: **4** (reduced from 10)
   - [ ] Usage history shows all 6 tools
   - [ ] Stats card shows tool usage

---

## 🗄️ Step 10: Check Database (Optional)

### View All Data in MongoDB:

**Option A: MongoDB Shell**
```powershell
mongosh
use smartai
db.users.find()
db.subscriptionplans.find()
db.payments.find()
db.aitoolusages.find()
```

**Option B: MongoDB Compass (GUI)**
1. Download: https://www.mongodb.com/products/compass
2. Install → Run
3. Connect to: `mongodb://localhost:27017`
4. Browse "smartai" database
5. See all collections with data

---

## ✅ Testing Checklist

Copy this and check off as you test:

```
FEATURES VERIFIED:
═══════════════════════════════════════════
Landing Page............[ ] ✓
Signup Form.............[ ] ✓
Login Form..............[ ] ✓
Dashboard...............[ ] ✓
Profile Management......[ ] ✓
Profile Picture Upload..[ ] ✓
Pricing Page............[ ] ✓

AI TOOLS:
═══════════════════════════════════════════
Article Writer..........[ ] ✓
Blog Title Generator....[ ] ✓
Image Generation........[ ] ✓
Background Removal......[ ] ✓
Object Removal..........[ ] ✓
Resume Reviewer.........[ ] ✓

BACKEND:
═══════════════════════════════════════════
API Health Check........[ ] ✓
User Registration.......[ ] ✓
User Login..............[ ] ✓
Profile Updates.........[ ] ✓
Subscription Plans......[ ] ✓
Payment Processing......[ ] ✓
Email Notifications.....[ ] ✓
Credits Deduction.......[ ] ✓
Database Connection.....[ ] ✓

PAYMENT SYSTEM:
═══════════════════════════════════════════
Stripe Form Loads.......[ ] ✓
Payment Intent Created..[ ] ✓
Test Card Accepted......[ ] ✓
(Note: Full payment needs real Stripe keys)

TOTAL SCORE: ___ / 27 ✓
```

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to MongoDB"
```
Fix: 
1. Check if mongod is running (check Services)
2. Start MongoDB: mongod
3. Restart backend server
```

### Issue: "Email address already registered"
```
Fix:
Use a different email for signup:
- test2@example.com
- john@example.com
- your-email@example.com
```

### Issue: "Port 5000 already in use"
```
Fix:
netstat -ano | find "5000"
taskkill /PID <PID> /F
Then restart backend
```

### Issue: "Port 3001 already in use"
```
Fix:
Kill process using 3001:
taskkill /F /IM node.exe
Then restart frontend
```

### Issue: "Card declined" (during payment test)
```
Fix:
Use test card: 4242 4242 4242 4242
This always works in test mode
```

---

## 🎉 Success Indicators

You've completed testing when you see:

✅ **Signup**: New user created, email sent, dashboard accessible
✅ **Login**: Can login with credentials
✅ **Profile**: Can upload picture and edit info
✅ **Pricing**: All 4 plans visible with prices
✅ **Payment**: Stripe form loads and accepts test card
✅ **AI Tools**: All 6 tools work and deduct credits
✅ **Dashboard**: Shows usage history and remaining credits
✅ **Database**: MongoDB has real data

---

## 🚀 What's Next?

### Before Hackathon Submission:

1. **Get Real Credentials:**
   - Stripe API keys (from https://stripe.com)
   - Gmail app password (for emails)
   - Update in `.env` files

2. **Test with Real Data:**
   - Use real images for tools
   - Create real user accounts
   - Verify all features work

3. **Deploy:**
   - Backend: Deploy to Heroku/Railway/Vercel
   - Frontend: Deploy to Vercel
   - Database: Use MongoDB Atlas in production

4. **Security Check:**
   - Remove test card numbers from code
   - Hide API keys in environment variables
   - Enable HTTPS

---

## 📞 Need Help?

### Check Logs:

**Backend Console:**
```
Should show: API Server running on http://localhost:5000
If error: Check MongoDB is really running
```

**Frontend Console:**
```
Press F12 in browser → Console tab
Check for red errors
```

**Database Connection:**
```
mongosh
use smartai
db.users.countDocuments()
```

---

## 🏁 Final Notes

- **Total Development Time:** ~30 minutes
- **Testing Time:** ~20 minutes  
- **Setup Time:** ~10 minutes

**Everything is ready to use!** Just follow these steps and your SmartAI application will be fully functional.

**Good luck with your hackathon! 🚀**

---

## 📚 Additional Resources

- API Testing: See `API_TESTING_COLLECTION.json`
- Full Testing Guide: See `TESTING_GUIDE.md`
- MongoDB Setup: See `MONGODB_WINDOWS_SETUP.md`
- Project Architecture: See `ARCHITECTURE.md`
- Frontend Guide: See `FRONTEND_GUIDE.md`
