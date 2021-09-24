import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

export class DayJsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().utc().toDate();
  }

  addDays(value: number, starting?: Date): Date {
    if (starting) {
      return dayjs(starting).utc().add(value, 'days').toDate();
    }

    return dayjs().utc().add(value, 'days').toDate();
  }

  addMinutes(minutes: number, starting?: Date): Date {
    if (starting) {
      return dayjs(starting).utc().add(minutes, 'minutes').toDate();
    }

    return dayjs().utc().add(minutes, 'minutes').toDate();
  }

  subDays(days: number, starting?: Date): Date {
    if (starting) {
      return dayjs(starting).utc().subtract(days, 'days').toDate();
    }

    return dayjs().utc().subtract(days, 'days').toDate();
  }

  getDate(date: string | Date): Date {
    return dayjs(date).utc().toDate();
  }
}
