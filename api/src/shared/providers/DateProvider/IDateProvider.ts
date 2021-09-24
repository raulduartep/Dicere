export interface IDateProvider {
  dateNow(): Date;
  addDays(days: number, starting?: Date): Date;
  addMinutes(minutes: number, starting?: Date): Date;
  subDays(days: number, starting?: Date): Date;
  getDate(date: string | Date): Date;
}
