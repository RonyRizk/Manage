import { r as registerInstance, a as createEvent, h } from './index-b28ea4d3.js';

const irIconCss = ".sc-ir-icon-h{margin:0;padding:0}.icon-button.sc-ir-icon{all:unset;margin:0;padding:0}.icon-button.sc-ir-icon:hover{cursor:pointer}";

const IrIcon = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.iconClickHandler = createEvent(this, "iconClickHandler", 7);
    this.icon = 'ft-check';
  }
  render() {
    return (h("button", { class: "icon-button", onClick: () => this.iconClickHandler.emit() }, h("slot", { name: "icon" })));
  }
};
IrIcon.style = irIconCss;

export { IrIcon as ir_icon };

//# sourceMappingURL=ir-icon.entry.js.map