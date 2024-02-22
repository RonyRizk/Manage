import { r as registerInstance, a as createEvent, h } from './index-b28ea4d3.js';

const IrGeneralSettings = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.sendToParent = createEvent(this, "sendToParent", 7);
    this.connectionOff = createEvent(this, "connectionOff", 7);
    this.testLoader = false;
    this.mode = undefined;
    this.allowed_channels = [];
    this.allowed_properties = [];
    this.allowed_MinStayTypes = [];
    this.connectionStatus = 'Not connected';
    this.data = {
      id: '123456',
      channel: 'Channel Name',
      status: 'Active',
      //group: 'Group',
      title: 'Title',
      property: 'Property',
      minimumStay: 'Arrival',
      hotelId: 'hotelId',
      RoomsMapping: null,
    };
    this.selectedChannel = '';
    this.connected = false;
  }
  watchHandler(newValue) {
    this.selectedChannel = newValue.channel;
  }
  modewatchHandler(newValue) {
    if (newValue === 'edit') {
      this.connected = true;
      this.connectionStatus = 'Connected';
      this.sendToParent.emit(this.data);
    }
  }
  componentDidLoad() {
    const channelSelect = document.querySelector('ir-select.channel-select');
    channelSelect.addEventListener('selectChange', (event) => {
      this.connected = false;
      this.selectedChannel = event.detail;
      this.data = Object.assign(Object.assign({}, this.data), { channel: event.detail });
      this.sendToParent.emit(this.data);
    });
    const titleInput = document.querySelector('ir-input-text#title-input');
    titleInput.addEventListener('textChange', (event) => {
      this.connected = false;
      this.connectionOff.emit();
      this.data = Object.assign(Object.assign({}, this.data), { title: event.detail });
      this.sendToParent.emit(this.data);
    });
    const propertySelect = document.querySelector('ir-select#property-select');
    propertySelect.addEventListener('selectChange', (event) => {
      this.connected = false;
      this.connectionOff.emit();
      this.data = Object.assign(Object.assign({}, this.data), { property: event.detail });
      this.sendToParent.emit(this.data);
    });
  }
  componentDidUpdate() {
    // const hotelID = document.querySelector('ir-input-text#hotel-id');
    // hotelID.addEventListener('textChange', (event: CustomEvent) => {
    //   this.connected = false;
    //   this.connectionOff.emit();
    //   this.connectionStatus = 'Not connected';
    //   this.data = {
    //     ...this.data,
    //     hotelId: event.detail.trim(),
    //   };
    // });
    // const minimumStay = document.querySelector('ir-select#minimum-stay-select');
    // minimumStay.addEventListener('selectChange', (event: CustomEvent) => {
    //   this.connected = false;
    //   this.connectionOff.emit();
    //   this.data = {
    //     ...this.data,
    //     minimumStay: event.detail.trim(),
    //   };
    // });
    const channelSelect = document.querySelector('ir-select.channel-select');
    channelSelect.addEventListener('selectChange', (event) => {
      this.connected = false;
      this.connectionOff.emit();
      this.selectedChannel = event.detail;
      this.data = Object.assign(Object.assign({}, this.data), { channel: event.detail });
      this.sendToParent.emit(this.data);
    });
    // const groupSelect = document.querySelector('ir-select#group-select');
    // groupSelect.addEventListener('selectChange', (event: CustomEvent) => {
    //   this.connected = false;
    //   this.connectionOff.emit();
    //   this.data = { ...this.data, group: event.detail };
    // });
    const titleInput = document.querySelector('ir-input-text#title-input');
    titleInput.addEventListener('textChange', (event) => {
      this.connected = false;
      this.connectionOff.emit();
      this.data = Object.assign(Object.assign({}, this.data), { title: event.detail });
      this.sendToParent.emit(this.data);
    });
    const propertySelect = document.querySelector('ir-select#property-select');
    propertySelect.addEventListener('selectChange', (event) => {
      this.connected = false;
      this.connectionOff.emit();
      this.data = Object.assign(Object.assign({}, this.data), { property: event.detail });
      this.sendToParent.emit(this.data);
    });
  }
  testConnection() {
    // check if all data is filled
    if (!this.data.hotelId) {
      const alertModal = document.querySelector('ir-modal.alertFields');
      alertModal.openModal();
    }
    else {
      this.testLoader = true;
      setTimeout(() => {
        this.testLoader = false;
        if (this.data.hotelId == '123456') {
          this.connected = true;
          this.connectionStatus = ' Connected';
          this.sendToParent.emit(this.data);
        }
        else {
          this.connected = false;
        }
      }, 1000);
    }
  }
  render() {
    return [
      h("div", { class: "General Settings font-size-small" }, h("div", { class: "container-fluid" }, this.mode == 'edit' && h("div", { class: "text-light border-bottom-light mb-2" }, `ID ${this.data.id}`), h("div", { class: "column" }, h("ir-select", { class: "channel-select", label: "Channel", data: this.allowed_channels, "label-background": "white", "label-position": "right", "label-border": "none", size: "sm", textSize: "sm", labelWidth: 4, selectedValue: this.data !== null ? this.data.channel : null }), h("ir-input-text", { id: "title-input", label: "Title", placeholder: "Title", value: this.data !== null ? this.data.title : null, "label-background": "white", "label-position": "right", "label-border": "none", size: "sm", labelWidth: 4 }), h("ir-select", { id: "property-select", label: "Propery",
        // placeholder="Propery"
        data: this.allowed_properties, "label-background": "white", "label-position": "right", "label-border": "none", size: "sm", textSize: "sm", labelWidth: 4, selectedValue: this.data !== null ? this.data.property : null })))),
      h("ir-modal", { class: "alertFields", modalTitle: "Please fill all the fields!", modalBody: "There are fields that are not filled yet.", iconAvailable: true, icon: "ft-alert-circle warning h1", leftBtnActive: false, btnPosition: "center", rightBtnText: "Close", rightBtnColor: "primary" }),
    ];
  }
  static get watchers() { return {
    "data": ["watchHandler"],
    "mode": ["modewatchHandler"]
  }; }
};

export { IrGeneralSettings as ir_general_settings };

//# sourceMappingURL=ir-general-settings.entry.js.map