import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  const missing = [
    !CLOUDINARY_CLOUD_NAME ? "CLOUDINARY_CLOUD_NAME" : null,
    !CLOUDINARY_API_KEY ? "CLOUDINARY_API_KEY" : null,
    !CLOUDINARY_API_SECRET ? "CLOUDINARY_API_SECRET" : null,
  ].filter(Boolean) as string[];
  // Do not log actual secret values. Only list which keys are missing.
  throw new Error(
    `[Cloudinary] Missing required environment variables: ${missing.join(", ")}. ` +
      `Ensure these are configured in your hosting provider's environment settings (e.g., Production env on Vercel/Render/Netlify) and redeploy.`
  );
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export default cloudinary;
