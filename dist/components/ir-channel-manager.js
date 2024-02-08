import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { d as defineCustomElement$d } from './ir-button2.js';
import { d as defineCustomElement$c } from './ir-dropdown2.js';
import { d as defineCustomElement$b } from './ir-general-settings2.js';
import { d as defineCustomElement$a } from './ir-icon2.js';
import { d as defineCustomElement$9 } from './ir-input-text2.js';
import { d as defineCustomElement$8 } from './ir-listItem.js';
import { d as defineCustomElement$7 } from './ir-loader2.js';
import { d as defineCustomElement$6 } from './ir-mapping2.js';
import { d as defineCustomElement$5 } from './ir-modal2.js';
import { d as defineCustomElement$4 } from './ir-select2.js';
import { d as defineCustomElement$3 } from './ir-sidebar2.js';
import { d as defineCustomElement$2 } from './ir-topbar2.js';
import { v as v4 } from './v4.js';

const irChannelManagerCss = ":root{--sidebar-width:40rem}#container{padding:1rem;height:100%}.card{height:100%}#ir-list-item{height:100%}.cardBody{display:flex;justify-content:center;align-items:center;height:100%}.emptyBody{text-align:center}.emptyBody img{height:auto;width:100px;transform:translate(7%, 0);margin:1rem}.loader-position{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)}.card-head{background:#f8f8f8;padding:0.3rem}.section-title{display:flex;align-items:center;justify-content:space-between;font-weight:bold}.item-info{border-bottom:1px solid #e7e7e7}.item-info .row .col-3:last-child{text-align:end}.list-group{list-style:none;border-bottom:1px solid #e7e7e7}.list-group li{padding:0.5rem;color:#444;transition:all 0.3s ease-out}.list-group li:hover{color:#7c83eb}.list-group li.active{border-bottom:2px solid #7c83eb;color:#7c83eb}.btn-position{position:absolute;bottom:0;left:0;width:100%;padding:0.5rem;background:#f8f8f8;border-top:1px solid #e7e7e7}.test-icon{margin-right:0.2rem !important}.text-dark:hover{color:#444 !important}";

const IrChannelManager$1 = /*@__PURE__*/ proxyCustomElement(class IrChannelManager extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.fetchApi = createEvent(this, "fetchApi", 7);
    this.requestApiDelete = createEvent(this, "requestApiDelete", 7);
    this.requestApiDestinationHierarchy = createEvent(this, "requestApiDestinationHierarchy", 7);
    this.tabs = ['General Settings', 'Mapping', 'Channel Settings'];
    this.hostRoom = undefined;
    this.mapReference = undefined;
    this.allowed_properties = [];
    this.allowed_channels = [];
    this.allowed_MinStayTypes = [];
    this.dropdownData = {
      name: 'Action',
      icon: '',
      children: [
        {
          name: 'Edit',
          icon: 'ft-edit',
        },
        {
          name: 'Delete',
          icon: 'ft-trash',
        },
        {
          name: 'Disable',
          icon: 'ft-alert-triangle',
        },
      ],
    };
    this.listData = null;
    this.loader = false;
    this.mode = 'create';
    this.activeTab = 'General Settings';
    this.selectedItem = null;
    this.item = null;
    this.anyChanges = false;
  }
  connectionOffHandler() {
    this.item = null;
  }
  sendToParentHandler(event) {
    this.anyChanges = true;
    this.item = event.detail;
    //this.listData = [...this.listData, { ...event.detail, id: this.listData.length + 1, status: 'Active' }];
  }
  sendMappingToParentHandler(event) {
    // Extract the mapping from the event detail
    const mapping = event.detail;
    const id = v4();
    // Flag to track changes
    this.anyChanges = true;
    // Update listData based on the mode
    if (this.mode === 'edit' && this.selectedItem) {
      this.listData = this.listData.map(item => {
        if (item.id === this.selectedItem.id) {
          return Object.assign(Object.assign({}, this.item), { RoomsMapping: mapping, status: 'Active', id: id });
        }
        return item;
      });
    }
    else {
      if (this.listData === null) {
        this.listData = [Object.assign(Object.assign({}, this.item), { RoomsMapping: mapping, status: 'Active', id: id })];
      }
      else {
        this.listData = [...this.listData, Object.assign(Object.assign({}, this.item), { RoomsMapping: mapping, status: 'Active', id: id })];
      }
    }
    // Emit the fetchApi event
    this.fetchApi.emit(this.listData);
    // Reset mode, sidebar, and state
    this.mode = 'create';
    this.activeTab = 'General Settings';
    const sidebar = document.querySelector('ir-sidebar');
    if (sidebar) {
      sidebar.open = !sidebar.open;
    }
    this._reset();
  }
  _reset() {
    this.item = null;
    this.mode = 'create';
    this.activeTab = 'General Settings';
    this.selectedItem = null;
    this.anyChanges = false;
  }
  openSidebarHandler() {
    const sidebar = document.querySelector('ir-sidebar');
    sidebar.open = !sidebar.open;
    this.loader = true;
    this.mode = 'create';
    this.activeTab = 'General Settings';
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }
  requestDelete(e) {
    this.fetchApi.emit(e.detail);
  }
  changeStatusHandler(event) {
    this.fetchApi.emit(event.detail);
  }
  componentDidLoad() {
    // Add an event listener to the ir-topbar component
    const openSidebar = document.querySelector('ir-topbar');
    openSidebar.addEventListener('openSidebar', () => {
      const sidebar = document.querySelector('ir-sidebar');
      sidebar.open = !sidebar.open;
      this.loader = true;
      this.mode = 'create';
      this.activeTab = 'General Settings';
      setTimeout(() => {
        this.loader = false;
      }, 2000);
    });
    const dropdown = document.querySelector('ir-list-item');
    dropdown.addEventListener('openSidebar', (e) => {
      if (e.detail.mode === 'edit') {
        this.mode = 'edit';
        this.selectedItem = e.detail.item;
        const sidebar = document.querySelector('ir-sidebar');
        sidebar.open = !sidebar.open;
      }
    });
    const modal = document.querySelector('ir-modal.exit');
    modal.addEventListener('confirmModal', () => {
      sidebar.open = false;
      modal.closeModal();
      this._reset();
    });
    const sidebar = document.querySelector('ir-sidebar');
    sidebar.addEventListener('irSidebarToggle', (event) => {
      if (event.detail == true && this.anyChanges) {
        if (this.listData) {
          modal.openModal();
        }
      }
      else {
        sidebar.open = false;
        this._reset();
      }
    });
  }
  goNext() {
    const IrMapping = document.querySelector('ir-mapping');
    if (this.activeTab == 'General Settings') {
      //if (!this.item.title || !this.item.channel || !this.item.property || !this.item.hotelId) {
      if (!this.item.title || !this.item.channel || !this.item.property) {
        const alertModal = document.querySelector('ir-modal.alertModal-manager');
        if (this.mode === 'edit') {
          return;
        }
        alertModal.openModal();
      }
      else {
        this.requestApiDestinationHierarchy.emit(this.item.property);
        this.activeTab = 'Mapping';
        this.loader = true;
        setTimeout(() => {
          this.loader = false;
        }, 2000);
      }
    }
    else if (this.activeTab == 'Mapping') {
      IrMapping._onSaveMapping();
    }
  }
  _onSwitchTab(tab) {
    if (this.activeTab == 'General Settings') {
      //if (!this.item.title || !this.item.channel || !this.item.property || !this.item.hotelId) {
      if (!this.item.title || !this.item.channel || !this.item.property) {
        const alertModal = document.querySelector('ir-modal.alertModal-manager');
        if (this.mode == 'edit') {
          return;
        }
        alertModal.openModal();
      }
      else {
        this.activeTab = tab;
        this.loader = true;
        setTimeout(() => {
          this.loader = false;
        }, 2000);
      }
    }
    else if (this.activeTab == 'Mapping') {
      this.activeTab = tab;
      this.loader = true;
      setTimeout(() => {
        this.loader = false;
      }, 2000);
    }
  }
  render() {
    return [
      h("div", { id: "container" }, h("div", { class: "card" }, h("ir-topbar", null), h("ir-list-item", { id: "ir-list-item", listData: this.listData, dropdownData: this.dropdownData }))),
      h("ir-sidebar", { side: "right", class: "" }, h("div", { class: "container pt-1" }, h("h5", { class: "font-weight-bold" }, this.mode === 'create' ? 'Create' : 'Edit', " Channel")), h("ul", { class: "list-group list-group-horizontal mb-2" }, this.tabs.map(tab => (h("li", { class: this.activeTab === tab ? 'active' : '' }, h("a", { class: "", "data-mdb-ripple-color": "dark", onClick: () => {
          this._onSwitchTab(tab);
        } }, tab))))), this.loader ? (h("div", { class: "loader-position" }, h("ir-loader", null))) : (h("span", null, this.activeTab == 'General Settings' &&
        h("ir-general-settings", { allowed_channels: this.allowed_channels, allowed_MinStayTypes: this.allowed_MinStayTypes, allowed_properties: this.allowed_properties, data: this.selectedItem, mode: this.mode, class: "mb-3" }), this.activeTab == 'Mapping' &&
        h("ir-mapping", { hostRoom: this.hostRoom, class: "mb-3", mapReference: this.mapReference, map: this.mode === 'edit' ? this.selectedItem.RoomsMapping : null }))), h("div", { class: "btn-position" }, h("button", { type: "button", class: "btn btn-primary btn-sm btn-block", onClick: () => this.goNext() }, this.activeTab == 'General Settings' ? 'Next' : 'Save'))),
      h("ir-modal", { class: 'exit', modalTitle: "Exit without saving?", modalBody: "All unsaved changes will be lost.", iconAvailable: true, icon: "ft-alert-circle warning h1" }),
      h("ir-modal", { class: "alertModal-manager", modalTitle: "Please fill all the fields!", modalBody: "There are fields that are not filled yet.", icon: "ft-alert-circle warning h1", iconAvailable: true, leftBtnActive: false, btnPosition: "center", rightBtnText: "Close", rightBtnColor: "primary" }),
    ];
  }
  static get style() { return irChannelManagerCss; }
}, [0, "ir-channel-manager", {
    "hostRoom": [16],
    "mapReference": [16],
    "allowed_properties": [16],
    "allowed_channels": [16],
    "allowed_MinStayTypes": [16],
    "dropdownData": [16],
    "listData": [1040],
    "loader": [32],
    "mode": [32],
    "activeTab": [32],
    "selectedItem": [32],
    "item": [32],
    "anyChanges": [32]
  }, [[0, "connectionOff", "connectionOffHandler"], [0, "sendToParent", "sendToParentHandler"], [0, "sendMappingToParent", "sendMappingToParentHandler"], [0, "createNew", "openSidebarHandler"], [0, "sendDelete", "requestDelete"], [0, "changeStatus", "changeStatusHandler"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-channel-manager", "ir-button", "ir-dropdown", "ir-general-settings", "ir-icon", "ir-input-text", "ir-list-item", "ir-loader", "ir-mapping", "ir-modal", "ir-select", "ir-sidebar", "ir-topbar"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-channel-manager":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrChannelManager$1);
      }
      break;
    case "ir-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "ir-dropdown":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "ir-general-settings":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "ir-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "ir-input-text":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "ir-list-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "ir-loader":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "ir-mapping":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "ir-modal":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "ir-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "ir-sidebar":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "ir-topbar":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const IrChannelManager = IrChannelManager$1;
const defineCustomElement = defineCustomElement$1;

export { IrChannelManager, defineCustomElement };

//# sourceMappingURL=ir-channel-manager.js.map