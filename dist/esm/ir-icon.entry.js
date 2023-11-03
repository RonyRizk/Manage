import { r as registerInstance, c as createEvent, h } from './index-f0d77d3a.js';

const IrIcon = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.iconClickHandler = createEvent(this, "iconClickHandler", 7);
    this.icon = 'ft-check';
  }
  render() {
    return (h("i", { onClick: () => {
        this.iconClickHandler.emit();
      }, class: this.icon }));
  }
};

export { IrIcon as ir_icon };

//# sourceMappingURL=ir-icon.entry.js.map