import { Host, h } from "@stencil/core";
import { onlineResources } from "../../common/ir.common.resources";
export class IrCommon {
  constructor() {
    this.extraResources = '';
    this.resources = onlineResources;
  }
  componentWillLoad() {
    this.parseRefs();
  }
  componentDidLoad() {
    this.initializeStyles();
  }
  hrefsChanged() {
    this.parseRefs();
    this.initializeStyles();
  }
  parseRefs() {
    if (this.extraResources !== '')
      this.resources.push(JSON.parse(this.extraResources));
  }
  appendTag(tagName, attributes) {
    const tag = document.createElement(tagName);
    const selectorParts = [];
    Object.keys(attributes).forEach(attr => {
      tag.setAttribute(attr, attributes[attr]);
      selectorParts.push(`[${attr}="${attributes[attr]}"]`);
    });
    const selector = `${tagName}${selectorParts.join('')}`;
    const existingTag = document.querySelector(selector);
    if (!existingTag) {
      document.head.appendChild(tag);
    }
  }
  initializeStyles() {
    this.resources.forEach(res => {
      if (res.isCSS) {
        this.appendTag('link', {
          href: res.link,
          rel: 'stylesheet',
          type: 'text/css',
        });
      }
      if (res.isJS) {
        this.appendTag('script', {
          src: res.link,
        });
      }
    });
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
  static get is() { return "ir-common"; }
  static get properties() {
    return {
      "extraResources": {
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
        "attribute": "extra-resources",
        "reflect": true,
        "defaultValue": "''"
      }
    };
  }
  static get states() {
    return {
      "resources": {}
    };
  }
  static get watchers() {
    return [{
        "propName": "extraResources",
        "methodName": "hrefsChanged"
      }];
  }
}
//# sourceMappingURL=ir-common.js.map
