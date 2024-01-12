import { IPayment } from "../models/booking.dto";
export declare class PaymentService {
  AddPayment(payment: IPayment, book_nbr: string): Promise<any>;
  CancelPayment(id: number): Promise<any>;
}
