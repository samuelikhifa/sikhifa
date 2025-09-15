# Authentication System

This portfolio includes a secure authentication system for developer/owner access to protected areas.

## 🔐 Authentication Features

- **JWT-based authentication** with HTTP-only cookies
- **Protected admin routes** with middleware
- **Login/logout functionality**
- **Admin dashboard** with portfolio analytics
- **Secure API endpoints**

## 🚀 Quick Start

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Authentication Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_EMAIL=admin@r2ruman.com
ADMIN_PASSWORD=admin123

# Environment
NODE_ENV=development
```

### 2. Default Credentials

- **Email**: `admin@r2ruman.com`
- **Password**: `admin123`

⚠️ **Important**: Change these credentials in production!

## 📁 File Structure

```
my-por/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts      # Login endpoint
│   │       ├── logout/route.ts     # Logout endpoint
│   │       └── verify/route.ts     # Token verification
│   ├── admin/
│   │   └── dashboard/page.tsx      # Protected admin dashboard
│   └── login/page.tsx              # Login page
├── middleware.ts                   # Route protection
└── AUTHENTICATION.md              # This file
```

## 🔒 API Endpoints

### Authentication Endpoints

- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Logout and clear cookies
- `GET /api/auth/verify` - Verify authentication status

### Protected Endpoints

- `GET /api/admin/dashboard` - Admin dashboard data (requires authentication)

## 🛡️ Security Features

1. **HTTP-only Cookies**: JWT tokens stored in secure HTTP-only cookies
2. **Route Protection**: Middleware protects `/admin/*` routes
3. **Token Expiration**: JWT tokens expire after 24 hours
4. **Environment Variables**: Sensitive data stored in environment variables

## 🎯 Usage

### Accessing Admin Dashboard

1. Navigate to `/login` (or click the hidden "Admin Access" link in footer)
2. Enter credentials:
   - Email: `admin@r2ruman.com`
   - Password: `admin123`
3. You'll be redirected to `/admin/dashboard`

### Admin Dashboard Features

- **Portfolio Statistics**: Total projects, happy clients, page views
- **Recent Activity**: Latest portfolio updates and activities
- **Analytics**: Visitor statistics and conversion rates
- **Logout**: Secure logout functionality

## 🔧 Customization

### Changing Credentials

Update the environment variables in `.env.local`:

```env
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
```

### Adding Protected Routes

1. Create new API routes in `/app/api/admin/`
2. Use the `verifyAuth` function from existing routes
3. Create protected pages in `/app/admin/`

### Customizing Dashboard

Edit `/app/admin/dashboard/page.tsx` to add:

- More analytics
- Content management features
- Portfolio editing capabilities
- User management

## 🚨 Production Security

1. **Change JWT Secret**: Use a strong, unique JWT secret
2. **Update Credentials**: Change default admin credentials
3. **HTTPS**: Ensure HTTPS is enabled
4. **Rate Limiting**: Consider adding rate limiting to auth endpoints
5. **Environment**: Set `NODE_ENV=production`

## 🐛 Troubleshooting

### Common Issues

1. **Login not working**: Check environment variables are set correctly
2. **Protected routes accessible**: Ensure middleware is working
3. **Token expiration**: Tokens expire after 24 hours, re-login required

### Debug Mode

Add console logs to API routes for debugging:

```typescript
console.log("Auth attempt:", { email, success: data.success });
```

## 📝 Notes

- The authentication system is designed for single-user access (developer/owner)
- No user registration - credentials are set via environment variables
- All sensitive operations require authentication
- The system is ready for production with proper environment configuration
