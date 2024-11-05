import 'dotenv/config';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const PORT = process.env.PORT;
const HOST = process.env.ZOHO_SMTP_HOST;

export async function generateConfirmationToken(): Promise<string> {
  const string = await crypto.randomBytes(32).toString('hex');
  return string;
}

export default async function sendConfirmationEmail(
  email: string,
  token: string,
) {
  const transporter = nodemailer.createTransport({
    host: HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_MAIL_USER,
      pass: process.env.ZOHO_MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'greenthumbhub@zohomail.com',
    to: email,
    subject: 'Important: Confirm your registration',
    text: `Please confirm your registration by clicking the following link: http://localhost:${PORT}/confirm/${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send confirmation email to ${email}:`, error);
    throw new Error('Failed to send confirmation email');
  }
}
