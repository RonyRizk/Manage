'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-94e5c77d.js');

const irTitleCss = ".sc-ir-title-h{padding:0px 0;margin-bottom:20px;display:flex;align-items:center;width:100%}[display-context='sidebar'].sc-ir-title-h{padding:15px 0;justify-content:space-between !important;width:100% !important;border-bottom:1px solid #e4e5ec !important;border-color:#e4e5ec !important}.title-body.sc-ir-title{margin:0;padding:0}@media only screen and (max-width: 641px){.sc-ir-title-h{flex-direction:column;gap:8px;align-items:flex-start}[display-context='sidebar'].sc-ir-title-h{flex-direction:row}}";

const IrTitle = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.closeSideBar = index.createEvent(this, "closeSideBar", 7);
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
    return (index.h(index.Host, null, index.h("h4", { class: "text-left font-medium-2 py-0 my-0" }, this.label), this.displayContext === 'sidebar' && (index.h("ir-icon", { class: 'close', onIconClickHandler: () => {
        this.closeSideBar.emit(null);
      } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 20, width: 20 }, index.h("path", { d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), this.displayContext !== 'sidebar' && (index.h("div", { class: 'title-body' }, index.h("slot", { name: "title-body" })))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "justifyContent": ["handleJustifyContentChange"]
  }; }
};
IrTitle.style = irTitleCss;

exports.ir_title = IrTitle;

//# sourceMappingURL=ir-title.cjs.entry.js.map