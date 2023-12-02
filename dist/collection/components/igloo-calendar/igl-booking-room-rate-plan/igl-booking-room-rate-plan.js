import { Host, h } from "@stencil/core";
import { v4 } from "uuid";
import { getCurrencySymbol } from "../../../utils/utils";
export class IglBookingRoomRatePlan {
  constructor() {
    this.initialRateValue = 0;
    this.defaultData = undefined;
    this.ratePlanData = undefined;
    this.totalAvailableRooms = undefined;
    this.ratePricingMode = [];
    this.currency = undefined;
    this.dateDifference = undefined;
    this.bookingType = 'PLUS_BOOKING';
    this.fullyBlocked = undefined;
    this.selectedData = undefined;
  }
  getAvailableRooms(assignable_units) {
    let result = [];
    assignable_units.forEach(unit => {
      if (unit.Is_Fully_Available) {
        result.push({ name: unit.name, id: unit.pr_id });
      }
    });
    return result;
  }
  componentWillLoad() {
    this.selectedData = {
      ratePlanId: this.ratePlanData.id,
      adult_child_offering: this.ratePlanData.variations[0].adult_child_offering,
      rateType: 1,
      totalRooms: 0,
      rate: this.ratePlanData.variations[0].amount,
      ratePlanName: this.ratePlanData.name,
      adultCount: this.ratePlanData.variations[0].adult_nbr,
      childrenCount: this.ratePlanData.variations[0].child_nbr,
      cancelation: this.ratePlanData.cancelation,
      guarantee: this.ratePlanData.guarantee,
      isRateModified: false,
      defaultSelectedRate: 0,
      is_closed: this.ratePlanData.is_closed,
      physicalRooms: this.getAvailableRooms(this.ratePlanData.assignable_units),
    };
    if (this.defaultData) {
      for (const [key, value] of Object.entries(this.defaultData)) {
        this.selectedData[key] = value;
      }
      this.dataUpdateEvent.emit({
        key: 'roomRatePlanUpdate',
        changedKey: 'totalRooms',
        data: this.selectedData,
      });
    }
    this.initialRateValue = this.selectedData.rate / this.dateDifference;
  }
  disableForm() {
    return this.selectedData.is_closed || this.totalAvailableRooms === undefined || this.selectedData.rate === null || this.selectedData.rate === undefined;
  }
  getSelectedOffering(value) {
    return this.ratePlanData.variations.find(variation => variation.adult_child_offering === value);
  }
  async ratePlanDataChanged() {
    this.selectedData = Object.assign(Object.assign({}, this.selectedData), { rate: this.handleRateDaysUpdate() });
    this.dataUpdateEvent.emit({
      key: 'roomRatePlanUpdate',
      changedKey: 'rate',
      data: this.selectedData,
    });
  }
  handleRateDaysUpdate() {
    if (this.selectedData.isRateModified) {
      return this.selectedData.defaultSelectedRate;
    }
    const selectedOffering = this.getSelectedOffering(this.selectedData.adult_child_offering);
    return selectedOffering ? selectedOffering.amount : 0;
  }
  handleInput(event) {
    const inputElement = event.target;
    let inputValue = inputElement.value.replace(/[^0-9]/g, '');
    if (inputValue !== inputElement.value) {
      inputElement.value = inputValue;
    }
    if (inputValue) {
      this.selectedData.isRateModified = true;
      this.handleDataChange('rate', event);
    }
    else {
      this.selectedData = Object.assign(Object.assign({}, this.selectedData), { rate: 0, totalRooms: 0 });
      this.dataUpdateEvent.emit({
        key: 'roomRatePlanUpdate',
        changedKey: 'rate',
        data: this.selectedData,
      });
    }
  }
  handleDataChange(key, evt) {
    const value = evt.target.value;
    switch (key) {
      case 'adult_child_offering':
        this.updateOffering(value);
        break;
      case 'rate':
        this.updateRate(value);
        break;
      default:
        this.updateGenericData(key, value);
        break;
    }
    this.dataUpdateEvent.emit({
      key: 'roomRatePlanUpdate',
      changedKey: key,
      data: this.selectedData,
    });
  }
  updateOffering(value) {
    const offering = this.getSelectedOffering(value);
    if (offering) {
      this.selectedData = Object.assign(Object.assign({}, this.selectedData), { adult_child_offering: value, adultCount: offering.adult_nbr, childrenCount: offering.child_nbr, rate: offering.amount, isRateModified: false });
    }
  }
  updateRate(value) {
    const numericValue = value === '' ? 0 : parseInt(value);
    this.selectedData = Object.assign(Object.assign({}, this.selectedData), { rate: numericValue, totalRooms: value === '' ? 0 : this.selectedData.totalRooms, defaultSelectedRate: this.selectedData.rateType === 1 ? numericValue / this.dateDifference : numericValue });
  }
  updateGenericData(key, value) {
    this.selectedData = Object.assign(Object.assign({}, this.selectedData), { [key]: value === '' ? 0 : parseInt(value) });
  }
  bookProperty() {
    this.dataUpdateEvent.emit({ key: 'clearData', data: this.selectedData });
    this.handleDataChange('totalRooms', { target: { value: '1' } });
    this.gotoSplitPageTwoEvent.emit({ key: 'gotoSplitPage', data: '' });
  }
  renderRate() {
    if (this.selectedData.isRateModified) {
      return this.selectedData.rate;
    }
    return this.selectedData.rateType === 1 ? this.selectedData.rate : this.initialRateValue;
  }
  render() {
    return (h(Host, null, h("div", { class: "row m-0 p-0" }, h("div", { class: "col-md-6 col-sm-12 p-0 align-self-center" }, h("span", null, this.ratePlanData.name), h("ir-tooltip", { message: this.ratePlanData.cancelation + this.ratePlanData.guarantee })), h("div", { class: "col-md-6 col-sm-12 row pr-0" }, h("div", { class: "col-4" }, h("fieldset", { class: "position-relative" }, h("select", { disabled: this.disableForm(), class: "form-control input-sm", id: v4(), onChange: evt => this.handleDataChange('adult_child_offering', evt) }, this.ratePlanData.variations.map(variation => (h("option", { value: variation.adult_child_offering, selected: this.selectedData.adult_child_offering === variation.adult_child_offering }, variation.adult_child_offering)))))), h("div", { class: "row col-6 m-0 p-0" }, h("fieldset", { class: "position-relative has-icon-left col-6 m-0 p-0" }, h("input", { disabled: this.disableForm(), type: "text", class: "form-control input-sm", value: this.renderRate(), id: v4(), placeholder: "Rate", onInput: (event) => this.handleInput(event) }), h("span", { class: "form-control-position" }, getCurrencySymbol(this.currency.code))), h("fieldset", { class: "position-relative m-0 p-0" }, h("select", { disabled: this.disableForm(), class: "form-control input-sm", id: v4(), onChange: evt => this.handleDataChange('rateType', evt) }, this.ratePricingMode.map(data => (h("option", { value: data.CODE_NAME, selected: this.selectedData.rateType === +data.CODE_NAME }, data.CODE_VALUE_EN)))))), this.bookingType === 'PLUS_BOOKING' || this.bookingType === 'ADD_ROOM' ? (h("div", { class: "col-2 m-0 p-0" }, h("fieldset", { class: "position-relative" }, h("select", { disabled: this.selectedData.rate === 0 || this.disableForm(), class: "form-control input-sm", id: v4(), onChange: evt => this.handleDataChange('totalRooms', evt) }, Array.from({ length: this.totalAvailableRooms + 1 }, (_, i) => i).map(i => (h("option", { value: i, selected: this.selectedData.totalRooms === i }, i))))))) : null, this.bookingType === 'EDIT_BOOKING' ? (h("div", { class: "col-2 m-0 p-0 align-self-center" }, h("fieldset", { class: "position-relative" }, h("input", { disabled: this.disableForm(), type: "radio", name: "ratePlanGroup", value: "1", onChange: evt => this.handleDataChange('totalRooms', evt), checked: this.selectedData.totalRooms === 1 })))) : null, this.bookingType === 'BAR_BOOKING' || this.bookingType === 'SPLIT_BOOKING' ? (h("button", { disabled: this.selectedData.rate === 0 || this.disableForm(), type: "button", class: "btn mb-1 btn-primary btn-sm", onClick: () => this.bookProperty() }, "Book")) : null))));
  }
  static get is() { return "igl-booking-room-rate-plan"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["igl-booking-room-rate-plan.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["igl-booking-room-rate-plan.css"]
    };
  }
  static get properties() {
    return {
      "defaultData": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "{ [key: string]: any }",
          "resolved": "{ [key: string]: any; }",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "ratePlanData": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "{ [key: string]: any }",
          "resolved": "{ [key: string]: any; }",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "totalAvailableRooms": {
        "type": "number",
        "mutable": true,
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
        "attribute": "total-available-rooms",
        "reflect": true
      },
      "ratePricingMode": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "any[]",
          "resolved": "any[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[]"
      },
      "currency": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "currency",
        "reflect": true
      },
      "dateDifference": {
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
        "attribute": "date-difference",
        "reflect": true
      },
      "bookingType": {
        "type": "string",
        "mutable": true,
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
        "attribute": "booking-type",
        "reflect": true,
        "defaultValue": "'PLUS_BOOKING'"
      },
      "fullyBlocked": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "fully-blocked",
        "reflect": true
      }
    };
  }
  static get states() {
    return {
      "selectedData": {}
    };
  }
  static get events() {
    return [{
        "method": "dataUpdateEvent",
        "name": "dataUpdateEvent",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{ [key: string]: any }",
          "resolved": "{ [key: string]: any; }",
          "references": {}
        }
      }, {
        "method": "gotoSplitPageTwoEvent",
        "name": "gotoSplitPageTwoEvent",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{ [key: string]: any }",
          "resolved": "{ [key: string]: any; }",
          "references": {}
        }
      }];
  }
  static get watchers() {
    return [{
        "propName": "ratePlanData",
        "methodName": "ratePlanDataChanged"
      }];
  }
}
//# sourceMappingURL=igl-booking-room-rate-plan.js.map
