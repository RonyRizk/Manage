import { EventEmitter } from '../../../stencil-public-runtime';
import { ICountry } from '../../../models/IBooking';
export declare class IglPropertyBookedBy {
  language: string;
  defaultTexts: any;
  showPaymentDetails: boolean;
  defaultData: {
    [key: string]: any;
  };
  dataUpdateEvent: EventEmitter<{
    [key: string]: any;
  }>;
  countryNodeList: ICountry[];
  propertyId: number;
  private bookingService;
  private arrivalTimeList;
  private expiryMonths;
  private expiryYears;
  private currentMonth;
  private country;
  bookedByData: {
    [key: string]: any;
  };
  componentWillLoad(): Promise<void>;
  private initializeExpiryYears;
  private assignCountryCode;
  private initializeDateData;
  private populateBookedByData;
  handleDataChange(key: any, event: any): void;
  handleNumberInput(key: any, event: InputEvent): void;
  handleEmailInput(key: any, event: InputEvent): Promise<void>;
  checkUser(): Promise<void>;
  isValidEmail(emailId: any): boolean;
  handleComboboxChange(e: CustomEvent): void;
  clearEvent(): void;
  render(): any;
}
