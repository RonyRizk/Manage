import { r as registerInstance, c as createEvent, h } from './index-2fc15efd.js';

const IrCheckBoxes = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.checkboxesChange = createEvent(this, "checkboxesChange", 7);
    this.checkedCheckboxes = [];
    this.checkboxes = [];
  }
  handleCheckboxChange(event) {
    if (event.detail.checked) {
      this.checkedCheckboxes.push(this.checkboxes[parseInt(event.detail.name)]);
    }
    else {
      this.checkedCheckboxes.splice(this.checkedCheckboxes.indexOf(this.checkboxes[parseInt(event.detail.name)]), 1);
    }
    this.checkboxesChange.emit(this.checkedCheckboxes);
  }
  componentWillLoad() {
    this.checkedCheckboxes = this.checkboxes.filter(checkbox => checkbox.checked);
    if (this.checkedCheckboxes.length > 0) {
      this.checkboxesChange.emit(this.checkedCheckboxes);
    }
  }
  render() {
    return (h("div", null, this.checkboxes.map((checkbox, index) => (h("ir-checkbox", { name: index.toString(), label: checkbox.text, value: checkbox.value, checked: checkbox.checked || false })))));
  }
};

export { IrCheckBoxes as ir_checkboxes };

//# sourceMappingURL=ir-checkboxes.entry.js.map