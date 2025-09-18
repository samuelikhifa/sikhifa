import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

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


    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("verifyAuth error:", error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = verifyAuth(request);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }


    const dashboardData = {
      totalProjects: 275,
      happyClients: 254,
      recentActivity: [
        {
          id: 1,
          action: "New project added",
          timestamp: new Date().toISOString(),
        },
        {
          id: 2,
          action: "Client feedback received",
          timestamp: new Date().toISOString(),
        },
        {
          id: 3,
          action: "Portfolio updated",
          timestamp: new Date().toISOString(),
        },
      ],
      analytics: {
        pageViews: 1247,
        uniqueVisitors: 892,
        conversionRate: 3.2,
      },
    };

    return NextResponse.json({
      success: true,
      data: dashboardData,
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
