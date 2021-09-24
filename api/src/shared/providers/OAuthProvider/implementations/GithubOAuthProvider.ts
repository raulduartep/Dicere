import axios from 'axios';

import { IOAuthProvider, IOAuthUserInfo } from '../IOAuthProvider';

type IResponseGetTokenGithub = {
  access_token?: string;
  error?: string;
};

type IResponseGetEmailsGithub = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
}[];

type IResponseGetUserGithub = {
  avatar_url: 'https://avatars.githubusercontent.com/u/62621701?v=4';
  name: 'Raul Duarte Pereira';
};

export class GithubOAuthProvider implements IOAuthProvider {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUri: string;

  constructor() {
    this.clientId = process.env.GITHUB_CLIENT_ID;
    this.clientSecret = process.env.GITHUB_CLIENT_SECRET;
    this.redirectUri = process.env.GITHUB_REDIRECT_URI;
  }

  async getToken(code: string): Promise<string> {
    const responseGetToken = await axios.post<IResponseGetTokenGithub>(
      'https://github.com/login/oauth/access_token',
      {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: this.redirectUri,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (responseGetToken.data.error) {
      throw new Error(responseGetToken.data.error);
    }

    const { access_token } = responseGetToken.data;

    return access_token;
  }

  async getUserInfo(token: string): Promise<IOAuthUserInfo> {
    const responseGetEmail = await axios.get<IResponseGetEmailsGithub>(
      'https://api.github.com/user/emails',
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );

    const { email } = responseGetEmail.data.find(data => data.primary === true);

    const responseGetUserInfo = await axios.get<IResponseGetUserGithub>(
      'https://api.github.com/user',
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );

    const { avatar_url, name } = responseGetUserInfo.data;

    return {
      email,
      name,
      pictureUrl: avatar_url,
    };
  }
}
