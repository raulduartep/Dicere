import nodemailer, { Transporter } from 'nodemailer';

export class EtherealMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        this.client = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
      })
      .catch(err => console.error(err));
  }

  async sendMail({
    subject,
    to,
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    const from = process.env.EMAIL_FROM;

    const message = await this.client.sendMail({
      to,
      from,
      subject,
      html,
    });

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
