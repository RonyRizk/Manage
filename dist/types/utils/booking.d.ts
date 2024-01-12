import { MonthType, RoomBookingDetails, RoomBlockDetails } from '../models/IBooking';
export declare function getMyBookings(months: MonthType[]): Promise<any[]>;
export declare function formatName(firstName: string | null, lastName: string | null): string;
export declare function transformNewBooking(data: any): RoomBookingDetails[];
export declare function transformNewBLockedRooms(data: any): Promise<RoomBlockDetails>;
