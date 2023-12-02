import { Fragment, Host, h } from "@stencil/core";
export class IglBookPropertyFooter {
  constructor() {
    this.eventType = undefined;
    this.disabled = true;
  }
  isEventType(event) {
    return event === this.eventType;
  }
  renderButton(type, label, disabled = false) {
    return (h("div", { class: this.shouldRenderTwoButtons() ? 'col-6' : 'col-12' }, h("button", { class: `btn btn-${type === 'cancel' ? 'secondary' : 'primary'} full-width`, onClick: () => this.buttonClicked.emit({ key: type }), disabled: disabled }, label)));
  }
  shouldRenderTwoButtons() {
    return this.isEventType('PLUS_BOOKING') || this.isEventType('ADD_ROOM') || this.isEventType('EDIT_BOOKING');
  }
  render() {
    return (h(Host, null, h("div", { class: "row" }, this.isEventType('EDIT_BOOKING') ? (h(Fragment, null, this.renderButton('cancel', 'Cancel'), this.shouldRenderTwoButtons() && this.renderButton('next', 'Next >>'))) : (h(Fragment, null, this.renderButton('cancel', 'Cancel'), this.shouldRenderTwoButtons() && this.renderButton('next', 'Next >>', this.disabled))))));
  }
  static get is() { return "igl-book-property-footer"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["igl-book-property-footer.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["igl-book-property-footer.css"]
    };
  }
  static get properties() {
    return {
      "eventType": {
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
        "attribute": "event-type",
        "reflect": false
      },
      "disabled": {
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
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "true"
      }
    };
  }
  static get events() {
    return [{
        "method": "buttonClicked",
        "name": "buttonClicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{ key: TPropertyButtonsTypes }",
          "resolved": "{ key: TPropertyButtonsTypes; }",
          "references": {
            "TPropertyButtonsTypes": {
              "location": "import",
              "path": "../../../../models/igl-book-property",
              "id": "src/models/igl-book-property.d.ts::TPropertyButtonsTypes"
            }
          }
        }
      }];
  }
}
//# sourceMappingURL=igl-book-property-footer.js.map
