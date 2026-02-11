# Backend API Documentation

## Quick Start

```bash
npm install
npm run dev
```

Server runs on `http://localhost:5000`

## Authentication

### RegisterUser
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123"
}

Response:
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "subscription": {
      "plan": "free",
      "credits": 10
    }
  }
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response: Same as register
```

### Get Profile
```bash
GET /api/auth/me
Authorization: Bearer {token}

Response:
{
  "success": true,
  "user": { ... }
}
```

## AI Tools

### Generate Article
```bash
POST /api/tools/article-writer
Authorization: Bearer {token}
Content-Type: application/json

{
  "prompt": "Write about AI in healthcare",
  "tone": "professional",
  "wordLimit": 1000,
  "language": "english"
}

Response:
{
  "success": true,
  "data": {
    "article": "...",
    "generatedAt": "2024-01-15T10:30:00Z"
  },
  "creditsRemaining": 9
}
```

### Generate Blog Titles
```bash
POST /api/tools/blog-titles
Authorization: Bearer {token}

{
  "topic": "Machine Learning",
  "count": 5
}
```

### Generate Image
```bash
POST /api/tools/image-generation
Authorization: Bearer {token}

{
  "prompt": "A futuristic city with AI robots",
  "style": "realistic",
  "dimensions": "1024x1024",
  "quality": "high"
}
```

## Dashboard

### Get Usage History
```bash
GET /api/dashboard/usage-history?limit=10&page=1&toolName=articleWriter
Authorization: Bearer {token}
```

### Save Content
```bash
POST /api/dashboard/saved-content
Authorization: Bearer {token}

{
  "toolName": "articleWriter",
  "title": "My Article",
  "content": "...",
  "tags": ["AI", "article"]
}
```

## Error Handling

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad request
- `401` - Unauthorized
- `403` - Insufficient credits
- `404` - Not found
- `500` - Server error
