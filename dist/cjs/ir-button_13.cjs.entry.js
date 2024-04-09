'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-94e5c77d.js');
const v4 = require('./v4-d89fec7e.js');
const room_service = require('./room.service-a4eab185.js');
const index$1 = require('./index-797ee4c0.js');
const locales_store = require('./locales.store-8fed15eb.js');
const axios = require('./axios-77201e24.js');
const calendarData = require('./calendar-data-96bc0c2a.js');

const irButtonCss = ".button-icon.sc-ir-button{padding:0;margin-top:0}.button-icon[data-state='loading'].sc-ir-button{display:none}.button-text.sc-ir-button{padding:0 5px}.bounce-3.sc-ir-button{animation:bounce 1s 1}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.loader.sc-ir-button{width:15px;height:10px;--c:no-repeat linear-gradient(#ffffff 0 0);background:var(--c) 0% 50%, var(--c) 50% 50%, var(--c) 100% 50%;background-size:20% 100%;animation:l1 1s infinite linear}@keyframes l1{0%{background-size:20% 100%, 20% 100%, 20% 100%}33%{background-size:20% 10%, 20% 100%, 20% 100%}50%{background-size:20% 100%, 20% 10%, 20% 100%}66%{background-size:20% 100%, 20% 100%, 20% 10%}100%{background-size:20% 100%, 20% 100%, 20% 100%}}@keyframes bounce{0%,100%{transform:scale(1);animation-timing-function:cubic-bezier(0.8, 0, 1, 1)}50%{transform:scale(1.2);animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}}@keyframes ping{75%,100%{transform:scale(1.2)}}";

const IrButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.clickHanlder = index.createEvent(this, "clickHanlder", 7);
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
    this.btn_id = v4.v4();
  }
  handleButtonAnimation(e) {
    if (!this.buttonEl || e.detail !== this.btn_id) {
      return;
    }
    e.stopImmediatePropagation();
    e.stopPropagation();
    this.buttonEl.classList.remove('bounce-3');
    this.buttonEl.classList.add('bounce-3');
  }
  render() {
    let blockClass = this.btn_block ? 'btn-block' : '';
    return (index.h("button", { id: this.btn_id, ref: el => (this.buttonEl = el), onClick: () => this.clickHanlder.emit(), class: `btn btn-${this.btn_color} ${this.btn_styles} d-flex align-items-center btn-${this.size} text-${this.textSize} ${blockClass}`, type: this.btn_type, disabled: this.btn_disabled }, index.h("span", { class: "button-icon", "data-state": this.isLoading ? 'loading' : '' }, index.h("slot", { name: "icon" })), this.text && index.h("span", { class: "button-text m-0" }, this.text), this.isLoading && index.h("div", { class: "loader m-0 p-0" })));
  }
};
IrButton.style = irButtonCss;

const initialState = {
  channels: [],
  selectedChannel: null,
  mappedChannels: [],
  connected_channels: [],
  isConnectedToChannel: false,
  channel_settings: null,
  property_id: null,
  channel_id: -1,
  is_active: false,
};
const { state: channels_data, onChange: onChannelChange, dispose } = index$1.createStore(initialState);
function setChannelIdAndActiveState(id, is_active) {
  channels_data.channel_id = id;
  channels_data.is_active = is_active;
}
function selectChannel(channel_id) {
  if (channel_id === '') {
    channels_data.selectedChannel = null;
    return;
  }
  const selectedChannel = channels_data.channels.find(c => c.id.toString() === channel_id);
  if (selectedChannel) {
    channels_data.selectedChannel = selectedChannel;
  }
  else {
    channels_data.selectedChannel = {
      id: channel_id,
      name: '',
      properties: [],
    };
  }
  setMappedChannel();
}
function updateChannelSettings(key, value) {
  if (!channels_data.channel_settings) {
    channels_data.channel_settings = {
      hotel_id: '',
      hotel_title: '',
    };
  }
  channels_data.channel_settings[key] = value;
}
function setMappedChannel() {
  let selectedChannelMap = channels_data.connected_channels.find(c => c.channel.id.toString() === channels_data.selectedChannel.id.toString());
  if (!selectedChannelMap) {
    channels_data.mappedChannels = [];
    return;
  }
  channels_data.mappedChannels = [...selectedChannelMap.map];
}
function resetStore() {
  channels_data.selectedChannel = null;
  channels_data.mappedChannels = [];
  channels_data.isConnectedToChannel = false;
  channels_data.channel_settings = null;
}
function addMapping(ir_id, fr_id, isRoomType) {
  channels_data.mappedChannels.push({
    channel_id: fr_id,
    ir_id,
    type: isRoomType ? 'room_type' : 'rate_plan',
  });
}
function testConnection() {
  var _a;
  // const hotelConnection = channels_data.selectedChannel.properties.find(property => property.id === 'd09e6374-1ebf-45e0-a130-64c8c9930987');
  const hotelConnection = channels_data.selectedChannel.properties.find(property => property.id === channels_data.channel_settings.hotel_id);
  if (!hotelConnection) {
    return false;
  }
  channels_data.selectedChannel.property = hotelConnection;
  if (channels_data.mappedChannels.length === 0) {
    channels_data.mappedChannels.push({ ir_id: ((_a = channels_data.property_id) !== null && _a !== void 0 ? _a : -1).toString(), channel_id: channels_data.channel_settings.hotel_id, type: 'property' });
  }
  channels_data.isConnectedToChannel = true;
  return true;
}

class ChannelService extends axios.Token {
  async getExposedChannels() {
    try {
      const token = this.getToken();
      if (token !== null) {
        const { data } = await axios.axios.post(`/Get_Exposed_Channels?Ticket=${token}`, {});
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        const results = data.My_Result;
        channels_data.channels = [...results];
        return data;
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async getExposedConnectedChannels(property_id) {
    try {
      const token = this.getToken();
      if (token !== null) {
        const { data } = await axios.axios.post(`/Get_Exposed_Connected_Channels?Ticket=${token}`, { property_id });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        channels_data.connected_channels = [...data.My_Result];
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async saveConnectedChannel(is_remove) {
    try {
      const body = {
        id: channels_data.channel_id,
        title: channels_data.channel_settings.hotel_title,
        is_active: channels_data.is_active,
        channel: { id: channels_data.selectedChannel.id, name: channels_data.selectedChannel.name },
        property: { id: calendarData.calendar_data.id, name: calendarData.calendar_data.name },
        map: channels_data.mappedChannels,
        is_remove,
      };
      const token = this.getToken();
      if (!token) {
        throw new Error('Invalid Token');
      }
      const { data } = await axios.axios.post(`/Handle_Connected_Channel?Ticket=${token}`, body);
      return data;
    }
    catch (error) {
      console.error(error);
    }
  }
}

const actions = (entries) => [
  {
    id: 'edit',
    name: entries.Lcz_Edit,
    icon: () => (index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "14", viewBox: "0 0 512 512" },
      index.h("path", { d: "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" }))),
    action: (params) => {
      const selectedProperty = params.map.find(m => m.type === 'property');
      setChannelIdAndActiveState(params.id, params.is_active);
      updateChannelSettings('hotel_id', selectedProperty.channel_id);
      updateChannelSettings('hotel_title', params.title);
      selectChannel(params.channel.id.toString());
      testConnection();
    },
  },
  // {
  //   id: 'view_logs',
  //   name: entries?.Lcz_ViewLogs,
  //   icon: () => (
  //     <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512">
  //       <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
  //     </svg>
  //   ),
  //   action: () => {
  //     return {
  //       cause: 'view_logs',
  //       action: () => {
  //         alert('view logs clicked');
  //       },
  //       title: 'ok',
  //       message: 'ok',
  //       main_color: 'primary',
  //     };
  //   },
  // },
  // {
  //   id: 'full_sync',
  //   name: entries?.Lcz_FullSync,
  //   icon: () => (
  //     <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512">
  //       <path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z" />
  //     </svg>
  //   ),
  //   action: () => {
  //     return {
  //       cause: 'full_sync',
  //       action: () => {
  //         alert('full sync');
  //       },
  //       title: '',
  //       message: entries?.Lcz_ScheduleFullSync,
  //       main_color: 'primary',
  //     };
  //   },
  // },
  // {
  //   id: 'pull_future_reservation',
  //   name: entries?.Lcz_PullFutureReservations,
  //   icon: () => null,
  //   action: () => {
  //     return {
  //       cause: 'pull_future_reservation',
  //       action: () => {
  //         alert('pull_future_reservation');
  //       },
  //       title: '',
  //       message: entries?.Lcz_ScheduleFullSync,
  //       main_color: 'primary',
  //     };
  //   },
  // },
  {
    id: 'remove',
    name: entries === null || entries === void 0 ? void 0 : entries.Lcz_Delete,
    icon: () => (index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" },
      index.h("path", { d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" }))),
    action: (params) => {
      const selectedProperty = params.map.find(m => m.type === 'property');
      setChannelIdAndActiveState(params.id, params.is_active);
      updateChannelSettings('hotel_id', selectedProperty.channel_id);
      updateChannelSettings('hotel_title', params.title);
      selectChannel(params.channel.id.toString());
      testConnection();
      return {
        cause: 'remove',
        action: async () => {
          const channel_service = new ChannelService();
          channel_service.setToken(calendarData.calendar_data.token);
          await channel_service.saveConnectedChannel(true);
        },
        title: '',
        message: entries === null || entries === void 0 ? void 0 : entries.Lcz_ThisActionWillDelete,
        main_color: 'danger',
      };
    },
  },
];

const irChannelCss = ".sc-ir-channel-h{display:block;--ir-sidebar-padding:0}.dropdown-toggle.sc-ir-channel{color:var(--blue)}.dropdown-toggle.sc-ir-channel::after{content:none;display:none}.dropdown-toggle.sc-ir-channel .caret-icon.sc-ir-channel{transition:transform 0.15s ease-in-out, color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,\r\n    -webkit-box-shadow 0.15s ease-in-out}.btn.sc-ir-channel:hover .caret-icon.sc-ir-channel path.sc-ir-channel{fill:#6b6f82}.show.sc-ir-channel .caret-icon.sc-ir-channel{transform:rotate(-180deg)}.dropdown-divider.sc-ir-channel{border-color:#e4e5ec}.dropdown-item.sc-ir-channel{padding:10px;display:flex;align-items:center;gap:10px;color:#6b6f82}.dropdown-item.sc-ir-channel svg.sc-ir-channel path.sc-ir-channel{fill:#6b6f82}.danger.sc-ir-channel{color:var(--red)}.danger.sc-ir-channel svg.sc-ir-channel path.sc-ir-channel{fill:var(--red)}.table.sc-ir-channel thead.sc-ir-channel tr.sc-ir-channel{height:50px !important}.table-container.sc-ir-channel{border-radius:30px}.table.sc-ir-channel thead.sc-ir-channel{background:#fafafa;border-top-width:0}.actions-theader.sc-ir-channel{width:35% !important;text-align:end}.dots.sc-ir-channel{display:flex;align-items:center;justify-content:center;margin:0 3px;padding:0}.dot.sc-ir-channel{width:8px;height:8px;margin:0px 4px;background-color:#6b6f82;border-radius:50%;animation:dotFlashing 1s infinite linear alternate}.dot.sc-ir-channel:nth-child(2){animation-delay:0.2s}.h-screen.sc-ir-channel{height:100vh !important}.dot.sc-ir-channel:nth-child(3){animation-delay:0.4s}@keyframes dotFlashing{0%{opacity:0}50%,100%{opacity:1}}@media (min-width: 1024px){.sc-ir-channel-h{--sidebar-width:820px}}";

const IrChannel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.roomService = new room_service.RoomService();
    this.channelService = new ChannelService();
    this.ticket = '';
    this.propertyid = undefined;
    this.language = undefined;
    this.baseurl = undefined;
    this.channel_status = null;
    this.modal_cause = null;
    this.isLoading = false;
  }
  componentWillLoad() {
    this.isLoading = true;
    if (this.baseurl) {
      axios.axios.defaults.baseURL = this.baseurl;
    }
    if (this.ticket !== '') {
      calendarData.calendar_data.token = this.ticket;
      this.channelService.setToken(this.ticket);
      this.roomService.setToken(this.ticket);
      this.initializeApp();
    }
  }
  async handleConfirmClicked(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    if (!this.modal_cause) {
      return;
    }
    await this.modal_cause.action();
    if (this.modal_cause.cause === 'remove') {
      resetStore();
      await this.refreshChannels();
    }
    this.modal_cause = null;
  }
  openModal() {
    this.irModalRef.openModal();
  }
  async refreshChannels() {
    await Promise.all([this.channelService.getExposedChannels(), this.channelService.getExposedConnectedChannels(this.propertyid)]);
  }
  async initializeApp() {
    try {
      const [, , , languageTexts] = await Promise.all([
        this.roomService.fetchData(this.propertyid, this.language),
        this.channelService.getExposedChannels(),
        this.channelService.getExposedConnectedChannels(this.propertyid),
        this.roomService.fetchLanguage(this.language, ['_CHANNEL_FRONT']),
      ]);
      channels_data.property_id = this.propertyid;
      if (!locales_store.locales.entries) {
        locales_store.locales.entries = languageTexts.entries;
        locales_store.locales.direction = languageTexts.direction;
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      this.isLoading = false;
    }
  }
  async ticketChanged() {
    calendarData.calendar_data.token = this.ticket;
    this.roomService.setToken(this.ticket);
    this.channelService.setToken(this.ticket);
    this.initializeApp();
  }
  handleCancelModal(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    this.modal_cause = null;
  }
  handleSidebarClose(e) {
    var _a;
    e.stopImmediatePropagation();
    e.stopPropagation();
    if (channels_data.selectedChannel) {
      this.modal_cause = {
        action: () => {
          return new Promise(reselove => {
            this.resetSideBar();
            reselove('');
          });
        },
        cause: 'channel',
        main_color: 'primary',
        message: (_a = locales_store.locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_UnSavedChangesWillBeLost,
        title: '',
      };
      this.openModal();
    }
    else {
      this.resetSideBar();
    }
  }
  resetSideBar() {
    this.channel_status = null;
    resetStore();
  }
  async handleSaveChange(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    await this.refreshChannels();
    this.resetSideBar();
  }
  async handleCheckChange(check, params) {
    const selectedProperty = params.map.find(m => m.type === 'property');
    setChannelIdAndActiveState(params.id, check);
    updateChannelSettings('hotel_id', selectedProperty.channel_id);
    updateChannelSettings('hotel_title', params.title);
    selectChannel(params.channel.id.toString());
    testConnection();
    await this.channelService.saveConnectedChannel(false);
    resetStore();
    this.refreshChannels();
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    if (this.isLoading) {
      return (index.h("div", { class: "h-screen bg-white d-flex flex-column align-items-center justify-content-center" }, index.h("ir-loading-screen", null)));
    }
    return (index.h(index.Host, { class: "h-100 " }, index.h("section", { class: "p-2 px-lg-5 py-0 h-100 d-flex flex-column" }, index.h("div", { class: "d-flex w-100 justify-content-between mb-2 align-items-center" }, index.h("h3", { class: "font-weight-bold m-0 p-0" }, (_a = locales_store.locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_iSWITCH), index.h("ir-button", { text: (_b = locales_store.locales.entries) === null || _b === void 0 ? void 0 : _b.Lcz_CreateChannel, size: "sm", onClickHanlder: () => (this.channel_status = 'create') }, index.h("svg", { slot: "icon", "stroke-width": 3, width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, index.h("path", { d: "M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z", fill: "currentColor", "fill-rule": "evenodd", "clip-rule": "evenodd" })))), index.h("div", { class: "card p-1 flex-fill m-0" }, index.h("table", { class: "table table-striped table-bordered no-footer dataTable" }, index.h("thead", null, index.h("tr", null, index.h("th", { scope: "col", class: "text-left" }, (_c = locales_store.locales.entries) === null || _c === void 0 ? void 0 : _c.Lcz_Channel), index.h("th", { scope: "col" }, (_d = locales_store.locales.entries) === null || _d === void 0 ? void 0 : _d.Lcz_Status), index.h("th", { scope: "col", class: "actions-theader" }, (_e = locales_store.locales.entries) === null || _e === void 0 ? void 0 : _e.Lcz_Actions))), index.h("tbody", { class: "" }, (_f = channels_data.connected_channels) === null || _f === void 0 ? void 0 : _f.map(channel => {
      var _a;
      return (index.h("tr", { key: channel.channel.id }, index.h("td", { class: "text-left" }, channel.channel.name, " ", channel.title ? `(${channel.title})` : '' ), index.h("td", null, index.h("ir-switch", { checked: channel.is_active, onCheckChange: e => this.handleCheckChange(e.detail, channel) })), index.h("th", null, index.h("div", { class: "d-flex justify-content-end" }, index.h("div", { class: "btn-group" }, index.h("button", { type: "button", class: "btn  dropdown-toggle px-0", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" }, index.h("span", { class: "mr-1" }, " ", (_a = locales_store.locales.entries) === null || _a === void 0 ? void 0 :
        _a.Lcz_Actions), index.h("svg", { class: 'caret-icon', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", height: 14, width: 14 }, index.h("path", { fill: "var(--blue)", d: "M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" }))), index.h("div", { class: "dropdown-menu dropdown-menu-right" }, actions(locales_store.locales.entries).map((a, index$1) => (index.h(index.Fragment, null, index.h("button", { onClick: () => {
          if (a.id === 'pull_future_reservation' || a.id === 'view_logs') {
            return;
          }
          a.action(channel);
          if (a.id === 'edit') {
            setTimeout(() => {
              this.channel_status = 'edit';
            }, 300);
          }
          else {
            this.modal_cause = a.action(channel);
            this.openModal();
          }
        }, key: a.id + '_item', class: `dropdown-item my-0 ${a.id === 'remove' ? 'danger' : ''}`, type: "button" }, a.icon(), a.name), index$1 < actions(locales_store.locales.entries).length - 1 && index.h("div", { key: a.id + '_divider', class: "dropdown-divider my-0" }))))))))));
    }))), channels_data.connected_channels.length === 0 && index.h("p", { class: "text-center" }, (_g = locales_store.locales.entries) === null || _g === void 0 ? void 0 : _g.Lcz_NoChannelsAreConnected))), index.h("ir-sidebar", { sidebarStyles: {
        // width: '60rem',
        padding: '0',
      }, showCloseButton: false, onIrSidebarToggle: this.handleSidebarClose.bind(this), open: this.channel_status !== null }, this.channel_status && (index.h("ir-channel-editor", { slot: "sidebar-body", ticket: this.ticket, channel_status: this.channel_status, onCloseSideBar: this.handleSidebarClose.bind(this) }))), index.h("ir-modal", { modalTitle: (_h = this.modal_cause) === null || _h === void 0 ? void 0 : _h.title, modalBody: (_j = this.modal_cause) === null || _j === void 0 ? void 0 : _j.message, ref: el => (this.irModalRef = el), rightBtnText: (_k = locales_store.locales.entries) === null || _k === void 0 ? void 0 : _k.Lcz_Confirm, leftBtnText: (_l = locales_store.locales.entries) === null || _l === void 0 ? void 0 : _l.Lcz_Cancel, onCancelModal: this.handleCancelModal.bind(this), rightBtnColor: (_o = (_m = this.modal_cause) === null || _m === void 0 ? void 0 : _m.main_color) !== null && _o !== void 0 ? _o : 'primary', onConfirmModal: this.handleConfirmClicked.bind(this) })));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "ticket": ["ticketChanged"]
  }; }
};
IrChannel.style = irChannelCss;

const irChannelEditorCss = ".sc-ir-channel-editor-h{display:block;position:relative}nav.sc-ir-channel-editor{z-index:10}.top-border.sc-ir-channel-editor{border-top:1px solid #e4e5ec}.tab-container.sc-ir-channel-editor{overflow-y:auto;padding-right:0;margin-right:0}";

const IrChannelEditor = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.saveChannelFinished = index.createEvent(this, "saveChannelFinished", 7);
    this.closeSideBar = index.createEvent(this, "closeSideBar", 7);
    var _a, _b, _c;
    this.channelService = new ChannelService();
    this.channel_status = null;
    this.ticket = undefined;
    this.selectedTab = '';
    this.isLoading = false;
    this.headerTitles = [
      {
        id: 'general_settings',
        name: (_a = locales_store.locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_GeneralSettings,
        disabled: false,
      },
      { id: 'mapping', name: (_b = locales_store.locales.entries) === null || _b === void 0 ? void 0 : _b.Lcz_Mapping, disabled: true },
      { id: 'channel_booking', name: (_c = locales_store.locales.entries) === null || _c === void 0 ? void 0 : _c.Lcz_ChannelBooking, disabled: true },
    ];
    this.selectedRoomType = [];
  }
  componentWillLoad() {
    if (this.ticket) {
      this.channelService.setToken(this.ticket);
    }
    if (this.channel_status === 'edit') {
      this.enableAllHeaders();
    }
    this.selectedTab = this.headerTitles[0].id;
    onChannelChange('isConnectedToChannel', newValue => {
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
        return index.h("ir-channel-general", { channel_status: this.channel_status });
      case 'mapping':
        return index.h("ir-channel-mapping", null);
      case 'channel_booking':
        return index.h("div", null, "channel booking");
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
  async saveConnectedChannel() {
    try {
      this.isLoading = true;
      await this.channelService.saveConnectedChannel(false);
      this.saveChannelFinished.emit();
    }
    catch (error) {
      console.error(error);
    }
    finally {
      this.isLoading = false;
    }
  }
  render() {
    var _a, _b;
    return (index.h(index.Host, { class: " d-flex flex-column h-100" }, index.h("nav", { class: "position-sticky sticky-top pb-1 top-0 bg-white " }, index.h("div", { class: "d-flex align-items-center px-1 py-1  justify-content-between" }, index.h("h3", { class: "text-left font-medium-2  py-0 my-0" }, this.channel_status === 'create' ? (_a = locales_store.locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_CreateChannel : (_b = locales_store.locales.entries) === null || _b === void 0 ? void 0 : _b.Lcz_EditChannel), index.h("ir-icon", { class: 'm-0 p-0 close', onIconClickHandler: () => {
        this.closeSideBar.emit(null);
      } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 20, width: 20 }, index.h("path", { d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), index.h("ir-channel-header", { class: "mt-1 px-0", headerTitles: this.headerTitles })), index.h("section", { class: "flex-fill tab-container px-1" }, this.renderTabScreen()), index.h("ir-button", { isLoading: this.isLoading, onClickHanlder: () => this.saveConnectedChannel(), class: "px-1 py-1 top-border", btn_styles: "w-100  justify-content-center align-items-center", text: locales_store.locales.entries.Lcz_Save })));
  }
};
IrChannelEditor.style = irChannelEditorCss;

const irChannelGeneralCss = ".sc-ir-channel-general-h{display:block}.label-style.sc-ir-channel-general{width:100px;text-align:end;padding-right:10px !important}.connection-testing-container.sc-ir-channel-general{display:flex;align-items:center;justify-content:space-between;margin-top:10px !important}.connection-title.sc-ir-channel-general{border-bottom:1px solid #e4e5ec}.ml-18.sc-ir-channel-general{margin-left:18% !important}svg.sc-ir-channel-general{margin-right:5px}";

const IrChannelGeneral = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.channel_status = null;
    this.buttonClicked = false;
    this.connection_status_message = '';
    this.status = false;
  }
  componentWillLoad() {
    var _a;
    if (this.channel_status !== 'create' || !channels_data.isConnectedToChannel) {
      return;
    }
    this.connection_status_message = channels_data.isConnectedToChannel ? (_a = locales_store.locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_ConnectedChannel : '';
    this.status = true;
  }
  handleTestConnectionClicked(e) {
    var _a, _b, _c;
    e.preventDefault();
    this.buttonClicked = true;
    if (this.channel_status !== 'create' || !((_a = channels_data.channel_settings) === null || _a === void 0 ? void 0 : _a.hotel_id) || channels_data.isConnectedToChannel) {
      return;
    }
    const status = testConnection();
    this.status = status;
    this.connection_status_message = status ? (_b = locales_store.locales.entries) === null || _b === void 0 ? void 0 : _b.Lcz_ConnectedChannel : (_c = locales_store.locales.entries) === null || _c === void 0 ? void 0 : _c.Lcz_IncorrectConnection;
    this.buttonClicked = false;
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return (index.h(index.Host, { class: "px-1" }, index.h("section", { class: "ml-18" }, index.h("fieldset", { class: "d-flex align-items-center" }, index.h("label", { htmlFor: "hotel_channels", class: "m-0 p-0 label-style" }, (_a = locales_store.locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_Channel), index.h("ir-combobox", { input_id: "hotel_channels", disabled: channels_data.isConnectedToChannel, class: "flex-fill", value: (_b = channels_data.selectedChannel) === null || _b === void 0 ? void 0 : _b.name, onComboboxValueChange: (e) => {
        selectChannel(e.detail.data.toString());
      }, data: channels_data.channels.map(channel => ({
        id: channel.id,
        name: channel.name,
      })) })), index.h("fieldset", { class: "d-flex align-items-center mt-1" }, index.h("label", { htmlFor: "hotel_title", class: "m-0 p-0 label-style" }, (_c = locales_store.locales.entries) === null || _c === void 0 ? void 0 : _c.Lcz_Title), index.h("div", { class: "flex-fill" }, index.h("input", { id: "hotel_title", value: (_d = channels_data.channel_settings) === null || _d === void 0 ? void 0 : _d.hotel_title, onInput: e => updateChannelSettings('hotel_title', e.target.value), class: "form-control  flex-fill" })))), channels_data.selectedChannel && (index.h("form", { onSubmit: this.handleTestConnectionClicked.bind(this), class: "mt-3 connection-container" }, index.h("h3", { class: "text-left font-medium-2  py-0 my-0 connection-title py-1 mb-2" }, (_e = locales_store.locales.entries) === null || _e === void 0 ? void 0 : _e.Lcz_ConnectionSettings), index.h("div", { class: "ml-18" }, index.h("fieldset", { class: "d-flex align-items-center my-1" }, index.h("label", { htmlFor: "hotel_id", class: "m-0 p-0 label-style" }, (_f = locales_store.locales.entries) === null || _f === void 0 ? void 0 : _f.Lcz_HotelID), index.h("div", { class: "flex-fill" }, index.h("input", { id: "hotel_id", disabled: channels_data.isConnectedToChannel, class: `form-control  flex-fill bg-white ${this.buttonClicked && !((_g = channels_data.channel_settings) === null || _g === void 0 ? void 0 : _g.hotel_id) && 'border-danger'}`, value: (_h = channels_data.channel_settings) === null || _h === void 0 ? void 0 : _h.hotel_id, onInput: e => updateChannelSettings('hotel_id', e.target.value) }))), index.h("div", { class: 'connection-testing-container' }, index.h("div", { class: "d-flex align-items-center" }, this.connection_status_message &&
      (this.status ? (index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "12", width: "12", viewBox: "0 0 512 512" }, index.h("path", { fill: "var(--green)", d: "M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" }))) : (index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "12", width: "12", viewBox: "0 0 512 512" }, index.h("path", { fill: "var(--yellow)", d: "M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" })))), index.h("span", null, this.connection_status_message)), index.h("button", { class: "btn btn-outline-secondary btn-sm", type: "submit" }, (_j = locales_store.locales.entries) === null || _j === void 0 ? void 0 : _j.Lcz_TestConnection)))))));
  }
};
IrChannelGeneral.style = irChannelGeneralCss;

const irChannelHeaderCss = ".sc-ir-channel-header-h{display:block;position:relative;padding:0;margin:0;border-bottom:1px solid #e4e5ec}ul.sc-ir-channel-header{display:flex;align-items:center;gap:2rem;padding:0}li.sc-ir-channel-header{list-style:none !important}.tab.sc-ir-channel-header{font-size:0.95rem;font-weight:600;cursor:pointer;position:relative;margin:0;padding:0;transition:color 0.3s ease;user-select:none}.tab[data-disabled].sc-ir-channel-header{cursor:auto}.tab.sc-ir-channel-header:hover{opacity:80%}.tab[data-state='selected'].sc-ir-channel-header,.tab[data-state='selected'].sc-ir-channel-header:hover{color:var(--blue);opacity:100%}.active-indicator.sc-ir-channel-header{padding:0;bottom:0px;position:absolute;height:3px;border-radius:4px;transition:transform 0.3s ease, width 0.3s ease;background:var(--blue)}";

const IrChannelHeader = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.tabChanged = index.createEvent(this, "tabChanged", 7);
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
    return (index.h(index.Host, null, index.h("ul", { class: "px-1" }, this.headerTitles.map((title, index$1) => (index.h("li", { class: `tab ${title.disabled ? 'text-light' : ''}`, key: title.id, onClick: () => {
        if (!title.disabled)
          this.handleTabSelection(index$1);
      }, "data-disabled": title.disabled, "data-state": this.selectedIndex === index$1 ? 'selected' : '' }, title.name)))), index.h("span", { class: "active-indicator", ref: el => (this.activeIndicator = el) })));
  }
  get el() { return index.getElement(this); }
};
IrChannelHeader.style = irChannelHeaderCss;

class IrMappingService {
  removedMapping(ir_id, isRoomType) {
    let selectedChannels = [...channels_data.mappedChannels];
    if (isRoomType) {
      const toBeRemovedRoomType = calendarData.calendar_data.roomsInfo.find(room => room.id.toString() === ir_id);
      selectedChannels = selectedChannels.filter(c => toBeRemovedRoomType.rateplans.find(rate_plan => rate_plan.id.toString() === c.ir_id) === undefined);
    }
    channels_data.mappedChannels = selectedChannels.filter(c => c.ir_id !== ir_id);
  }
  checkMappingExists(id, isRoomType, roomTypeId) {
    const mapped_id = channels_data.mappedChannels.find(m => m.channel_id === id);
    if (!mapped_id) {
      if (!isRoomType) {
        const matchingRoomType = channels_data.mappedChannels.find(m => m.channel_id.toString() === roomTypeId);
        if (!matchingRoomType) {
          return { hide: true, result: undefined, occupancy: undefined };
        }
      }
      return { hide: false, result: undefined, occupancy: undefined };
    }
    if (isRoomType) {
      const room_type = calendarData.calendar_data.roomsInfo.find(room => room.id.toString() === mapped_id.ir_id);
      return { hide: false, occupancy: room_type.occupancy_default.adult_nbr, result: room_type };
    }
    if (!roomTypeId) {
      throw new Error('Missing room type id');
    }
    const matchingRoomType = channels_data.mappedChannels.find(m => m.channel_id.toString() === roomTypeId);
    const room_type = calendarData.calendar_data.roomsInfo.find(room => room.id.toString() === matchingRoomType.ir_id);
    if (!room_type) {
      throw new Error('Invalid Room type');
    }
    return { hide: false, occupancy: room_type.occupancy_default.adult_nbr, result: room_type.rateplans.find(r => r.id.toString() === mapped_id.ir_id) };
  }
  getAppropriateRooms(isRoomType, roomTypeId) {
    if (isRoomType) {
      const filteredRoomTypes = calendarData.calendar_data.roomsInfo.filter(room => channels_data.mappedChannels.find(m => m.ir_id.toString() === room.id.toString()) === undefined && room.is_active);
      return filteredRoomTypes.map(room => ({ id: room.id.toString(), name: room.name, occupancy: room.occupancy_default.adult_nbr }));
    }
    if (!roomTypeId) {
      throw new Error('Missing roomType id');
    }
    const matchingRoomType = channels_data.mappedChannels.find(m => m.channel_id.toString() === roomTypeId);
    if (!matchingRoomType) {
      throw new Error('Invalid room type id');
    }
    const selectedRoomType = calendarData.calendar_data.roomsInfo.find(room => room.id.toString() === matchingRoomType.ir_id);
    return selectedRoomType.rateplans
      .filter(rate_plan => channels_data.mappedChannels.find(r => rate_plan.id.toString() === r.ir_id) === undefined)
      .map(rate_plan => ({
      id: rate_plan.id.toString(),
      name: rate_plan['short_name'],
      occupancy: selectedRoomType.occupancy_default.adult_nbr,
    }));
  }
}

const irChannelMappingCss = ".sc-ir-channel-mapping-h{display:block;box-sizing:border-box;font-size:14px !important}*.sc-ir-channel-mapping{padding:0;margin:0;box-sizing:border-box}.submap-text.sc-ir-channel-mapping{padding-left:10px}.text-blue.sc-ir-channel-mapping{color:var(--blue)}.text-red.sc-ir-channel-mapping{color:var(--red)}li.sc-ir-channel-mapping{list-style:none !important}.refresh-btn.sc-ir-channel-mapping{all:unset;color:var(--blue);cursor:pointer}.selected-map.sc-ir-channel-mapping{flex:1}.selected-map-title.sc-ir-channel-mapping{flex:1}.mapped_row.sc-ir-channel-mapping{display:flex;align-items:center}.mapped_item.sc-ir-channel-mapping+svg.sc-ir-channel-mapping{display:block;flex:0 0 4.166666666666666%;max-width:4.166666666666666%;margin:0}.mapped_row.sc-ir-channel-mapping .mapped_item.sc-ir-channel-mapping{flex:0 0 45.83333333333333%;display:block;max-width:45.83333333333333%}.mapped_item.sc-ir-channel-mapping{margin:0;padding:0;line-height:22px}.mapped_name.sc-ir-channel-mapping{margin-right:5px}.gap-3.sc-ir-channel-mapping{gap:5px}.channel_name.sc-ir-channel-mapping{color:rgba(0, 0, 0, 0.88);font-size:14px;font-weight:700}";

const IrChannelMapping = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.mappingService = new IrMappingService();
    this.activeMapField = '';
    this.availableRooms = [];
  }
  setActiveField(id, isRoomType, roomTypeId) {
    const availableRooms = this.mappingService.getAppropriateRooms(isRoomType, roomTypeId);
    if (availableRooms) {
      this.availableRooms = availableRooms;
    }
    this.activeMapField = id;
  }
  renderMappingStatus(mappedField, id, isRoomType, roomTypeId) {
    var _a;
    if (mappedField.hide) {
      return index.h("div", null);
    }
    if (mappedField.result) {
      return (index.h(index.Fragment, null, index.h("div", { class: "pl-2 flex-fill d-sm-none mapped_item text-blue d-flex align-items-center" }, index.h("span", { class: "m-0 p-0 d-flex align-items-center selected-map" }, index.h("span", { class: "selected-map-title" }, isRoomType ? mappedField.result.name : mappedField.result['short_name']), index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { fill: 'var(--blue)', d: "M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" })), mappedField.occupancy), index.h("ir-icon", { class: "ml-1 p-0", onIconClickHandler: () => this.mappingService.removedMapping(mappedField.result.id.toString(), isRoomType) }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { fill: 'var(--blue)', d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" })))), index.h("div", { class: "pl-2 flex-fill d-none mapped_item text-blue d-sm-flex align-items-center" }, index.h("span", { class: "mapped_name" }, isRoomType ? mappedField.result.name : mappedField.result['short_name']), index.h("div", { class: "d-flex align-items-center gap-3 flex-fill" }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { fill: 'var(--blue)', d: "M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" })), index.h("span", null, mappedField.occupancy)), index.h("ir-icon", { class: "ml-1 p-0", onIconClickHandler: () => this.mappingService.removedMapping(mappedField.result.id.toString(), isRoomType) }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { fill: 'var(--blue)', d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" }))))));
    }
    return (index.h("div", { class: "pl-2  flex-fill mapped_item" }, this.activeMapField === id ? (index.h("ir-combobox", { autoFocus: true, placeholder: (_a = locales_store.locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_ConnectedChannel, data: this.availableRooms, onComboboxValueChange: e => {
        addMapping(e.detail.data, this.activeMapField, isRoomType);
        this.activeMapField = '';
      } })) : (index.h("span", { class: "cursor-pointer text-danger", onClick: () => this.setActiveField(id, isRoomType, roomTypeId) }, locales_store.locales.entries.Lcz_NotMapped))));
  }
  render() {
    var _a, _b, _c, _d, _e;
    return (index.h(index.Host, { class: "py-md-1 px-md-2" }, index.h("div", { class: "d-flex p-0 m-0 w-100 justify-content-end" }, index.h("button", { onClick: () => {
        setMappedChannel();
      }, class: "btn refresh-btn" }, (_a = locales_store.locales.entries) === null || _a === void 0 ? void 0 : _a.Lcz_Refresh)), index.h("section", { class: "w-100" }, index.h("div", { class: "py-1 mapped_row" }, index.h("p", { class: "mapped_item channel_name" }, (_b = channels_data.selectedChannel) === null || _b === void 0 ? void 0 : _b.name), index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), index.h("p", { class: "pl-2 mapped_item channel_name" }, "Igloorooms")), index.h("div", null, (_e = (_d = (_c = channels_data.selectedChannel) === null || _c === void 0 ? void 0 : _c.property) === null || _d === void 0 ? void 0 : _d.room_types) === null || _e === void 0 ? void 0 : _e.map(room_type => {
      const mappedRoomType = this.mappingService.checkMappingExists(room_type.id, true);
      return (index.h(index.Fragment, null, index.h("div", { key: room_type.id, class: "mb-1 mapped_row" }, index.h("p", { class: "mapped_item" }, room_type.name), index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })), this.renderMappingStatus(mappedRoomType, room_type.id, true)), room_type.rate_plans.map(rate_plan => {
        const mappedRatePlan = this.mappingService.checkMappingExists(rate_plan.id, false, room_type.id);
        return (index.h("div", { key: rate_plan.id, class: " mapped_row mb-1" }, index.h("p", { class: "pl-1 submap-text mapped_item" }, rate_plan.name), !mappedRatePlan.hide && (index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { fill: "currentColor", d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" }))), this.renderMappingStatus(mappedRatePlan, rate_plan.id, false, room_type.id)));
      })));
    })))));
  }
};
IrChannelMapping.style = irChannelMappingCss;

const irComboboxCss = ".sc-ir-combobox-h{display:block;position:relative;padding:0;margin:0}ul.sc-ir-combobox{position:absolute;margin:0;margin-top:2px;width:max-content;max-height:80px;border-radius:0.21rem;z-index:10000;padding:1px;background:white;box-shadow:0px 8px 16px 0px rgba(0, 0, 0, 0.2);padding:5px 0;max-height:250px;overflow-y:auto;min-width:100%}ul[data-position='bottom-right'].sc-ir-combobox{right:0}.dropdown-item.sc-ir-combobox{cursor:pointer}ul.sc-ir-combobox li.sc-ir-combobox,span.sc-ir-combobox,loader-container.sc-ir-combobox{padding:0px 16px;margin:0px;margin-top:2px;width:100%;border-radius:2px}ul.sc-ir-combobox li.sc-ir-combobox{cursor:pointer}ul.sc-ir-combobox li.sc-ir-combobox{display:flex;align-items:center;flex-wrap:wrap;gap:3px}ul.sc-ir-combobox li.sc-ir-combobox p.sc-ir-combobox{margin:0;padding:0}ul.sc-ir-combobox li.sc-ir-combobox:hover{background:#f4f5fa}ul.sc-ir-combobox li[data-selected].sc-ir-combobox,ul.sc-ir-combobox li[data-selected].sc-ir-combobox:hover{color:#fff;text-decoration:none;background-color:#666ee8}";

const IrCombobox = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.comboboxValueChange = index.createEvent(this, "comboboxValueChange", 7);
    this.inputCleared = index.createEvent(this, "inputCleared", 7);
    this.toast = index.createEvent(this, "toast", 7);
    this.data = [];
    this.duration = 300;
    this.placeholder = undefined;
    this.value = undefined;
    this.disabled = false;
    this.autoFocus = false;
    this.input_id = v4.v4();
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
    console.log(this.filteredData);
    return (index.h("ul", { "data-position": this.filteredData.length > 0 && this.filteredData[0].occupancy ? 'bottom-right' : 'bottom-left' }, (_a = this.filteredData) === null || _a === void 0 ? void 0 :
      _a.map((d, index$1) => (index.h("li", { onMouseEnter: () => (this.selectedIndex = index$1), role: "button", key: d.id, onKeyDown: e => this.handleItemKeyDown(e, index$1), "data-selected": this.selectedIndex === index$1, tabIndex: 0, onClick: () => this.selectItem(index$1) }, index.h("p", null, d.name), d.occupancy && (index.h(index.Fragment, null, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "14", width: "12.25", viewBox: "0 0 448 512" }, index.h("path", { fill: 'currentColor', d: "M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" })), index.h("p", null, d.occupancy)))))), this.filteredData.length === 0 && !this.isLoading && index.h("span", { class: 'text-center' }, locales_store.locales.entries.Lcz_NoResultsFound)));
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
    return (index.h("form", { onSubmit: this.handleSubmit.bind(this), class: "m-0 p-0" }, index.h("input", { type: "text", class: "form-control bg-white", id: this.input_id, ref: el => (this.inputRef = el), disabled: this.disabled, value: this.value, placeholder: this.placeholder, onKeyDown: this.handleKeyDown.bind(this), onBlur: this.handleBlur.bind(this), onInput: this.handleInputChange.bind(this), onFocus: this.handleFocus.bind(this), autoFocus: this.autoFocus }), this.renderDropdown()));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "isComboBoxVisible": ["watchHandler"]
  }; }
};
IrCombobox.style = irComboboxCss;

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
    index.registerInstance(this, hostRef);
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
    return (index.h(index.Host, null, index.h("slot", null)));
  }
  static get watchers() { return {
    "extraResources": ["hrefsChanged"]
  }; }
};

const irIconCss = ".sc-ir-icon-h{margin:0;padding:0}.icon-button.sc-ir-icon{all:unset;margin:0;padding:0;color:#104064}.icon-button.sc-ir-icon:hover{cursor:pointer;color:#1a6aa7}";

const IrIcon = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.iconClickHandler = index.createEvent(this, "iconClickHandler", 7);
    this.icon = 'ft-check';
  }
  render() {
    return (index.h("button", { class: "icon-button", onClick: () => this.iconClickHandler.emit() }, index.h("slot", { name: "icon" })));
  }
};
IrIcon.style = irIconCss;

const irLoadingScreenCss = ".sc-ir-loading-screen-h{display:fixed;height:100vh;width:100vw;z-index:1000;top:0;left:0;display:flex;align-items:center;justify-content:center;background:white}.loader.sc-ir-loading-screen{width:1.25rem;height:1.25rem;border:2.5px solid #3f3f3f;border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}.loaderContainer.sc-ir-loading-screen{position:absolute;z-index:100001;padding:20px;top:50%;left:50%;transform:translate(-50%, -50%);background:white;display:flex;align-items:center;justify-content:center;gap:20px;border-radius:5px}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const IrLoadingScreen = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.message = '';
  }
  render() {
    return (index.h(index.Host, null, index.h("span", { class: "loader" })));
  }
};
IrLoadingScreen.style = irLoadingScreenCss;

const irModalCss = ".backdropModal.sc-ir-modal{background-color:rgba(0, 0, 0, 0.5);z-index:1000;position:fixed;top:0;left:0;height:100vh;width:100%;opacity:0;transition:opacity 0.3s ease-in-out;pointer-events:none}.backdropModal.active.sc-ir-modal{cursor:pointer;opacity:1 !important;pointer-events:all}.ir-modal[data-state='opened'].sc-ir-modal{opacity:1;visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}.ir-alert-content.sc-ir-modal{padding:10px;background:white;border-radius:5px}.modal.sc-ir-modal{z-index:1001 !important}.modal-dialog.sc-ir-modal{height:100vh;display:flex;align-items:center}.ir-alert-footer.sc-ir-modal{gap:10px}.ir-modal.sc-ir-modal{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);z-index:1050;width:90%;max-width:32rem;overflow:hidden;outline:0;opacity:0;transition:transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;visibility:hidden;pointer-events:none}.ir-modal.active.sc-ir-modal{opacity:1;transform:translate(-50%, 0);visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}";

const IrModal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.confirmModal = index.createEvent(this, "confirmModal", 7);
    this.cancelModal = index.createEvent(this, "cancelModal", 7);
    this.modalTitle = 'Modal Title';
    this.modalBody = 'Modal Body';
    this.rightBtnActive = true;
    this.leftBtnActive = true;
    this.rightBtnText = 'Confirm';
    this.leftBtnText = 'Close';
    this.rightBtnColor = 'primary';
    this.leftBtnColor = 'secondary';
    this.btnPosition = 'right';
    this.iconAvailable = false;
    this.icon = '';
    this.isOpen = false;
    this.item = {};
  }
  async closeModal() {
    this.isOpen = false;
  }
  async openModal() {
    this.isOpen = true;
  }
  btnClickHandler(event) {
    let target = event.target;
    let name = target.name;
    if (name === this.leftBtnText) {
      this.cancelModal.emit();
      this.item = {};
      this.closeModal();
    }
    else if (name === this.rightBtnText) {
      this.confirmModal.emit(this.item);
      this.item = {};
      this.closeModal();
    }
  }
  render() {
    return [
      index.h("div", { class: `backdropModal ${this.isOpen ? 'active' : ''}`, onClick: () => {
          this.cancelModal.emit();
          this.closeModal();
        } }),
      index.h("div", { "data-state": this.isOpen ? 'opened' : 'closed', class: `ir-modal`, tabindex: "-1" }, index.h("div", { class: `ir-alert-content p-2` }, index.h("div", { class: `ir-alert-header align-items-center border-0 py-0 m-0 ` }), index.h("div", { class: "modal-body text-left p-0 mb-2" }, index.h("div", null, this.modalBody)), index.h("div", { class: `ir-alert-footer border-0  d-flex justify-content-${this.btnPosition === 'center' ? 'center' : this.btnPosition === 'left' ? 'start' : 'end'}` }, this.leftBtnActive && index.h("ir-button", { icon: '', btn_color: this.leftBtnColor, btn_block: true, text: this.leftBtnText, name: this.leftBtnText }), this.rightBtnActive && index.h("ir-button", { icon: '', btn_color: this.rightBtnColor, btn_block: true, text: this.rightBtnText, name: this.rightBtnText })))),
    ];
  }
};
IrModal.style = irModalCss;

const irSidebarCss = ".backdrop{position:fixed;top:0;left:0;width:100%;height:100vh;cursor:pointer;background:rgba(0, 0, 0, 0.5);z-index:99;transition:all 0.5s;opacity:0;pointer-events:none;transition:all 0.5s}.backdrop.active{opacity:1;pointer-events:all}.sidebar-right{position:fixed;top:0;right:-120%;bottom:0;width:var(--sidebar-width, 40rem);max-width:100%;box-shadow:0 0 10px rgba(0, 0, 0, 0.1);transition:all 0.5s;z-index:100;overflow-y:hidden;color:var(--sidebar-color, #000);background-color:var(--sidebar-backgound, #fff);padding:var(--ir-sidebar-padding, 0.5rem 0)}.sidebar-right.active{right:0;overflow-y:auto}.sidebar-left{position:fixed;top:0;left:-100%;bottom:0;width:var(--sidebar-width, 30rem);max-width:100%;box-shadow:0 0 10px rgba(0, 0, 0, 0.1);transition:all 0.5s;z-index:200;overflow-y:hidden;color:var(--sidebar-color, #000);background:var(--sidebar-backgound, #fff);padding:var(--ir-sidebar-padding, 0.5rem 0)}.sidebar-left.active{left:0;overflow-y:scroll}.close{position:absolute;top:0.5rem;right:1rem;width:1rem;height:1rem;cursor:pointer}";

const IrSidebar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.irSidebarToggle = index.createEvent(this, "irSidebarToggle", 7);
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
      index.h("div", { class: `backdrop ${className}`, onClick: () => {
          this.toggleSidebar();
        } }),
      index.h("div", { ref: el => (this.sidebarRef = el), class: `sidebar-${this.side} ${className}` }, this.showCloseButton && (index.h("ir-icon", { class: "close", onIconClickHandler: () => {
          this.toggleSidebar();
        } }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 20, width: 20 }, index.h("path", { fill: "#6b6f82", d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })))), index.h("slot", { name: "sidebar-body" })),
    ];
  }
  static get watchers() { return {
    "sidebarStyles": ["handleSidebarStylesChange"]
  }; }
};
IrSidebar.style = irSidebarCss;

const irSwitchCss = ".sc-ir-switch-h{display:block;position:relative;box-sizing:border-box;--ir-root-width:36px;--ir-root-height:20px}.hidden-input.sc-ir-switch{transform:translateX(-100%);position:absolute;pointer-events:none;opacity:0;margin:0;width:var(--ir-root-width);height:var(--ir-root-height)}.SwitchRoot.sc-ir-switch{all:unset;padding:0;margin:0;width:var(--ir-root-width);height:var(--ir-root-height);background-color:var(--ir-root-inactive-color, #ff4961);position:relative;box-shadow:rgba(0, 0, 0, 0.2) 0px 2px 10px;--webkit-tap-highlight-color:rgba(0, 0, 0, 0);border-radius:9999px;box-sizing:border-box}.SwitchRoot.sc-ir-switch:disabled{opacity:80%}.SwitchRoot.sc-ir-switch:focus-visible{outline:1px solid var(--ir-root-active-color, rgb(55, 188, 155));outline-offset:1px}.SwitchRoot[data-state='checked'].sc-ir-switch{background-color:var(--ir-root-active-color, rgb(55, 188, 155))}.SwitchThumb.sc-ir-switch{padding:0;margin:0;display:block;width:calc(var(--ir-root-height) - 3px);height:calc(var(--ir-root-height) - 3px);border-radius:9999px;background:white;box-shadow:rgba(0, 0, 0, 0.2) 0px;transition:transform 100ms ease 0s;transform:translateX(2px);will-change:transform}.SwitchThumb[data-state='checked'].sc-ir-switch{transform:translateX(calc(var(--ir-root-height) - 3px))}";

const IrSwitch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.checkChange = index.createEvent(this, "checkChange", 7);
    this._id = '';
    this.checked = false;
    this.switchId = undefined;
    this.disabled = false;
  }
  componentWillLoad() {
    this._id = this.generateRandomId(10);
  }
  componentDidLoad() {
    if (!this.switchRoot) {
      return;
    }
    this.switchRoot.setAttribute('aria-checked', this.checked ? 'true' : 'false');
  }
  generateRandomId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  handleCheckChange() {
    this.checked = !this.checked;
    this.switchRoot.setAttribute('aria-checked', this.checked ? 'true' : 'false');
    this.checkChange.emit(this.checked);
  }
  render() {
    return (index.h(index.Host, null, index.h("button", { disabled: this.disabled, ref: el => (this.switchRoot = el), type: "button", id: this.switchId || this._id, onClick: this.handleCheckChange.bind(this), role: "switch", "data-state": this.checked ? 'checked' : 'unchecked', value: 'on', class: "SwitchRoot" }, index.h("span", { class: "SwitchThumb", "data-state": this.checked ? 'checked' : 'unchecked' })), index.h("input", { type: "checkbox", checked: this.checked, "aria-hidden": "true", tabIndex: -1, value: 'on', class: "hidden-input" })));
  }
};
IrSwitch.style = irSwitchCss;

exports.ir_button = IrButton;
exports.ir_channel = IrChannel;
exports.ir_channel_editor = IrChannelEditor;
exports.ir_channel_general = IrChannelGeneral;
exports.ir_channel_header = IrChannelHeader;
exports.ir_channel_mapping = IrChannelMapping;
exports.ir_combobox = IrCombobox;
exports.ir_common = IrCommon;
exports.ir_icon = IrIcon;
exports.ir_loading_screen = IrLoadingScreen;
exports.ir_modal = IrModal;
exports.ir_sidebar = IrSidebar;
exports.ir_switch = IrSwitch;

//# sourceMappingURL=ir-button_13.cjs.entry.js.map