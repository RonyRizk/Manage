import { BookingDetails, IBlockUnit, ICountry, IEntries, ISetupEntries } from "../models/IBooking";
export declare class BookingService {
  getCalendarData(propertyid: number, from_date: string, to_date: string): Promise<{
    [key: string]: any;
  }>;
  getBookingAvailability(from_date: string, to_date: string, propertyid: number, language: string, room_type_ids: number[], currency: {
    id: number;
    code: string;
  }): Promise<BookingDetails>;
  getCountries(language: string): Promise<ICountry[]>;
  fetchSetupEntries(): Promise<ISetupEntries>;
  getBlockedInfo(): Promise<IEntries[]>;
  blockUnit(params: IBlockUnit): Promise<any>;
  getUserInfo(email: string): Promise<any>;
  private generateDays;
  bookUser(bookedByInfoData: any, assign_units: boolean, fromDate: Date, toDate: Date, guestData: any, totalNights: number, source: {
    code: string;
    description: string;
  }, propertyid: number, currency: {
    id: number;
    code: string;
  }, bookingNumber?: string, defaultGuest?: any, arrivalTime?: any, pr_id?: number): Promise<any>;
}
