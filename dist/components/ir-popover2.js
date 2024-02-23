import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const irPopoverCss = ".sc-ir-popover-h{display:block;width:100%}*.sc-ir-popover{box-sizing:border-box}.popover-title.sc-ir-popover{position:relative;width:100%;height:100%;margin:0;padding:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;z-index:10;left:0}.popover-container.sc-ir-popover{position:absolute;bottom:0px;left:var(--ir-popover-left, 10px);background:rgb(0, 0, 0);color:white;min-width:100%;box-shadow:rgba(0, 0, 0, 0.2) 0px 2px 10px;z-index:9999;padding:3.5px 7px;border-radius:5px;pointer-events:none;opacity:0;transition:all 100ms ease;font-family:'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;font-style:normal;font-weight:400;line-height:1.45;text-decoration:none;text-shadow:none;font-size:0.875rem}.popover-container[data-state='show'].sc-ir-popover{opacity:1}";

const IrPopover = /*@__PURE__*/ proxyCustomElement(class IrPopover extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.handleMouseEnter = () => {
      if (!this.showPopover) {
        return;
      }
      if (this.showPopover) {
        this.isHovered = true;
      }
    };
    this.handleMouseLeave = () => {
      if (!this.showPopover) {
        return;
      }
      this.isHovered = false;
    };
    this.popoverTitle = undefined;
    this.isHovered = false;
    this.showPopover = false;
    this.irPopoverLeft = '10px';
  }
  componentWillLoad() {
    this.checkTitleWidth();
  }
  checkTitleWidth() {
    requestAnimationFrame(() => {
      const titleElement = this.el.querySelector('.popover-title');
      if (titleElement) {
        const width = titleElement.scrollWidth;
        this.showPopover = width > 170; // Show popover if title width exceeds 170px
      }
    });
  }
  render() {
    return (h(Host, { style: { '--ir-popover-left': this.irPopoverLeft } }, h("p", { class: "popover-title", onMouseLeave: this.handleMouseLeave, onMouseEnter: this.handleMouseEnter }, this.popoverTitle), this.showPopover && this.isHovered && (h("div", { "data-state": "show", class: "popover-container" }, this.popoverTitle))));
  }
  get el() { return this; }
  static get style() { return irPopoverCss; }
}, [2, "ir-popover", {
    "popoverTitle": [1, "popover-title"],
    "irPopoverLeft": [1, "ir-popover-left"],
    "isHovered": [32],
    "showPopover": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-popover"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-popover":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrPopover);
      }
      break;
  } });
}

export { IrPopover as I, defineCustomElement as d };

//# sourceMappingURL=ir-popover2.js.map