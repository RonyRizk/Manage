import { EventEmitter } from '../../stencil-public-runtime';
import { selectOption, guestInfo, guestInfoValidation } from '../../common/models';
import { Guest } from '../../models/booking.dto';
export declare class GuestInfo {
  Model: guestInfoValidation;
  gotdata: boolean;
  submit: boolean;
  submitForm: EventEmitter<guestInfo>;
  getSetupData: EventEmitter;
  setupDataCountries: selectOption[];
  setupDataCountriesCode: selectOption[];
  data: Guest;
  componentWillLoad(): void;
  watchHandler(): void;
  handleInputChange(event: any): void;
  handleSubmit(e: any): void;
  render(): any[];
}
