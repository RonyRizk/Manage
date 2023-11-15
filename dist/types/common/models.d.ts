import { Guest } from '../models/booking.dto';
export interface IrOnlineResource {
  isJS?: boolean;
  isCSS?: boolean;
  link?: string;
}
export declare class selectOption {
  value: string;
  text: string;
}
export declare class checkboxes {
  value: string;
  text: string;
  checked: boolean;
}
export declare class guestInfo {
  firstName: string;
  lastName: string;
  email: string;
  altEmail: string;
  password: string;
  country: number;
  city: string;
  address: string;
  mobile: string;
  prefix: string;
  newsletter: boolean;
  currency: string;
  language: string;
}
export declare class guestInfoValidation implements Guest {
  address: string;
  city: string;
  country_id: number;
  dob: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  mobile: string;
  subscribe_to_news_letter: boolean;
  firstNameValid: boolean;
  lastNameValid: boolean;
  emailValid: boolean;
  countryValid: boolean;
  passwordValid: boolean;
  mobileValid: boolean;
  prefixValid: boolean;
  setupData: boolean;
}
