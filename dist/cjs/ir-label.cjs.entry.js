'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c42658be.js');

const IrLabel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.editSidebar = index.createEvent(this, "editSidebar", 7);
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
    return (index.h("div", { class: this.iconShown ? 'sm-padding-right sm-padding-top' : 'sm-padding-top' }, index.h("strong", { class: "sm-padding-right" }, this.label), this.imageSrc && index.h("img", { src: this.imageSrc, class: "sm-padding-right" }), this.value, this.iconShown && index.h("ir-icon", { icon: "ft-edit color-ir-dark-blue-hover pointer", class: "sm-padding-left", onClick: () => this.openEditSidebar() })));
  }
};

exports.ir_label = IrLabel;

//# sourceMappingURL=ir-label.cjs.entry.js.map