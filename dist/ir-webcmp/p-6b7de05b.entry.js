import{r as t,c as i,h as s,F as e,H as o}from"./p-1da6dd41.js";import{B as n}from"./p-f2fdd8342.js";import{R as a}from"./p-c4e830f9.js";import{c as r}from"./p-a7b295ee.js";import{l as h}from"./p-cda0b50c.js";import{a as l}from"./p-54928856.js";import"./p-8da2cdd0.js";import"./p-fe6c3d31.js";import"./p-e6bb1bcd.js";import"./p-58003fb6.js";const c=".sc-igl-book-property-container-h{display:block;margin:0;padding:0;letter-spacing:0px !important;font-family:'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;font-size:1rem !important;font-weight:400 !important;line-height:1.45 !important;color:#6b6f82 !important;text-align:left !important}.book-container.sc-igl-book-property-container{width:min-content;margin:0;padding:0}h3.sc-igl-book-property-container{font-size:1rem}";const d=class{constructor(s){t(this,s);this.resetBookingData=i(this,"resetBookingData",7);this.bookingService=new n;this.roomService=new a;this.language="";this.ticket="";this.baseurl="";this.propertyid=undefined;this.from_date=undefined;this.to_date=undefined;this.withIrToastAndInterceptor=true;this.bookingItem=undefined;this.showPaymentDetails=undefined;this.countryNodeList=undefined;this.calendarData={}}setRoomsData(t){var i,s;let e=new Array;if((s=(i=t.My_Result)===null||i===void 0?void 0:i.roomtypes)===null||s===void 0?void 0:s.length){e=t.My_Result.roomtypes;t.My_Result.roomtypes.forEach((t=>{t.expanded=true}))}this.calendarData.roomsInfo=e}async initializeApp(){try{const[t,i,s]=await Promise.all([this.roomService.fetchData(this.propertyid,this.language),this.roomService.fetchLanguage(this.language),this.bookingService.getCountries(this.language)]);if(!h.entries){h.entries=i.entries;h.direction=i.direction}this.countryNodeList=s;const{allowed_payment_methods:e,currency:o,allowed_booking_sources:n,adult_child_constraints:a,calendar_legends:r}=t["My_Result"];this.calendarData={currency:o,allowed_booking_sources:n,adult_child_constraints:a,legendData:r};this.setRoomsData(t);const l=["001","004"];this.showPaymentDetails=e.some((t=>l.includes(t.code)))}catch(t){console.error("Error initializing app:",t)}}componentWillLoad(){if(this.baseurl){l.defaults.baseURL=this.baseurl}if(this.ticket!==""){r.token=this.ticket;this.bookingService.setToken(this.ticket);this.roomService.setToken(this.ticket);this.initializeApp()}}async ticketChanged(){r.token=this.ticket;this.bookingService.setToken(this.ticket);this.roomService.setToken(this.ticket);this.initializeApp()}handleCloseBookingWindow(){this.bookingItem=null}handleTriggerClicked(){const t=new Date;t.setDate(t.getDate()+1);this.bookingItem={FROM_DATE:this.from_date,defaultDateRange:{fromDate:new Date,fromDateStr:"",toDate:t,toDateStr:"",dateDifference:0,message:""},TO_DATE:this.to_date,EMAIL:"",event_type:"PLUS_BOOKING",ID:"",NAME:"",PHONE:"",REFERENCE_TYPE:"",TITLE:h.entries.Lcz_NewBooking}}render(){return s(o,null,this.withIrToastAndInterceptor&&s(e,null,s("ir-toast",null),s("ir-interceptor",null)),s("div",{class:"book-container",onClick:this.handleTriggerClicked.bind(this)},s("slot",{name:"trigger"})),this.bookingItem&&s("igl-book-property",{allowedBookingSources:this.calendarData.allowed_booking_sources,adultChildConstraints:this.calendarData.adult_child_constraints,showPaymentDetails:this.showPaymentDetails,countryNodeList:this.countryNodeList,currency:this.calendarData.currency,language:this.language,propertyid:this.propertyid,bookingData:this.bookingItem,onResetBookingData:t=>{t.stopImmediatePropagation();t.stopPropagation();this.resetBookingData.emit(null)},onCloseBookingWindow:()=>this.handleCloseBookingWindow()}))}static get watchers(){return{ticket:["ticketChanged"]}}};d.style=c;export{d as igl_book_property_container};
//# sourceMappingURL=p-6b7de05b.entry.js.map