import { OAuth2Client } from 'google-auth-library';

import { IOAuthProvider, IOAuthUserInfo } from '../IOAuthProvider';

export class GoogleOAuthProvider implements IOAuthProvider {
  private readonly clientId: string;

  private readonly client: OAuth2Client;

  constructor() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;

    this.clientId = clientId;
    this.client = new OAuth2Client({
      clientId,
      clientSecret,
      redirectUri,
    });
  }

  async getToken(code: string): Promise<string> {
    const {
      tokens: { id_token },
    } = await this.client.getToken(code);

    return id_token;
  }

  async getUserInfo(token: string): Promise<IOAuthUserInfo> {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: this.clientId,
    });

    const { email, name, picture } = ticket.getPayload();

    return {
      email,
      name,
      pictureUrl: picture,
    };
  }
}
