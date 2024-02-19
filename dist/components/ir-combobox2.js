import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { l as locales } from './locales.store.js';

const irComboboxCss = ".sc-ir-combobox-h{display:block;position:relative;padding:0;margin:0}ul.sc-ir-combobox{position:absolute;margin:0;margin-top:2px;width:100%;max-height:80px;border-radius:0.21rem;z-index:10000;padding:1px;background:white;box-shadow:0px 8px 16px 0px rgba(0, 0, 0, 0.2);padding:5px 0;max-height:250px;overflow-y:auto}.dropdown-item.sc-ir-combobox{cursor:pointer}ul.sc-ir-combobox li.sc-ir-combobox,span.sc-ir-combobox,loader-container.sc-ir-combobox{padding:0px 16px;margin:0px;margin-top:2px;width:100%;border-radius:2px}ul.sc-ir-combobox li.sc-ir-combobox{cursor:pointer}ul.sc-ir-combobox li.sc-ir-combobox:hover{background:#f4f5fa}ul.sc-ir-combobox li[data-selected].sc-ir-combobox,ul.sc-ir-combobox li[data-selected].sc-ir-combobox:hover{color:#fff;text-decoration:none;background-color:#666ee8}";

const IrCombobox = /*@__PURE__*/ proxyCustomElement(class IrCombobox extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.comboboxValueChange = createEvent(this, "comboboxValueChange", 7);
    this.inputCleared = createEvent(this, "inputCleared", 7);
    this.toast = createEvent(this, "toast", 7);
    this.data = [];
    this.duration = 300;
    this.placeholder = undefined;
    this.value = undefined;
    this.disabled = false;
    this.autoFocus = false;
    this.selectedIndex = -1;
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
    const dataSize = this.data.length;
    const itemHeight = this.getHeightOfPElement();
    if (dataSize > 0) {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          this.selectedIndex = (this.selectedIndex - 1 + dataSize) % dataSize;
          this.adjustScrollPosition(itemHeight);
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.selectedIndex = (this.selectedIndex + 1) % dataSize;
          this.adjustScrollPosition(itemHeight);
          break;
        case 'Enter':
        case ' ':
        case 'ArrowRight':
          event.preventDefault();
          this.selectItem(this.selectedIndex);
          break;
        case 'Escape':
          (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.blur();
          this.isComboBoxVisible = false;
          break;
      }
    }
  }
  getHeightOfPElement() {
    const combobox = this.el.querySelector('.combobox');
    if (combobox) {
      const pItem = combobox.querySelector('p');
      return pItem ? pItem.offsetHeight : 0;
    }
    return 0;
  }
  focusInput() {
    requestAnimationFrame(() => {
      var _a;
      (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.focus();
    });
  }
  adjustScrollPosition(itemHeight, visibleHeight = 250) {
    const combobox = this.el.querySelector('.combobox');
    if (combobox) {
      const margin = 2;
      const itemTotalHeight = itemHeight + margin;
      const selectedPosition = itemTotalHeight * this.selectedIndex;
      let newScrollTop = selectedPosition - visibleHeight / 2 + itemHeight / 2;
      newScrollTop = Math.max(0, Math.min(newScrollTop, combobox.scrollHeight - visibleHeight));
      combobox.scrollTo({
        top: newScrollTop,
        behavior: 'auto',
      });
    }
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
    else {
      return;
    }
  }
  renderDropdown() {
    var _a;
    if (!this.isComboBoxVisible) {
      return null;
    }
    return (h("ul", null, (_a = this.filteredData) === null || _a === void 0 ? void 0 :
      _a.map((d, index) => (h("li", { role: "button", key: d.id, onKeyDown: e => this.handleItemKeyDown(e, index), "data-selected": this.selectedIndex === index, tabIndex: 0, onClick: () => this.selectItem(index) }, d.name))), this.filteredData.length === 0 && !this.isLoading && h("span", { class: 'text-center' }, locales.entries.Lcz_NoResultsFound)));
  }
  render() {
    return (h("fieldset", { class: "m-0 p-0" }, h("input", { ref: el => (this.inputRef = el), type: "text", disabled: this.disabled, value: this.value, placeholder: this.placeholder, class: "form-control bg-white", onKeyDown: this.handleKeyDown.bind(this), onBlur: this.handleBlur.bind(this), onInput: this.handleInputChange.bind(this), onFocus: this.handleFocus.bind(this), autoFocus: this.autoFocus }), this.renderDropdown()));
  }
  get el() { return this; }
  static get watchers() { return {
    "isComboBoxVisible": ["watchHandler"]
  }; }
  static get style() { return irComboboxCss; }
}, [2, "ir-combobox", {
    "data": [1040],
    "duration": [2],
    "placeholder": [1],
    "value": [1],
    "disabled": [4],
    "autoFocus": [4, "auto-focus"],
    "selectedIndex": [32],
    "isComboBoxVisible": [32],
    "isLoading": [32],
    "isItemSelected": [32],
    "inputValue": [32],
    "filteredData": [32],
    "componentShouldAutoFocus": [32]
  }, [[4, "click", "handleDocumentClick"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-combobox"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-combobox":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrCombobox);
      }
      break;
  } });
}

export { IrCombobox as I, defineCustomElement as d };

//# sourceMappingURL=ir-combobox2.js.map