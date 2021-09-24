import { readFile } from 'fs/promises';
import handlebars from 'handlebars';

import { IHTMLProvider } from '../IHTMLProvider';

export class HandlebarsHTMLProvider implements IHTMLProvider {
  async create<T = Record<string, unknown>>({
    variables,
    path,
  }: {
    variables: T;
    path: string;
  }): Promise<string> {
    const templateFileContent = await readFile(path, { encoding: 'utf-8' });

    const templateParse = handlebars.compile<T>(templateFileContent);

    const templateHTML = templateParse(variables);

    return templateHTML;
  }
}
