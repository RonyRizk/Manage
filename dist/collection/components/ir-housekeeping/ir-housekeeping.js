import { HouseKeepingService } from "../../../../src/services/housekeeping.service";
import { RoomService } from "../../../../src/services/room.service";
import housekeeping_store from "../../../../src/stores/housekeeping.store";
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
    this.exposedHouseKeepingStatuses = undefined;
  }
  componentWillLoad() {
    if (this.baseurl) {
      axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      this.roomService.setToken(this.ticket);
      this.houseKeepingService.setToken(this.ticket);
      housekeeping_store.token = this.ticket;
      this.initializeApp();
    }
  }
  async ticketChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.roomService.setToken(this.ticket);
      this.houseKeepingService.setToken(this.ticket);
      housekeeping_store.token = this.ticket;
      this.initializeApp();
    }
  }
  async initializeApp() {
    try {
      this.isLoading = true;
      const [housekeeping] = await Promise.all([this.houseKeepingService.getExposedHKSetup(this.propertyid)]);
      this.exposedHouseKeepingStatuses = housekeeping.statuses;
    }
    catch (error) {
      console.error(error);
    }
    finally {
      this.isLoading = false;
    }
  }
  render() {
    var _a;
    if (this.isLoading) {
      return h("ir-loading-screen", null);
    }
    return (h(Host, null, h("ir-interceptor", null), h("ir-toast", null), h("section", { class: "p-1" }, h("div", { class: "card p-1" }, h("h4", null, "Room or Unit Status"), h("table", null, h("thead", null, h("tr", null, h("th", null, "Status"), h("th", null, "Code"), h("th", null, "Action"))), h("tbody", null, (_a = this.exposedHouseKeepingStatuses) === null || _a === void 0 ? void 0 : _a.map(status => {
      var _a;
      return (h("tr", { key: status.code }, h("td", null, h("div", { class: "status-container" }, h("span", { class: `circle ${status.style.shape} ${status.style.color}` }), h("p", null, status.description))), h("td", null, status.code), h("td", null, h("div", { class: "action-container" }, h("p", { class: 'm-0' }, status.action), ((_a = status.inspection_mode) === null || _a === void 0 ? void 0 : _a.is_active) && (h("div", null, h("ir-select", { LabelAvailable: false, firstOption: "No", data: Array.from(Array(status.inspection_mode.window + 1), (_, i) => i).map(i => {
          const text = i === 0 ? 'Yes on the same day.' : i.toString() + ' day prior.';
          return {
            text,
            value: i.toString(),
          };
        }) })))))));
    })))))));
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
      "isLoading": {},
      "exposedHouseKeepingStatuses": {}
    };
  }
  static get watchers() {
    return [{
        "propName": "ticket",
        "methodName": "ticketChanged"
      }];
  }
}
//# sourceMappingURL=ir-housekeeping.js.map
