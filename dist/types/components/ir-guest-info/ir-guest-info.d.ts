import { EventEmitter } from '../../stencil-public-runtime';
import { selectOption } from "../../common/models";
import { Guest } from "../../models/booking.dto";
import { ICountry, Languages } from "../../components";
export declare class GuestInfo {
  setupDataCountries: selectOption[];
  setupDataCountriesCode: selectOption[];
  defaultTexts: Languages;
  language: string;
  email: string;
  booking_nbr: string;
  countries: ICountry[];
  submit: boolean;
  guest: Guest | null;
  isLoading: boolean;
  closeSideBar: EventEmitter<null>;
  private bookingService;
  componentWillLoad(): Promise<void>;
  init(): Promise<void>;
  handleInputChange(key: keyof Guest, value: any): void;
  editGuest(): Promise<void>;
  render(): any[];
}
