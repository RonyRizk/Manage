import calendar_data from "../../../../../src/stores/calendar-data";
import locales from "../../../../../src/stores/locales.store";
import { Fragment, Host, h } from "@stencil/core";
import moment from "moment";
import { PickupService } from "./pickup.service";
export class IrPickup {
  constructor() {
    this.pickupService = new PickupService();
    this.defaultPickupData = undefined;
    this.numberOfPersons = 0;
    this.bookingNumber = undefined;
    this.isLoading = false;
    this.allowedOptionsByLocation = [];
    this.pickupData = {
      location: '',
      flight_details: '',
      due_upon_booking: '',
      number_of_vehicles: 1,
      vehicle_type_code: '',
      currency: undefined,
      arrival_time: '',
      arrival_date: '',
      selected_option: undefined,
    };
    this.vehicleCapacity = 1;
    this.cause = null;
  }
  handleLocationChange(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const value = event.detail;
    if (value !== '') {
      this.allowedOptionsByLocation = calendar_data.pickup_service.allowed_options.filter(option => option.location.id.toString() === value);
      let locationChoice = this.allowedOptionsByLocation[0];
      if (!locationChoice) {
        return;
      }
      locationChoice.currency;
      this.pickupData = Object.assign(Object.assign({}, this.pickupData), { location: value, selected_option: locationChoice, due_upon_booking: this.pickupService
          .updateDue({
          amount: locationChoice.amount,
          code: locationChoice.pricing_model.code,
          numberOfPersons: this.numberOfPersons,
          number_of_vehicles: this.pickupData.number_of_vehicles,
        })
          .toFixed(2), vehicle_type_code: locationChoice.vehicle.code, currency: locationChoice.currency });
      const input = this.el.querySelector('#pickup-time');
      if (!input) {
        setTimeout(() => {
          this.initializeInputMask();
        }, 100);
      }
    }
  }
  initializeInputMask() {
    const input = this.el.querySelector('#pickup-time');
    if (input) {
      Inputmask('Hh:mm', {
        placeholder: 'HH:mm',
        definitions: {
          H: {
            validator: '[0-1]',
          },
          h: {
            validator: '[0-9]',
          },
          M: {
            validator: '[0-5]',
          },
          m: {
            validator: '[0-9]',
          },
        },
        insertMode: true,
        showMaskOnHover: false,
        inputmode: 'numeric',
        alias: 'datetime',
        oncomplete: () => {
          this.updatePickupData('arrival_time', input.value);
        },
        oncleared: function () {
          this.updatePickupData('arrival_time', '');
        },
        onincomplete: function () {
          this.updatePickupData('arrival_time', input.value);
        },
      }).mask(input);
    }
  }
  handleVehicleTypeChange(e) {
    if (e.detail === '') {
      this.pickupData = Object.assign(Object.assign({}, this.pickupData), { due_upon_booking: '', vehicle_type_code: '' });
      return;
    }
    let locationChoice = calendar_data.pickup_service.allowed_options.find(option => option.location.id.toString() === this.pickupData.location && option.vehicle.code === e.detail);
    this.pickupData = Object.assign(Object.assign({}, this.pickupData), { due_upon_booking: this.pickupService
        .updateDue({
        amount: locationChoice.amount,
        code: locationChoice.pricing_model.code,
        numberOfPersons: this.numberOfPersons,
        number_of_vehicles: this.pickupData.number_of_vehicles,
      })
        .toFixed(2), vehicle_type_code: locationChoice.vehicle.code });
  }
  updatePickupData(key, value) {
    this.pickupData = Object.assign(Object.assign({}, this.pickupData), { [key]: value });
  }
  async savePickup() {
    try {
      this.isLoading = true;
      const isValid = this.pickupService.validateForm(this.pickupData);
      console.log(isValid);
      if (isValid.error) {
        this.cause = isValid.cause;
        return;
      }
      if (this.cause) {
        this.cause = null;
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      this.isLoading = false;
    }
  }
  render() {
    return (h(Host, { class: 'p-0' }, h("div", { class: "position-sticky mb-0 shadow-none p-0" }, h("div", { class: "d-flex mt-2 align-items-center justify-content-between" }, h("h3", { class: "card-title text-left pb-1 font-medium-2 px-2 px-md-3" }, locales.entries.Lcz_Pickup))), h("section", { class: 'px-2 px-md-3' }, h("ir-select", { onSelectChange: this.handleLocationChange.bind(this), firstOption: locales.entries.Lcz_Pickup_NoThankYou, class: 'm-0 ', LabelAvailable: false, data: calendar_data.pickup_service.allowed_locations.map(location => ({
        text: locales.entries.Lcz_Pickup_YesFrom + ' ' + location.description,
        value: location.id,
      })) }), this.pickupData.location && (h(Fragment, null, h("div", { class: 'd-flex' }, h("div", { class: "form-group  mr-1" }, h("div", { class: "input-group row m-0" }, h("div", { class: `input-group-prepend col-5 p-0 text-dark border-0` }, h("label", { class: `input-group-text  bg-light flex-grow-1 text-dark border-0 ` }, locales.entries.Lcz_ArrivalDate)), h("div", { class: "form-control form-control-md col-7 d-flex align-items-center pl-0" }, h("ir-date-picker", { minDate: moment().format('YYYY-MM-DD'), autoApply: true, format: "ddd, DD M YYYY", singleDatePicker: true, onDateChanged: evt => {
        this.updatePickupData('arrival_date', evt.detail.start.format('YYYY-MM-DD'));
      } })))), h("div", { class: "form-group" }, h("div", { class: "input-group  row m-0" }, h("div", { class: `input-group-prepend col-4 col-sm-3 p-0 text-dark border-0` }, h("label", { htmlFor: "pickup", class: `input-group-text  bg-light flex-grow-1 text-dark border-0` }, locales.entries.Lcz_Time)), h("input", { value: this.pickupData.arrival_time, type: "text", id: "pickup-time", class: `form-control col-8 col-sm-4 ${this.cause === 'arrival_time' && 'border-danger'}` })))), h("ir-input-text", { label: locales.entries.Lcz_FlightDetails, onTextChange: e => this.updatePickupData('flight_details', e.detail), placeholder: "", inputStyles: this.cause === 'flight_details' ? 'border-danger' : '' }), h("ir-select", { selectStyles: this.cause === 'vehicle_type_code' ? 'border-danger' : '', onSelectChange: this.handleVehicleTypeChange.bind(this), firstOption: locales.entries.Lcz_Select, selectedValue: this.pickupData.vehicle_type_code, class: 'm-0', LabelAvailable: false, data: this.allowedOptionsByLocation.map(option => ({
        text: option.vehicle.description,
        value: option.vehicle.code,
      })) }), h("div", { class: 'd-flex flex-column flex-md-row' }, h("ir-select", { selectStyles: this.cause === 'number_of_vehicles' ? 'border-danger' : '', selectedValue: this.pickupData.number_of_vehicles, labelWidth: 6, class: 'm-0  mb-md-0 mr-md-1 flex-fill', label: locales.entries.Lcz_NbrOfVehicles, data: Array.from({ length: this.vehicleCapacity + 1 }, (_, i) => i + 1).map(i => ({
        text: i,
        value: i,
      })) }), h("ir-input-text", { readonly: true, value: this.pickupData.due_upon_booking, labelWidth: 6, label: `${locales.entries.Lcz_DueUponBooking}  ${this.pickupData.currency.symbol}`, placeholder: "", class: "" })))), h("div", { class: 'd-flex flex-column flex-md-row mt-3' }, h("ir-button", { onClick: () => this.closeModal.emit(null), btn_styles: "justify-content-center", class: `mb-1 mb-md-0  flex-fill ${this.pickupData.location ? 'mr-md-1' : ''}`, icon: "", text: locales.entries.Lcz_Cancel, btn_color: "secondary" }), this.pickupData.location && (h("ir-button", { btn_styles: "justify-content-center align-items-center", class: 'm-0 flex-fill text-center', icon: "", isLoading: this.isLoading, text: locales.entries.Lcz_Save, btn_color: "primary", onClick: this.savePickup.bind(this) }))))));
  }
  static get is() { return "ir-pickup"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-pickup.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-pickup.css"]
    };
  }
  static get properties() {
    return {
      "defaultPickupData": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "TPickupData",
          "resolved": "{ location: string; flight_details: string; due_upon_booking: string; number_of_vehicles: number; vehicle_type_code: string; currency: IPickupCurrency; arrival_time: string; arrival_date: string; selected_option: IAllowedOptions; }",
          "references": {
            "TPickupData": {
              "location": "import",
              "path": "./types",
              "id": "src/components/ir-booking-details/ir-pickup/types.ts::TPickupData"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "numberOfPersons": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "number-of-persons",
        "reflect": false,
        "defaultValue": "0"
      },
      "bookingNumber": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "booking-number",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "isLoading": {},
      "allowedOptionsByLocation": {},
      "pickupData": {},
      "vehicleCapacity": {},
      "cause": {}
    };
  }
  static get events() {
    return [{
        "method": "closeModal",
        "name": "closeModal",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "null",
          "resolved": "null",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "el"; }
}
//# sourceMappingURL=ir-pickup.js.map
