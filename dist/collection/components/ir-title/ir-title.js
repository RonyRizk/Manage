import { Host, h } from "@stencil/core";
export class IrTitle {
  constructor() {
    this.label = undefined;
    this.displayContext = 'default';
    this.justifyContent = 'start';
  }
  componentDidLoad() {
    this.el.style.justifyContent = this.justifyContent;
  }
  handleJustifyContentChange(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.el.style.justifyContent = newValue;
    }
  }
  render() {
    return (h(Host, null, h("h4", { class: "text-left font-medium-2 py-0 my-0" }, this.label), this.displayContext === 'sidebar' && (h("ir-icon", { class: 'close', onIconClickHandler: () => {
        this.closeSideBar.emit(null);
      } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 20, width: 20 }, h("path", { d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), this.displayContext !== 'sidebar' && (h("div", { class: 'title-body' }, h("slot", { name: "title-body" })))));
  }
  static get is() { return "ir-title"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-title.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-title.css"]
    };
  }
  static get properties() {
    return {
      "label": {
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
        "attribute": "label",
        "reflect": false
      },
      "displayContext": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'default' | 'sidebar'",
          "resolved": "\"default\" | \"sidebar\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "display-context",
        "reflect": true,
        "defaultValue": "'default'"
      },
      "justifyContent": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "| 'center'\r\n    | 'start'\r\n    | 'end'\r\n    | 'flex-start'\r\n    | 'flex-end'\r\n    | 'left'\r\n    | 'right'\r\n    | 'normal'\r\n    | 'space-between'\r\n    | 'space-around'\r\n    | 'space-evenly'\r\n    | 'stretch'\r\n    | 'safe center'\r\n    | 'unsafe center'",
          "resolved": "\"center\" | \"end\" | \"flex-end\" | \"flex-start\" | \"left\" | \"normal\" | \"right\" | \"safe center\" | \"space-around\" | \"space-between\" | \"space-evenly\" | \"start\" | \"stretch\" | \"unsafe center\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "justify-content",
        "reflect": true,
        "defaultValue": "'start'"
      }
    };
  }
  static get events() {
    return [{
        "method": "closeSideBar",
        "name": "closeSideBar",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "null",
          "resolved": "null",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "justifyContent",
        "methodName": "handleJustifyContentChange"
      }];
  }
}
//# sourceMappingURL=ir-title.js.map
