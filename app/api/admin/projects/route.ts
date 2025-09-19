import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { projectStore } from "../../../../lib/projects";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

type TokenPayload = {
  email?: string;
  role?: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
};

// Middleware function to verify authentication
function verifyAuth(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    return null;
  }

  try {
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

// GET - Fetch all projects
export async function GET(request: NextRequest) {
  try {
    const user = verifyAuth(request);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      data: projectStore.getAll(),
    });
  } catch (error) {
    console.error("Projects GET error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new project
export async function POST(request: NextRequest) {
  try {
    const user = verifyAuth(request);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    type CreateBody = {
      title: string;
      category: string;
      description: string;
      imageUrl?: string;
      status: 'draft' | 'active' | 'completed';
      githubUrl: string;
      liveUrl: string;
      technologies?: string;
    };
    const body = (await request.json()) as CreateBody;
    const {
      title,
      category,
      description,
      imageUrl,
      status,
      githubUrl,
      liveUrl,
      technologies,
    } = body;

    // Validate required fields (including githubUrl and liveUrl)
    if (
      !title ||
      !category ||
      !description ||
      !status ||
      !githubUrl ||
      !liveUrl
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields: title, category, description, status, githubUrl, and liveUrl are all required",
        },
        { status: 400 }
      );
    }

    // Validate URL formats
    try {
      new URL(githubUrl);
      new URL(liveUrl);
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid URL format for githubUrl or liveUrl",
        },
        { status: 400 }
      );
    }

    // Create new project
    const newProject = {
      title,
      category,
      description,
      imageUrl:
        imageUrl ||
        "https://res.cloudinary.com/demo/image/upload/v1/portfolio-projects/default-project",
      status,
      githubUrl,
      liveUrl,
      technologies: technologies
        ? technologies.split(",").map((tech: string) => tech.trim())
        : [],
    };

    // Persist and get project with generated id
    const saved = projectStore.create(newProject as any);

    return NextResponse.json(
      {
        success: true,
        data: saved,
        message: "Project created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Projects POST error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update project
export async function PUT(request: NextRequest) {
  try {
    const user = verifyAuth(request);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    type UpdateBody = {
      id: number | string;
      title: string;
      category: string;
      description: string;
      imageUrl?: string;
      status: 'draft' | 'active' | 'completed';
      githubUrl: string;
      liveUrl: string;
      technologies?: string;
    };
    const body = (await request.json()) as UpdateBody;
    const {
      id,
      title,
      category,
      description,
      imageUrl,
      status,
      githubUrl,
      liveUrl,
      technologies,
    } = body;

    // Validate required fields (including githubUrl and liveUrl)
    if (
      !id ||
      !title ||
      !category ||
      !description ||
      !status ||
      !githubUrl ||
      !liveUrl
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields: id, title, category, description, status, githubUrl, and liveUrl are all required",
        },
        { status: 400 }
      );
    }

    // Validate URL formats
    try {
      new URL(githubUrl);
      new URL(liveUrl);
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid URL format for githubUrl or liveUrl",
        },
        { status: 400 }
      );
    }

    // Find and update project
    const updatedProject = projectStore.update(parseInt(String(id)), {
      title,
      category,
      description,
      imageUrl: imageUrl || undefined,
      status,
      githubUrl,
      liveUrl,
      technologies: technologies
        ? technologies.split(",").map((tech: string) => tech.trim())
        : undefined,
    });

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedProject,
      message: "Project updated successfully",
    });
  } catch (error) {
    console.error("Projects PUT error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete project
export async function DELETE(request: NextRequest) {
  try {
    const user = verifyAuth(request);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    const projectId = parseInt(id);
    const deleted = projectStore.delete(projectId);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Projects DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
