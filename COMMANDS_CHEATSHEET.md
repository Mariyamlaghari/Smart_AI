# ⚡ SmartAI - Commands Cheatsheet

Copy & paste these exact commands to test your application!

---

## 🔵 PHASE 1: SETUP (Do Once)

### 1.1 Install MongoDB
```bash
# Visit: https://www.mongodb.com/try/download/community
# Download MongoDB for Windows
# Run the .msi installer
# Click "Install MongoDB as Service"
# Click FINISH

# Verify installation:
mongod --version
# Should show: db version v7.0.0
```

### 1.2 Check Node.js & npm
```bash
node --version
# Should show: v18+ or v20+

npm --version
# Should show: 9+
```

### 1.3 Navigate to Project
```bash
cd f:\.NET_Projects\Smart_AI
```

---

## 🟢 PHASE 2: START SERVICES (Do Every Time)

### 2.1 Open PowerShell Terminal #1 - START BACKEND
```bash
cd backend
npm run dev
```

**Expected Output:**
```
🚀 Server is running on http://localhost:5000
📡 API Health Check: http://localhost:5000/api/health
🔗 MongoDB: smartai database
```

---

### 2.2 Open PowerShell Terminal #2 - START FRONTEND
```bash
cd frontend
npm run dev
```

**Expected Output:**
```
▲ Next.js 14.0.0
- Local:        http://localhost:3001
```

---

### 2.3 (Optional) Terminal #3 - Ensure MongoDB Running
```bash
mongod
```

**Expected:**
```
[initandlisten] Listening on 27017
[initandlisten] Ready to accept connections
```

---

## 🟠 PHASE 3: QUICK TESTS (Optional but Recommended)

### 3.1 Show API Response Format (Without Backend)
```bash
node simulate-api-responses.js
```

### 3.2 Interactive API Tester
```bash
TEST_API.bat
```

### 3.3 Test Health Check
```bash
curl http://localhost:5000/api/health
```

---

## 🔴 PHASE 4: MANUAL TESTING IN BROWSER

### 4.1 Open Browser
```
http://localhost:3001
```

### 4.2 Test Signup
```
Click "Sign Up"
Fill:
  Name: Test User
  Email: test@example.com
  Password: Test@1234
  Confirm: Test@1234
Click "Sign Up"
```

### 4.3 Test Login
```
Click "Sign In"
Email: test@example.com
Password: Test@1234
Click "Sign In"
```

### 4.4 Test Pricing Page
```
URL: http://localhost:3001/pricing
See all 4 plans
```

### 4.5 Test Payment Page
```
URL: http://localhost:3001/payment
Card: 4242 4242 4242 4242
Expiry: 12/25
CVC: 123
Click "Pay Now"
```

### 4.6 Test Profile Page
```
URL: http://localhost:3001/profile
Upload picture
Edit name, phone, bio
Click Save
```

### 4.7 Test AI Tools
```
http://localhost:3001/tools/article-writer
http://localhost:3001/tools/blog-titles
http://localhost:3001/tools/image-generation
http://localhost:3001/tools/background-removal
http://localhost:3001/tools/object-removal
http://localhost:3001/tools/resume-reviewer
```

---

## 🟣 PHASE 5: VERIFY DATABASE

### 5.1 View Database in MongoDB Shell
```bash
mongosh
use smartai
db.users.find()
db.subscriptionplans.find()
db.payments.find()
exit
```

### 5.2 View Database in MongoDB Compass
```
1. Download: https://www.mongodb.com/products/compass
2. Install & Open
3. Click "New Connection"
4. Enter: mongodb://localhost:27017
5. Click "Connect"
6. Browse "smartai" database
```

---

## 🟡 TROUBLESHOOTING COMMANDS

### Issue: MongoDB Not Running
```bash
# Check if running
mongosh
# If error, check service
services.msc
# Look for "MongoDB Server" status

# Or start manually:
mongod
```

### Issue: Port 5000 Occupied
```bash
# Kill the process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Then restart backend
cd backend
npm run dev
```

### Issue: Port 3001 Occupied
```bash
# Kill all Node.js processes
taskkill /F /IM node.exe

# Then restart both services
```

### Issue: Dependencies Not Installed
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

### Issue: Clear Cache and Restart
```bash
# Stop all services (Ctrl+C in each terminal)

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
cd backend && npm install
cd frontend && npm install

# Restart services
```

---

## 📝 ENVIRONMENT FILE SETUP

### 5.1 Create backend/.env
```bash
# Database
MONGODB_URI=mongodb://localhost:27017/smartai

# Stripe
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here

# Email (Gmail with app password)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# JWT
JWT_SECRET=your-secret-key-here
PORT=5000

# CORS
CORS_ORIGIN=http://localhost:3001
```

### 5.2 Create frontend/.env.local
```bash
# API
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here

# App
NEXT_PUBLIC_APP_NAME=SmartAI
```

---

## 🎯 FULL TEST SEQUENCE (Copy Exact Order)

```
1. INSTALL MONGODB
   └─ mongod --version

2. OPEN 3 TERMINALS

3. START SERVICES
   Terminal 1: cd backend && npm run dev
   Terminal 2: cd frontend && npm run dev
   Terminal 3: mongod

4. WAIT 10 SECONDS
   (Let services start)

5. OPEN BROWSER
   http://localhost:3001

6. TEST SIGNUP
   → Sign Up (test@example.com)
   → Check email for verification
   → Redirect to dashboard

7. TEST LOGIN
   → Sign Out
   → Sign In (test@example.com)
   → Dashboard appears

8. TEST PROFILE
   → Go to /profile
   → Upload picture
   → Edit details
   → Save

9. TEST PRICING
   → Go to /pricing
   → See all 4 plans

10. TEST PAYMENT
    → Go to /payment
    → Test card: 4242 4242 4242 4242
    → Process payment

11. TEST AI TOOLS
    → /tools/article-writer → Generate
    → /tools/blog-titles → Generate
    → /tools/image-generation → Generate
    → /tools/background-removal → Upload & Process
    → /tools/object-removal → Upload & Process
    → /tools/resume-reviewer → Review

12. CHECK DATABASE
    → mongosh
    → use smartai
    → db.users.find()
    → See your data

13. ✅ ALL DONE!
    Verify:
    - [ ] Signup works
    - [ ] Login works
    - [ ] Profile updates
    - [ ] Pricing shows
    - [ ] Payment form loads
    - [ ] AI tools work
    - [ ] Credits decrease
    - [ ] Data in database
```

---

## 🔑 KEY ENDPOINTS

```
API Base: http://localhost:5000/api

HEALTH CHECK
GET /health

AUTHENTICATION
POST /auth/register
POST /auth/login
GET /auth/me
PUT /auth/me

PAYMENTS
GET /payments/plans
POST /payments/create-intent
POST /payments/confirm
GET /payments/history

AI TOOLS
POST /tools/article-writer
POST /tools/blog-titles
POST /tools/image-generation
POST /tools/background-removal
POST /tools/object-removal
POST /tools/resume-reviewer

PROFILE
POST /profile/upload-pic
GET /profile/me
PUT /profile/update
```

---

## 🎨 TEST CARD NUMBERS

Use these to test Stripe payment form:

```
VISA (Always succeeds):       4242 4242 4242 4242
MASTERCARD (Always succeeds): 5555 5555 5555 4444
AMEX (Always succeeds):       3782 822463 10005
```

Expiry: Any future date (12/25)
CVC: Any 3 digits (123)

---

## 📞 EMERGENCY COMMANDS

### Restart Everything
```bash
# Kill all Node processes
taskkill /F /IM node.exe

# Restart MongoDB
# Open Services → MongoDB Server → Restart

# Clear cache
npm cache clean --force

# Reinstall everything
cd backend && npm install && npm run dev
cd frontend && npm install && npm run dev
mongod
```

### Check Everything is Running
```bash
# MongoDB
mongod --version
mongosh

# Node.js
node --version
npm --version

# Ports
netstat -ano | findstr :5000
netstat -ano | findstr :3001
netstat -ano | findstr :27017
```

### View All Logs
```bash
# Backend terminal: Last output
# Frontend terminal: Last output
# MongoDB terminal: Real-time logs
```

---

## ✅ SUCCESS CHECKLIST

After running all commands:

- [ ] http://localhost:3001 loads (frontend working)
- [ ] http://localhost:5000/api/health returns JSON (backend working)
- [ ] Can sign up new account (database working)
- [ ] Can login with credentials (auth working)
- [ ] See profile page (pages working)
- [ ] See pricing page (frontend routing working)
- [ ] Stripe form loads (payment UI working)
- [ ] Can click AI tool buttons (UI interactive)
- [ ] MongoDB Compass shows user data (database storing data)

---

## 🚀 YOU'RE READY!

Just follow these exact commands in order and your application will be fully tested!

**Total time: 30 minutes from start to complete testing** ⏱️

---

## 📚 Need More Help?

- Full guide: **START_TESTING_NOW.md**
- Complete reference: **TESTING_GUIDE.md**
- MongoDB help: **MONGODB_WINDOWS_SETUP.md**
- API reference: **API_TESTING_COLLECTION.json**
- Master index: **TESTING_INDEX.md**

🎯 **NOW GO TEST YOUR APPLICATION!** 🚀
