# Cloudinary Setup for Image Uploads

This guide explains how to set up Cloudinary for image uploads in the admin dashboard.

## 🔧 Setup Instructions

### 1. Create Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/) and sign up for a free account
2. Verify your email and complete the registration

### 2. Get Your Credentials

After logging in to Cloudinary:

1. Go to your **Dashboard**
2. Copy the following credentials:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 3. Environment Variables

Create or update your `.env.local` file in the project root:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# Authentication Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_EMAIL=admin@r2ruman.com
ADMIN_PASSWORD=admin123

# Environment
NODE_ENV=development
```

### 4. Features

The image upload system includes:

- **File Type Validation**: JPEG, PNG, WebP
- **File Size Limit**: 5MB maximum
- **Automatic Optimization**: Images are resized to 800x600 and optimized
- **Secure Upload**: Only authenticated admin users can upload
- **Image Preview**: Real-time preview before upload
- **Cloud Storage**: Images stored in Cloudinary's secure cloud

### 5. Usage

1. **Login** to the admin dashboard
2. **Navigate** to the Projects tab
3. **Add/Edit** a project
4. **Select** an image file
5. **Upload** - the image will be automatically processed and stored

### 6. API Endpoints

- `POST /api/admin/upload` - Upload image to Cloudinary
- `GET /api/admin/projects` - Fetch projects with image URLs
- `POST /api/admin/projects` - Create project with image
- `PUT /api/admin/projects` - Update project with image

### 7. Image Transformations

Images are automatically:
- Resized to 800x600 pixels
- Optimized for web delivery
- Stored in the `portfolio-projects` folder
- Served via HTTPS

### 8. Security

- **Authentication Required**: Only logged-in admin users can upload
- **File Validation**: Type and size checks
- **Secure URLs**: Images served via HTTPS
- **Environment Variables**: Credentials stored securely

## 🚀 Production Deployment

For production:

1. **Update Environment Variables** with production Cloudinary credentials
2. **Set NODE_ENV=production**
3. **Use HTTPS** for secure image delivery
4. **Monitor Usage** in Cloudinary dashboard

## 📝 Notes

- Free Cloudinary accounts include 25GB storage and 25GB bandwidth
- Images are automatically optimized for performance
- All uploads are logged in Cloudinary dashboard
- Backup your Cloudinary credentials securely 