import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import cloudinary from "../../../../lib/cloudinary";
import type { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Middleware function to verify authentication
function verifyAuth(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    return null;
  }

  try {
    type TokenPayload = {
      email?: string;
      role?: string;
      exp?: number;
      iat?: number;
      [key: string]: unknown;
    };
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

    // Check if token is expired
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("verifyAuth error:", error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = verifyAuth(request);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No image file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid file type. Only JPEG, PNG, and WebP are allowed.",
        },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message: "File size too large. Maximum size is 10MB.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "portfolio-projects",
            resource_type: "image",
            transformation: [
              { width: 800, height: 600, crop: "fill" },
              { quality: "auto" },
            ],
          },
          (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (error) return reject(error);
            if (!result) return reject(new Error("Cloudinary upload returned no result"));
            resolve(result);
          }
        )
        .end(buffer);
    });

    return NextResponse.json({
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
      },
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload image" },
      { status: 500 }
    );
  }
}
