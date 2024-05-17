'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-94e5c77d.js');

const irLabelCss = "*.sc-ir-label{margin:0;padding:0}.sc-ir-label-h{display:flex;margin-bottom:5px;gap:5px}.icon.sc-ir-label{margin-left:3px;padding:0;margin-top:0;display:flex;align-items:center}p.sc-ir-label{margin:0 3px;padding:0}.icon-container.sc-ir-label{margin:0;padding:0}.country.sc-ir-label{height:16px;width:23px;border-radius:3px}svg.sc-ir-label{margin:0;padding:0}";

const IrLabel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.editSidebar = index.createEvent(this, "editSidebar", 7);
    this.label = undefined;
    this.value = undefined;
    this.iconShown = false;
    this.imageSrc = undefined;
    this.country = false;
    this.imageStyle = '';
  }
  openEditSidebar() {
    this.editSidebar.emit();
  }
  render() {
    if (!this.value) {
      return null;
    }
    return (index.h(index.Host, { class: this.imageSrc ? 'align-items-center' : '' }, index.h("strong", null, this.label), this.imageSrc && index.h("img", { src: this.imageSrc, class: `p-0 m-0 ${this.country ? 'country' : ''} ${this.imageStyle}` }), index.h("p", null, this.value), this.iconShown && (index.h("div", { class: "icon-container" }, index.h("ir-icon", { class: "pointer icon", id: "pickup", onIconClickHandler: e => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.openEditSidebar();
      } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "15", width: "15", viewBox: "0 0 512 550" }, index.h("path", { fill: "#6b6f82", d: "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" })))))));
  }
};
IrLabel.style = irLabelCss;

exports.ir_label = IrLabel;

//# sourceMappingURL=ir-label.cjs.entry.js.map