import { r as registerInstance, a as createEvent, h } from './index-1e7fb42e.js';

const IrLabel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.editSidebar = createEvent(this, "editSidebar", 7);
    this.label = undefined;
    this.value = undefined;
    this.iconShown = false;
    this.imageSrc = undefined;
  }
  openEditSidebar() {
    this.editSidebar.emit();
  }
  render() {
    if (!this.value) {
      return null;
    }
    return (h("div", { class: this.iconShown ? 'sm-padding-right sm-padding-top' : 'sm-padding-top' }, h("strong", { class: "sm-padding-right" }, this.label), this.imageSrc && h("img", { src: this.imageSrc, class: "sm-padding-right" }), this.value, this.iconShown && h("ir-icon", { icon: "ft-edit color-ir-dark-blue-hover pointer", class: "sm-padding-left", onClick: () => this.openEditSidebar() })));
  }
};

export { IrLabel as ir_label };

//# sourceMappingURL=ir-label.entry.js.map