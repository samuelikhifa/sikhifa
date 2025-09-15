# Image Setup Guide

## Profile Picture Setup

1. **Replace the profile picture:**
   - Navigate to: `public/images/profile-picture.jpg`
   - Replace this file with your actual profile picture
   - Supported formats: JPG, PNG, WebP
   - Recommended size: 400x400 pixels or larger
   - Keep the same filename: `profile-picture.jpg`

2. **Alternative: Change the image path**
   - If you want to use a different filename or location, edit `app/page.tsx`
   - Find line with: `src="/images/profile-picture.jpg"`
   - Change to your preferred path

## Project Images Setup

The project images are loaded from your database via Cloudinary. The site is now configured to work with Cloudinary URLs.

### For New Projects:
1. Upload your project images to Cloudinary
2. Add the Cloudinary URL to your project's `imageUrl` field in the database
3. The images will automatically load with lazy loading and loading spinners

### Image Optimization Features:
- ✅ Lazy loading for all images
- ✅ Loading spinners while images load
- ✅ Fallback designs if images fail to load
- ✅ Responsive image sizing
- ✅ Cloudinary integration configured

## File Structure
```
public/
└── images/
    └── profile-picture.jpg  ← Replace with your photo
```

## Performance Features Added:
- Lazy loading for all images
- Loading spinners with smooth transitions
- Fallback designs for failed image loads
- Optimized image sizes for different screen sizes
- Cloudinary hostname configured in Next.js

## Troubleshooting:
- If images don't load, check the file path and format
- Ensure Cloudinary URLs are properly formatted
- Check browser console for any errors
- Verify that `next.config.ts` has the correct Cloudinary configuration 