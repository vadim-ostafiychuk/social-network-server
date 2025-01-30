import { User } from "../entities/user.entity";
import { MailerServiceInterface } from "../interfaces/mailer-service.interface";
import { NodemailerService } from "./nodemailer.service";

export class UserMailService {
  private static instance: UserMailService;

  private constructor(private readonly mailerService: MailerServiceInterface) {}

  public static create(): UserMailService {
    if (!UserMailService.instance) {
      const nodemailerService = NodemailerService.create();

      UserMailService.instance = new UserMailService(nodemailerService);
    }
    return UserMailService.instance;
  }

  async sendRegistrationConfirmationEmail(user: User): Promise<void> {
    const subject = "Congratulations, your registration is complete!";
    const body = `Good day, ${user.email}! Your registration has been successfully completed. Thank you for joining our platform.`;
    await this.mailerService.sendMail(user.email, subject, body);
  }

  async sendPasswordResetEmail(user: User, resetToken: string): Promise<void> {
    const subject = "Password reset instructions";
    const body = `Good day, ${user.email}! To reset your password, please use the following link: ${resetToken}`;
    await this.mailerService.sendMail(user.email, subject, body);
  }
}
