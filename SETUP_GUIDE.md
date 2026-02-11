# 🚀 Complete Setup Guide - SmartAI Hackathon Project

This guide will help you set up the entire SmartAI application with all features including payment integration, email notifications, and credit-based subscription system.

## 📋 Prerequisites

Before starting, make sure you have:
- **Node.js** (v16 or higher)
- **MongoDB** (Cloud MongoDB Atlas or local MongoDB)
- **Git**
- **Stripe Account** (for payment processing)
- **Gmail Account** (for email notifications)

---

## ⚙️ Step 1: Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

---

## 🔐 Step 2: Set Up Environment Variables

### Backend Configuration

Create `.env` file in `backend/` directory:

```bash
cp .env.example .env
```

Edit `backend/.env` with your credentials:

```dotenv
# Database
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/smartai

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_51234567890...
STRIPE_PUBLISHABLE_KEY=pk_test_51234567890...
STRIPE_WEBHOOK_SECRET=whsec_1234567890...

# AI API Keys (Optional)
OPENAI_API_KEY=sk-...
HUGGINGFACE_API_KEY=hf_...
REPLICATE_API_KEY=r8_...
```

### Frontend Configuration

Create `.env.local` file in `frontend/` directory:

```bash
cp .env.example .env.local
```

Edit `frontend/.env.local`:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51234567890...
```

---

## 💳 Step 3: Stripe Setup

### Get Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Sign in or create an account
3. Navigate to **Developers** → **API keys**
4. Copy your **Secret Key** and **Publishable Key**
5. Create a webhook endpoint:
   - Go to **Developers** → **Webhooks**
   - Click **Add endpoint**
   - Endpoint URL: `https://yourdomain.com/api/webhook/stripe` (or use ngrok for local testing)
   - Events to listen: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy the **Signing secret**

---

## 📧 Step 4: Gmail Setup for Emails

### Enable Gmail App Passwords

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Go to **App passwords**
4. Select **Mail** and **Windows Computer**
5. Generate password - copy this as `EMAIL_PASSWORD`
6. Your Gmail address is `EMAIL_USER`

---

## 🗄️ Step 5: MongoDB Setup

### Option A: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get connection string
5. Update `MONGODB_URI` in `.env`

### Option B: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Update `MONGODB_URI=mongodb://localhost:27017/smartai`

---

## 🌱 Step 6: Seed Database with Plans

Populate the database with subscription plans:

```bash
cd backend
npm run seed
```

This will create:
- ✅ Free Plan (10 credits/month)
- ✅ Starter Plan ($9.99, 100 credits/month)
- ✅ Pro Plan ($29.99, 500 credits/month)
- ✅ Enterprise Plan ($99.99, 2000 credits/month)

---

## ▶️ Step 7: Run the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

Expected output:
```
🚀 Server is running on http://localhost:5000
📡 API Health: http://localhost:5000/api/health
```

### Start Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

Expected output:
```
▲ Next.js 14.0.0
- Local: http://localhost:3000
```

---

## 🧪 Step 8: Test the Features

### Test Authentication
1. Go to `http://localhost:3000`
2. Click **Sign Up**
3. Create new account
4. Check your email for welcome message ✅

### Test Pricing & Payment
1. Go to `http://localhost:3000/pricing`
2. View all subscription plans
3. Click **Upgrade Now** → Select plan
4. Go to `http://localhost:3000/payment`
5. Use Stripe test card: `4242 4242 4242 4242`
6. Expiry: `12/25`, CVC: `123`
7. Check email for payment confirmation ✅

### Test Profile Settings
1. Login and go to `http://localhost:3000/profile`
2. Upload profile picture
3. Edit name, phone, bio
4. Click **Save Changes** ✅

### Test AI Tools
1. Go to Dashboard → Tools
2. Access any AI tool
3. Tool should deduct credits
4. See updated credits in dashboard ✅

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Payment
- `GET /api/payments/plans` - Get all plans
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/history` - Payment history

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `POST /api /profile/upload-picture` - Upload avatar

### AI Tools
- `POST /api/tools/article-writer` - Generate articles
- `POST /api/tools/blog-titles` - Generate blog titles
- `POST /api/tools/image-generation` - Generate images
- `POST /api/tools/background-removal` - Remove background
- `POST /api/tools/object-removal` - Remove objects
- `POST /api/tools/review-resume` - Review resumes

---

## 🚀 Deployment

### Deploy Backend (Railway/Heroku)

```bash
# Create Railway account and connect GitHub
# Or use Heroku:
heroku create your-app-name
heroku config:set MONGODB_URI=your_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Deploy Frontend (Vercel)

```bash
# Vercel auto-deploys from GitHub
# Set environment variables in Vercel dashboard
NEXT_PUBLIC_API_URL=https://your-backend.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

---

## 🐛 Troubleshooting

### Payment Not Working
- Check Stripe keys in `.env`
- Verify webhook endpoint is correct
- Check browser console for errors

### Emails Not Sending
- Enable 2FA in Gmail
- Generate app-specific password
- Check EMAIL_USER and EMAIL_PASSWORD

### Credits Not Deducting
- Ensure MongoDB connection works
- Check user record in database
- Verify authController middleware

### Still Have Issues?
Check logs:
```bash
# Backend logs show detailed errors
npm run dev

# Frontend logs in browser console (F12)
```

---

## ✨ Key Features Implemented

✅ **User Authentication** - Secure JWT-based auth
✅ **Email Notifications** - Welcome & payment emails
✅ **Stripe Integration** - Secure payment processing
✅ **Credit System** - 4 subscription tiers
✅ **Profile Management** - Picture upload & settings
✅ **AI Tools** - 6 AI-powered content tools
✅ **Dashboard** - Usage analytics & history
✅ **Responsive UI** - Works on all devices

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review error logs
3. Check browser console (F12)
4. Verify environment variables

---

**Happy coding! 🎉**
