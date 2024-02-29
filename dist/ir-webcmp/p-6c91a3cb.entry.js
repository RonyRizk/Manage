import{r as i,h as t,H as e,c as s}from"./p-1da6dd41.js";import{B as l,b as n,u as o}from"./p-74bb5da7.js";import{l as a}from"./p-383186e3.js";import{P as r}from"./p-1a47a272.js";import{h as c}from"./p-fe6c3d31.js";import"./p-d0086f2b.js";const d=".sc-ir-listing-header-h{display:block;margin:0;padding:0;--ir-date-range-border:#cacfe7;--ir-date-range-width:242px;position:relative}h3.sc-ir-listing-header{margin:0}ir-input-text.sc-ir-listing-header{width:300px}.booking-search-field.sc-ir-listing-header{margin-left:0px;display:flex;align-items:center;gap:14px}.booking-container.sc-ir-listing-header{gap:14px}.filters-container.sc-ir-listing-header{gap:10px;justify-content:space-between}.buttons-container.sc-ir-listing-header{gap:14px;color:#104064}.new-booking-container.sc-ir-listing-header{position:absolute;right:10px;top:5px}.new-booking-btn.sc-ir-listing-header{all:unset;cursor:pointer;color:#104064}.new-booking-btn.sc-ir-listing-header:hover{color:#0b2538}@media (max-width: 575.98px){.sc-ir-listing-header-h{--ir-date-range-width:360px}.flex-fill-sm-none.sc-ir-listing-header{flex:1 1 auto}}@media (min-width: 1200px){.flex-fill-sm-none.sc-ir-listing-header{flex:0 0 auto}.booking-search-field.sc-ir-listing-header{margin-left:40px}}";const h=class{constructor(t){i(this,t);this.bookingListingService=new l;this.propertyId=undefined;this.language=undefined;this.baseurl=undefined;this.inputValue=""}componentWillLoad(){this.bookingListingService.setToken(n.token)}handleDateRangeChange(i){i.stopImmediatePropagation();i.stopPropagation();const{start:t,end:e}=i.detail;n.userSelection=Object.assign(Object.assign({},n.userSelection),{from:t.format("YYYY-MM-DD"),to:e.format("YYYY-MM-DD")})}async handleSearchClicked(){if(this.inputValue!==""){if(/^-?\d+$/.test(this.inputValue)){o("book_nbr",this.inputValue)}else if(this.inputValue[3]==="-"){o("book_nbr",this.inputValue)}else{o("name",this.inputValue)}}await this.bookingListingService.getExposedBookings(n.userSelection);this.inputValue=""}render(){return t(e,null,t("section",{class:"d-flex align-items-center "},t("div",{class:"d-flex flex-fill flex-column flex-md-row align-items-md-center booking-container"},t("div",{class:"d-flex mb-1 d-md-none align-items-center justify-content-bettween width-fill"},t("h3",{class:"flex-fill"},a.entries.Lcz_Bookings),t("div",null,t("igl-book-property-container",{propertyid:this.propertyId,language:this.language,baseurl:this.baseurl,ticket:n.token},t("button",{slot:"trigger",class:"new-booking-btn"},t("svg",{xmlns:"http://www.w3.org/2000/svg",height:"20",width:"17.5",viewBox:"0 0 448 512"},t("path",{fill:"currentColor",d:"M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"})))))),t("h3",{class:"d-none d-md-block"},a.entries.Lcz_Bookings),t("div",{class:"booking-search-field"},t("ir-input-text",{value:this.inputValue,onTextChange:i=>this.inputValue=i.detail,variant:"icon",placeholder:"Find booking number/name"},t("svg",{slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"14",width:"14",viewBox:"0 0 512 512"},t("path",{fill:"currentColor",d:"M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"}))),t("h5",{class:"m-0 font-weight-bold"},a.entries.Lcz_Or))),t("div",{class:"d-none d-md-block"},t("igl-book-property-container",{propertyid:this.propertyId,language:this.language,baseurl:this.baseurl,ticket:n.token},t("button",{slot:"trigger",class:"new-booking-btn"},t("svg",{xmlns:"http://www.w3.org/2000/svg",height:"20",width:"17.5",viewBox:"0 0 448 512"},t("path",{fill:"currentColor",d:"M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"})))))),t("section",{class:"d-flex align-items-center flex-wrap filters-container justify-content-lg-start mt-1"},t("fieldset",{class:"flex-fill-sm-none"},t("label",{htmlFor:"dateTo"},a.entries.Lcz_DateOf),t("ir-select",{onSelectChange:i=>o("filter_type",i.detail),showFirstOption:false,data:n===null||n===void 0?void 0:n.types.map((i=>({value:i.id.toString(),text:i.name}))),select_id:"dateTo",LabelAvailable:false})),t("fieldset",{class:"flex-fill-sm-none"},t("label",{htmlFor:"dates"},a.entries.Lcz_Dates),t("igl-date-range",{minDate:"2000-01-01",withDateDifference:false,defaultData:{fromDate:n.userSelection.from,toDate:n.userSelection.to}})),t("fieldset",{class:"flex-fill-sm-none"},t("label",{htmlFor:"booking_status"},a.entries.Lcz_BookingStatus),t("ir-select",{onSelectChange:i=>o("booking_status",i.detail),showFirstOption:false,data:n===null||n===void 0?void 0:n.statuses.map((i=>({value:i.code,text:i.name}))),select_id:"booking_status",LabelAvailable:false})),t("fieldset",{class:"flex-fill-sm-none"},t("label",{htmlFor:"channels"},a.entries.Lcz_Channels),t("ir-select",{onSelectChange:i=>o("channel",i.detail),showFirstOption:false,data:n===null||n===void 0?void 0:n.channels.map((i=>({value:i.name,text:i.name}))),select_id:"channels",LabelAvailable:false})),t("div",{class:"d-flex align-items-end m-0 mt-2 buttons-container"},t("ir-icon",{title:a.entries.Lcz_Search,onIconClickHandler:()=>this.handleSearchClicked()},t("svg",{slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"20",width:"20",viewBox:"0 0 512 512"},t("path",{fill:"currentColor",d:"M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"}))),t("ir-icon",{title:a.entries.Lcz_Erase},t("svg",{slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"20",width:"22.5",viewBox:"0 0 576 512"},t("path",{fill:"currentColor",d:"M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z"}))),t("ir-icon",{title:a.entries.Lcz_ExportToExcel},t("svg",{slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"20",width:"15",viewBox:"0 0 384 512"},t("path",{fill:"currentColor",d:"M48 448V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm90.9 233.3c-8.1-10.5-23.2-12.3-33.7-4.2s-12.3 23.2-4.2 33.7L161.6 320l-44.5 57.3c-8.1 10.5-6.3 25.5 4.2 33.7s25.5 6.3 33.7-4.2L192 359.1l37.1 47.6c8.1 10.5 23.2 12.3 33.7 4.2s12.3-23.2 4.2-33.7L222.4 320l44.5-57.3c8.1-10.5 6.3-25.5-4.2-33.7s-25.5-6.3-33.7 4.2L192 280.9l-37.1-47.6z"}))))))}};h.style=d;const g=".backdropModal.sc-ir-listing-modal{background-color:rgba(0, 0, 0, 0.5);z-index:1000;position:fixed;top:0;left:0;height:100vh;width:100%;opacity:0;transition:opacity 0.3s ease-in-out;pointer-events:none}.backdropModal.active.sc-ir-listing-modal{cursor:pointer;opacity:1 !important;pointer-events:all}.ir-modal[data-state='opened'].sc-ir-listing-modal{opacity:1;visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}.ir-alert-content.sc-ir-listing-modal{padding:10px;background:white;border-radius:5px}.modal.sc-ir-listing-modal{z-index:1001 !important}.modal-dialog.sc-ir-listing-modal{height:100vh;display:flex;align-items:center}.ir-alert-footer.sc-ir-listing-modal{gap:10px}.exit-icon.sc-ir-listing-modal{position:absolute;right:10px;top:5px;margin:0}.ir-modal.sc-ir-listing-modal{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);z-index:1050;width:90%;max-width:32rem;overflow:hidden;outline:0;opacity:0;transition:transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;visibility:hidden;pointer-events:none}.ir-modal.active.sc-ir-listing-modal{opacity:1;transform:translate(-50%, 0);visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}";const p=class{constructor(t){i(this,t);this.modalClosed=s(this,"modalClosed",7);this.resetData=s(this,"resetData",7);this.bookingListingsService=new l;this.paymentService=new r;this.modalTitle="Modal Title";this.editBooking=undefined;this.isOpen=false;this.deletionStage=1;this.selectedDesignation=undefined}componentWillLoad(){this.bookingListingsService.setToken(n.token);this.paymentService.setToken(n.token);this.selectedDesignation=n.settlement_methods[0].name}async closeModal(){this.isOpen=false;this.deletionStage=1;this.selectedDesignation=n.settlement_methods[0].name;this.modalClosed.emit(null)}async openModal(){this.isOpen=true}async btnClickHandler(i){let t=i.target;let e=t.name;try{if(e==="confirm"){if(this.editBooking.cause==="payment"){await this.paymentService.AddPayment({amount:this.editBooking.booking.financial.due_amount,currency:this.editBooking.booking.currency,date:c().format("YYYY-MM-DD"),designation:this.selectedDesignation,id:-1,reference:""},this.editBooking.booking.booking_nbr);this.resetData.emit(null);this.closeModal()}else{if(this.deletionStage===1){this.deletionStage=2}}}}catch(i){console.error(i)}if(e==="cancel"){if(this.deletionStage===2){return}this.closeModal()}}renderTitle(){var i,t;if(this.editBooking.cause==="payment"){return(i=a.entries)===null||i===void 0?void 0:i.Lcz_MarkBookingAsPaid.replace("%1",this.editBooking.booking.booking_nbr)}else{if(this.deletionStage===1){return a.entries.Lcz_SureYouWantToDeleteBookingNbr+((t=this.editBooking)===null||t===void 0?void 0:t.booking.booking_nbr)}return a.entries.Lcz_WantToRecoverAllotment}}renderConfirmationTitle(){if(this.editBooking.cause==="payment"){return a.entries.Lcz_Confirm}else{if(this.deletionStage===1){return a.entries.Lcz_OK}return a.entries.Lcz_RecoverAndDelete}}renderCancelationTitle(){if(this.deletionStage===2){return a.entries.Lcz_JustDelete}return a.entries.Lcz_Cancel}render(){if(!this.editBooking){return null}return[t("div",{class:`backdropModal ${this.isOpen?"active":""}`,onClick:()=>{if(this.editBooking.cause==="delete"){return}this.closeModal()}}),t("div",{"data-state":this.isOpen?"opened":"closed",class:`ir-modal`,tabindex:"-1"},t("div",{class:`ir-alert-content p-2`},t("div",{class:`ir-alert-header align-items-center border-0 py-0 m-0 `},t("p",{class:"font-weight-bold p-0 my-0 mb-1"},this.renderTitle()),t("ir-icon",{class:"exit-icon",style:{cursor:"pointer"},onClick:()=>{this.closeModal()}},t("svg",{slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"14",width:"10.5",viewBox:"0 0 384 512"},t("path",{fill:"currentColor",d:"M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"})))),t("div",{class:"modal-body text-left p-0 mb-2"},this.editBooking.cause==="payment"?t("ir-select",{selectedValue:this.selectedDesignation,onSelectChange:i=>this.selectedDesignation=i.detail,showFirstOption:false,LabelAvailable:false,data:n.settlement_methods.map((i=>({value:i.name,text:i.name})))}):null),t("div",{class:`ir-alert-footer border-0 d-flex justify-content-end`},t("ir-button",{icon:"",btn_color:"secondary",btn_block:true,text:this.renderCancelationTitle(),name:"cancel"}),t("ir-button",{icon:"",btn_color:"primary",btn_block:true,text:this.renderConfirmationTitle(),name:"confirm"}))))]}};p.style=g;export{h as ir_listing_header,p as ir_listing_modal};
//# sourceMappingURL=p-6c91a3cb.entry.js.map