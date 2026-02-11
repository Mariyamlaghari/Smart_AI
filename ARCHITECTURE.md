# 🎯 Complete Setup & Architecture Guide

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         END USER / BROWSER                          │

└─────────────────────────────────┬───────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   FRONTEND - Next.js + React                        │
│ ┌───────────────────────────────────────────────────────────────┐  │
│ │ Pages                                                         │  │
│ │ • Landing Page (Public)                                       │  │
│ │ • Auth Pages (Login/Signup)                                   │  │
│ │ • Protected Dashboard                                         │  │
│ │ • AI Tools Pages                                              │  │
│ └───────────────────────────────────────────────────────────────┘  │
│ ┌───────────────────────────────────────────────────────────────┐  │
│ │ State Management & Services                                   │  │
│ │ • AuthContext (User, Token)                                   │  │
│ │ • API Services (auth, tools, dashboard)                       │  │
│ │ • API Client (Axios + Interceptors)                           │  │
│ └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────┬───────────────────────────────────┘
                                  │
                ┌─────────────────┴─────────────────┐
                │    HTTP/HTTPS (REST API)          │
                │    JSON + JWT Bearer Token        │
                ▼                                   ▼
┌──────────────────────────────────┐  ┌──────────────────────────────┐
│  Express.js Backend API Server   │  │  Authentication Middleware   │
│  http://localhost:5000           │  │  • Token Verification        │
├──────────────────────────────────┤  │  • Rate Limiting             │
│ Routes & Controllers             │  │  • CORS Handling             │
│ • /api/auth/* (Public)           │  └──────────────────────────────┘
│ • /api/tools/* (Protected)       │
│ • /api/dashboard/* (Protected)   │
│                                  │
├──────────────────────────────────┤
│ Services (AI Tool Logic)         │
│ • ArticleWriterService           │
│ • BlogTitleGeneratorService      │
│ • ImageGenerationService         │
│ • ImageProcessingService         │
│ • ResumeReviewerService          │
└──────────────────────────────────┘
                │
                ▼
┌──────────────────────────────────┐
│     MongoDB Atlas (Cloud)        │
│                                  │
│ Collections:                     │
│ • users                          │
│ • ai_tool_usage                  │
│ • saved_content                  │
└──────────────────────────────────┘
```

## Data Flow

### Authentication Flow
```
User Registration/Login
        ↓
Validate credentials
        ↓
Hash password (bcryptjs)
        ↓
Create/Find user in MongoDB
        ↓
Generate JWT token
        ↓
Store token in localStorage (frontend)
        ↓
Include token in API Authorization header
        ↓
Middleware validates token on each request
```

### AI Tool Usage Flow
```
User triggers AI tool
        ↓
Frontend sends request with JWT
        ↓
Backend middleware validates token
        ↓
Check user credits in database
        ↓
Call AI Service (abstracted)
        ↓
Deduct credits from user account
        ↓
Log usage in AIToolUsage collection
        ↓
Return result to frontend
        ↓
Update UI with result + remaining credits
```

## Installation & Setup

### Step 1: Prerequisites
```bash
# Install Node.js 18+ from https://nodejs.org
node --version   # Should be v18.0.0 or higher
npm --version    # Should be npm 9+

# Install MongoDB Atlas (free cloud database)
# Visit: https://www.mongodb.com/cloud/atlas
```

### Step 2: MongoDB Setup
1. Create MongoDB Atlas account
2. Create free cluster
3. Get connection string
4. Add IP whitelist (0.0.0.0/0 for dev)
5. Create database user with password

### Step 3: Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-saas-db
JWT_SECRET=your_super_secret_key_min_32_chars_long
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Optional AI Service API Keys
OPENAI_API_KEY=sk-...
HUGGINGFACE_API_KEY=...
REPLICATE_API_KEY=...
EOF

# Start server
npm run dev

# Check if running
curl http://localhost:5000/api/health
```

### Step 4: Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local

# Start development server
npm run dev

# Open browser
# http://localhost:3000
```

## Testing the Application

### Test User Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "confirmPassword": "SecurePass123"
  }'
```

### Test Protected Route
```bash
# Save token from registration response
TOKEN="eyJhbGc..."

curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### Test Article Generation
```bash
curl -X POST http://localhost:5000/api/tools/article-writer \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "prompt": "Write about AI",
    "tone": "professional",
    "wordLimit": 500,
    "language": "english"
  }'
```

## Frontend Testing Checklist

### Public Routes (No Auth)
- [ ] Landing page loads
- [ ] Features section visible
- [ ] Pricing section visible
- [ ] Login/Sign Up links work
- [ ] Footer displays

### Authentication
- [ ] Sign up with valid data
- [ ] Validation errors on invalid data
- [ ] Login with correct credentials
- [ ] Error on wrong password
- [ ] Redirect to dashboard after login

### Protected Routes
- [ ] Dashboard loads after login
- [ ] Cannot access without login
- [ ] Logout works and redirects

### Dashboard
- [ ] User info displays
- [ ] Credits show correctly
- [ ] Usage history loads
- [ ] Pagination works

### AI Tools
- [ ] Tool page loads
- [ ] Form validation works
- [ ] API call on submit
- [ ] Result displays
- [ ] Copy to clipboard works
- [ ] Credits deducted

## Build & Deployment

### Backend Deployment (Heroku/Railway)

```bash
# 1. Create Procfile in backend root
echo "web: node src/server.js" > Procfile

# 2. Push to Heroku
git push heroku main

# 3. Set environment variables
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=...

# 4. Check logs
heroku logs --tail
```

### Frontend Deployment (Vercel)

```bash
# 1. Push to GitHub
git push origin main

# 2. Connect to Vercel
# Dashboard → Add New Project → Select GitHub repo

# 3. Set environment variables
# Environment → NEXT_PUBLIC_API_URL=https://your-api.com

# 4. Deploy
# Auto-deploys on push
```

## Production Checklist

### Security
- [ ] Update JWT_SECRET to strong random string
- [ ] CORS only allows production domain
- [ ] Rate limiting configured
- [ ] HTTPS enabled
- [ ] Database credentials secured
- [ ] API keys stored securely (env vars)
- [ ] Input validation on all endpoints
- [ ] SQL injection protection (Mongoose)
- [ ] XSS protection (React)

### Performance
- [ ] MongoDB indexes created
- [ ] API response caching
- [ ] Frontend code splitting
- [ ] Image optimization
- [ ] CDN for static files
- [ ] Database backups configured

### Monitoring
- [ ] Error logging (Sentry)
- [ ] API monitoring (New Relic)
- [ ] Performance tracking (Datadog)
- [ ] Uptime monitoring

### Scaling
- [ ] Load balancer configured
- [ ] Database replication set up
- [ ] Auto-scaling enabled
- [ ] Cache (Redis) implemented

## Common Issues & Solutions

### Issue: MongoDB Connection Fails
```
Solution: 
1. Check connection string
2. Verify IP whitelist in Atlas
3. Check database user password
4. Test connection: mongo "mongodb+srv://..."
```

### Issue: CORS Error on API Calls
```
Solution:
1. Check FRONTEND_URL in backend .env
2. Ensure it matches actual frontend URL
3. Verify CORS middleware configured correctly
```

### Issue: Token Always Invalid
```
Solution:
1. Check JWT_SECRET matches frontend and backend
2. Verify token not expired (check JWT_EXPIRE)
3. Ensure Authorization header format: "Bearer TOKEN"
```

### Issue: Credits Not Deducting
```
Solution:
1. Check User model subscription schema
2. Verify credits query returns correct value
3. Ensure save() called after update
4. Check MongoDB write permissions
```

## Development Best Practices

### Code Organization
```
Services handle business logic
Controllers handle HTTP requests
Middleware handle cross-cutting concerns
Models define data structure
Routes map HTTP methods to controllers
```

### Error Handling
```javascript
try {
  // Business logic
} catch (error) {
  res.status(500).json({
    success: false,
    message: 'User-friendly error',
    error: error.message // Only in dev
  });
}
```

### Validation
```javascript
// Always validate on backend
if (!email || !validator.isEmail(email)) {
  return res.status(400).json({ 
    success: false, 
    message: 'Invalid email' 
  });
}
```

### Logging
```javascript
// Log important events
console.log('✅ User registered:', user.email);
console.log('❌ Payment failed:', error.message);
console.log('📊 Credits deducted:', creditAmount);
```

## Environment Variables Reference

### Backend (.env)
| Variable | Example | Purpose |
|----------|---------|---------|
| MONGODB_URI | mongodb+srv://... | Database connection |
| JWT_SECRET | randomstring32chars | Token signing key |
| JWT_EXPIRE | 7d | Token validity |
| PORT | 5000 | Server port |
| FRONTEND_URL | http://localhost:3000 | CORS origin |
| OPENAI_API_KEY | sk-... | AI API access |

### Frontend (.env.local)
| Variable | Example | Purpose |
|----------|---------|---------|
| NEXT_PUBLIC_API_URL | http://localhost:5000 | Backend API URL |

## Next Steps

1. **Integrate Real AI APIs**
   - OpenAI for article writing
   - Stable Diffusion for image generation
   - Hugging Face for processing

2. **Add Payment System**
   - Stripe integration
   - Credit purchase flow
   - Invoice generation

3. **Analytics**
   - User dashboard analytics
   - Usage tracking
   - Revenue reporting

4. **Advanced Features**
   - User to user content sharing
   - Collaborative teams
   - API for third-party apps
   - Webhook integrations

5. **Performance**
   - Redis caching
   - Database optimization
   - CDN integration
   - Load testing

---

## Quick Reference Commands

```bash
# Start both servers
cd backend && npm run dev &
cd frontend && npm run dev

# Build for production
npm run build
npm start

# Stop running servers
ps aux | grep node
kill <PID>

# View MongoDB data
# Open MongoDB Atlas dashboard → Collections

# Check API endpoints
curl http://localhost:5000/api/health

# Clear cache
rm -rf .next node_modules
npm install && npm run build

# View logs
npm run dev 2>&1 | tee debug.log
```

For detailed API documentation, see [API_DOCS.md](./backend/API_DOCS.md)
For frontend guide, see [FRONTEND_GUIDE.md](./FRONTEND_GUIDE.md)
