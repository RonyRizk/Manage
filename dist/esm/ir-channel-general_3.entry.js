import { r as registerInstance, h, H as Host, c as createEvent, g as getElement } from './index-795d2df3.js';
import { c as calendar_data } from './calendar-data-ef3d2bda.js';

const irChannelGeneralCss = ".sc-ir-channel-general-h{display:block}";

const IrChannelGeneral = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return h(Host, null, "general");
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

const irChannelMappingCss = ".sc-ir-channel-mapping-h{display:block;box-sizing:border-box}.map-row.sc-ir-channel-mapping{display:flex;align-items:center;justify-content:space-between}.map-row.sc-ir-channel-mapping span.sc-ir-channel-mapping{width:49%}.mapped-to-text.sc-ir-channel-mapping{text-align:right;color:var(--red);cursor:pointer}";

const IrChannelMapping = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("ul", { class: "m-0 p-0" }, calendar_data.channels[0].property.room_types.map(property => (h("li", { class: "map-row", key: property.id }, h("span", null, property.name), h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, h("path", { d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), h("span", { class: "mapped-to-text" }, "not mapped")))))));
  }
};
IrChannelMapping.style = irChannelMappingCss;

export { IrChannelGeneral as ir_channel_general, IrChannelHeader as ir_channel_header, IrChannelMapping as ir_channel_mapping };

//# sourceMappingURL=ir-channel-general_3.entry.js.map