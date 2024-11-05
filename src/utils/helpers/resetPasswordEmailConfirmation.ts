import 'dotenv/config';
import nodemailer from 'nodemailer';
import { usrMessage } from '../messages/userMessages';

const PORT = process.env.PORT;
const HOST = process.env.ZOHO_SMTP_HOST;

export default async function resetPassEmail(email: string) {
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
    subject: usrMessage.success.resetPassEmailSub,
    text: usrMessage.success.resetPassEmail,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reset password email sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send reset password email to ${email}:`, error);
    throw new Error('Failed to send confirmation email');
  }
}
