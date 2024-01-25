import { DayData } from "../models/DayType";
export interface ICalendarDates {
  days: DayData[];
  months: {
    daysCount: number;
    monthName: string;
  }[];
}
export declare const calendar_dates: ICalendarDates, onCalendarDatesChange: import("@stencil/store/dist/types").OnChangeHandler<ICalendarDates>;
export default calendar_dates;
