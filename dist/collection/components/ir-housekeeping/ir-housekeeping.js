import { HouseKeepingService } from "../../../../src/services/housekeeping.service";
import { RoomService } from "../../../../src/services/room.service";
import { updateHKStore } from "../../../../src/stores/housekeeping.store";
import { Host, h } from "@stencil/core";
import axios from "axios";
export class IrHousekeeping {
  constructor() {
    this.roomService = new RoomService();
    this.houseKeepingService = new HouseKeepingService();
    this.language = '';
    this.ticket = '';
    this.baseurl = '';
    this.propertyid = undefined;
    this.isLoading = false;
  }
  componentWillLoad() {
    if (this.baseurl) {
      axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      this.roomService.setToken(this.ticket);
      this.houseKeepingService.setToken(this.ticket);
      updateHKStore('default_properties', { token: this.ticket, property_id: this.propertyid, language: this.language });
      this.initializeApp();
    }
  }
  async handleResetData(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    await this.houseKeepingService.getExposedHKSetup(this.propertyid);
  }
  async ticketChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.roomService.setToken(this.ticket);
      this.houseKeepingService.setToken(this.ticket);
      updateHKStore('default_properties', { token: this.ticket, property_id: this.propertyid, language: this.language });
      this.initializeApp();
    }
  }
  async initializeApp() {
    try {
      this.isLoading = true;
      await Promise.all([
        this.houseKeepingService.getExposedHKSetup(this.propertyid),
        this.roomService.fetchData(this.propertyid, this.language),
        this.roomService.fetchLanguage(this.language, ['_HK_FRONT']),
      ]);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      this.isLoading = false;
    }
  }
  render() {
    if (this.isLoading) {
      return h("ir-loading-screen", null);
    }
    return (h(Host, null, h("ir-interceptor", null), h("ir-toast", null), h("section", { class: "p-1" }, h("ir-unit-status", { class: "mb-1" }), h("ir-hk-team", { class: "mb-1" }))));
  }
  static get is() { return "ir-housekeeping"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-housekeeping.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-housekeeping.css"]
    };
  }
  static get properties() {
    return {
      "language": {
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
        "attribute": "language",
        "reflect": false,
        "defaultValue": "''"
      },
      "ticket": {
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
        "attribute": "ticket",
        "reflect": false,
        "defaultValue": "''"
      },
      "baseurl": {
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
        "attribute": "baseurl",
        "reflect": false,
        "defaultValue": "''"
      },
      "propertyid": {
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
        "attribute": "propertyid",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "isLoading": {}
    };
  }
  static get watchers() {
    return [{
        "propName": "ticket",
        "methodName": "ticketChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "resetData",
        "method": "handleResetData",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=ir-housekeeping.js.map
