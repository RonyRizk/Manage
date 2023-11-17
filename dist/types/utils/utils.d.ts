import IBooking, { ICountry, PhysicalRoomType } from '../models/IBooking';
export declare function convertDateToCustomFormat(dayWithWeekday: string, monthWithYear: string): string;
export declare function convertDateToTime(dayWithWeekday: string, monthWithYear: string): number;
export declare function dateDifference(FROM_DATE: string, TO_DATE: string): number;
export declare const getBrowserLanguage: () => string;
export declare const transformBooking: (physicalRoom: PhysicalRoomType[]) => IBooking[];
export declare function dateToFormattedString(date: Date): string;
export declare function formatLegendColors(legendData: any): any;
export declare function getCurrencySymbol(currencyCode: any): string;
export declare const findCountry: (id: number, countries: ICountry[]) => ICountry;
export declare function getReleaseHoursString(releaseDate: number): {
  BLOCKED_TILL_DATE: string;
  BLOCKED_TILL_HOUR: string;
  BLOCKED_TILL_MINUTE: string;
};
export declare function computeEndDate(startDate: string, numberOfDays: number): string;
export declare function convertDMYToISO(date: string): string;
