import { EventEmitter } from '../../stencil-public-runtime';
import { selectOption, guestInfo, guestInfoValidation } from '../../common/models';
export declare class GuestInfo {
  Model: guestInfoValidation;
  gotdata: boolean;
  submit: boolean;
  submitForm: EventEmitter<guestInfo>;
  getSetupData: EventEmitter;
  setupDataCountries: selectOption[];
  setupDataCountriesCode: selectOption[];
  data: guestInfo;
  componentWillLoad(): void;
  watchHandler(): void;
  handleInputChange(event: any): void;
  handleSubmit(e: any): void;
  render(): any[];
}
