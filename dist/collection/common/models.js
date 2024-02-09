export class selectOption {
}
export class checkboxes {
  constructor() {
    this.value = '';
    this.text = '';
    this.checked = false;
  }
}
export class guestInfo {
  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.altEmail = '';
    this.password = '';
    this.country = -1;
    this.city = '';
    this.address = '';
    this.mobile = '';
    this.prefix = '';
    this.newsletter = false;
    this.currency = '';
    this.language = '';
  }
}
export class guestInfoValidation {
  constructor() {
    this.firstNameValid = false;
    this.lastNameValid = false;
    this.emailValid = false;
    this.countryValid = false;
    this.passwordValid = false;
    this.mobileValid = false;
    this.prefixValid = false;
    this.setupData = false;
  }
}
//# sourceMappingURL=models.js.map
