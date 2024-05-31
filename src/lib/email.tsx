"use server";

interface EmailData {
  sender: {
    name: string;
    email: string;
  };
  to: {
    name: string;
    email: string;
  }[];
  subject: string;
  htmlContent: string;
}

export default async function sendBookingConfirmationEmail(
  customerName: string,
  customerEmail: string,
  reservationId: string
): Promise<boolean> {
  const API_KEY: string = process.env.NEXT_PUBLIC_EMAIL_KEY;

  const confirmationEmailData: EmailData = {
    sender: { name: "Duality Management", email: "michael@duality.agency" },
    to: [{ name: customerName, email: customerEmail }],
    subject: "Booking Confirmation",
    htmlContent: `<html>
      <head></head>
      <body>
        <p>Dear ${customerName},</p>
        <p>Thank you for your booking. Your reservation has been confirmed.</p>
        <p>You can view your booking details using the link below:</p>
        <p><a href="https://duality-restaurant.vercel.app/reservation/${reservationId}">View your booking</a></p>
        <p>Best regards,</p>
        <p>Duality Management</p>
      </body>
    </html>`,
  };

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(confirmationEmailData),
    });

    if (!response.ok) {
      console.log("Error sending email:", response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    throw new Error(`Failed to send email: ${error}`);
  }
}
