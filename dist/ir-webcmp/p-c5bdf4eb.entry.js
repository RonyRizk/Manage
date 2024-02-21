import{r as e,h as t,H as n,c as s,g as i,F as l}from"./p-05195efb.js";import{a,t as c,u as o,s as r,c as d,b as h,d as p}from"./p-6e8ca7d5.js";import"./p-7cd9c724.js";const m=".sc-ir-channel-general-h{display:block}.label-style.sc-ir-channel-general{width:100px;text-align:end;padding-right:10px !important}.connection-testing-container.sc-ir-channel-general{display:flex;align-items:center;justify-content:space-between;margin-top:10px !important}.connection-title.sc-ir-channel-general{border-bottom:1px solid #e4e5ec}.ml-18.sc-ir-channel-general{margin-left:18% !important}";const u=class{constructor(t){e(this,t);this.channel_status=null;this.buttonClicked=false;this.connection_status_message=""}componentWillLoad(){if(this.channel_status!=="create"){return}this.connection_status_message=a.isConnectedToChannel?"Connected Channel":""}handleTestConnectionClicked(e){var t;e.preventDefault();this.buttonClicked=true;if(this.channel_status!=="create"||!((t=a.channel_settings)===null||t===void 0?void 0:t.hotel_id)||a.isConnectedToChannel){return}const n=c();this.connection_status_message=n?"Connected Channel":"Incorrect Connection";this.buttonClicked=false}render(){var e,s,i,l;return t(n,null,t("section",{class:"ml-18"},t("fieldset",{class:"d-flex align-items-center"},t("label",{htmlFor:"hotel_channels",class:"m-0 p-0 label-style"},"Channel:"),t("ir-combobox",{input_id:"hotel_channels",disabled:a.isConnectedToChannel,class:"flex-fill",value:(e=a.selectedChannel)===null||e===void 0?void 0:e.name,onComboboxValueChange:e=>{r(e.detail.data.toString())},placeholder:"Choose channel from list",data:a.channels.map((e=>({id:e.id,name:e.name})))})),t("fieldset",{class:"d-flex align-items-center mt-1"},t("label",{htmlFor:"hotel_title",class:"m-0 p-0 label-style"},"Title:"),t("div",{class:"flex-fill"},t("input",{id:"hotel_title",value:(s=a.channel_settings)===null||s===void 0?void 0:s.hotel_title,onInput:e=>o("hotel_title",e.target.value),class:"form-control  flex-fill"})))),a.selectedChannel&&t("form",{onSubmit:this.handleTestConnectionClicked.bind(this),class:"mt-3 connection-container"},t("h3",{class:"text-left font-medium-2  py-0 my-0 connection-title py-1 mb-2"},"Connection Settings"),t("div",{class:"ml-18"},t("fieldset",{class:"d-flex align-items-center my-1"},t("label",{htmlFor:"hotel_id",class:"m-0 p-0 label-style"},"Hotel ID:"),t("div",{class:"flex-fill"},t("input",{id:"hotel_id",disabled:a.isConnectedToChannel,class:`form-control  flex-fill bg-white ${this.buttonClicked&&!((i=a.channel_settings)===null||i===void 0?void 0:i.hotel_id)&&"border-danger"}`,value:(l=a.channel_settings)===null||l===void 0?void 0:l.hotel_id,onInput:e=>o("hotel_id",e.target.value)}))),t("div",{class:"connection-testing-container"},t("span",null,this.connection_status_message),t("button",{class:"btn btn-outline-secondary btn-sm",type:"submit"},"Test Connection")))))}};u.style=m;const g=".sc-ir-channel-header-h{display:block;position:relative;padding:0;margin:0;border-bottom:1px solid #e4e5ec}ul.sc-ir-channel-header{display:flex;align-items:center;gap:2rem;padding:0}.tab.sc-ir-channel-header{font-size:0.95rem;font-weight:600;cursor:pointer;position:relative;margin:0;padding:0;transition:color 0.3s ease;user-select:none}.tab[data-disabled].sc-ir-channel-header{cursor:auto}.tab.sc-ir-channel-header:hover{opacity:80%}.tab[data-state='selected'].sc-ir-channel-header,.tab[data-state='selected'].sc-ir-channel-header:hover{color:var(--blue);opacity:100%}.active-indicator.sc-ir-channel-header{padding:0;bottom:0px;position:absolute;height:3px;border-radius:4px;transition:transform 0.3s ease, width 0.3s ease;background:var(--blue)}";const f=class{constructor(t){e(this,t);this.tabChanged=s(this,"tabChanged",7);this.headerTitles=[];this.selectedIndex=0}componentDidLoad(){this.updateActiveIndicator()}disconnectedCallback(){if(this.animationFrameId){cancelAnimationFrame(this.animationFrameId)}}handleTabSelection(e){this.selectedIndex=e;this.updateActiveIndicator();this.tabChanged.emit(this.headerTitles[this.selectedIndex].id)}updateActiveIndicator(){if(this.animationFrameId){cancelAnimationFrame(this.animationFrameId)}requestAnimationFrame((()=>{const e=this.el.querySelector(`li.tab[data-state="selected"]`);if(e){const{left:t,width:n}=e.getBoundingClientRect();const s=this.el.getBoundingClientRect().left;const i=t-s;this.activeIndicator.style.width=`${n}px`;this.activeIndicator.style.transform=`translateX(${i}px)`}}))}render(){return t(n,null,t("ul",null,this.headerTitles.map(((e,n)=>t("li",{class:`tab ${e.disabled?"text-light":""}`,key:e.id,onClick:()=>{if(!e.disabled)this.handleTabSelection(n)},"data-disabled":e.disabled,"data-state":this.selectedIndex===n?"selected":""},e.name)))),t("span",{class:"active-indicator",ref:e=>this.activeIndicator=e}))}get el(){return i(this)}};f.style=g;class b{removedMapping(e,t){let n=[...a.mappedChannels];if(t){const t=d.roomsInfo.find((t=>t.id.toString()===e));n=n.filter((e=>t.rateplans.find((t=>t.id.toString()===e.ir_id))===undefined))}a.mappedChannels=n.filter((t=>t.ir_id!==e))}checkMappingExists(e,t,n){const s=a.mappedChannels.find((t=>t.channel_id===e));if(!s){if(!t){const e=a.mappedChannels.find((e=>e.channel_id.toString()===n));if(!e){return{hide:true,result:undefined,occupancy:undefined}}}return{hide:false,result:undefined,occupancy:undefined}}if(t){const e=d.roomsInfo.find((e=>e.id.toString()===s.ir_id));return{hide:false,occupancy:e.occupancy_default.adult_nbr,result:e}}if(!n){throw new Error("Missing room type id")}const i=a.mappedChannels.find((e=>e.channel_id.toString()===n));const l=d.roomsInfo.find((e=>e.id.toString()===i.ir_id));if(!l){throw new Error("Invalid Room type")}return{hide:false,occupancy:l.occupancy_default.adult_nbr,result:l.rateplans.find((e=>e.id.toString()===s.ir_id))}}getAppropriateRooms(e,t){if(e){const e=d.roomsInfo.filter((e=>a.mappedChannels.find((t=>t.ir_id.toString()===e.id.toString()))===undefined&&e.is_active));return e.map((e=>({id:e.id.toString(),name:e.name})))}if(!t){throw new Error("Missing roomType id")}const n=a.mappedChannels.find((e=>e.channel_id.toString()===t));if(!n){throw new Error("Invalid room type id")}const s=d.roomsInfo.find((e=>e.id.toString()===n.ir_id));return s.rateplans.filter((e=>a.mappedChannels.find((t=>e.id.toString()===t.ir_id))===undefined)).map((e=>({id:e.id.toString(),name:e.name})))}}const v=".sc-ir-channel-mapping-h{display:block;box-sizing:border-box}.map-row.sc-ir-channel-mapping{display:flex;align-items:center;justify-content:space-between}.map-row.sc-ir-channel-mapping span.sc-ir-channel-mapping{width:49%}.submap-text.sc-ir-channel-mapping{padding-left:10px}.text-blue.sc-ir-channel-mapping{color:var(--blue)}.text-red.sc-ir-channel-mapping{color:var(--red)}.refresh-btn.sc-ir-channel-mapping{all:unset;color:var(--blue);cursor:pointer}.selected-map.sc-ir-channel-mapping svg.sc-ir-channel-mapping{margin:0 10px !important;flex-wrap:wrap}.selected-map.sc-ir-channel-mapping{flex:1}.selected-map-title.sc-ir-channel-mapping{flex:1}";const w=class{constructor(t){e(this,t);this.mappingService=new b;this.activeMapField="";this.availableRooms=[]}setActiveField(e,t,n){const s=this.mappingService.getAppropriateRooms(t,n);if(s){this.availableRooms=s}this.activeMapField=e}renderMappingStatus(e,n,s,i){if(e.hide){return t("span",null)}if(e.result){return t(l,null,t("span",{class:"px-2 d-md-none text-blue d-flex align-items-center"},t("span",{class:"m-0 p-0 d-flex align-items-center selected-map"},t("span",{class:"selected-map-title"},e.result.name),t("svg",{xmlns:"http://www.w3.org/2000/svg",height:"14",width:"12.25",viewBox:"0 0 448 512"},t("path",{fill:"var(--blue)",d:"M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"})),e.occupancy),t("ir-icon",{class:"ml-1 p-0",onIconClickHandler:()=>this.mappingService.removedMapping(e.result.id.toString(),s)},t("svg",{slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"14",width:"12.25",viewBox:"0 0 448 512"},t("path",{fill:"var(--blue)",d:"M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"})))),t("span",{class:"px-2 d-none text-blue d-md-flex align-items-center"},t("span",{class:"m-0 p-0 d-flex align-items-center selected-map"},e.result.name,t("svg",{xmlns:"http://www.w3.org/2000/svg",height:"14",width:"12.25",viewBox:"0 0 448 512"},t("path",{fill:"var(--blue)",d:"M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"})),e.occupancy),t("ir-icon",{class:"ml-1 p-0",onIconClickHandler:()=>this.mappingService.removedMapping(e.result.id.toString(),s)},t("svg",{slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"14",width:"12.25",viewBox:"0 0 448 512"},t("path",{fill:"var(--blue)",d:"M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"})))))}return t("span",{class:"px-2"},this.activeMapField===n?t("ir-combobox",{autoFocus:true,placeholder:"Not mapped",data:this.availableRooms,onComboboxValueChange:e=>{h(e.detail.data,this.activeMapField,s);this.activeMapField=""}}):t("span",{class:"cursor-pointer text-danger",onClick:()=>this.setActiveField(n,s,i)},"Not mapped"))}render(){var e,s,i,l;return t(n,null,t("div",{class:"d-flex w-100 justify-content-end"},t("button",{onClick:()=>{p()},class:"btn refresh-btn"},"Refresh")),t("ul",{class:"m-0 p-0"},t("li",{class:"map-row my-1"},t("span",{class:"font-weight-bold"},(e=a.selectedChannel)===null||e===void 0?void 0:e.name),t("svg",{xmlns:"http://www.w3.org/2000/svg",height:"14",width:"12.25",viewBox:"0 0 448 512"},t("path",{d:"M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"})),t("span",{class:"font-weight-bold px-2"},"Igloorooms")),(l=(i=(s=a.selectedChannel)===null||s===void 0?void 0:s.property)===null||i===void 0?void 0:i.room_types)===null||l===void 0?void 0:l.map((e=>{const n=this.mappingService.checkMappingExists(e.id,true);return t("li",{key:e.id,class:"mb-1"},t("div",{class:"map-row"},t("span",null,e.name),t("svg",{xmlns:"http://www.w3.org/2000/svg",height:"14",width:"12.25",viewBox:"0 0 448 512"},t("path",{d:"M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"})),this.renderMappingStatus(n,e.id,true)),t("ul",{class:"m-0 p-0"},e.rate_plans.map((n=>{const s=this.mappingService.checkMappingExists(n.id,false,e.id);return t("li",{class:"map-row",key:n.id},t("span",{class:"submap-text"},n.name),!s.hide&&t("svg",{xmlns:"http://www.w3.org/2000/svg",height:"14",width:"12.25",viewBox:"0 0 448 512"},t("path",{fill:"currentColor",d:"M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"})),this.renderMappingStatus(s,n.id,false,e.id))}))))}))))}};w.style=v;export{u as ir_channel_general,f as ir_channel_header,w as ir_channel_mapping};
//# sourceMappingURL=p-c5bdf4eb.entry.js.map