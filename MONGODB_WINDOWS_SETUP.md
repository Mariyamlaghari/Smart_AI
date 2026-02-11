# 🎯 MongoDB Installation for Windows (5 Minutes)

## ⚡ Quick Start

### Step 1: Download MongoDB Community Edition
1. Open: https://www.mongodb.com/try/download/community
2. Select:
   - **OS:** Windows
   - **Platform:** Windows (x86_64)
   - **Version:** Latest (7.0+)
3. Click **DOWNLOAD** → Saves `mongodb-windows-x86_64-7.0.*.msi`

### Step 2: Run MongoDB Installer
1. Double-click the `.msi` file
2. Click **"RUN"** if Windows asks for permission
3. On setup screen:
   - [ ] Check **"Install MongoDB as a Service"**
   - [ ] Check **"Run the MongoDB service"**
   - Keep default path: `C:\Program Files\MongoDB\Server\7.0`
4. Click **NEXT** → **INSTALL** → **FINISH**

### Step 3: Verify Installation
Open PowerShell/Command Prompt and type:
```bash
mongod --version
```

Should show:
```
db version v7.0.0
```

---

## ✅ Verify MongoDB is Running

### Check If Service is Running:
1. Press `Win + R`
2. Type: `services.msc`
3. Look for **"MongoDB Server"** → Status should be **"Running"**

### (OR) Start MongoDB Manually:

#### Option A: Using MongoDB Shell
Open PowerShell:
```bash
mongosh
```

Should show prompt:
```
test> 
```

Press `Ctrl + C` to exit.

#### Option B: Start Service
```bash
net start MongoDB
```

---

## 🔗 Test Database Connection

Navigate to backend folder:
```bash
cd backend
node test-connection.js
```

### Expected Output:
```
✅ MongoDB Connected Successfully!
Host: localhost:27017
Database: smartai
Collections: 0
```

---

## 🌱 Seed Subscription Plans

```bash
cd backend
npm run seed
```

Expected output:
```
✅ Subscription Plans created successfully!
Created plans:
- Free: 10 credits ($0)
- Starter: 100 credits ($9.99)
- Pro: 500 credits ($29.99)
- Enterprise: 2000 credits ($99.99)
```

---

## 🚀 Start Backend & Frontend

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Expected:
```
🚀 API Server running on http://localhost:5000
📡 MongoDB connected: smartai
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Expected:
```
▲ Next.js 14.0.0
- Local:        http://localhost:3001
- Environments: .env.local
```

---

## 🧪 Quick Test

1. Open Browser: http://localhost:3001
2. Click **"Sign Up"**
3. Enter:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `Test@1234`
4. Click **Sign Up**

### Expected Results:
- ✅ Page redirects to `/dashboard`
- ✅ Welcome email sent (check your email)
- ✅ User created in database
- ✅ Credits = 10 (Free plan)

---

## ⚠️ Troubleshooting

### MongoDB Won't Start

**Fix 1: Restart Service**
```bash
net stop MongoDB
net start MongoDB
```

**Fix 2: Check if Already Running**
```bash
netstat -an | find "27017"
```

**Fix 3: Clear MongoDB Logs**
```bash
del "C:\Program Files\MongoDB\Server\7.0\log\mongod.log"
net start MongoDB
```

### Port 27017 Already in Use

Kill process:
```bash
netstat -ano | find "27017"
# Find PID, then:
taskkill /PID <PID> /F
```

### Connection Refused Error

```bash
# Check if MongoDB is really running:
mongosh --eval "db.adminCommand('ping')"
```

If error, reinstall:
1. Go to `Control Panel → Uninstall a Program`
2. Search **"MongoDB Server"** → Uninstall
3. Delete folder: `C:\Program Files\MongoDB`
4. Download & reinstall (.msi file)

---

## 📊 MongoDB Compass (Visual Tool)

### Download & Install:
1. Go: https://www.mongodb.com/products/compass
2. Download → Run installer
3. Install → Done

### Connect:
1. Open MongoDB Compass
2. Click **"New Connection"**
3. Enter: `mongodb://localhost:27017`
4. Click **"Connect"**

### View Data:
- See all databases
- View "smartai" database
- See all collections (users, payments, etc.)
- Browse documents visually

---

## 🎉 You're Ready!

Now your SmartAI application has:
- ✅ MongoDB database running locally
- ✅ User registration working
- ✅ Payment system ready
- ✅ Email notifications enabled
- ✅ All 6 AI tools functional

**Proceed with full testing as per TESTING_GUIDE.md** 🚀
