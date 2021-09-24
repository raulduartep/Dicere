import { hash, compare } from 'bcrypt';

import { encoderConfig } from '@config/encoder';

import { IEncoderProvider } from '../IEncoderProvider';

export class BCryptEncoderProvider implements IEncoderProvider {
  private readonly rounds: number;

  constructor() {
    this.rounds = encoderConfig.rounds;
  }

  async encode(data: string): Promise<string> {
    const encodeString = await hash(data, this.rounds);

    return encodeString;
  }

  async compare(data: string, hashed: string): Promise<boolean> {
    const isEqual = await compare(data, hashed);

    return isEqual;
  }
}
