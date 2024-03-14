import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { v as v4 } from './v4.js';

const irCheckboxCss = ".sc-ir-checkbox-h{display:flex;align-items:center;width:fit-content}button.sc-ir-checkbox{all:unset}.CheckboxRoot.sc-ir-checkbox{background-color:white;width:20px;height:20px;border-radius:4px;display:flex;align-items:center;justify-content:center;border:1px solid #cacfe7;border-radius:4px;transition:all 0.3s ease}.CheckboxRoot.sc-ir-checkbox:disabled{background-color:#eceff1;border-color:rgba(118, 118, 118, 0.3);pointer-events:none}.CheckboxRoot[data-state='checked'].sc-ir-checkbox{background-color:#1e9ff2;color:white;border-color:#1e9ff2}input[type='checkbox'].sc-ir-checkbox{background-color:initial;cursor:default;appearance:auto;box-sizing:border-box;margin:3px 3px 3px 4px;padding:initial;border:initial}.checkbox.sc-ir-checkbox{transform:translateX(-100%);position:absolute;pointer-events:none;opacity:0;margin:0px;width:20px;height:20px}";

const IrCheckbox = /*@__PURE__*/ proxyCustomElement(class IrCheckbox extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.checkChange = createEvent(this, "checkChange", 7);
    this.checked = false;
    this.label = undefined;
    this.checkboxId = v4();
    this.name = undefined;
    this.disabled = undefined;
    this.currentChecked = false;
  }
  handleCheckedChange(newValue) {
    if (newValue === this.currentChecked) {
      return;
    }
    this.currentChecked = this.checked;
  }
  componentWillLoad() {
    this.currentChecked = this.checked;
  }
  componentDidLoad() {
    if (this.checkboxRef) {
      this.checkboxRef.setAttribute('aria-checked', JSON.stringify(this.checked));
    }
  }
  handleCheckChange() {
    this.currentChecked = !this.currentChecked;
    if (this.checkboxRef) {
      this.checkboxRef.setAttribute('aria-checked', JSON.stringify(this.currentChecked));
    }
    this.checkChange.emit(this.currentChecked);
  }
  render() {
    return (h(Host, null, h("button", { disabled: this.disabled, name: this.name, onClick: this.handleCheckChange.bind(this), id: this.checkboxId, "data-state": this.currentChecked ? 'checked' : 'unchecked', value: 'on', ref: ref => (this.checkboxRef = ref), type: "button", role: "checkbox", class: "CheckboxRoot" }, this.currentChecked && (h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { fill: "currentColor", d: "M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" })))), h("input", { type: "checkbox", "aria-hidden": "true", tabindex: "-1", value: "on", checked: this.currentChecked, class: "checkbox" }), this.label && h("label", { htmlFor: this.checkboxId }, this.label)));
  }
  static get watchers() { return {
    "checked": ["handleCheckedChange"]
  }; }
  static get style() { return irCheckboxCss; }
}, [2, "ir-checkbox", {
    "checked": [4],
    "label": [1],
    "checkboxId": [1, "checkbox-id"],
    "name": [1],
    "disabled": [4],
    "currentChecked": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-checkbox"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-checkbox":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrCheckbox);
      }
      break;
  } });
}

export { IrCheckbox as I, defineCustomElement as d };

//# sourceMappingURL=ir-checkbox2.js.map