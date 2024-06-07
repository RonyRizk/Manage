import{r as t,h as i,H as s,g as l}from"./p-1da6dd41.js";import{B as o,u as e,b as n,o as a}from"./p-a819b0a3.js";import{R as c}from"./p-55747d0d.js";import{l as r}from"./p-cda0b50c.js";import{a as h,f as d}from"./p-2fedb717.js";import{a as g}from"./p-d0086f2b.js";import{h as p}from"./p-fe6c3d31.js";import"./p-58003fb6.js";import"./p-85d94cdd.js";const u=".sc-ir-booking-listing-h{display:block;height:100%}.card.sc-ir-booking-listing{overflow-x:auto}.secondary-p.sc-ir-booking-listing{font-size:12px !important}.h-screen.sc-ir-booking-listing{height:100%}.price-span.sc-ir-booking-listing{margin:0;margin-right:5px}.main-container.sc-ir-booking-listing{height:100%;overflow-y:auto}.bg-ir-red.sc-ir-booking-listing{background:#ff4961;height:28px;padding-top:0 !important;padding-bottom:0 !important}.due-btn.sc-ir-booking-listing{border:1px solid #ff4961;color:#ff4961;cursor:pointer;padding:1px 0.25rem !important;font-size:12px !important}.due-btn.sc-ir-booking-listing:hover{background:#ff4961;color:white}.booking_number.sc-ir-booking-listing{all:unset;cursor:pointer}.booking_number.sc-ir-booking-listing:hover{color:#1e9ff2}.in-out.sc-ir-booking-listing{width:150px !important}.buttons-container.sc-ir-booking-listing{gap:10px}td.sc-ir-booking-listing ul.sc-ir-booking-listing{width:max-content !important}td.sc-ir-booking-listing{width:max-content !important}.date-p.sc-ir-booking-listing{width:max-content !important;min-width:100%;text-align:center !important}.booking-label-gap.sc-ir-booking-listing{gap:5px}";const m=class{constructor(i){t(this,i);this.bookingListingService=new o;this.roomService=new c;this.statusColors={"001":"badge-warning","002":"badge-success","003":"badge-danger","004":"badge-danger"};this.language="";this.ticket="";this.baseurl="";this.propertyid=undefined;this.rowCount=10;this.isLoading=false;this.currentPage=1;this.totalPages=1;this.oldStartValue=0;this.editBookingItem=null;this.showCost=false}componentWillLoad(){e("end_row",this.rowCount);n.rowCount=this.rowCount;if(this.baseurl){g.defaults.baseURL=this.baseurl}if(this.ticket!==""){this.bookingListingService.setToken(this.ticket);this.roomService.setToken(this.ticket);n.token=this.ticket;this.initializeApp()}a("userSelection",(async t=>{const i=t.total_count;this.totalPages=Math.ceil(i/this.rowCount)}));a("bookings",(async t=>{this.showCost=t.some((t=>t.financial.gross_cost!==null&&t.financial.gross_cost>0))}))}async ticketChanged(t,i){if(t!==i){this.bookingListingService.setToken(this.ticket);this.roomService.setToken(this.ticket);n.token=this.ticket;this.initializeApp()}}async initializeApp(){try{this.isLoading=true;e("property_id",this.propertyid);await Promise.all([this.bookingListingService.getExposedBookingsCriteria(this.propertyid),this.roomService.fetchLanguage(this.language,["_BOOKING_LIST_FRONT"])]);await this.bookingListingService.getExposedBookings(Object.assign(Object.assign({},n.userSelection),{is_to_export:false}))}catch(t){console.error(t)}finally{this.isLoading=false}}handleSideBarToggle(t){if(t.detail&&this.editBookingItem){this.editBookingItem=null}}getPaginationBounds(){const t=n.userSelection.total_count;const i=(this.currentPage-1)*this.rowCount;let s=this.currentPage*this.rowCount;s=s>t?t:s;return{startItem:i,endItem:s,totalCount:t}}openModal(){this.listingModalTimeout=setTimeout((()=>{this.listingModal=this.el.querySelector("ir-listing-modal");this.listingModal.editBooking=this.editBookingItem;this.listingModal.openModal()}),100)}disconnectedCallback(){clearTimeout(this.listingModalTimeout)}async handleResetData(t){t.stopImmediatePropagation();t.stopPropagation();await this.bookingListingService.getExposedBookings(Object.assign(Object.assign({},n.userSelection),{is_to_export:false}))}async handleResetStoreData(t){t.stopImmediatePropagation();t.stopPropagation();await this.bookingListingService.getExposedBookings(Object.assign(Object.assign({},n.userSelection),{is_to_export:false}))}handleBookingChanged(t){t.stopImmediatePropagation();t.stopPropagation();n.bookings=[...n.bookings.map((i=>{if(i.booking_nbr===t.detail.booking_nbr){return t.detail}return i}))]}renderItemRange(){const{endItem:t,startItem:i,totalCount:s}=this.getPaginationBounds();return`${r.entries.Lcz_View} ${i+1} - ${t} ${r.entries.Lcz_Of} ${s}`}async updateData(){const{endItem:t,startItem:i}=this.getPaginationBounds();await this.bookingListingService.getExposedBookings(Object.assign(Object.assign({},n.userSelection),{is_to_export:false,start_row:i,end_row:t}))}render(){var t,l,o,e,a,c,g,u,m,b,v,w,f,k;if(this.isLoading||this.ticket===""){return i("ir-loading-screen",null)}return i(s,null,i("ir-interceptor",null),i("ir-toast",null),i("div",{class:"p-1 main-container"},i("ir-listing-header",{propertyId:this.propertyid,language:this.language,baseurl:this.baseurl}),i("section",null,i("div",{class:"card p-1 flex-fill m-0 mt-2"},i("table",{class:"table table-striped table-bordered no-footer dataTable"},i("thead",null,i("tr",null,i("th",{scope:"col",class:"text-left"},(t=r.entries)===null||t===void 0?void 0:t.Lcz_Booking,"#"),i("th",{scope:"col"},(l=r.entries)===null||l===void 0?void 0:l.Lcz_BookedOn),i("th",{scope:"col"},(o=r.entries)===null||o===void 0?void 0:o.Lcz_GuestSource),i("th",{scope:"col"},i("span",{class:"price-span"},(e=r.entries)===null||e===void 0?void 0:e.Lcz_Price),i("ir-tooltip",{customSlot:true,message:`<span style="width:100%;display:block;">${(a=r.entries)===null||a===void 0?void 0:a.Lcz_BookingBalance}</span><span>${(c=r.entries)===null||c===void 0?void 0:c.Lcz_ClickToSettle}</span>`},i("span",{slot:"tooltip-trigger",class:"m-0 btn due-btn"},(g=r.entries)===null||g===void 0?void 0:g.Lcz_Balance))),this.showCost&&i("th",{scope:"col",class:"services-cell"},(u=r.entries)===null||u===void 0?void 0:u.Lcz_Cost),i("th",{scope:"col",class:"text-left services-cell"},(m=r.entries)===null||m===void 0?void 0:m.Lcz_Services),i("th",{scope:"col",class:"in-out"},(b=r.entries)===null||b===void 0?void 0:b.Lcz_InOut),i("th",{scope:"col"},(v=r.entries)===null||v===void 0?void 0:v.Lcz_Status),i("th",{scope:"col"},i("p",{class:"sr-only"},"actions")))),i("tbody",{class:""},n.bookings.length===0&&i("tr",null,i("td",{colSpan:8},(w=r.entries)===null||w===void 0?void 0:w.Lcz_NoDataAvailable)),(f=n.bookings)===null||f===void 0?void 0:f.map((t=>{var s,l,o;let e=this.statusColors[t.status.code];return i("tr",{key:t.booking_nbr},i("td",{class:"text-left"},i("button",{onClick:()=>this.editBookingItem={booking:t,cause:"edit"},class:"booking_number"},t.booking_nbr)),i("td",null,i("p",{class:"p-0 m-0 date-p"},p(t.booked_on.date,"YYYY-MM-DD").format("DD-MMM-YYYY")),i("p",{class:"p-0 m-0 secondary-p"},h(t.booked_on.hour.toString(),t.booked_on.minute.toString()))),i("td",null,i("div",{class:"h-100 d-flex align-items-center "},i("img",{class:"mr-2",src:t.origin.Icon,alt:"logo"}),i("div",{class:"text-left"},i("p",{class:"p-0 m-0"},t.guest.first_name," ",(s=t.guest.last_name)!==null&&s!==void 0?s:""," ",t.occupancy.adult_nbr,r.entries.Lcz_P),i("div",{class:"d-flex align-items-center booking-label-gap"},i("p",{class:"p-0 m-0 secondary-p"},t.origin.Label),t.is_in_loyalty_mode&&!t.promo_key&&i("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",height:18,width:18},i("title",null,r.entries.Lcz_LoyaltyDiscountApplied),i("path",{fill:"#fc6c85",d:"M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"})),t.promo_key&&i("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",height:18,width:18},i("title",null,r.entries.Lcz_Coupon+":"+t.promo_key),i("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"}))),t.agent&&i("p",{class:"m-0 secondary-p"},r.entries.Lcz_AgentCode.replace("%1",t.agent.name))))),i("td",null,i("p",{class:"p-0 m-0"},d(t.currency.code,(o=(l=t.financial)===null||l===void 0?void 0:l.gross_total)!==null&&o!==void 0?o:0)),t.financial.due_amount>0&&i("buuton",{onClick:()=>{this.editBookingItem={booking:t,cause:"payment"};this.openModal()},class:"btn p-0 m-0 due-btn"},d(t.currency.code,t.financial.due_amount))),this.showCost&&i("td",null,t.financial.gross_cost!==null&&t.financial.gross_cost===0?"_":d(t.currency.code,t.financial.gross_cost)),i("td",null,i("ul",null,t.rooms.map((t=>i("li",null,t.roomtype.name))))),i("td",null,i("p",{class:"p-0 m-0 date-p"},p(t.from_date,"YYYY-MM-DD").format("DD-MMM-YYYY")),i("p",{class:"p-0 m-0 date-p"},p(t.to_date,"YYYY-MM-DD").format("DD-MMM-YYYY"))),i("td",null,i("p",{class:`m-0 badge ${e}`},t.status.description)),i("td",null,i("div",{class:"d-flex justify-content-center align-items-center"},i("ir-icon",{onIconClickHandler:()=>this.editBookingItem={booking:t,cause:"edit"}},i("svg",{slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"20",width:"20",viewBox:"0 0 512 512"},i("path",{fill:"#104064",d:"M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"}))),i("ir-icon",{onIconClickHandler:()=>{this.editBookingItem={booking:t,cause:"delete"};this.openModal()},class:"ml-1"},i("svg",{slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"20",width:"17.5",viewBox:"0 0 448 512"},i("path",{fill:"#ff4961",d:"M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"}))))))})))),this.totalPages>1&&i("section",{class:"d-flex flex-column flex-md-row align-items-center justify-content-between"},i("p",{class:"m-0 mb-1 mb-md-0"},this.renderItemRange()),i("div",{class:"d-flex align-items-center buttons-container"},i("ir-button",{size:"sm",btn_disabled:this.currentPage===1,onClickHanlder:async()=>{this.currentPage=1;await this.updateData()}},i("svg",{slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"14",width:"14",viewBox:"0 0 512 512"},i("path",{fill:"white",d:"M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"}))),i("ir-button",{size:"sm",btn_disabled:this.currentPage===1,onClickHanlder:async()=>{this.currentPage=this.currentPage-1;console.log(this.currentPage);await this.updateData()}},i("svg",{slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"14",width:"8.75",viewBox:"0 0 320 512"},i("path",{fill:"white",d:"M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"}))),i("ir-select",{selectedValue:this.currentPage.toString(),LabelAvailable:false,showFirstOption:false,onSelectChange:async t=>{this.currentPage=+t.detail;await this.updateData()},data:Array.from(Array(this.totalPages),((t,i)=>i+1)).map((t=>({text:t.toString(),value:t.toString()})))}),i("ir-button",{size:"sm",btn_disabled:this.currentPage===this.totalPages,onClickHanlder:async()=>{this.currentPage=this.currentPage+1;await this.updateData()}},i("svg",{slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"14",width:"8.75",viewBox:"0 0 320 512"},i("path",{fill:"white",d:"M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"}))),i("ir-button",{size:"sm",btn_disabled:this.currentPage===this.totalPages,onClickHanlder:async()=>{this.currentPage=this.totalPages;console.log(this.currentPage);await this.updateData()}},i("svg",{slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"14",width:"14",viewBox:"0 0 512 512"},i("path",{fill:"white",d:"M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"})))))))),this.editBookingItem&&i("ir-listing-modal",{onModalClosed:()=>this.editBookingItem=null}),i("ir-sidebar",{onIrSidebarToggle:this.handleSideBarToggle.bind(this),open:this.editBookingItem!==null&&this.editBookingItem.cause==="edit",showCloseButton:this.editBookingItem!==null,sidebarStyles:{width:this.editBookingItem?"80rem":"var(--sidebar-width,40rem)",background:"#F2F3F8"}},((k=this.editBookingItem)===null||k===void 0?void 0:k.cause)==="edit"&&i("ir-booking-details",{slot:"sidebar-body",hasPrint:true,hasReceipt:true,is_from_front_desk:true,propertyid:this.propertyid,hasRoomEdit:true,hasRoomDelete:true,bookingNumber:this.editBookingItem.booking.booking_nbr,ticket:this.ticket,baseurl:this.baseurl,language:this.language,hasRoomAdd:true})))}get el(){return l(this)}static get watchers(){return{ticket:["ticketChanged"]}}};m.style=u;export{m as ir_booking_listing};
//# sourceMappingURL=p-59924d2a.entry.js.map