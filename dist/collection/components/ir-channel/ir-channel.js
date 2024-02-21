import { RoomService } from "../../../../src/services/room.service";
import channels_data, { resetStore } from "../../../../src/stores/channel.store";
import locales from "../../../../src/stores/locales.store";
import { Host, h, Fragment } from "@stencil/core";
import axios from "axios";
import { actions } from "./data";
export class IrChannel {
  constructor() {
    this.roomService = new RoomService();
    this.ticket = '';
    this.propertyid = undefined;
    this.language = undefined;
    this.baseurl = undefined;
    this.channel_status = null;
    this.modal_cause = null;
  }
  componentWillLoad() {
    if (this.baseurl) {
      axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      this.initializeApp();
    }
  }
  async handleConfirmClicked(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    if (!this.modal_cause) {
      return;
    }
    await this.modal_cause.action();
    this.modal_cause = null;
  }
  openModal() {
    this.irModalRef.openModal();
  }
  async initializeApp() {
    try {
      const [, , , languageTexts] = await Promise.all([
        this.roomService.fetchData(this.propertyid, this.language),
        this.roomService.getExposedChannels(),
        this.roomService.getExposedConnectedChannels(this.propertyid),
        this.roomService.fetchLanguage(this.language),
      ]);
      channels_data.property_id = this.propertyid;
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
  handleCancelModal(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    this.modal_cause = null;
  }
  handleSidebarClose(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    if (channels_data.selectedChannel) {
      this.modal_cause = {
        action: () => {
          return new Promise(reselove => {
            this.resetSideBar();
            reselove('');
          });
        },
        cause: 'channel',
        main_color: 'primary',
        message: '',
        title: '',
      };
      this.openModal();
    }
    else {
      this.resetSideBar();
    }
  }
  resetSideBar() {
    this.channel_status = null;
    resetStore();
  }
  handleSaveChange(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    this.resetSideBar();
  }
  render() {
    var _a, _b, _c, _d, _e;
    return (h(Host, { class: "h-100 " }, h("section", { class: "p-2 px-lg-5 py-0 h-100 d-flex flex-column" }, h("div", { class: "d-flex w-100 justify-content-between mb-2 align-items-center" }, h("h3", { class: "font-weight-bold m-0 p-0" }, "iSWITCH"), h("ir-button", { text: 'Create channel', size: "sm", onClickHanlder: () => (this.channel_status = 'create') }, h("svg", { slot: "icon", "stroke-width": 3, width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { d: "M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z", fill: "currentColor", "fill-rule": "evenodd", "clip-rule": "evenodd" })))), h("div", { class: "card p-1 flex-fill m-0" }, h("table", { class: "table table-hover" }, h("thead", null, h("tr", null, h("th", { scope: "col", class: "text-left" }, "Channel"), h("th", { scope: "col" }, "Status"), h("th", { scope: "col", class: "actions-theader" }, "Actions"))), h("tbody", { class: "" }, (_a = channels_data.connected_channels) === null || _a === void 0 ? void 0 : _a.map(channel => {
      var _a;
      return (h("tr", { key: channel.channel.id }, h("th", { scope: "row", class: "text-left" }, channel.channel.name, " ", (_a = channel === null || channel === void 0 ? void 0 : channel.title) !== null && _a !== void 0 ? _a : ''), h("td", null, h("ir-switch", { checked: channel.is_active })), h("th", null, h("div", { class: "d-flex justify-content-end" }, h("div", { class: "btn-group" }, h("button", { type: "button", class: "btn  dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" }, h("span", { class: "mr-1" }, "Actions"), h("svg", { class: 'caret-icon', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", height: 14, width: 14 }, h("path", { fill: "var(--blue)", d: "M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" }))), h("div", { class: "dropdown-menu dropdown-menu-right" }, actions(locales.entries).map((a, index) => (h(Fragment, null, h("button", { onClick: () => {
          a.action(channel);
          if (a.id === 'edit') {
            setTimeout(() => {
              this.channel_status = 'edit';
            }, 300);
          }
          else {
            this.modal_cause = a.action(channel);
            this.openModal();
          }
        }, key: a.id + '_item', class: `dropdown-item my-0 ${a.id === 'remove' ? 'danger' : ''}`, type: "button" }, a.icon(), a.name), index < actions(locales.entries).length - 1 && h("div", { key: a.id + '_divider', class: "dropdown-divider my-0" }))))))))));
    }))))), h("ir-sidebar", { sidebarStyles: {
        width: '60rem',
      }, showCloseButton: false, onIrSidebarToggle: this.handleSidebarClose.bind(this), open: this.channel_status !== null }, this.channel_status && h("ir-channel-editor", { class: "p-1", channel_status: this.channel_status, onCloseSideBar: this.handleSidebarClose.bind(this) })), h("ir-modal", { modalTitle: (_b = this.modal_cause) === null || _b === void 0 ? void 0 : _b.title, modalBody: (_c = this.modal_cause) === null || _c === void 0 ? void 0 : _c.message, ref: el => (this.irModalRef = el), onCancelModal: this.handleCancelModal.bind(this), rightBtnColor: (_e = (_d = this.modal_cause) === null || _d === void 0 ? void 0 : _d.main_color) !== null && _e !== void 0 ? _e : 'primary', onConfirmModal: this.handleConfirmClicked.bind(this) })));
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
      "channel_status": {},
      "modal_cause": {}
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "ticket",
        "methodName": "ticketChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "saveChannelFinished",
        "method": "handleSaveChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=ir-channel.js.map
