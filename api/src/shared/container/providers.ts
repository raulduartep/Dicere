import { container } from 'tsyringe';

import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { DayJsDateProvider } from '@shared/providers/DateProvider/implementations/DayJsDateProvider';
import { IEncoderProvider } from '@shared/providers/EncoderProvider/IEncoderProvider';
import { BCryptEncoderProvider } from '@shared/providers/EncoderProvider/implementations/BCryptEncoderProvider';
import { IHTMLProvider } from '@shared/providers/HTMLProvider/IHTMLProvider';
import { HandlebarsHTMLProvider } from '@shared/providers/HTMLProvider/implementations/HandlebarsHTMLProvider';
import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider';
import { EtherealMailProvider } from '@shared/providers/MailProvider/implementations/EtherealMailProvider';
import { LocalStorageProvider } from '@shared/providers/StorageProvider/implementations/LocalStorageProvider';
import { IStorageProvider } from '@shared/providers/StorageProvider/IStorageProvider';
import { JWTTokenManagerProvider } from '@shared/providers/TokenManagerProvider/implementations/JWTTokenManagerProvider';
import { ITokenManagerProvider } from '@shared/providers/TokenManagerProvider/ITokenManagerProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayJsDateProvider);

container.registerInstance<IEncoderProvider>(
  'EncoderProvider',
  new BCryptEncoderProvider()
);

container.registerInstance<ITokenManagerProvider>(
  'TokenManagerProvider',
  new JWTTokenManagerProvider()
);

container.registerInstance<IStorageProvider>(
  'StorageProvider',
  new LocalStorageProvider()
);

container.registerInstance<IDateProvider>(
  'DateProvider',
  new DayJsDateProvider()
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider()
);

container.registerInstance<IHTMLProvider>(
  'HTMLProvider',
  new HandlebarsHTMLProvider()
);
