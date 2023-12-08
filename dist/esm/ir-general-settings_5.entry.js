import { r as registerInstance, c as createEvent, h } from './index-44eee748.js';

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

const emptyState = 'data:image/png;base64,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';

const IrListItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.sendDelete = createEvent(this, "sendDelete", 7);
    this.openSidebar = createEvent(this, "openSidebar", 7);
    this.createNew = createEvent(this, "createNew", 7);
    this.changeStatus = createEvent(this, "changeStatus", 7);
    this.type = '';
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
    this.dropdownDataDisable = {
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
          name: 'Enable',
          icon: 'ft-check',
        },
      ],
    };
    this.listData = null;
  }
  addEventListenerToDropdown(item) {
    const dropdown = document.querySelector(`ir-dropdown.dropdown-action-${item.id}`);
    if (dropdown) {
      const eventHandler = (e) => {
        if (e.detail.name === 'Edit') {
          this.handleCreate('edit', item);
        }
        else if (e.detail.name === 'Delete') {
          this.onPressDelete(item);
        }
        else if (e.detail.name === 'Disable') {
          this.onPressDisable(item);
        }
        else if (e.detail.name === 'Enable') {
          this.onPressDisable(item);
        }
      };
      dropdown.addEventListener('dropdownItemCLicked', eventHandler);
    }
  }
  handleCreate(mode, item) {
    this.openSidebar.emit({ mode: mode, item: item });
  }
  onPressDelete(item) {
    this.type = 'delete';
    const modal = document.querySelector(`ir-modal`);
    if (modal) {
      modal.item = item;
      modal.openModal();
    }
  }
  doAction(event) {
    const item = event.detail;
    if (this.type === 'delete') {
      this.listData = this.listData.filter(data => data.id !== item.id);
      this.sendDelete.emit(this.listData);
    }
    else if (this.type === 'disable') {
      this.listData = this.listData.map(data => {
        if (data.id === item.id) {
          data.status = 'Disabled';
          this.changeStatus.emit(this.listData);
        }
        return data;
      });
    }
    else if (this.type === 'enable') {
      this.listData = this.listData.map(data => {
        if (data.id === item.id) {
          data.status = 'Active';
          this.changeStatus.emit(this.listData);
        }
        return data;
      });
    }
    const modal = document.querySelector(`ir-modal`);
    if (modal) {
      modal.closeModal();
    }
  }
  onPressDisable(item) {
    this.type = item.status === 'Active' ? 'disable' : 'enable';
    const modal = document.querySelector(`ir-modal`);
    if (modal) {
      modal.openModal();
      modal.item = item;
    }
  }
  componentDidLoad() {
    if (this.listData !== null) {
      this.listData.forEach(item => {
        this.addEventListenerToDropdown(item);
      });
    }
  }
  componentDidUpdate() {
    if (this.listData !== null) {
      this.listData.forEach(item => {
        this.addEventListenerToDropdown(item);
      });
    }
  }
  // disconnectedCallback() {
  //   this.listData.forEach(item => {
  //     const dropdown = document.querySelector(`ir-dropdown.dropdown-action-${item.id}`);
  //     if (dropdown) {
  //       dropdown.removeEventListener('dropdownItemCLicked', this.handleCreate);
  //     }
  //   });
  // }
  _renderEmptyState() {
    return (h("div", { class: "cardBody" }, h("div", { class: "emptyBody" }, h("img", { src: emptyState, alt: "empty", class: "img-fluid emptyImg" }), h("p", { class: "font-size-small" }, "You don't have any channels yet.", h("br", null), "It's a good time to create", h("a", { class: "text-primary openSidebar", onClick: () => this.createNew.emit({ mode: 'create', item: null }) }, ' ', "new")))));
  }
  _renderItem() {
    return (h("div", null, h("div", { class: "container-fluid" }, this.listData.map(item => {
      return (h("div", { class: "row" }, h("div", { class: "col-12 item-info" }, h("div", { class: "row" }, h("div", { class: "col-3 p-1" }, item.title), h("div", { class: "col-3 p-1" }, item.channel), h("div", { class: "col-3 p-1" }, item.status), h("div", { class: "col-3 " }, h("ir-dropdown", { class: `dropdown-action-${item.id}`, data: item.status === 'Active' ? this.dropdownData : this.dropdownDataDisable, object: item }))))));
    }))));
  }
  _confirmDelete() {
    return (h("div", { class: "row" }, h("div", { class: "col-2 d-flex justify-content-center align-items-center" }, h("ir-icon", { icon: "ft-trash danger h1" })), h("div", { class: "col-10" }, h("div", { class: "font-weight-bold" }, "Are you sure you want to delete?"), h("br", null), h("div", { class: "font-size-small" }, "What you delete here will be permanently deleted."))));
  }
  _enable_disable() {
    return (h("div", { class: "row" }, h("div", { class: "col-2 d-flex justify-content-center align-items-center" }, h("ir-icon", { icon: "ft-alert-circle warning h1" })), h("div", { class: "col-10" }, h("div", { class: "font-weight-bold" }, "Would you like to ", this.type, " this channel?"), h("br", null))));
  }
  render() {
    return [
      this.listData !== null && this.listData.length > 0 ? this._renderItem() : this._renderEmptyState(),
      h("ir-modal", { modalTitle: this.type === 'delete' ? 'Are you sure you want to delete?' : `Would you like to ${this.type} this channel?`, modalBody: this.type === 'delete' ? 'What you delete here will be permanently deleted.' : `This channel will be ${this.type}d.`, icon: "ft-trash warning h1", iconAvailable: true }),
    ];
  }
};

const irLoaderCss = ".lds-default.xs{scale:0.25}.lds-default.sm{scale:0.5}.lds-default.md{scale:1}.lds-default.lg{scale:1.5}.lds-default{display:inline-block;position:relative;width:80px;height:80px}.lds-default div{position:absolute;width:6px;height:6px;background:#000;border-radius:50%;animation:lds-default 1.2s linear infinite}.lds-default div:nth-child(1){animation-delay:0s;top:37px;left:66px}.lds-default div:nth-child(2){animation-delay:-0.1s;top:22px;left:62px}.lds-default div:nth-child(3){animation-delay:-0.2s;top:11px;left:52px}.lds-default div:nth-child(4){animation-delay:-0.3s;top:7px;left:37px}.lds-default div:nth-child(5){animation-delay:-0.4s;top:11px;left:22px}.lds-default div:nth-child(6){animation-delay:-0.5s;top:22px;left:11px}.lds-default div:nth-child(7){animation-delay:-0.6s;top:37px;left:7px}.lds-default div:nth-child(8){animation-delay:-0.7s;top:52px;left:11px}.lds-default div:nth-child(9){animation-delay:-0.8s;top:62px;left:22px}.lds-default div:nth-child(10){animation-delay:-0.9s;top:66px;left:37px}.lds-default div:nth-child(11){animation-delay:-1s;top:62px;left:52px}.lds-default div:nth-child(12){animation-delay:-1.1s;top:52px;left:62px}@keyframes lds-default{0%,20%,80%,100%{transform:scale(1)}50%{transform:scale(1.5)}}";

const IrLoader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'md';
  }
  render() {
    return (h("div", { class: `lds-default ${this.size}` }, h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null)));
  }
};
IrLoader.style = irLoaderCss;

const IrMapping = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.sendMappingToParent = createEvent(this, "sendMappingToParent", 7);
    this.mapReference = undefined;
    this.hostRoom = [];
    this.map = null;
  }
  async _onSaveMapping() {
    this.sendMappingToParent.emit(this.hostRoom);
  }
  componentWillLoad() {
    if (this.map !== null) {
      this.hostRoom = this.map;
      this.hostRoom.forEach(room => {
        if (room.value) {
          this.mapReference = this.mapReference.filter(map => map.id !== room.value.id);
          room.value.ratePlans.forEach(ratePlan => {
            if (ratePlan.value)
              this.mapReference = this.mapReference.filter(map => map.id !== ratePlan.id);
          });
        }
      });
    }
  }
  _onSelectMap(room, value, index) {
    room = Object.assign(Object.assign({}, room), { value: value, mapped: 'mapped', mappedName: value.name, mappedId: value.id });
    this.hostRoom = [...this.hostRoom.slice(0, index), room, ...this.hostRoom.slice(index + 1)];
    this.mapReference = this.mapReference.filter(map => map.id !== value.id);
  }
  _onSelectRatePlan(ratePlan, _index, value, room, index) {
    ratePlan = Object.assign(Object.assign({}, ratePlan), { value: value, mapped: 'mapped', mappedName: value.name, mappedId: value.id });
    this.hostRoom = [
      ...this.hostRoom.slice(0, index),
      Object.assign(Object.assign({}, room), { ratePlans: [...room.ratePlans.slice(0, _index), ratePlan, ...room.ratePlans.slice(_index + 1)] }),
      ...this.hostRoom.slice(index + 1),
    ];
    let __index = room.value.ratePlans.findIndex(rate => rate.id === value.id);
    room.value.ratePlans.splice(__index, 1);
  }
  _deselectRoom(room, index) {
    this.mapReference = [...this.mapReference, room.value];
    this.mapReference = this.mapReference.sort((a, b) => (a.id > b.id ? 1 : -1));
    this.hostRoom = [
      ...this.hostRoom.slice(0, index),
      Object.assign(Object.assign({}, room), { value: null, mapped: 'notMapped', mappedName: '', mappedId: '', ratePlans: room.ratePlans.map(ratePlan => (Object.assign(Object.assign({}, ratePlan), { mapped: 'notMapped', mappedName: '', mappedId: '' }))) }),
      ...this.hostRoom.slice(index + 1),
    ];
  }
  _deselectRatePlan(ratePlan, _index, room, index) {
    console.log(ratePlan);
    room.value.ratePlans = [...room.value.ratePlans, ratePlan.value];
    room.value.ratePlans = room.value.ratePlans.sort((a, b) => (a.id > b.id ? 1 : -1));
    ratePlan = Object.assign(Object.assign({}, ratePlan), { value: null, mapped: 'notMapped', mappedName: '', mappedId: '' });
    this.hostRoom = [
      ...this.hostRoom.slice(0, index),
      Object.assign(Object.assign({}, room), { ratePlans: [...room.ratePlans.slice(0, _index), ratePlan, ...room.ratePlans.slice(_index + 1)] }),
      ...this.hostRoom.slice(index + 1),
    ];
  }
  render() {
    return [
      h("div", { class: "Mapping font-size-small" }, h("div", { class: "d-flex justify-content-end align-items-center" }, h("a", { class: "text-primary" }, "Refresh")), h("div", { class: "container-fluid" }, h("div", { class: "row" }, h("div", { class: "col-12 mb-1" }, h("div", { class: "row " }, h("div", { class: "col-6 d-flex justify-content-between align-items-center font-weight-bold" }, "Iglooroom", h("ir-icon", { icon: "la la-long-arrow-right" })), h("div", { class: "col-6 font-weight-bold" }, "Channel Manager"))), this.hostRoom.map((room, index) => {
        return (h("div", { class: "col-12 mb-1" }, h("div", { class: "row mb-1" }, h("div", { class: "col-6 d-flex justify-content-between align-items-center" }, room.name, h("ir-icon", { icon: "la la-long-arrow-right" })), h("div", { class: `col-6 ` }, room.mapped === 'notMapped' ? (h("div", { class: "text-danger", onClick: () => {
            this.hostRoom = [
              ...this.hostRoom.slice(0, index),
              Object.assign(Object.assign({}, room), { value: '', mapped: 'mapping', mappedName: '', mappedId: '' }),
              ...this.hostRoom.slice(index + 1),
            ];
          } }, "Not mapped")) : room.mapped === 'mapping' ? (h("select", { id: `${index}`, class: "form-control form-control-sm", onChange: (event) => {
            let value = JSON.parse(event.target.value);
            this._onSelectMap(room, value, index);
          } }, h("option", { value: "" }, "Select Room"), this.mapReference.length > 0 &&
          this.mapReference.map(ref => {
            return h("option", { value: JSON.stringify(ref) }, ref.name);
          }))) : (h("div", { class: "d-flex flex-grow-1 justify-content-between" }, h("div", { class: "text-primary" }, room.mappedName, h("ir-icon", { icon: "ft-user" }), " ", room.roomCapacity), h("ir-icon", { icon: "text-primary ft-trash", onClick: () => {
            this._deselectRoom(room, index);
          } }))))), h("div", { class: "col-12 mb-1" }, room.ratePlans &&
          room.ratePlans.length &&
          room.ratePlans.map((ratePlan, _index) => (h("div", { class: "row mb-1" }, h("div", { class: "col-6 d-flex justify-content-between align-items-center" }, h("div", null, ratePlan.name, h("ir-icon", { icon: "ft-user" }), " ", room.roomCapacity), room.mapped === 'mapped' && h("ir-icon", { icon: "la la-long-arrow-right" })), h("div", { class: "col-6 pr-0" }, room.mapped === 'mapped' &&
            (ratePlan.mapped === 'notMapped' ? (h("div", { class: "text-danger", onClick: () => {
                ratePlan = Object.assign(Object.assign({}, ratePlan), { value: '', mapped: 'mapping', mappedId: '', mappedName: '' });
                this.hostRoom = [
                  ...this.hostRoom.slice(0, index),
                  Object.assign(Object.assign({}, room), { ratePlans: [...room.ratePlans.slice(0, _index), ratePlan, ...room.ratePlans.slice(_index + 1)] }),
                  ...this.hostRoom.slice(index + 1),
                ];
              } }, "Not mapped")) : ratePlan.mapped === 'mapping' ? (h("select", { class: "form-control form-control-sm", onChange: (event) => {
                // mapped.selectedPlan = event.target.value;
                let value = JSON.parse(event.target.value);
                this._onSelectRatePlan(ratePlan, _index, value, room, index);
              } }, h("option", { value: "" }, "Select Plan"), room.value.ratePlans.length > 0 ? room.value.ratePlans.map(ratePlan => h("option", { value: JSON.stringify(ratePlan) }, ratePlan.name)) : null)) : (h("div", { class: "d-flex flex-grow-1 justify-content-between" }, h("div", { class: "text-primary" }, ratePlan.mappedName, h("ir-icon", { icon: "ft-user" }), " ", room.roomCapacity), h("ir-icon", { icon: "text-primary ft-trash", onClick: () => {
                this._deselectRatePlan(ratePlan, _index, room, index);
              } })))))))))));
      })))),
    ];
  }
};

const IrChannelManager = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.openSidebar = createEvent(this, "openSidebar", 7);
  }
  handleCreate() {
    this.openSidebar.emit();
  }
  render() {
    return (h("div", { class: "card-head" }, h("div", { class: "input-group input-group-sm" }, h("input", { type: "text", class: "form-control border-light", placeholder: "Search" }), h("div", { class: "input-group-append" }), h("button", { class: "ml-1 btn btn-primary btn-sm openSidebar", onClick: () => this.handleCreate() }, "Create")), h("div", { class: "container-fluid" }, h("div", { class: "row" }, h("div", { class: "col-3 p-1 section-title" }, "Title ", h("ir-icon", { icon: "la la-unsorted" })), h("div", { class: "col-3 p-1 section-title" }, "Channel ", h("ir-icon", { icon: "la la-unsorted" })), h("div", { class: "col-3 p-1 section-title" }, "Status ", h("ir-icon", { icon: "la la-unsorted" }))))));
  }
};

export { IrGeneralSettings as ir_general_settings, IrListItem as ir_list_item, IrLoader as ir_loader, IrMapping as ir_mapping, IrChannelManager as ir_topbar };

//# sourceMappingURL=ir-general-settings_5.entry.js.map