'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7a63c2a9.js');

const IrIcon = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.iconClickHandler = index.createEvent(this, "iconClickHandler", 7);
    this.icon = 'ft-check';
  }
  render() {
    return (index.h("i", { onClick: () => {
        this.iconClickHandler.emit();
      }, class: this.icon }));
  }
};

exports.ir_icon = IrIcon;

//# sourceMappingURL=ir-icon.cjs.entry.js.map