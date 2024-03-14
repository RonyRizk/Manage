import { ICountry } from "../../components";
import { EventEmitter } from '../../stencil-public-runtime';
export declare class IrPhoneInput {
  el: HTMLElement;
  label: string;
  value: string;
  disabled: boolean;
  error: boolean;
  token: string;
  language: string;
  default_country: number;
  phone_prefix: string | null;
  placeholder: string;
  textChange: EventEmitter<{
    phone_prefix: string;
    mobile: string;
  }>;
  inputValue: string;
  isDropdownVisible: boolean;
  currentCountry: ICountry;
  private countries;
  private bookingService;
  componentWillLoad(): Promise<void>;
  handleDocumentClick(event: MouseEvent): void;
  handleInputChange(e: InputEvent): void;
  setCountryFromPhonePrefix(): void;
  setCurrentCountry(id: number): void;
  render(): any;
}
