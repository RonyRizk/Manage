import { IPayment } from "../models/booking.dto";
import { Token } from "../models/Token";
export declare class PaymentService extends Token {
  AddPayment(payment: IPayment, book_nbr: string): Promise<any>;
  CancelPayment(id: number): Promise<any>;
}
