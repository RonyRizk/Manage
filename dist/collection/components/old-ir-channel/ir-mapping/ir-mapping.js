import { h } from "@stencil/core";
export class IrMapping {
  constructor() {
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
  static get is() { return "ir-mapping"; }
  static get properties() {
    return {
      "mapReference": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "RoomType[]",
          "resolved": "RoomType[]",
          "references": {
            "RoomType": {
              "location": "import",
              "path": "../../../sample/channel/data",
              "id": "src/sample/channel/data.tsx::RoomType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "hostRoom": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "RoomType[]",
          "resolved": "RoomType[]",
          "references": {
            "RoomType": {
              "location": "import",
              "path": "../../../sample/channel/data",
              "id": "src/sample/channel/data.tsx::RoomType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[]"
      },
      "map": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "RoomType[]",
          "resolved": "RoomType[]",
          "references": {
            "RoomType": {
              "location": "import",
              "path": "../../../sample/channel/data",
              "id": "src/sample/channel/data.tsx::RoomType"
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
  static get events() {
    return [{
        "method": "sendMappingToParent",
        "name": "sendMappingToParent",
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
  static get methods() {
    return {
      "_onSaveMapping": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
}
//# sourceMappingURL=ir-mapping.js.map
