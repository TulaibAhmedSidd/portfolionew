import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { ContactMessage } from '@/models/Portfolio';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        await connectDB();
        const data = await req.json();

        // Basic validation
        if (!data.name || !data.email || !data.message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Save to Database
        const message = await ContactMessage.create(data);

        // Send Email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_EMAIL, // Must match the authenticated account
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_EMAIL, // Always send from the authenticated address to avoid spam blocks
            to: 'tulluahsid@gmail.com', // Destination address
            replyTo: data.email, // Allow replying directly to the sender
            subject: `New Portfolio Message: ${data.subject || 'No Subject'}`,
            text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
            html: `
                <h3>New Message from Portfolio</h3>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Subject:</strong> ${data.subject}</p>
                <br/>
                <p><strong>Message:</strong></p>
                <p>${data.message.replace(/\n/g, '<br>')}</p>
            `,
        };

        // Only send if password is set, otherwise just log (dev mode)
        if (process.env.SMTP_PASSWORD) {
            await transporter.sendMail(mailOptions);
        } else {
            console.log("SMTP_PASSWORD not set. Email not sent, only saved to DB.");
        }

        return NextResponse.json({ message: 'Message sent successfully!', data: message }, { status: 201 });
    } catch (error: any) {
        console.error("Contact Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const messages = await ContactMessage.find().sort({ createdAt: -1 });
        return NextResponse.json(messages);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
