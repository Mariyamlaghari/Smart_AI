# Frontend Documentation

## Project Setup

```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## Folder Structure Explanation

### `app/` - Next.js App Router
- `(auth)/` - Public auth pages (login, signup)
- `(public)/` - Public pages (landing page)
- `(protected)/` - Private routes (requires authentication)
  - `dashboard/` - User dashboard
  - `tools/` - AI tools pages

Route groups `()` don't affect URL structure.

### `components/` - Reusable Components
- `Button.tsx` - Styled button with variants
- `Input.tsx` - Form input with validation
- `Modal.tsx` - Reusable modal component
- `Header.tsx` - Navigation header
- `Footer.tsx` - Footer with links

### `contexts/` - React Contexts
- `AuthContext.tsx` - Global auth state management

### `services/` - API Integration
- `auth.service.ts` - Authentication API calls
- `api.service.ts` - AI tools API calls

### `lib/` - Utilities
- `api-client.ts` - Axios instance with interceptors
- `auth.types.ts` - TypeScript type definitions

## Component Usage

### Button Component
```tsx
<Button 
  variant="primary"     // primary | secondary | outline | danger
  size="lg"            // sm | md | lg
  isLoading={false}
  onClick={() => {}}
>
  Click Me
</Button>
```

### Input Component
```tsx
<Input 
  label="Email"
  type="email"
  error={errors.email}
  onChange={handleChange}
  placeholder="Enter email"
/>
```

### Using Auth Context
```tsx
import { useAuth } from '@/contexts/AuthContext';

export default function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  return (
    <>
      {isAuthenticated && <p>Welcome, {user?.name}</p>}
    </>
  );
}
```

## API Integration

### Calling AI Tools
```tsx
import { aiToolsService } from '@/services/api.service';

const response = await aiToolsService.generateArticle({
  prompt: 'Topic',
  tone: 'professional',
  wordLimit: 1000,
  language: 'english'
});
```

### Calling Dashboard APIs
```tsx
import { dashboardService } from '@/services/api.service';

// Get usage history
const history = await dashboardService.getUsageHistory({
  limit: 10,
  page: 1
});

// Save content
await dashboardService.saveContent({
  toolName: 'articleWriter',
  title: 'My Article',
  content: 'Article content...',
  tags: ['AI']
});
```

## Creating a New Tool Page

1. Create folder: `app/(protected)/tools/my-tool/`
2. Create `page.tsx`:

```tsx
'use client';

import React, { useState } from 'react';
import { aiToolsService } from '@/services/api.service';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import toast from 'react-hot-toast';

export default function MyToolPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await aiToolsService.myTool({
        // params
      });
      setResult(response.data);
      toast.success('Success!');
    } catch (error) {
      toast.error('Failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-app">
        {/* Your UI */}
      </div>
    </div>
  );
}
```

## Styling Guidelines

Use Tailwind CSS classes. Common patterns:

```tsx
// Button styling
className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"

// Card styling
className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"

// Responsive grid
className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"

// Text styling
className="text-2xl font-bold text-gray-900"
```

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Note: Variables must start with `NEXT_PUBLIC_` to be exposed to browser.

## Error Handling

```tsx
try {
  const response = await apiCall();
} catch (error: any) {
  const message = error.response?.data?.message || error.message;
  toast.error(message);
}
```

## Forms Best Practices

```tsx
const [formData, setFormData] = useState({ field: '' });
const [errors, setErrors] = useState({});

const handleChange = (e) => {
  setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  // Validate, submit, handle errors
};
```

## Testing Locally

1. Ensure backend is running: `http://localhost:5000`
2. Frontend: `http://localhost:3000`
3. Test auth flow in browser DevTools
4. Check Network tab for API calls
5. Use console for debugging

## Performance Tips

- Use `React.memo()` for expensive components
- Implement pagination for large lists
- Lazy load images
- Code split with Next.js dynamic imports
- Optimistic UI updates

## Debugging

```tsx
// Log component renders
console.log('Component mounted/updated');

// Debug API calls
console.log('API Response:', response);

// Use React DevTools
// Chrome Extension: React Developer Tools
```

---

For more help, check the main README.md!
