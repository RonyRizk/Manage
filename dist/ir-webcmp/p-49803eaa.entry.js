import{r as s,h as t,H as a}from"./p-1da6dd41.js";import{H as i,h as e}from"./p-7547f939.js";import{h as l}from"./p-fe6c3d31.js";import"./p-d0086f2b.js";import"./p-58003fb6.js";const c=".sc-ir-hk-archive-h{display:block}";const r=class{constructor(t){s(this,t);this.houseKeepingService=new i;this.selectedDates={start:l().add(-90,"days").format("YYYY-MM-DD"),end:l().format("YYYY-MM-DD")}}componentWillLoad(){this.houseKeepingService.setToken(e.default_properties.token);this.initializeData()}async initializeData(){}handleDateRangeChange(s){s.stopImmediatePropagation();s.stopPropagation();const{start:t,end:a}=s.detail;this.selectedDates={start:t.format("YYYY-MM-DD"),end:a.format("YYYY-MM-DD")}}async searchArchive(s){s.stopImmediatePropagation();s.stopPropagation()}async exportArchive(s){s.stopImmediatePropagation();s.stopPropagation()}render(){return t(a,null,t("ir-title",{class:"px-1",label:"Cleaning Archives (90 days)",displayContext:"sidebar"}),t("section",{class:"px-1"},t("div",{class:"d-flex"},t("ir-select",{class:"w-100",LabelAvailable:false,data:[],firstOption:"All units"}),t("ir-select",{class:"ml-1 w-100",LabelAvailable:false,data:[],firstOption:"All housekeepers"})),t("div",{class:"d-flex mt-1 align-items-center"},t("igl-date-range",{class:"mr-1",withDateDifference:false,minDate:l().add(-90,"days").format("YYYY-MM-DD"),defaultData:{fromDate:this.selectedDates.start,toDate:this.selectedDates.end}}),t("ir-icon",{onIconClickHandler:this.searchArchive.bind(this),class:"mr-1"},t("svg",{slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"20",width:"20",viewBox:"0 0 512 512"},t("path",{fill:"currentColor",d:"M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"}))),t("ir-icon",{onIconClickHandler:this.exportArchive.bind(this)},t("svg",{slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"20",width:"15",viewBox:"0 0 384 512"},t("path",{fill:"currentColor",d:"M48 448V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm90.9 233.3c-8.1-10.5-23.2-12.3-33.7-4.2s-12.3 23.2-4.2 33.7L161.6 320l-44.5 57.3c-8.1 10.5-6.3 25.5 4.2 33.7s25.5 6.3 33.7-4.2L192 359.1l37.1 47.6c8.1 10.5 23.2 12.3 33.7 4.2s12.3-23.2 4.2-33.7L222.4 320l44.5-57.3c8.1-10.5 6.3-25.5-4.2-33.7s-25.5-6.3-33.7 4.2L192 280.9l-37.1-47.6z"}))))))}};r.style=c;export{r as ir_hk_archive};
//# sourceMappingURL=p-49803eaa.entry.js.map