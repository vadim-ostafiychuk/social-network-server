export interface MailerServiceInterface {
  sendMail(to: string, subject: string, text: string): Promise<void>;
  sendHtmlMail(to: string, subject: string, html: string): Promise<void>;
}
