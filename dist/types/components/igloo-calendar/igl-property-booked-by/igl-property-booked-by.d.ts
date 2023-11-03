import { EventEmitter } from "../../../stencil-public-runtime";
import { ICountry } from "../../../models/IBooking";
export declare class IglPropertyBookedBy {
  language: string;
  defaultData: {
    [key: string]: any;
  };
  dataUpdateEvent: EventEmitter<{
    [key: string]: any;
  }>;
  private bookingService;
  private arrivalTimeList;
  countryNodeList: ICountry[];
  private expiryMonths;
  private expiryYears;
  private currentMonth;
  bookedByData: {
    [key: string]: any;
  };
  componentWillLoad(): Promise<void>;
  private initializeExpiryYears;
  private initializeDateData;
  private populateBookedByData;
  handleDataChange(key: any, event: any): void;
  handleNumberInput(key: any, event: InputEvent): void;
  handleEmailInput(key: any, event: InputEvent): Promise<void>;
  checkUser(): Promise<void>;
  isValidEmail(emailId: any): boolean;
  render(): any;
}
