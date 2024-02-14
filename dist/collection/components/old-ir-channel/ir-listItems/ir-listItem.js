import { h } from "@stencil/core";
import { emptyState } from "../../../sample/channel/images";
export class IrListItem {
  constructor() {
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
  static get is() { return "ir-list-item"; }
  static get properties() {
    return {
      "dropdownData": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "{\r\n    name: string;\r\n    icon: string;\r\n    children: {\r\n      name: string;\r\n      icon: string;\r\n    }[];\r\n  }",
          "resolved": "{ name: string; icon: string; children: { name: string; icon: string; }[]; }",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "{\r\n    name: 'Action',\r\n    icon: '',\r\n    children: [\r\n      {\r\n        name: 'Edit',\r\n        icon: 'ft-edit',\r\n      },\r\n      {\r\n        name: 'Delete',\r\n        icon: 'ft-trash',\r\n      },\r\n      {\r\n        name: 'Disable',\r\n        icon: 'ft-alert-triangle',\r\n      },\r\n    ],\r\n  }"
      },
      "dropdownDataDisable": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "{\r\n    name: string;\r\n    icon: string;\r\n    children: {\r\n      name: string;\r\n      icon: string;\r\n    }[];\r\n  }",
          "resolved": "{ name: string; icon: string; children: { name: string; icon: string; }[]; }",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "{\r\n    name: 'Action',\r\n    icon: '',\r\n    children: [\r\n      {\r\n        name: 'Edit',\r\n        icon: 'ft-edit',\r\n      },\r\n      {\r\n        name: 'Delete',\r\n        icon: 'ft-trash',\r\n      },\r\n      {\r\n        name: 'Enable',\r\n        icon: 'ft-check',\r\n      },\r\n    ],\r\n  }"
      },
      "listData": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ChannelManager[]",
          "resolved": "ChannelManager[]",
          "references": {
            "ChannelManager": {
              "location": "import",
              "path": "../../../sample/channel/data",
              "id": "src/sample/channel/data.tsx::ChannelManager"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "null"
      }
    };
  }
  static get states() {
    return {
      "type": {}
    };
  }
  static get events() {
    return [{
        "method": "sendDelete",
        "name": "sendDelete",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "openSidebar",
        "name": "openSidebar",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "createNew",
        "name": "createNew",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "changeStatus",
        "name": "changeStatus",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get listeners() {
    return [{
        "name": "confirmModal",
        "method": "doAction",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=ir-listItem.js.map
