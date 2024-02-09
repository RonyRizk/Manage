import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './ir-checlbox.js';

const IrCheckBoxes = /*@__PURE__*/ proxyCustomElement(class IrCheckBoxes extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.checkboxesChange = createEvent(this, "checkboxesChange", 7);
    this.checkedCheckboxes = [];
    this.checkboxes = [];
  }
  handleCheckboxChange(event) {
    if (event.detail.checked) {
      this.checkedCheckboxes.push(this.checkboxes[parseInt(event.detail.name)]);
    }
    else {
      this.checkedCheckboxes.splice(this.checkedCheckboxes.indexOf(this.checkboxes[parseInt(event.detail.name)]), 1);
    }
    this.checkboxesChange.emit(this.checkedCheckboxes);
  }
  componentWillLoad() {
    this.checkedCheckboxes = this.checkboxes.filter(checkbox => checkbox.checked);
    if (this.checkedCheckboxes.length > 0) {
      this.checkboxesChange.emit(this.checkedCheckboxes);
    }
  }
  render() {
    return (h("div", null, this.checkboxes.map((checkbox, index) => (h("ir-checkbox", { name: index.toString(), label: checkbox.text, value: checkbox.value, checked: checkbox.checked || false })))));
  }
}, [0, "ir-checkboxes", {
    "checkboxes": [16]
  }, [[0, "checkboxChange", "handleCheckboxChange"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-checkboxes", "ir-checkbox"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-checkboxes":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrCheckBoxes);
      }
      break;
    case "ir-checkbox":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const IrCheckboxes = IrCheckBoxes;
const defineCustomElement = defineCustomElement$1;

export { IrCheckboxes, defineCustomElement };

//# sourceMappingURL=ir-checkboxes.js.map