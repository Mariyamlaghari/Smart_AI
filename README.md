# AI SaaS Content Creation Platform

A production-ready Full-Stack AI SaaS Web Application built with **MERN** (MongoDB, Express.js, React, Node.js) + Next.js.

## 🎯 Overview

SmartAI is a comprehensive AI Content Creation Platform that enables users to generate high-quality content using powerful AI tools. The application features:

- **Secure Authentication** with JWT tokens
- **Credit-based system** for API usage tracking
- **6 AI Tools** for content and image generation
- **User Dashboard** for usage history and profile management
- **Modern UI/UX** with Tailwind CSS
- **Fully Protected Routes** for authenticated users

## 🏗️ Architecture

### Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB with Mongoose
- JWT Authentication
- Helmet (Security)
- Rate Limiting
- Axios (API Calls)

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- React Hot Toast (Notifications)

## 📁 Project Structure

```
Smart_AI/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── auth.js          # JWT utilities
│   │   │   └── database.js      # MongoDB connection
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── AIToolUsage.js
│   │   │   └── SavedContent.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── aiToolsController.js
│   │   │   └── dashboardController.js
│   │   ├── services/
│   │   │   ├── ArticleWriterService.js
│   │   │   ├── BlogTitleGeneratorService.js
│   │   │   ├── ImageGenerationService.js
│   │   │   ├── ImageProcessingService.js
│   │   │   └── ResumeReviewerService.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── toolRoutes.js
│   │   │   └── dashboardRoutes.js
│   │   ├── middleware/
│   │   │   ├── auth.js          # JWT middleware
│   │   │   └── validation.js    # Input validation
│   │   └── server.js            # Express app setup
│   ├── .env                     # Environment variables
│   └── package.json
│
└── frontend/
    ├── app/
    │   ├── (auth)/              # Public auth routes
    │   │   ├── login/
    │   │   └── signup/
    │   ├── (public)/            # Public pages
    │   │   └── page.tsx         # Landing page
    │   ├── (protected)/         # Protected routes (auth required)
    │   │   ├── dashboard/       # User dashboard
    │   │   └── tools/           # AI tools
    │   ├── layout.tsx           # Root layout
    │   └── globals.css          # Global styles
    ├── components/              # Reusable components
    ├── contexts/                # React contexts (Auth)
    ├── lib/                     # Utilities & types
    ├── services/                # API services
    ├── public/                  # Static assets
    ├── .env.local               # Frontend environment
    └── package.json
```

## 🔐 Authentication Flow

```
1. User signs up → Backend creates User in MongoDB
2. JWT token generated & stored in localStorage
3. Protected routes check token validity
4. Automatic logout on 401 (expired token)
5. All API requests include Authorization header
```

## 💳 Credit System

- **Free Plan**: 10 credits/month
- **Pro Plan**: 500 credits/month
- **Enterprise**: 2000+ credits/month

### Credit Usage:
- Article Writer: 1 credit
- Blog Titles: 1 credit
- Image Generation: 5 credits
- Background Removal: 2 credits
- Object Removal: 3 credits
- Resume Reviewer: 2 credits

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- npm or yarn

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Update .env with your credentials:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-saas-db
# JWT_SECRET=your_secret_key
# OPENAI_API_KEY=...

# Start development server
npm run dev

# Server runs on http://localhost:5000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local

# Update NEXT_PUBLIC_API_URL if needed

# Start development server
npm run dev

# Frontend runs on http://localhost:3000
```

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register     # Register new user
POST   /api/auth/login        # Login user
GET    /api/auth/me           # Get current profile
PUT    /api/auth/me           # Update profile
```

### AI Tools (Protected)
```
POST   /api/tools/article-writer      # Generate article
POST   /api/tools/blog-titles         # Generate blog titles
POST   /api/tools/image-generation    # Generate image
POST   /api/tools/background-removal  # Remove background
POST   /api/tools/object-removal      # Remove object
POST   /api/tools/review-resume       # Review resume
```

### Dashboard (Protected)
```
GET    /api/dashboard/usage-history   # Get usage history
GET    /api/dashboard/saved-content   # Get saved content
POST   /api/dashboard/saved-content   # Save content
PUT    /api/dashboard/saved-content/:id
DELETE /api/dashboard/saved-content/:id
```

## 🎨 UI Components

### Reusable Components
- `Button` - Primary, secondary, outline, danger variants
- `Input` - Text fields with validation
- `Modal` - Customizable modals
- `Header` - Navigation with auth state
- `Footer` - Company links and social

### Design System
- **Colors**: Primary (sky blue), Secondary (gray)
- **Spacing**: Tailwind default scale
- **Typography**: System fonts, responsive sizing
- **Animations**: Fade-in, slide-up transitions
- **Dark Mode**: Ready for implementation

## 🔒 Security Features

✅ **JWT Authentication** - Secure token-based auth
✅ **Password Hashing** - bcryptjs with salt rounds
✅ **Rate Limiting** - 100 requests per 15 minutes
✅ **Helmet** - HTTP headers security
✅ **CORS** - Restricted to frontend URL
✅ **Input Validation** - Email, password strength checks
✅ **Protected Routes** - Middleware authentication
✅ **Token Expiration** - 7-day token validity

## 🛠️ Development Workflow

### Adding a New AI Tool

1. **Create Service** (`backend/src/services/NewToolService.js`)
   ```javascript
   export class NewToolService {
     async processTool(input, options) {
       // Implementation
     }
   }
   ```

2. **Create Controller** (`backend/src/controllers/aiToolsController.js`)
   ```javascript
   export const toolFunction = async (req, res) => {
     // Validate credits, call service, log usage
   };
   ```

3. **Add Route** (`backend/src/routes/toolRoutes.js`)
   ```javascript
   router.post('/new-tool', newToolFunction);
   ```

4. **Create Frontend Page** (`frontend/app/(protected)/tools/new-tool/`)
   ```typescript
   // Form component with API integration
   ```

5. **Add to Tools Gallery** (`frontend/app/(protected)/tools/page.tsx`)

### Database Models

**User Schema:**
- Email, password, name
- Subscription plan & credits
- API usage tracking
- Account verification

**AIToolUsage Schema:**
- Tool name, user ID
- Input/output data
- Credits used, execution time
- Status (pending, success, failed)

**SavedContent Schema:**
- User ID, tool name
- Content, metadata, tags
- Favorite flag, timestamps

## 🚢 Deployment

### Backend (Heroku/Railway)
```bash
# Add Procfile
# Set environment variables in platform dashboard
# Deploy with git push
```

### Frontend (Vercel/Netlify)
```bash
# Connect GitHub repo
# Environment variables in dashboard
# Auto-deploy on push
```

## 📊 Metrics & Analytics

Track in dashboard:
- Credits used per tool
- Usage trends
- Popular tools
- User engagement

## 🐛 Error Handling

- Global error middleware
- User-friendly error messages
- Toast notifications
- Proper HTTP status codes

## 📝 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret
PORT=5000
FRONTEND_URL=http://localhost:3000
OPENAI_API_KEY=...
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🤝 Contributing

1. Create feature branch
2. Make changes with clear commits
3. Ensure TypeScript types are correct
4. Test all API endpoints
5. Update documentation

## 📚 Resources

- [Express.js Docs](https://expressjs.com)
- [Next.js Docs](https://nextjs.org)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Tailwind CSS](https://tailwindcss.com)
- [JWT.io](https://jwt.io)

## 📄 License

MIT License - Feel free to use this project!

## 🎓 Learning Path

1. **Backend First**:
   - Start with auth endpoints
   - Build database models
   - Test with Postman/Insomnia

2. **Integration**:
   - Connect AI service APIs
   - Implement credit system
   - Add logging

3. **Frontend**:
   - Create auth pages
   - Build tool interfaces
   - Connect to API

4. **Polish**:
   - Add animations
   - Error handling
   - Performance optimization

---

**Questions? Issues?** Check documentation or open an issue on GitHub!

Built with ❤️ for creators & developers.
