export type IFile = {
  filename: string;
  content: Buffer;
};

export interface IStorageProvider {
  save(file: IFile, folder: string): Promise<string>;
  delete(file: string, folder: string): Promise<void>;
}
