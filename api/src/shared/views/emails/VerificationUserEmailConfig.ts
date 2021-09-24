import { resolve } from 'path';

export type VerificationUserVariables = {
  email: string;
  link: string;
};

const path = resolve(__dirname, 'verificationUser.hbs');
const subject = 'Verificação de Usuário';

export const verificationUserEmailConfig = {
  path,
  subject,
};
