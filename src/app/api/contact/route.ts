import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Parse request data
    const data = await req.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Try to save to database
    let contactId = null;
    try {
      const contact = await prisma.contact.create({ data });
      contactId = contact.id;
      console.log("Contact saved to database successfully, ID:", contactId);
    } catch (dbError:any) {
      console.warn("Database save failed, continuing with email:", dbError.message);
    }

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "qq",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "lyn668@gmail.com",
      subject: "New Contact Form Submission - Business Website",
      html: `
        <h2>New Contact Form Submission</h2>
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <p><strong>Contact Details:</strong></p>
          <ul>
            <li><strong>Name:</strong> ${data.name}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Company:</strong> ${data.company || 'Not provided'}</li>
            <li><strong>Address:</strong> ${data.address || 'Not provided'}</li>
            <li><strong>Phone:</strong> ${data.phone || 'Not provided'}</li>
            <li><strong>Website:</strong> ${data.website || 'Not provided'}</li>
          </ul>
          
          <p><strong>Message:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
          
          <hr>
          <p style="color: #666; font-size: 12px;">
            Submitted on: ${new Date().toLocaleString('en-US', { 
              timeZone: 'UTC',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })} UTC
            ${contactId ? `<br>Database ID: ${contactId}` : ''}
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Contact Details:
- Name: ${data.name}
- Email: ${data.email}
- Company: ${data.company || 'Not provided'}
- Address: ${data.address || 'Not provided'}
- Phone: ${data.phone || 'Not provided'}
- Website: ${data.website || 'Not provided'}

Message:
${data.message}

Submitted on: ${new Date().toISOString()}
${contactId ? `Database ID: ${contactId}` : ''}
      `,
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully to:", mailOptions.to);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      return NextResponse.json(
        { error: "Failed to send notification email. Please try again later." },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json({ 
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error("Contact form API error:", error);
    
    return NextResponse.json(
      { 
        error: "An unexpected error occurred. Please try again later or contact us directly.",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined

      },
      { status: 500 }
    );
  } finally {
    // Ensure Prisma client is disconnected
    await prisma.$disconnect();
  }
}

// Handle GET requests (optional - for testing)
export async function GET() {
  return NextResponse.json({ 
    message: "Contact API endpoint is working",
    methods: ["POST"],
    timestamp: new Date().toISOString()
  });
}