import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { messageStore } from '../../../../lib/messages';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware function to verify authentication
function verifyAuth(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // Check if token is expired
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return decoded;
  } catch (error) {
    return null;
  }
}

// GET - Fetch all messages
export async function GET(request: NextRequest) {
  try {
    const user = verifyAuth(request);

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized access' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      data: messageStore.getAll()
    });
  } catch (error) {
    console.error('Messages GET error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update message status or reply
export async function PUT(request: NextRequest) {
  try {
    const user = verifyAuth(request);

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized access' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, action, status, replyMessage } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Message ID is required' },
        { status: 400 }
      );
    }

    let updatedMessage = null;

    if (action === 'updateStatus' && status) {
      updatedMessage = messageStore.updateStatus(id, status);
    } else if (action === 'reply' && replyMessage) {
      updatedMessage = messageStore.reply(id, replyMessage);
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid action or missing data' },
        { status: 400 }
      );
    }

    if (!updatedMessage) {
      return NextResponse.json(
        { success: false, message: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedMessage,
      message: 'Message updated successfully'
    });
  } catch (error) {
    console.error('Messages PUT error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete message
export async function DELETE(request: NextRequest) {
  try {
    const user = verifyAuth(request);

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized access' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Message ID is required' },
        { status: 400 }
      );
    }

    const deleted = messageStore.delete(id);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Messages DELETE error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 