import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = "service@jandeexpresstransportation.com";
const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const firstName = (body.firstName || "").toString().trim();
    const lastName = (body.lastName || "").toString().trim();
    const phone = (body.phone || "").toString().trim();
    const companyName = (body.companyName || "").toString().trim();
    const email = (body.email || "").toString().trim();
    const message = (body.message || "").toString().trim();

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "First name, last name, and email are required." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      reply_to: email || undefined,
      subject: `New quote request from ${firstName} ${lastName}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Company:</strong> ${companyName || "N/A"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message || "N/A"}</p>
      `,
    });

    const accept = request.headers.get("accept") || "";
    const redirectUrl = new URL(request.url);
    redirectUrl.pathname = "/";
    redirectUrl.hash = "contact";
    redirectUrl.searchParams.set("status", "sent");

    if (!accept.includes("application/json")) {
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("contact route error", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
