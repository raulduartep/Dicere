interface IMailProvider {
  sendMail(data: { to: string; subject: string; html: string }): Promise<void>;
}

export { IMailProvider };
