export type IOAuthUserInfo = {
  email: string;
  name: string;
  pictureUrl: string;
};

export interface IOAuthProvider {
  getToken(code: string): Promise<string>;
  getUserInfo(token: string): Promise<IOAuthUserInfo>;
}
