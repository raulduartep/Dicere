import { resolve } from 'path';

export type ForgotPasswordVariables = {
  email: string;
  link: string;
};

const path = resolve(__dirname, 'forgotPassword.hbs');
const subject = 'Recuperação de senha';

export const forgotPasswordEmailConfig = {
  path,
  subject,
};
