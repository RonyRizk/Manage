import { Fragment, Host, h } from "@stencil/core";
export class IglBookPropertyFooter {
  constructor() {
    this.eventType = undefined;
    this.disabled = true;
    this.defaultTexts = undefined;
  }
  isEventType(event) {
    return event === this.eventType;
  }
  editNext(label) {
    if (this.isEventType('EDIT_BOOKING')) {
      if (label === 'Cancel') {
        return 'flex-fill';
      }
      else {
        return 'd-none d-md-block  flex-fill';
      }
    }
    return 'flex-fill';
  }
  renderButton(type, label, disabled = false) {
    return (h("div", { class: this.shouldRenderTwoButtons() ? ` ${this.editNext(label)}` : 'flex-fill' }, h("button", { class: `btn btn-${type === 'cancel' ? 'secondary' : 'primary'} full-width`, onClick: () => this.buttonClicked.emit({ key: type }), disabled: disabled }, label)));
  }
  shouldRenderTwoButtons() {
    return this.isEventType('PLUS_BOOKING') || this.isEventType('ADD_ROOM') || this.isEventType('EDIT_BOOKING');
  }
  render() {
    return (h(Host, null, h("div", { class: "d-flex justify-content-between gap-30 align-items-center" }, this.isEventType('EDIT_BOOKING') ? (h(Fragment, null, this.renderButton('cancel', this.defaultTexts.entries.Lcz_Cancel), this.shouldRenderTwoButtons() && this.renderButton('next', `${this.defaultTexts.entries.Lcz_Next} >>`))) : (h(Fragment, null, this.renderButton('cancel', this.defaultTexts.entries.Lcz_Cancel), this.shouldRenderTwoButtons() && this.renderButton('next', `${this.defaultTexts.entries.Lcz_Next} >>`, this.disabled))))));
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
      },
      "defaultTexts": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "default-texts",
        "reflect": false
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
