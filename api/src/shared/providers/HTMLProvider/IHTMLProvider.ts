export interface IHTMLProvider {
  create<T = Record<string, unknown>>(data: {
    variables: T;
    path: string;
  }): Promise<string>;
}
