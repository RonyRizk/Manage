import { Host, h } from "@stencil/core";
export class IrPopover {
  constructor() {
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
  static get is() { return "ir-popover"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-popover.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-popover.css"]
    };
  }
  static get properties() {
    return {
      "popoverTitle": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "popover-title",
        "reflect": false
      },
      "irPopoverLeft": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "ir-popover-left",
        "reflect": false,
        "defaultValue": "'10px'"
      }
    };
  }
  static get states() {
    return {
      "isHovered": {},
      "showPopover": {}
    };
  }
  static get elementRef() { return "el"; }
}
//# sourceMappingURL=ir-popover.js.map
