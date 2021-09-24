import crypto from 'crypto';
import fs, { createWriteStream } from 'fs';
import { resolve } from 'path';
import { Readable, promises as streamPromises } from 'stream';

import { storageConfig } from '@config/storage';

import { IStorageProvider, IFile } from '../IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
  async save(file: IFile, folder: string): Promise<string> {
    const hash = crypto.randomBytes(16);
    const filename = `${hash.toString('hex')}-${file.filename}`;

    const filePath = resolve(`${storageConfig.path}/${folder}`, filename);

    const readStream = Readable.from(file.content);

    await streamPromises.pipeline(readStream, createWriteStream(filePath));

    return filename;
  }
  async delete(file: string, folder: string): Promise<void> {
    const filePath = resolve(`${storageConfig.path}/${folder}`, file);

    try {
      await fs.promises.stat(filePath);
    } catch (error) {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export { LocalStorageProvider };
