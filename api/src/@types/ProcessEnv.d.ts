/* eslint-disable @typescript-eslint/naming-convention */

declare namespace NodeJS {
  interface ProcessEnv {
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_HOST: string;
    DB_TYPE: string;
    SERVER_URL: string;
    SERVER_PORT: number;
    ACCESS_TOKEN_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_REDIRECT_URI: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    GITHUB_REDIRECT_URI: string;
    EMAIL_FROM: string;
    FORGOT_MAIL_URL: string;
    STATIC_URL: string;
  }
}
