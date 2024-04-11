import locales from "../../../../src/stores/locales.store";
import { h, Fragment } from "@stencil/core";
import { v4 } from "uuid";
export class IrCombobox {
  constructor() {
    this.data = [];
    this.duration = 300;
    this.placeholder = undefined;
    this.value = undefined;
    this.disabled = false;
    this.autoFocus = false;
    this.input_id = v4();
    this.selectedIndex = -1;
    this.actualIndex = -1;
    this.isComboBoxVisible = false;
    this.isLoading = true;
    this.isItemSelected = undefined;
    this.inputValue = '';
    this.filteredData = [];
    this.componentShouldAutoFocus = false;
  }
  componentWillLoad() {
    this.filteredData = this.data;
  }
  componentDidLoad() {
    if (this.autoFocus) {
      this.focusInput();
    }
  }
  watchHandler(newValue, oldValue) {
    if (newValue !== oldValue && newValue === true) {
      this.focusInput();
    }
  }
  handleKeyDown(event) {
    var _a;
    const dataSize = this.filteredData.length;
    if (dataSize > 0) {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          this.selectedIndex = (this.selectedIndex - 1 + dataSize) % dataSize;
          this.adjustScrollPosition();
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.selectedIndex = (this.selectedIndex + 1) % dataSize;
          this.adjustScrollPosition();
          break;
        // case 'Enter':
        // case ' ':
        // case 'ArrowRight':
        //   event.preventDefault();
        //   this.selectItem(this.selectedIndex);
        //   break;
        case 'Escape':
          (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.blur();
          this.isComboBoxVisible = false;
          break;
      }
    }
  }
  focusInput() {
    requestAnimationFrame(() => {
      var _a;
      (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.focus();
    });
  }
  adjustScrollPosition() {
    var _a;
    const selectedItem = (_a = this.el) === null || _a === void 0 ? void 0 : _a.querySelector(`[data-selected]`);
    if (!selectedItem)
      return;
    selectedItem.scrollIntoView({
      block: 'center',
    });
  }
  selectItem(index) {
    if (this.filteredData[index]) {
      this.isItemSelected = true;
      this.comboboxValueChange.emit({ key: 'select', data: this.filteredData[index].id });
      this.inputValue = '';
      this.resetCombobox();
      if (this.autoFocus) {
        this.focusInput();
      }
    }
  }
  debounceFetchData() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.fetchData();
    }, this.duration);
  }
  handleFocus() {
    this.isComboBoxVisible = true;
  }
  clearInput() {
    this.inputValue = '';
    this.resetCombobox();
    this.inputCleared.emit(null);
  }
  resetCombobox(withblur = true) {
    var _a;
    if (withblur) {
      (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.blur();
    }
    this.selectedIndex = -1;
    this.isComboBoxVisible = false;
  }
  async fetchData() {
    try {
      this.isLoading = true;
      this.filteredData = this.data.filter(d => d.name.toLowerCase().startsWith(this.inputValue));
      this.selectedIndex = -1;
    }
    catch (error) {
      console.log('error', error);
    }
    finally {
      this.isLoading = false;
    }
  }
  handleInputChange(event) {
    this.inputValue = event.target.value;
    if (this.inputValue) {
      this.debounceFetchData();
    }
    else {
      this.filteredData = this.data;
    }
  }
  handleDocumentClick(event) {
    const target = event.target;
    if (!this.el.contains(target)) {
      this.isComboBoxVisible = false;
    }
  }
  handleBlur() {
    this.blurTimout = setTimeout(() => {
      if (!this.isItemSelected) {
        this.inputValue = '';
        this.resetCombobox();
      }
      else {
        this.isItemSelected = false;
      }
    }, 300);
  }
  isDropdownItem(element) {
    return element && element.closest('.combobox');
  }
  disconnectedCallback() {
    var _a, _b, _c, _d;
    clearTimeout(this.debounceTimer);
    clearTimeout(this.blurTimout);
    (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.removeEventListener('blur', this.handleBlur);
    (_b = this.inputRef) === null || _b === void 0 ? void 0 : _b.removeEventListener('click', this.selectItem);
    (_c = this.inputRef) === null || _c === void 0 ? void 0 : _c.removeEventListener('keydown', this.handleKeyDown);
    (_d = this.inputRef) === null || _d === void 0 ? void 0 : _d.removeEventListener('focus', this.handleFocus);
  }
  handleItemKeyDown(event, index) {
    var _a;
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowRight') {
      this.selectItem(index);
      event.preventDefault();
    }
    else if (event.key === 'Escape') {
      this.isComboBoxVisible = false;
      (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.blur();
      event.preventDefault();
    }
  }
  renderDropdown() {
    var _a;
    if (!this.isComboBoxVisible) {
      return null;
    }
    return (h("ul", { "data-position": this.filteredData.length > 0 && this.filteredData[0].occupancy ? 'bottom-right' : 'bottom-left' }, (_a = this.filteredData) === null || _a === void 0 ? void 0 :
      _a.map((d, index) => (h("li", { onMouseEnter: () => (this.selectedIndex = index), role: "button", key: d.id, onKeyDown: e => this.handleItemKeyDown(e, index), "data-selected": this.selectedIndex === index, tabIndex: 0, onClick: () => this.selectItem(index) }, h("p", null, d.name), d.occupancy && (h(Fragment, null, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { fill: 'currentColor', d: "M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" })), h("p", null, d.occupancy)))))), this.filteredData.length === 0 && !this.isLoading && h("span", { class: 'text-center' }, locales.entries.Lcz_NoResultsFound)));
  }
  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('object');
    if (!this.filteredData.length) {
      return;
    }
    this.selectItem(this.selectedIndex === -1 ? 0 : this.selectedIndex);
  }
  render() {
    return (h("form", { onSubmit: this.handleSubmit.bind(this), class: "m-0 p-0" }, h("input", { type: "text", class: "form-control bg-white", id: this.input_id, ref: el => (this.inputRef = el), disabled: this.disabled, value: this.value, placeholder: this.placeholder, onKeyDown: this.handleKeyDown.bind(this), onBlur: this.handleBlur.bind(this), onInput: this.handleInputChange.bind(this), onFocus: this.handleFocus.bind(this), autoFocus: this.autoFocus }), this.renderDropdown()));
  }
  static get is() { return "ir-combobox"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-combobox.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-combobox.css"]
    };
  }
  static get properties() {
    return {
      "data": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "{ id: string; name: string; image?: string; occupancy?: number }[]",
          "resolved": "{ id: string; name: string; image?: string; occupancy?: number; }[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[]"
      },
      "duration": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "duration",
        "reflect": false,
        "defaultValue": "300"
      },
      "placeholder": {
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
        "attribute": "placeholder",
        "reflect": false
      },
      "value": {
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
        "attribute": "value",
        "reflect": false
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "autoFocus": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "auto-focus",
        "reflect": false,
        "defaultValue": "false"
      },
      "input_id": {
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
        "attribute": "input_id",
        "reflect": false,
        "defaultValue": "v4()"
      }
    };
  }
  static get states() {
    return {
      "selectedIndex": {},
      "actualIndex": {},
      "isComboBoxVisible": {},
      "isLoading": {},
      "isItemSelected": {},
      "inputValue": {},
      "filteredData": {},
      "componentShouldAutoFocus": {}
    };
  }
  static get events() {
    return [{
        "method": "comboboxValueChange",
        "name": "comboboxValueChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{ key: string; data: unknown }",
          "resolved": "{ key: string; data: unknown; }",
          "references": {}
        }
      }, {
        "method": "inputCleared",
        "name": "inputCleared",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "null",
          "resolved": "null",
          "references": {}
        }
      }, {
        "method": "toast",
        "name": "toast",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IToast",
          "resolved": "ICustomToast & Partial<IToastWithButton> | IDefaultToast & Partial<IToastWithButton>",
          "references": {
            "IToast": {
              "location": "import",
              "path": "@/components",
              "id": "src/components.d.ts::IToast"
            }
          }
        }
      }];
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "isComboBoxVisible",
        "methodName": "watchHandler"
      }];
  }
  static get listeners() {
    return [{
        "name": "click",
        "method": "handleDocumentClick",
        "target": "document",
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=ir-combobox.js.map
