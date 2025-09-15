import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false, message: "No token found" },
        { status: 401 }
      );
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;

      // Check if token is expired
      if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
        return NextResponse.json(
          { authenticated: false, message: "Token expired" },
          { status: 401 }
        );
      }

      return NextResponse.json({
        authenticated: true,
        user: {
          email: decoded.email,
          role: decoded.role,
        },
      });
    } catch (jwtError) {
      return NextResponse.json(
        { authenticated: false, message: "Invalid token" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { authenticated: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
