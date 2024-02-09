import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, g as getElement } from './index-a7439799.js';
import { a as axios, b as calendar_data, l as locales, h as hooks } from './calendar-data-60dd0bc5.js';

class PickupService {
  constructor() {
    this.token = JSON.parse(sessionStorage.getItem('token'));
  }
  async savePickup(params, booking_nbr) {
    try {
      const splitTime = params.arrival_time.split(':');
      await axios.post(`/Do_Pickup?Ticket=${this.token}`, {
        booking_nbr,
        is_remove: false,
        currency: params.currency,
        date: params.arrival_date,
        details: params.flight_details,
        hour: splitTime[0],
        minute: splitTime[1],
        nbr_of_units: params.number_of_vehicles,
        selected_option: params.selected_option,
        total: params.due_upon_booking,
      });
    }
    catch (error) {
      console.log(error);
    }
  }
  validateForm(params) {
    if (params.arrival_time.split(':').length !== 2) {
      return {
        error: true,
        cause: 'arrival_time',
      };
    }
    if (params.flight_details === '') {
      return {
        error: true,
        cause: 'flight_details',
      };
    }
    if (params.vehicle_type_code === '') {
      return {
        error: true,
        cause: 'vehicle_type_code',
      };
    }
    if (params.number_of_vehicles === 0) {
      return {
        error: true,
        cause: 'number_of_vehicles',
      };
    }
    return { error: false };
  }
  // private getPickUpPersonStatus(code: string) {
  //   const getCodeDescription = calendar_data.pickup_service.allowed_pricing_models.find(model => model.code === code);
  //   if (!getCodeDescription) {
  //     return null;
  //   }
  //   return getCodeDescription.description;
  // }
  updateDue(params) {
    const getCodeDescription = calendar_data.pickup_service.allowed_pricing_models.find(model => model.code === params.code);
    if (!getCodeDescription) {
      return;
    }
    if (getCodeDescription.description === 'Person') {
      return params.amount * params.numberOfPersons;
    }
    else {
      return params.amount * params.number_of_vehicles;
    }
  }
  getNumberOfVehicles() { }
}

const irPickupCss = ".sc-ir-pickup-h{display:block}.card-title.sc-ir-pickup{border-bottom:1px solid #e4e5ec;width:100%}";

const IrPickup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.closeModal = createEvent(this, "closeModal", 7);
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
      })) }), this.pickupData.location && (h(Fragment, null, h("div", { class: 'd-flex' }, h("div", { class: "form-group  mr-1" }, h("div", { class: "input-group row m-0" }, h("div", { class: `input-group-prepend col-5 p-0 text-dark border-0` }, h("label", { class: `input-group-text  bg-light flex-grow-1 text-dark border-0 ` }, locales.entries.Lcz_ArrivalDate)), h("div", { class: "form-control form-control-md col-7 d-flex align-items-center pl-0" }, h("ir-date-picker", { minDate: hooks().format('YYYY-MM-DD'), autoApply: true, format: "ddd, DD M YYYY", singleDatePicker: true, onDateChanged: evt => {
        this.updatePickupData('arrival_date', evt.detail.start.format('YYYY-MM-DD'));
      } })))), h("div", { class: "form-group" }, h("div", { class: "input-group  row m-0" }, h("div", { class: `input-group-prepend col-4 col-sm-3 p-0 text-dark border-0` }, h("label", { htmlFor: "pickup", class: `input-group-text  bg-light flex-grow-1 text-dark border-0` }, locales.entries.Lcz_Time)), h("input", { value: this.pickupData.arrival_time, type: "text", id: "pickup-time", class: `form-control col-8 col-sm-4 ${this.cause === 'arrival_time' && 'border-danger'}` })))), h("ir-input-text", { label: locales.entries.Lcz_FlightDetails, onTextChange: e => this.updatePickupData('flight_details', e.detail), placeholder: "", inputStyles: this.cause === 'flight_details' ? 'border-danger' : '' }), h("ir-select", { selectStyles: this.cause === 'vehicle_type_code' ? 'border-danger' : '', onSelectChange: this.handleVehicleTypeChange.bind(this), firstOption: locales.entries.Lcz_Select, selectedValue: this.pickupData.vehicle_type_code, class: 'm-0', LabelAvailable: false, data: this.allowedOptionsByLocation.map(option => ({
        text: option.vehicle.description,
        value: option.vehicle.code,
      })) }), h("div", { class: 'd-flex flex-column flex-md-row' }, h("ir-select", { selectStyles: this.cause === 'number_of_vehicles' ? 'border-danger' : '', selectedValue: this.pickupData.number_of_vehicles, labelWidth: 6, class: 'm-0  mb-md-0 mr-md-1 flex-fill', label: locales.entries.Lcz_NbrOfVehicles, data: Array.from({ length: this.vehicleCapacity + 1 }, (_, i) => i + 1).map(i => ({
        text: i,
        value: i,
      })) }), h("ir-input-text", { readonly: true, value: this.pickupData.due_upon_booking, labelWidth: 6, label: `${locales.entries.Lcz_DueUponBooking}  ${this.pickupData.currency.symbol}`, placeholder: "", class: "" })))), h("div", { class: 'd-flex flex-column flex-md-row mt-3' }, h("ir-button", { onClick: () => this.closeModal.emit(null), btn_styles: "justify-content-center", class: `mb-1 mb-md-0  flex-fill ${this.pickupData.location ? 'mr-md-1' : ''}`, icon: "", text: locales.entries.Lcz_Cancel, btn_color: "secondary" }), this.pickupData.location && (h("ir-button", { btn_styles: "justify-content-center align-items-center", class: 'm-0 flex-fill text-center', icon: "", isLoading: this.isLoading, text: locales.entries.Lcz_Save, btn_color: "primary", onClick: this.savePickup.bind(this) }))))));
  }
  get el() { return getElement(this); }
};
IrPickup.style = irPickupCss;

export { IrPickup as ir_pickup };

//# sourceMappingURL=ir-pickup.entry.js.map