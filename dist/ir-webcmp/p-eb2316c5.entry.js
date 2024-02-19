import{r as e,h as s,H as t,c as a,g as i}from"./p-05195efb.js";import{c as n,s as l,a as c,b as r,d as o}from"./p-48a92ecc.js";import{c as h}from"./p-16fbf1a7.js";import"./p-7cd9c724.js";const d=".sc-ir-channel-general-h{display:block}.label-style.sc-ir-channel-general{width:100px}";const p=class{constructor(s){e(this,s)}render(){var e;return s(t,null,s("fieldset",{class:"d-flex align-items-center"},s("label",{htmlFor:"",class:"m-0 p-0 label-style"},"Channel:"),s("ir-combobox",{class:"flex-fill",value:(e=n.selectedChannel)===null||e===void 0?void 0:e.name,onComboboxValueChange:e=>{l(e.detail.data.toString())},placeholder:"Choose channel from list",data:n.channels.map((e=>({id:e.id,name:e.name})))})),s("fieldset",{class:"d-flex align-items-center mt-1"},s("label",{htmlFor:"",class:"m-0 p-0 label-style"},"Title:"),s("div",{class:"flex-fill"},s("input",{class:"form-control  flex-fill"}))))}};p.style=d;const m=".sc-ir-channel-header-h{display:block;position:relative;padding:0;margin:0;border-bottom:1px solid #e4e5ec}ul.sc-ir-channel-header{display:flex;align-items:center;gap:2rem;padding:0}.tab.sc-ir-channel-header{font-size:0.95rem;font-weight:600;cursor:pointer;position:relative;margin:0;padding:0;transition:color 0.3s ease;user-select:none}.tab[data-disabled].sc-ir-channel-header{cursor:auto}.tab.sc-ir-channel-header:hover{opacity:80%}.tab[data-state='selected'].sc-ir-channel-header,.tab[data-state='selected'].sc-ir-channel-header:hover{color:var(--blue);opacity:100%}.active-indicator.sc-ir-channel-header{padding:0;bottom:0px;position:absolute;height:3px;border-radius:4px;transition:transform 0.3s ease, width 0.3s ease;background:var(--blue)}";const u=class{constructor(s){e(this,s);this.tabChanged=a(this,"tabChanged",7);this.headerTitles=[];this.selectedIndex=0}componentDidLoad(){this.updateActiveIndicator()}disconnectedCallback(){if(this.animationFrameId){cancelAnimationFrame(this.animationFrameId)}}handleTabSelection(e){this.selectedIndex=e;this.updateActiveIndicator();this.tabChanged.emit(this.headerTitles[this.selectedIndex].id)}updateActiveIndicator(){if(this.animationFrameId){cancelAnimationFrame(this.animationFrameId)}requestAnimationFrame((()=>{const e=this.el.querySelector(`li.tab[data-state="selected"]`);if(e){const{left:s,width:t}=e.getBoundingClientRect();const a=this.el.getBoundingClientRect().left;const i=s-a;this.activeIndicator.style.width=`${t}px`;this.activeIndicator.style.transform=`translateX(${i}px)`}}))}render(){return s(t,null,s("ul",null,this.headerTitles.map(((e,t)=>s("li",{class:`tab ${e.disabled?"text-light":""}`,key:e.id,onClick:()=>{if(!e.disabled)this.handleTabSelection(t)},"data-disabled":e.disabled,"data-state":this.selectedIndex===t?"selected":""},e.name)))),s("span",{class:"active-indicator",ref:e=>this.activeIndicator=e}))}get el(){return i(this)}};u.style=m;class g{checkMappingExists(e,s,t){const a=n.mappedChannel.find((s=>s.channel_id===e));if(!a){return undefined}if(!s){console.log("object");return undefined}if(s){return h.roomsInfo.find((e=>e.id.toString()===a.ir_id))}if(!t){throw new Error("Missing room type id")}const i=h.roomsInfo.find((e=>e.id.toString()===t));console.log(i);if(!i){throw new Error("Invalid Room type")}console.log(i);return i.rateplans.find((e=>e.id.toString()===a.ir_id))}getAppropriateRooms(e,s){if(e){const e=h.roomsInfo.filter((e=>n.mappedChannel.find((s=>s.ir_id.toString()===e.id.toString()))===undefined&&e.is_active));return e.map((e=>({id:e.id.toString(),name:e.name})))}if(!s){throw new Error("Missing roomType id")}console.log(s);const t=h.roomsInfo.filter((e=>n.mappedChannel.find((e=>e.channel_id.toString()===s))&&e.is_active));console.log(t)}}const b=".sc-ir-channel-mapping-h{display:block;box-sizing:border-box}.map-row.sc-ir-channel-mapping{display:flex;align-items:center;justify-content:space-between}.map-row.sc-ir-channel-mapping span.sc-ir-channel-mapping{width:49%}.submap-text.sc-ir-channel-mapping{padding-left:10px}.text-blue.sc-ir-channel-mapping{color:var(--blue)}.text-red.sc-ir-channel-mapping{color:var(--red)}.refresh-btn.sc-ir-channel-mapping{all:unset;color:var(--blue);cursor:pointer}";const f=class{constructor(s){e(this,s);this.mappingService=new g;this.activeMapField="";this.availableRooms=[]}setActiveField(e,s,t){const a=this.mappingService.getAppropriateRooms(s,t);if(a){this.availableRooms=a}this.activeMapField=e}renderMappingStatus(e,t,a){const i=this.mappingService.checkMappingExists(e,t,a);if(i){return s("span",{class:"px-2 text-blue d-flex align-items-center"},s("span",{class:"m-0 p-0 flex-fill"},i.name),s("ir-icon",{class:"m-0 p-0",onIconClickHandler:()=>c(i.id.toString())},s("svg",{slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"14",width:"12.25",viewBox:"0 0 448 512"},s("path",{fill:"var(--blue)",d:"M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"}))))}return s("span",{class:"px-2"},this.activeMapField===e?s("ir-combobox",{autoFocus:true,placeholder:"Not mapped",data:this.availableRooms,onComboboxValueChange:e=>{console.log(e.detail.data);r(e.detail.data,this.activeMapField);this.activeMapField=""}}):s("span",{class:"cursor-pointer text-danger",onClick:()=>this.setActiveField(e,t,a)},"Not mapped"))}render(){return s(t,null,s("div",{class:"d-flex w-100 justify-content-end"},s("button",{onClick:()=>{o()},class:"btn refresh-btn"},"Refresh")),s("ul",{class:"m-0 p-0"},s("li",{class:"map-row my-1"},s("span",{class:"font-weight-bold"},n.selectedChannel.name),s("svg",{xmlns:"http://www.w3.org/2000/svg",height:"14",width:"12.25",viewBox:"0 0 448 512"},s("path",{d:"M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"})),s("span",{class:"font-weight-bold px-2"},"Igloorooms")),n.selectedChannel.property.room_types.map((e=>s("li",{key:e.id,class:"mb-1"},s("div",{class:"map-row"},s("span",null,e.name),s("svg",{xmlns:"http://www.w3.org/2000/svg",height:"14",width:"12.25",viewBox:"0 0 448 512"},s("path",{d:"M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"})),this.renderMappingStatus(e.id,true)),s("ul",{class:"m-0 p-0"},e.rate_plans.map((t=>s("li",{class:"map-row",key:t.id},s("span",{class:"submap-text"},t.name),s("svg",{xmlns:"http://www.w3.org/2000/svg",height:"14",width:"12.25",viewBox:"0 0 448 512"},s("path",{fill:"currentColor",d:"M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"})),this.renderMappingStatus(t.id,false,e.id))))))))))}};f.style=b;export{p as ir_channel_general,u as ir_channel_header,f as ir_channel_mapping};
//# sourceMappingURL=p-eb2316c5.entry.js.map