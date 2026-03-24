import nodemailer from "nodemailer";
import { env } from "./env";
import { AppError } from "../utils/AppError";

interface SendMailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export const mailTransporter = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: Number(env.MAIL_PORT) || 587,
  secure: false,
  auth: {
    user: env.MAIL_USERNAME,
    pass: env.MAIL_PASSWORD,
  },
});

export const sendMail = async (options: SendMailOptions) => {
  try {
    const info = await mailTransporter.sendMail({
      from: `"${env.APP_NAME}" <${env.MAIL_USERNAME}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    return info;
  } catch (error) {
    console.error("Mail Error:", error);
    throw new AppError("Failed to send email", 500, "InternalServerError");
  }
};
