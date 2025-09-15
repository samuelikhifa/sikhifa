import { NextRequest, NextResponse } from "next/server";
import { messageStore } from "../../../lib/messages";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Create message
    const newMessage = messageStore.create({
      name,
      email,
      subject,
      message,
    });

    // In a real app, you might want to send an email notification here
    console.log("New contact message:", { ...newMessage, message: "[HIDDEN]" });

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! I will get back to you soon.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact POST error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
