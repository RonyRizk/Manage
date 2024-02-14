import { RoomService } from "../../../../src/services/room.service";
import calendar_data from "../../../../src/stores/calendar-data";
import locales from "../../../../src/stores/locales.store";
import { Host, h } from "@stencil/core";
import axios from "axios";
export class IrChannel {
  constructor() {
    this.roomService = new RoomService();
    this.ticket = undefined;
    this.propertyid = undefined;
    this.language = undefined;
    this.baseurl = undefined;
    this.channel_status = null;
  }
  componentDidLoad() {
    if (this.baseurl) {
      axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      this.initializeApp();
    }
  }
  async initializeApp() {
    try {
      const [_, languageTexts] = await Promise.all([this.roomService.fetchData(this.propertyid, this.language), this.roomService.fetchLanguage(this.language)]);
      if (!locales.entries) {
        locales.entries = languageTexts.entries;
        locales.direction = languageTexts.direction;
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  async ticketChanged() {
    sessionStorage.setItem('token', JSON.stringify(this.ticket));
    this.initializeApp();
  }
  render() {
    var _a;
    return (h(Host, null, h("section", { class: "p-2" }, h("div", { class: "d-flex w-100 justify-content-end mb-2" }, h("ir-button", { text: 'Create', size: "sm", onClickHanlder: () => (this.channel_status = 'create') })), h("div", null, h("table", { class: "table" }, h("thead", { class: "" }, h("tr", null, h("th", { scope: "col", class: "text-left" }, "Title"), h("th", { scope: "col" }, "Channel"), h("th", { scope: "col" }, "Status"), h("th", { scope: "col" }, "Actions"))), h("tbody", null, (_a = calendar_data.channels) === null || _a === void 0 ? void 0 : _a.map(channel => (h("tr", { key: channel.id }, h("th", { scope: "row", class: "text-left" }, channel.title), h("th", { scope: "row" }, channel.name), h("td", null, h("input", { "data-switchery": "true", type: "checkbox", class: "", checked: channel.is_active })), h("th", null, h("div", { class: "dropdown" }, h("button", { class: "btn dropdown-toggle text-primary", type: "button", "data-toggle": "dropdown", "aria-expanded": "false" }, "Actions"), h("div", { class: "dropdown-menu dropdown-menu-right" }, h("a", { class: "dropdown-item", href: "#" }, "Action"), h("a", { class: "dropdown-item", href: "#" }, "Another action"), h("a", { class: "dropdown-item", href: "#" }, "Something else here"))))))))))), h("ir-sidebar", { showCloseButton: false, onIrSidebarToggle: e => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.channel_status = null;
      }, open: this.channel_status !== null }, this.channel_status && h("ir-channel-editor", { onCloseSideBar: () => (this.channel_status = null) }))));
  }
  static get is() { return "ir-channel"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-channel.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-channel.css"]
    };
  }
  static get properties() {
    return {
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
        "reflect": false
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
      },
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
        "reflect": false
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
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "channel_status": {}
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "ticket",
        "methodName": "ticketChanged"
      }];
  }
}
//# sourceMappingURL=ir-channel.js.map
