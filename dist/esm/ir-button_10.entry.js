import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-795d2df3.js';
import { R as RoomService } from './room.service-a551df5a.js';
import { c as calendar_data } from './calendar-data-32548888.js';
import { a as axios, l as locales } from './axios-248c334f.js';
import { o as onChannelChange, s as selectChannel, c as channels_data } from './channel.store-8bfcea95.js';

const irButtonCss = ".loader{width:11px;height:11px;border:2px solid #fff;border-bottom-color:transparent;border-radius:50%;margin:0;padding:0;display:inline-flex;box-sizing:border-box;animation:rotation 1s linear infinite}.button-icon{padding:0;margin-top:0}.button-icon[data-state='loading']{display:none}.button-text{padding:0 5px}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const IrButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.clickHanlder = createEvent(this, "clickHanlder", 7);
    this.name = undefined;
    this.text = undefined;
    this.icon = 'ft-save';
    this.btn_color = 'primary';
    this.size = 'md';
    this.textSize = 'md';
    this.btn_block = true;
    this.btn_disabled = false;
    this.btn_type = 'button';
    this.isLoading = false;
    this.btn_styles = undefined;
  }
  connectedCallback() { }
  disconnectedCallback() { }
  render() {
    let blockClass = this.btn_block ? 'btn-block' : '';
    return (h("button", { onClick: () => this.clickHanlder.emit(), class: `btn btn-${this.btn_color} ${this.btn_styles} d-flex align-items-center btn-${this.size} text-${this.textSize} ${blockClass}`, type: this.btn_type, disabled: this.btn_disabled }, h("span", { class: "button-icon", "data-state": this.isLoading ? 'loading' : '' }, h("slot", { name: "icon" })), this.isLoading && h("span", { class: "loader m-0 p-0" }), this.text && h("span", { class: "button-text m-0" }, this.text)));
  }
};
IrButton.style = irButtonCss;

const irChannelCss = ".sc-ir-channel-h{display:block}";

const IrChannel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.roomService = new RoomService();
    this.ticket = '';
    this.propertyid = undefined;
    this.language = undefined;
    this.baseurl = undefined;
    this.channel_status = null;
  }
  componentWillLoad() {
    if (this.baseurl) {
      axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      this.initializeApp();
    }
  }
  async initializeApp() {
    try {
      const [, , languageTexts] = await Promise.all([
        this.roomService.fetchData(this.propertyid, this.language),
        this.roomService.getExposedChannels(),
        this.roomService.fetchLanguage(this.language),
      ]);
      console.log(languageTexts);
      if (!locales.entries) {
        locales.entries = languageTexts.entries;
        locales.direction = languageTexts.direction;
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  async ticketChanged() {
    sessionStorage.setItem('token', JSON.stringify(this.ticket));
    this.initializeApp();
  }
  render() {
    var _a;
    return (h(Host, null, h("section", { class: "p-2" }, h("div", { class: "d-flex w-100 justify-content-end mb-2" }, h("ir-button", { text: 'Create', size: "sm", onClickHanlder: () => (this.channel_status = 'create') })), h("div", null, h("table", { class: "table" }, h("thead", { class: "" }, h("tr", null, h("th", { scope: "col", class: "text-left" }, "Title"), h("th", { scope: "col" }, "Channel"), h("th", { scope: "col" }, "Status"), h("th", { scope: "col" }, "Actions"))), h("tbody", null, (_a = calendar_data.connected_channels) === null || _a === void 0 ? void 0 : _a.map(channel => (h("tr", { key: channel.channel.id }, h("th", { scope: "row", class: "text-left" }, channel.title), h("th", { scope: "row" }, channel.channel.name), h("td", null, h("input", { "data-switchery": "true", type: "checkbox", class: "", checked: channel.is_active })), h("th", null, h("div", { class: "dropdown" }, h("button", { class: "btn dropdown-toggle text-primary", type: "button", "data-toggle": "dropdown", "aria-expanded": "false" }, "Actions"), h("div", { class: "dropdown-menu dropdown-menu-right" }, h("a", { class: "dropdown-item", href: "#" }, "Action"), h("a", { class: "dropdown-item", href: "#" }, "Another action"), h("a", { class: "dropdown-item", href: "#" }, "Something else here"))))))))))), h("ir-sidebar", { showCloseButton: false, onIrSidebarToggle: e => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.channel_status = null;
      }, open: this.channel_status !== null }, this.channel_status && h("ir-channel-editor", { onCloseSideBar: () => (this.channel_status = null) }))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
};
IrChannel.style = irChannelCss;

const irChannelEditorCss = ".sc-ir-channel-editor-h{display:block}nav.sc-ir-channel-editor{z-index:10}";

const IrChannelEditor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.closeSideBar = createEvent(this, "closeSideBar", 7);
    this.selectedTab = '';
    this.headerTitles = [
      {
        id: 'general_settings',
        name: 'General Settings',
        disabled: false,
      },
      { id: 'mapping', name: 'Mapping', disabled: true },
      { id: 'channel_booking', name: 'Channel Booking', disabled: true },
    ];
    this.selectedRoomType = [];
  }
  componentWillLoad() {
    this.selectedTab = this.headerTitles[0].id;
    onChannelChange('selectedChannel', newValue => {
      if (!!newValue) {
        this.enableAllHeaders();
      }
    });
  }
  handleTabChange(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.selectedTab = e.detail;
  }
  renderTabScreen() {
    switch (this.selectedTab) {
      case 'general_settings':
        return h("ir-channel-general", null);
      case 'mapping':
        return h("ir-channel-mapping", null);
      case 'channel_booking':
        return h("div", null, "channel booking");
      default:
        return null;
    }
  }
  enableAllHeaders() {
    this.headerTitles = this.headerTitles.map((title, index) => (index < this.headerTitles.length - 1 ? Object.assign(Object.assign({}, title), { disabled: false }) : title));
  }
  disableNonFirstTabs() {
    this.headerTitles = this.headerTitles.map((title, index) => (index > 0 ? Object.assign(Object.assign({}, title), { disabled: true }) : title));
  }
  render() {
    return (h(Host, { class: "px-1" }, h("nav", { class: "position-sticky sticky-top py-1 top-0 bg-white" }, h("div", { class: "d-flex align-items-center  justify-content-between" }, h("h3", { class: "text-left font-medium-2  py-0 my-0" }, "Create Channel"), h("ir-icon", { class: 'm-0 p-0', onIconClickHandler: () => {
        this.closeSideBar.emit(null);
      } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 20, width: 20 }, h("path", { d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), h("ir-channel-header", { class: "mt-1 px-0", headerTitles: this.headerTitles })), h("section", { class: "pb-1" }, this.renderTabScreen()), h("ir-button", { class: "w-100 mt-3", btn_styles: "justify-content-center", text: locales.entries.Lcz_Save })));
  }
};
IrChannelEditor.style = irChannelEditorCss;

const irChannelGeneralCss = ".sc-ir-channel-general-h{display:block}";

const IrChannelGeneral = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("ir-select", { selectContainerStyle: "mb-1", onSelectChange: (e) => selectChannel(e.detail), class: 'm-0 mb-1', LabelAvailable: false, data: channels_data.channels.map(channel => ({
        value: channel.id,
        text: channel.name,
      })) })));
  }
};
IrChannelGeneral.style = irChannelGeneralCss;

const irChannelHeaderCss = ".sc-ir-channel-header-h{display:block;position:relative;padding:0;margin:0;border-bottom:1px solid #e4e5ec}ul.sc-ir-channel-header{display:flex;align-items:center;gap:2rem;padding:0}.tab.sc-ir-channel-header{font-size:0.95rem;font-weight:600;cursor:pointer;position:relative;margin:0;padding:0;transition:color 0.3s ease;user-select:none}.tab[data-disabled].sc-ir-channel-header{cursor:auto}.tab.sc-ir-channel-header:hover{opacity:80%}.tab[data-state='selected'].sc-ir-channel-header,.tab[data-state='selected'].sc-ir-channel-header:hover{color:var(--blue);opacity:100%}.active-indicator.sc-ir-channel-header{padding:0;bottom:0px;position:absolute;height:3px;border-radius:4px;transition:transform 0.3s ease, width 0.3s ease;background:var(--blue)}";

const IrChannelHeader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.tabChanged = createEvent(this, "tabChanged", 7);
    this.headerTitles = [];
    this.selectedIndex = 0;
  }
  componentDidLoad() {
    this.updateActiveIndicator();
  }
  disconnectedCallback() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
  handleTabSelection(index) {
    this.selectedIndex = index;
    this.updateActiveIndicator();
    this.tabChanged.emit(this.headerTitles[this.selectedIndex].id);
  }
  updateActiveIndicator() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    requestAnimationFrame(() => {
      const selectedTab = this.el.querySelector(`li.tab[data-state="selected"]`);
      if (selectedTab) {
        const { left, width } = selectedTab.getBoundingClientRect();
        const parentLeft = this.el.getBoundingClientRect().left;
        const position = left - parentLeft;
        this.activeIndicator.style.width = `${width}px`;
        this.activeIndicator.style.transform = `translateX(${position}px)`;
      }
    });
  }
  render() {
    return (h(Host, null, h("ul", null, this.headerTitles.map((title, index) => (h("li", { class: `tab ${title.disabled ? 'text-light' : ''}`, key: title.id, onClick: () => {
        if (!title.disabled)
          this.handleTabSelection(index);
      }, "data-disabled": title.disabled, "data-state": this.selectedIndex === index ? 'selected' : '' }, title.name)))), h("span", { class: "active-indicator", ref: el => (this.activeIndicator = el) })));
  }
  get el() { return getElement(this); }
};
IrChannelHeader.style = irChannelHeaderCss;

const irChannelMappingCss = ".sc-ir-channel-mapping-h{display:block;box-sizing:border-box}.map-row.sc-ir-channel-mapping{display:flex;align-items:center;justify-content:space-between}.map-row.sc-ir-channel-mapping span.sc-ir-channel-mapping{width:49%}.submap-text.sc-ir-channel-mapping{padding-left:10px}.text-blue.sc-ir-channel-mapping{color:var(--blue)}.text-red.sc-ir-channel-mapping{color:var(--red)}";

const IrChannelMapping = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.selectedChannel = undefined;
    this.activeMapField = '';
  }
  //private mappingService = new IrMappingService();
  componentWillLoad() {
    this.selectedChannel = channels_data.channels[0];
  }
  // renderMappingStatus(id: string) {
  //   const mappedField = this.mappingService.checkMappingExists(id, this.selectedChannel);
  //   if (mappedField) {
  //     return <span class="px-2">exist</span>;
  //   }
  //   return (
  //     <span class="px-2">
  //       {this.activeMapField === id ? (
  //         <ir-combobox></ir-combobox>
  //       ) : (
  //         <span class="cursor-pointer text-red" onClick={() => (this.activeMapField = id)}>
  //           Not mapped
  //         </span>
  //       )}
  //     </span>
  //   );
  // }
  render() {
    return (h(Host, null, h("ul", { class: "m-0 p-0" }, h("li", { class: "map-row my-2" }, h("span", { class: "font-weight-bold" }, channels_data.channels[0].name), h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), h("span", { class: "font-weight-bold px-2" }, "Channel manager")))));
  }
};
IrChannelMapping.style = irChannelMappingCss;

const onlineResources = [
  // {
  //   isJS: true,
  //   link: "https://x.igloorooms.com/manage/micro/app-assets/required/assets/scripts/jquery.min.js",
  // },
  {
    isCSS: true,
    link: 'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i%7CQuicksand:300,400,500,700',
  },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/css/bootstrap.css',
  },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/css/bootstrap-extended.css',
  },
  { isCSS: true, link: 'https://x.igloorooms.com/app-assets/css/colors.css' },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/css/core/menu/menu-types/horizontal-menu.css',
  },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/css/core/colors/palette-gradient.css',
  },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/css/components.css',
  },
  { isCSS: true, link: 'https://x.igloorooms.com/assets/css/style.css' },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/vendors/css/forms/icheck/icheck.css',
  },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/vendors/css/forms/icheck/custom.css',
  },
  {
    isCSS: true,
    link: 'https://x.igloorooms.com/app-assets/css/pages/login-register.css',
  },
  // {
  //   isCSS: true,
  //   link: 'https://x.igloorooms.com/manage/micro/app-assets/required/assets/scripts/daterangepicker/daterangepicker.css',
  // },
  // {
  //   isJS: true,
  //   link: "https://x.igloorooms.com/manage/micro/app-assets/required/assets/scripts/daterangepicker/moment.min.js",
  // },
  // {
  //   isJS: true,
  //   link: "https://x.igloorooms.com/manage/micro/app-assets/required/assets/scripts/daterangepicker/daterangepicker.js",
  // },
];

const IrCommon = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.extraResources = '';
    this.resources = onlineResources;
  }
  componentWillLoad() {
    this.parseRefs();
  }
  componentDidLoad() {
    this.initializeStyles();
  }
  hrefsChanged() {
    this.parseRefs();
    this.initializeStyles();
  }
  parseRefs() {
    if (this.extraResources !== '')
      this.resources.push(JSON.parse(this.extraResources));
  }
  appendTag(tagName, attributes) {
    const tag = document.createElement(tagName);
    const selectorParts = [];
    Object.keys(attributes).forEach(attr => {
      tag.setAttribute(attr, attributes[attr]);
      selectorParts.push(`[${attr}="${attributes[attr]}"]`);
    });
    const selector = `${tagName}${selectorParts.join('')}`;
    const existingTag = document.querySelector(selector);
    if (!existingTag) {
      document.head.appendChild(tag);
    }
  }
  initializeStyles() {
    this.resources.forEach(res => {
      if (res.isCSS) {
        this.appendTag('link', {
          href: res.link,
          rel: 'stylesheet',
          type: 'text/css',
        });
      }
      if (res.isJS) {
        this.appendTag('script', {
          src: res.link,
        });
      }
    });
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
  static get watchers() { return {
    "extraResources": ["hrefsChanged"]
  }; }
};

const irIconCss = ".sc-ir-icon-h{margin:0;padding:0}.icon-button.sc-ir-icon{all:unset;margin:0;padding:0}.icon-button.sc-ir-icon:hover{cursor:pointer}";

const IrIcon = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.iconClickHandler = createEvent(this, "iconClickHandler", 7);
    this.icon = 'ft-check';
  }
  render() {
    return (h("button", { class: "icon-button", onClick: () => this.iconClickHandler.emit() }, h("slot", { name: "icon" })));
  }
};
IrIcon.style = irIconCss;

const irSelectCss = ".border-theme.sc-ir-select{border:1px solid #cacfe7}";

const IrSelect = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.selectChange = createEvent(this, "selectChange", 7);
    this.count = 0;
    this.name = undefined;
    this.data = undefined;
    this.label = '<label>';
    this.selectStyles = undefined;
    this.selectContainerStyle = undefined;
    this.selectedValue = null;
    this.required = undefined;
    this.LabelAvailable = true;
    this.firstOption = 'Select';
    this.selectStyle = true;
    this.submited = false;
    this.size = 'md';
    this.textSize = 'md';
    this.labelPosition = 'left';
    this.labelBackground = null;
    this.labelColor = 'dark';
    this.labelBorder = 'theme';
    this.labelWidth = 3;
    this.initial = true;
    this.valid = false;
  }
  watchHandler(newValue) {
    if (newValue !== null && this.required) {
      this.valid = true;
    }
  }
  watchHandler2(newValue) {
    if (newValue && this.required) {
      this.initial = false;
    }
  }
  componentwillload() { }
  disconnectedCallback() { }
  handleSelectChange(event) {
    if (this.required) {
      this.initial = false;
      this.valid = event.target.checkValidity();
      this.selectedValue = event.target.value;
      this.selectChange.emit(this.selectedValue);
    }
    else {
      this.selectedValue = event.target.value;
      this.selectChange.emit(this.selectedValue);
    }
  }
  render() {
    let className = 'form-control';
    let label = (h("div", { class: `input-group-prepend col-${this.labelWidth} p-0 text-${this.labelColor}` }, h("label", { class: `input-group-text ${this.labelPosition === 'right' ? 'justify-content-end' : this.labelPosition === 'center' ? 'justify-content-center' : ''} ${this.labelBackground ? 'bg-' + this.labelBackground : ''} flex-grow-1 text-${this.labelColor} border-${this.labelBorder === 'none' ? 0 : this.labelBorder} ` }, this.label, this.required ? '*' : '')));
    if (this.selectStyle === false) {
      className = '';
    }
    if (this.required && !this.valid && !this.initial) {
      className = `${className} border-danger`;
    }
    if (!this.LabelAvailable) {
      label = '';
    }
    return (h("div", { class: `form-group m-0 ${this.selectContainerStyle}` }, h("div", { class: "input-group row m-0" }, label, h("select", { class: `${this.selectStyles} ${className} form-control-${this.size} text-${this.textSize} col-${this.LabelAvailable ? 12 - this.labelWidth : 12}`, onInput: this.handleSelectChange.bind(this), required: this.required }, h("option", { value: '' }, this.firstOption), this.data.map(item => {
      if (this.selectedValue === item.value) {
        return (h("option", { selected: true, value: item.value }, item.text));
      }
      else {
        return h("option", { value: item.value }, item.text);
      }
    })))));
  }
  static get watchers() { return {
    "selectedValue": ["watchHandler"],
    "submited": ["watchHandler2"]
  }; }
};
IrSelect.style = irSelectCss;

const irSidebarCss = ".backdrop{position:fixed;top:0;left:0;width:100%;height:100vh;cursor:pointer;background:rgba(0, 0, 0, 0.5);z-index:99;transition:all 0.5s;opacity:0;pointer-events:none;transition:all 0.5s}.backdrop.active{opacity:1;pointer-events:all}.sidebar-right{position:fixed;top:0;right:-100%;bottom:0;width:var(--sidebar-width, 40rem);max-width:100%;box-shadow:0 0 10px rgba(0, 0, 0, 0.1);transition:all 0.5s;z-index:100;overflow-y:hidden;color:var(--sidebar-color, #000);background-color:var(--sidebar-backgound, #fff);padding:0.5rem}.sidebar-right.active{right:0;overflow-y:auto}.sidebar-left{position:fixed;top:0;left:-100%;bottom:0;width:var(--sidebar-width, 30rem);max-width:100%;box-shadow:0 0 10px rgba(0, 0, 0, 0.1);transition:all 0.5s;z-index:200;overflow-y:hidden;color:var(--sidebar-color, #000);background:var(--sidebar-backgound, #fff);padding:0.5rem}.sidebar-left.active{left:0;overflow-y:scroll}.close{position:absolute;top:0.5rem;right:1rem;width:1rem;height:1rem;cursor:pointer}";

const IrSidebar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.irSidebarToggle = createEvent(this, "irSidebarToggle", 7);
    this.name = undefined;
    this.side = 'right';
    this.showCloseButton = true;
    this.open = false;
    this.sidebarStyles = undefined;
  }
  applyStyles() {
    for (const property in this.sidebarStyles) {
      if (this.sidebarStyles.hasOwnProperty(property)) {
        this.sidebarRef.style[property] = this.sidebarStyles[property];
      }
    }
  }
  handleSidebarStylesChange() {
    this.applyStyles();
  }
  componentWillLoad() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentDidLoad() {
    // If esc key is pressed, close the modal
    this.applyStyles();
    document.addEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown(e) {
    if (e.key === 'Escape') {
      return this.toggleSidebar();
    }
    else {
      return;
    }
  }
  // Unsubscribe to the event when the component is removed from the DOM
  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  async toggleSidebar() {
    this.irSidebarToggle.emit(this.open);
  }
  render() {
    let className = '';
    if (this.open) {
      className = 'active';
    }
    else {
      className = '';
    }
    return [
      h("div", { class: `backdrop ${className}`, onClick: () => {
          this.toggleSidebar();
        } }),
      h("div", { ref: el => (this.sidebarRef = el), class: `sidebar-${this.side} ${className}` }, this.showCloseButton && (h("ir-icon", { class: "close", onIconClickHandler: () => {
          this.toggleSidebar();
        } }, h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 20, width: 20 }, h("path", { fill: "#6b6f82", d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), h("slot", null)),
    ];
  }
  static get watchers() { return {
    "sidebarStyles": ["handleSidebarStylesChange"]
  }; }
};
IrSidebar.style = irSidebarCss;

export { IrButton as ir_button, IrChannel as ir_channel, IrChannelEditor as ir_channel_editor, IrChannelGeneral as ir_channel_general, IrChannelHeader as ir_channel_header, IrChannelMapping as ir_channel_mapping, IrCommon as ir_common, IrIcon as ir_icon, IrSelect as ir_select, IrSidebar as ir_sidebar };

//# sourceMappingURL=ir-button_10.entry.js.map