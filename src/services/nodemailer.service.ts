import nodemailer from "nodemailer";
import { MailerServiceInterface } from "../interfaces/mailer-service.interface";

export class NodemailerService implements MailerServiceInterface {
  private static instance: NodemailerService;
  private transporter: nodemailer.Transporter;

  private constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  public static create(): NodemailerService {
    if (!NodemailerService.instance) {
      NodemailerService.instance = new NodemailerService();
    }
    return NodemailerService.instance;
  }

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log("Лист успішно надіслано на: ", to);
    } catch (error) {
      console.error("Помилка при відправці листа:", error);
      throw new Error("Не вдалося надіслати листа");
    }
  }

  async sendHtmlMail(to: string, subject: string, html: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log("HTML лист успішно надіслано на: ", to);
    } catch (error) {
      console.error("Помилка при відправці HTML листа:", error);
      throw new Error("Не вдалося надіслати HTML листа");
    }
  }
}
