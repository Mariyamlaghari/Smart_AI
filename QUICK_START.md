# ⚡ Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free)
- Code editor (VS Code recommended)

---

## Step 1: Clone/Open Project
```bash
cd f:\.NET_Projects\Smart_AI
```

---

## Step 2: Setup MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster (basic tier, free)
4. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/ai-saas-db
   ```
5. Create database user with password

---

## Step 3: Start Backend

```bash
cd backend

# Install dependencies
npm install

# Create and edit .env file
# Paste this:
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/ai-saas-db
JWT_SECRET=test_secret_key_min_32_chars_very_secure_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Start server
npm run dev
```

**✅ Backend running on http://localhost:5000**

---

## Step 4: Start Frontend

In a new terminal:
```bash
cd frontend

# Install dependencies
npm install

# Start app
npm run dev
```

**✅ Frontend running on http://localhost:3000**

---

## Step 5: Test It! 🎉

1. Open http://localhost:3000
2. Click "Sign Up Free"
3. Register with test account
4. Explore dashboard
5. Try an AI tool

---

## 🧪 Quick API Test

```bash
# Test backend health
curl http://localhost:5000/api/health

# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123",
    "confirmPassword": "TestPass123"
  }'
```

---

## 📁 Key Files to Know

**Backend:**
- `backend/src/server.js` - Main server file
- `backend/src/routes/authRoutes.js` - Auth endpoints
- `backend/src/models/User.js` - User database schema

**Frontend:**
- `frontend/app/(public)/page.tsx` - Landing page
- `frontend/app/(auth)/login/page.tsx` - Login page
- `frontend/contexts/AuthContext.tsx` - Auth state

---

## 🔧 Common Commands

```bash
# Backend
npm run dev      # Start development server
npm start        # Start production server

# Frontend
npm run dev      # Start development
npm run build    # Build for production
npm start        # Start production server

# Check if services running
curl http://localhost:5000/api/health
curl http://localhost:3000
```

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check Node version
node --version  # Should be v18+

# Clear cache
rm -rf node_modules
npm install
npm run dev
```

### Can't connect to MongoDB
```bash
# 1. Check connection string
# 2. Add IP to whitelist in MongoDB Atlas (0.0.0.0/0)
# 3. Verify database user password
# 4. Test with mongo CLI
```

### Frontend shows "Cannot connect to API"
```bash
# 1. Ensure backend is running
# 2. Check NEXT_PUBLIC_API_URL in .env.local
# 3. Check browser console for errors
# 4. Verify CORS setting in backend
```

### "Port 5000/3000 already in use"
```bash
# Kill process on port (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change PORT in .env
PORT=5001
```

---

## 📋 Project Structure Quick Reference

```
backend/
├── src/
│   ├── config/      ← Database & JWT setup
│   ├── models/      ← Database schemas
│   ├── routes/      ← API endpoints
│   ├── controllers/ ← Business logic
│   ├── services/    ← AI tool logic
│   ├── middleware/  ← Security & validation
│   └── server.js    ← Express app

frontend/
├── app/
│   ├── (auth)/      ← Login/Signup pages
│   ├── (public)/    ← Landing page
│   └── (protected)/ ← Private routes
├── components/      ← Reusable UI pieces
├── services/        ← API calls
├── contexts/        ← Global state
└── lib/            ← Utilities
```

---

## 🎯 What to Explore First

1. **Homepage** - `/`
   - See marketing layout
   - Features & pricing

2. **Sign Up** - `/auth/signup`
   - Register new account
   - Form validation

3. **Dashboard** - `/dashboard`
   - View user info
   - See usage history

4. **Tools** - `/tools`
   - Browse all AI tools
   - Try article writer

---

## 🚀 Next Steps

After setup, try:

1. **Customize UI**
   - Edit colors in `tailwind.config.js`
   - Modify fonts in `globals.css`

2. **Add More Tools**
   - Copy `ArticleWriterService.js`
   - Create new service
   - Add new route & controller

3. **Connect Real AI APIs**
   - OpenAI for text
   - Stable Diffusion for images
   - Update service implementations

4. **Deploy to Production**
   - [Vercel](https://vercel.com) for frontend
   - [Railway](https://railway.app) for backend
   - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database

---

## 📖 Documentation Files

- **[README.md](./README.md)** - Full overview
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design & deployment
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Complete guide
- **[FRONTEND_GUIDE.md](./FRONTEND_GUIDE.md)** - React/Next.js details
- **[API_DOCS.md](./backend/API_DOCS.md)** - API endpoints

---

## 💡 Pro Tips

1. **Use browser DevTools console**
   - Network tab to see API calls
   - Console for JavaScript errors
   - Application tab to check localStorage token

2. **Use Postman/Insomnia**
   - Test APIs without frontend
   - Save request templates
   - Test with different tokens

3. **Check .env files**
   - Ensure all variables are set
   - Most issues are .env related

4. **Read error messages carefully**
   - They usually tell you exactly what's wrong
   - Check backend console logs
   - Check browser console

---

## 🎓 Learning Goals

After setup, practice:

- [ ] Register a user
- [ ] Login and verify token
- [ ] Generate article via API
- [ ] Check credits deduction
- [ ] View dashboard
- [ ] Try different tools
- [ ] Deploy to production

---

## 📞 Need Help?

1. Check **Troubleshooting** section above
2. Read relevant **Documentation** file
3. Check **error messages** carefully
4. Verify **environment variables**
5. Ensure **services are running**

---

## ✨ Success Checklist

- [ ] Backend running on :5000
- [ ] Frontend running on :3000
- [ ] Can access landing page
- [ ] Can sign up
- [ ] Can log in
- [ ] Can view dashboard
- [ ] Can use AI tools
- [ ] Dashboard shows correct info

If all checked ✅ - **You're ready to build!**

---

**Happy Coding! 🎉**

For detailed setup guide, see [ARCHITECTURE.md](./ARCHITECTURE.md)
