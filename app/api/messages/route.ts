import { NextRequest, NextResponse } from 'next/server';

// Mock database for messages - in production, use Prisma
let messages = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    message: "Hi R2, I love your portfolio! Would you be interested in working on our new mobile app?",
    createdAt: new Date().toISOString(),
    read: false
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@company.com",
    message: "Your UI/UX work is amazing. We're looking for a designer for our e-commerce platform.",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    read: true
  }
];

// POST - Create new message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Create new message
    const newMessage = {
      id: messages.length + 1,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      read: false
    };

    messages.push(newMessage);

    return NextResponse.json({
      success: true,
      data: newMessage,
      message: 'Message sent successfully! I\'ll get back to you soon.'
    }, { status: 201 });
  } catch (error) {
    console.error('Messages POST error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}

// GET - Fetch all messages (admin only)
export async function GET(request: NextRequest) {
  try {
    // In production, verify admin authentication here
    // For now, we'll allow GET requests for development
    
    return NextResponse.json({
      success: true,
      data: messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    });
  } catch (error) {
    console.error('Messages GET error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
} 