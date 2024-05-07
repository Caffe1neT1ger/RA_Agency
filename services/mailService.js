import nodemailer from 'nodemailer';
import { message } from '../utils/message.js';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Mail.ru',
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendStatementMail(to, name, phone, email, text, consultation) {
    const statementType = consultation ? 'Консультация' : 'Семинар';
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: '',
      text: '',
      html: message(statementType, name, phone, email, text),
    });
  }
}

export default new MailService();
