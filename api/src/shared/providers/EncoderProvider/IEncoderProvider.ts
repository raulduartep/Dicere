export interface IEncoderProvider {
  encode(data: string): Promise<string>;
  compare(data: string, hashed: string): Promise<boolean>;
}
