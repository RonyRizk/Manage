import{a as t,T as n}from"./p-d0086f2b.js";import{h as e}from"./p-fe6c3d31.js";import{l as o}from"./p-cda0b50c.js";import{c as r}from"./p-85d94cdd.js";function a(t,n){const o=`${t.split(" ")[1]} ${n}`;const r=e(o,"DD MMM YYYY");if(!r.isValid()){throw new Error("Invalid Date")}return r.format("D_M_YYYY")}function s(t,n){const o=e(t+" "+n,"ddd DD MMM YYYY").toDate();o.setHours(0,0,0,0);return o.getTime()}function c(t,n){const e=new Date(t);const o=new Date(n);return Math.ceil((o.getTime()-e.getTime())/(1e3*60*60*24))}function i(t){const n=t.getFullYear();const e=(t.getMonth()+1).toString().padStart(2,"0");const o=t.getDate().toString().padStart(2,"0");return`${n}-${e}-${o}`}function _(t){let n={};const e={"IN-HOUSE":{id:1,clsName:"IN_HOUSE"},CONFIRMED:{id:2,clsName:"CONFIRMED"},"PENDING-CONFIRMATION":{id:3,clsName:"PENDING_CONFIRMATION"},"SPLIT-UNIT":{id:4,clsName:"SPLIT_UNIT"},"CHECKED-IN":{id:5,clsName:"CHECKED_IN"},"CHECKED-OUT":{id:5,clsName:"CHECKED_OUT"},BLOCKED:{id:6,clsName:"BLOCKED"},"BLOCKED-WITH-DATES":{id:7,clsName:"BLOCKED_WITH_DATES"},NOTES:{id:8,clsName:"NOTES"},"OUTSTANDING-BALANCE":{id:9,clsName:"OUTSTANDING_BALANCE"},"TEMP-EVENT":{id:10,clsName:"PENDING_CONFIRMATION"}};t.forEach((t=>{n[t.id]=t;n.statusId=e}));return n}function E(t){return["003","002","004"].includes(t)}function l(t){const n=new Intl.NumberFormat(undefined,{style:"currency",currency:t,minimumFractionDigits:0,maximumFractionDigits:0});return n.format(0).replace(/[0-9]/g,"").trim()}const u=(t,n)=>n.find((n=>n.id===t));function T(t){const n=new Date;const e=t;n.setHours(n.getHours()+e,n.getMinutes(),0,0);return{BLOCKED_TILL_DATE:i(n),BLOCKED_TILL_HOUR:n.getHours().toString(),BLOCKED_TILL_MINUTE:n.getMinutes().toString()}}function d(t,n){const o=e(t,"D_M_YYYY");o.add(n,"days");return o.format("YYYY-MM-DD")}function D(t){const n=e(t,"D_M_YYYY");return n.format("YYYY-MM-DD")}function f(t){return e(t).add(2,"months").format("YYYY-MM-DD")}function O(t,n="DD MMM YYYY"){const o=e(t,n).format("ddd, DD MMM YYYY");return o}function N(t){return e(t).add(1,"days").format("YYYY-MM-DD")}function w(t){return e(t,"YYYY-MM-DD").format("DD/MM ddd")}function A(t,n){let o=[];let r=e.min(e(t).add(1,"days"),e(n));let a=e.max(e(t),e(n));while(r<a){o.push(r.format("YYYY-MM-DD"));r=r.clone().add(1,"days")}return o}async function Y(t){const n=[];const e=await y();for(const o of t){for(const t of o.days){for(const o of t.room_types){I(o.physicalrooms,n,e)}}}return n}function I(t,n,e){for(const o of t){for(const t in o.calendar_cell){if(o.calendar_cell[t].Is_Available===false){C(o.calendar_cell[t],n,e)}}}}const h={"004":"BLOCKED","003":"BLOCKED-WITH-DATES","002":"BLOCKED"};const M={"000":"IN-HOUSE","001":"PENDING-CONFIRMATION","002":"CONFIRMED","003":"CHECKED-OUT"};function R(t,n){if(t===null&&n===null)return"";if(n!==null&&n!==""){return`${t!==null&&t!==void 0?t:""} , ${n!==null&&n!==void 0?n:""}`}return t}async function y(){try{const n=r.token;if(n){const{data:e}=await t.post(`/Get_Setup_Entries_By_TBL_NAME_Multi?Ticket=${n}`,{TBL_NAMES:["_STAY_STATUS"]});return e.My_Result.map((t=>({code:t.CODE_NAME,value:t.CODE_VALUE_EN})))}else{throw new Error("Invalid Token")}}catch(t){console.log(t)}}function S(t,n,r){const a=new Date(t);a.setHours(n);a.setMinutes(r);return`${o.entries.Lcz_BlockedTill} ${e(a).format("MMM DD, HH:mm")}`}function m(t,n){var o,r,a;if(E(t.STAY_STATUS_CODE)){const o=e(t.My_Block_Info.from_date,"YYYY-MM-DD").isAfter(t.DATE)?t.My_Block_Info.from_date:t.DATE;const r=e(t.My_Block_Info.to_date,"YYYY-MM-DD").isAfter(t.DATE)?t.My_Block_Info.to_date:t.DATE;return{ID:t.POOL,NOTES:"",BALANCE:"",NAME:t.My_Block_Info.NOTES!==""?t.My_Block_Info.NOTES:t.STAY_STATUS_CODE==="003"?S(t.My_Block_Info.BLOCKED_TILL_DATE,t.My_Block_Info.BLOCKED_TILL_HOUR,t.My_Block_Info.BLOCKED_TILL_MINUTE):n.find((n=>n.code===t.STAY_STATUS_CODE)).value||"",RELEASE_AFTER_HOURS:t.My_Block_Info.DESCRIPTION,PR_ID:t.My_Block_Info.pr_id,ENTRY_DATE:t.My_Block_Info.BLOCKED_TILL_DATE,ENTRY_HOUR:t.My_Block_Info.BLOCKED_TILL_HOUR,ENTRY_MINUTE:t.My_Block_Info.BLOCKED_TILL_MINUTE,OPTIONAL_REASON:t.My_Block_Info.NOTES,FROM_DATE:o,TO_DATE:r,NO_OF_DAYS:c(o,r),STATUS:h[t.STAY_STATUS_CODE],POOL:t.POOL,STATUS_CODE:t.STAY_STATUS_CODE,OUT_OF_SERVICE:t.STAY_STATUS_CODE==="004",FROM_DATE_STR:t.My_Block_Info.format.from_date,TO_DATE_STR:t.My_Block_Info.format.to_date,defaultDates:{from_date:t.My_Block_Info.from_date,to_date:t.My_Block_Info.to_date}}}const s=e(t.room.from_date,"YYYY-MM-DD").isAfter(t.DATE)?t.room.from_date:t.DATE;const i=e(t.room.to_date,"YYYY-MM-DD").isAfter(t.DATE)?t.room.to_date:t.DATE;return{ID:t.POOL,FROM_DATE:s,TO_DATE:i,NO_OF_DAYS:c(s,i),STATUS:M[(o=t.booking)===null||o===void 0?void 0:o.status.code],NAME:R(t.room.guest.first_name,t.room.guest.last_name),IDENTIFIER:t.room.identifier,PR_ID:t.pr_id,POOL:t.POOL,BOOKING_NUMBER:t.booking.booking_nbr,NOTES:t.booking.is_direct?t.booking.remark:null,is_direct:t.booking.is_direct,BALANCE:(r=t.booking.financial)===null||r===void 0?void 0:r.due_amount,channel_booking_nbr:t.booking.channel_booking_nbr,ARRIVAL_TIME:t.booking.arrival.description,defaultDates:{from_date:t.room.from_date,to_date:t.room.to_date},ENTRY_DATE:t.booking.booked_on.date,IS_EDITABLE:t.booking.is_editable,ARRIVAL:t.booking.arrival,PHONE:(a=t.booking.guest.mobile)!==null&&a!==void 0?a:"",RATE:t.room.total,RATE_PLAN:t.room.rateplan.name,SPLIT_BOOKING:false,RATE_PLAN_ID:t.room.rateplan.id,RATE_TYPE:1,ADULTS_COUNT:t.room.occupancy.adult_nbr,CHILDREN_COUNT:t.room.occupancy.children_nbr,origin:t.booking.origin,GUEST:t.booking.guest,ROOMS:t.booking.rooms,cancelation:t.room.rateplan.cancelation,guarantee:t.room.rateplan.guarantee,TOTAL_PRICE:t.room.total,COUNTRY:t.booking.guest.country_id,FROM_DATE_STR:t.booking.format.from_date,TO_DATE_STR:t.booking.format.to_date,adult_child_offering:t.room.rateplan.selected_variation.adult_child_offering,SOURCE:{code:t.booking.source.code,description:t.booking.source.description,tag:t.booking.source.tag}}}function C(t,n,e){const o=n.findIndex((n=>n.POOL===t.POOL));if(o===-1){const o=m(t,e);n.push(o)}}function L(t){let n=[];const o=n=>{const o=e();const r=e(n.to_date,"YYYY-MM-DD");const a=e(n.from_date,"YYYY-MM-DD");if(a.isSame(o,"day")&&o.hour()>=12){return M["000"]}else if(o.isAfter(a,"day")&&o.isBefore(r,"day")){return M["000"]}else if(r.isSame(o,"day")&&o.hour()<12){return M["000"]}else if(r.isSame(o,"day")&&o.hour()>=12||r.isBefore(o,"day")){return M["003"]}else{return M[(t===null||t===void 0?void 0:t.status.code)||"001"]}};const r=t.rooms.filter((t=>!!t["assigned_units_pool"]));r.forEach((e=>{var r,a;n.push({ID:e["assigned_units_pool"],TO_DATE:e.to_date,FROM_DATE:e.from_date,NO_OF_DAYS:e.days.length,ARRIVAL:t.arrival,IS_EDITABLE:true,BALANCE:(r=t.financial)===null||r===void 0?void 0:r.due_amount,STATUS:o(e),NAME:R(e.guest.first_name,e.guest.last_name),PHONE:(a=t.guest.mobile)!==null&&a!==void 0?a:"",ENTRY_DATE:"12-12-2023",RATE:e.total,RATE_PLAN:e.rateplan.name,SPLIT_BOOKING:false,RATE_PLAN_ID:e.rateplan.id,IDENTIFIER:e.identifier,RATE_TYPE:e.roomtype.id,ADULTS_COUNT:e.occupancy.adult_nbr,CHILDREN_COUNT:e.occupancy.children_nbr,PR_ID:+e.unit.id,POOL:e["assigned_units_pool"],GUEST:t.guest,ROOMS:t.rooms,BOOKING_NUMBER:t.booking_nbr,cancelation:e.rateplan.cancelation,guarantee:e.rateplan.guarantee,TOTAL_PRICE:e.gross_total,COUNTRY:t.guest.country_id,FROM_DATE_STR:t.format.from_date,TO_DATE_STR:t.format.to_date,adult_child_offering:e.rateplan.selected_variation.adult_child_offering,ARRIVAL_TIME:t.arrival.description,origin:t.origin,channel_booking_nbr:t.channel_booking_nbr,is_direct:t.is_direct,NOTES:t.is_direct?t.remark:null,SOURCE:{code:t.source.code,description:t.source.description,tag:t.source.tag},ota_notes:t.ota_notes,defaultDates:{from_date:e.from_date,to_date:e.to_date}})}));return n}async function p(t){const n=await y();return{ID:t.POOL,NOTES:"",BALANCE:"",NAME:t.NOTES!==""?t.NOTES:t.STAY_STATUS_CODE==="003"?S(t.BLOCKED_TILL_DATE,t.BLOCKED_TILL_HOUR,t.BLOCKED_TILL_MINUTE):n.find((n=>n.code===t.STAY_STATUS_CODE)).value||"",RELEASE_AFTER_HOURS:t.DESCRIPTION,PR_ID:t.pr_id,ENTRY_DATE:t.BLOCKED_TILL_DATE,ENTRY_HOUR:t.BLOCKED_TILL_HOUR,ENTRY_MINUTE:t.BLOCKED_TILL_MINUTE,OPTIONAL_REASON:t.NOTES,FROM_DATE:t.from_date,TO_DATE:t.to_date,NO_OF_DAYS:g(t.from_date,t.to_date),STATUS:h[t.STAY_STATUS_CODE],POOL:t.POOL,STATUS_CODE:t.STAY_STATUS_CODE,OUT_OF_SERVICE:t.STAY_STATUS_CODE==="004",FROM_DATE_STR:t.format.from_date,TO_DATE_STR:t.format.to_date,defaultDates:{from_date:t.from_date,to_date:t.to_date}}}function g(t,n){const o=e(t,"YYYY-MM-DD");const r=e(n,"YYYY-MM-DD");const a=r.diff(o,"days");return a||1}class U extends n{async getCalendarData(n,e,o){try{const r=this.getToken();if(r!==null){const{data:c}=await t.post(`/Get_Exposed_Calendar?Ticket=${r}`,{propertyid:n,from_date:e,to_date:o});if(c.ExceptionMsg!==""){throw new Error(c.ExceptionMsg)}const i=c.My_Result.months;const _=[];const E=await Y(i);const l=i.map((t=>{_.push({daysCount:t.days.length,monthName:t.description});return t.days.map((n=>({day:a(n.description,t.description),currentDate:s(n.description,t.description),dayDisplayName:n.description,rate:n.room_types,unassigned_units_nbr:n.unassigned_units_nbr,occupancy:n.occupancy})))})).flat();return Promise.resolve({ExceptionCode:null,ExceptionMsg:"",My_Params_Get_Rooming_Data:{AC_ID:n,FROM:c.My_Params_Get_Exposed_Calendar.from_date,TO:c.My_Params_Get_Exposed_Calendar.to_date},days:l,months:_,myBookings:E,defaultMonths:i})}}catch(t){console.error(t)}}async fetchGuest(n){try{const e=this.getToken();if(e!==null){const{data:o}=await t.post(`/Get_Exposed_Guest?Ticket=${e}`,{email:n});if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}return o.My_Result}}catch(t){console.log(t);throw new Error(t)}}async fetchPMSLogs(n){try{const e=this.getToken();if(e!==null){const{data:o}=await t.post(`/Get_Exposed_PMS_Logs?Ticket=${e}`,{booking_nbr:n});if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}return o.My_Result}}catch(t){console.log(t);throw new Error(t)}}async editExposedGuest(n,e){try{const o=this.getToken();if(o!==null){const{data:r}=await t.post(`/Edit_Exposed_Guest?Ticket=${o}`,Object.assign(Object.assign({},n),{book_nbr:e}));if(r.ExceptionMsg!==""){throw new Error(r.ExceptionMsg)}return r.My_Result}}catch(t){console.log(t);throw new Error(t)}}async getBookingAvailability(n,e,o,r,a,s,c){try{const i=this.getToken();if(i){const{data:_}=await t.post(`/Get_Exposed_Booking_Availability?Ticket=${i}`,{propertyid:o,from_date:n,to_date:e,adult_nbr:r.adult,child_nbr:r.child,language:a,currency_ref:c.code,room_type_ids:s});if(_.ExceptionMsg!==""){throw new Error(_.ExceptionMsg)}return _["My_Result"]}else{throw new Error("Token doesn't exist")}}catch(t){console.error(t);throw new Error(t)}}async getCountries(n){try{const e=this.getToken();if(e){const{data:o}=await t.post(`/Get_Exposed_Countries?Ticket=${e}`,{language:n});if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}return o.My_Result}}catch(t){console.error(t);throw new Error(t)}}async fetchSetupEntries(){try{const n=this.getToken();if(n){const{data:e}=await t.post(`/Get_Setup_Entries_By_TBL_NAME_MULTI?Ticket=${n}`,{TBL_NAMES:["_ARRIVAL_TIME","_RATE_PRICING_MODE","_BED_PREFERENCE_TYPE"]});if(e.ExceptionMsg!==""){throw new Error(e.ExceptionMsg)}const o=e.My_Result;return{arrivalTime:o.filter((t=>t.TBL_NAME==="_ARRIVAL_TIME")),ratePricingMode:o.filter((t=>t.TBL_NAME==="_RATE_PRICING_MODE")),bedPreferenceType:o.filter((t=>t.TBL_NAME==="_BED_PREFERENCE_TYPE"))}}}catch(t){console.error(t);throw new Error(t)}}async getBlockedInfo(){try{const n=this.getToken();if(n){const{data:e}=await t.post(`/Get_Setup_Entries_By_TBL_NAME_MULTI?Ticket=${n}`,{TBL_NAMES:["_CALENDAR_BLOCKED_TILL"]});if(e.ExceptionMsg!==""){throw new Error(e.ExceptionMsg)}return e.My_Result}}catch(t){console.error(t);throw new Error(t)}}async getUserDefaultCountry(){try{const n=this.getToken();if(n){const{data:e}=await t.post(`/Get_Country_By_IP?Ticket=${n}`,{IP:""});if(e.ExceptionMsg!==""){throw new Error(e.ExceptionMsg)}return e["My_Result"]}}catch(t){console.error(t);throw new Error(t)}}async blockUnit(n){try{const e=this.getToken();if(e){const{data:o}=await t.post(`/Block_Exposed_Unit?Ticket=${e}`,n);if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}console.log(o);return o["My_Params_Block_Exposed_Unit"]}}catch(t){console.error(t);throw new Error(t)}}async getUserInfo(n){try{const e=this.getToken();if(e){const{data:o}=await t.post(`/GET_EXPOSED_GUEST?Ticket=${e}`,{email:n});if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}return o.My_Result}else{throw new Error("Invalid Token")}}catch(t){console.error(t);throw new Error(t)}}async getExposedBooking(n,e){try{const o=this.getToken();if(o){const{data:r}=await t.post(`/Get_Exposed_Booking?Ticket=${o}`,{booking_nbr:n,language:e});if(r.ExceptionMsg!==""){throw new Error(r.ExceptionMsg)}return r.My_Result}else{throw new Error("Invalid Token")}}catch(t){console.error(t)}}generateDays(t,n,e){const o=new Date(t);const r=new Date(n);const a=[];while(o<r){a.push({date:o.toISOString().split("T")[0],amount:e,cost:null});o.setDate(o.getDate()+1)}return a}calculateTotalRate(t,n,e,o){if(e&&o===2){return+t}return+t/+n}async fetchExposedGuest(n,e){try{const o=this.getToken();if(o){const{data:r}=await t.post(`/Fetch_Exposed_Guests?Ticket=${o}`,{email:n,property_id:e});if(r.ExceptionMsg!==""){throw new Error(r.ExceptionMsg)}return r["My_Result"]}else{throw new Error("Token doesn't exist")}}catch(t){console.error(t);throw new Error(t)}}async fetchExposedBookings(n,e,o,r){try{const a=this.getToken();if(a){const{data:s}=await t.post(`/Fetch_Exposed_Bookings?Ticket=${a}`,{booking_nbr:n,property_id:e,from_date:o,to_date:r});if(s.ExceptionMsg!==""){throw new Error(s.ExceptionMsg)}return s["My_Result"]}else{throw new Error("Token doesn't exist")}}catch(t){console.error(t);throw new Error(t)}}async getPCICardInfoURL(n){try{const e=this.getToken();if(e){const{data:o}=await t.post(`/Get_PCI_Card_Info_URL?Ticket=${e}`,{BOOK_NBR:n});if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}return o["My_Result"]}else{throw new Error("Token doesn't exist")}}catch(t){console.error(t);throw new Error(t)}}async bookUser(n,e,o,r,a,s,c,_,E,l,u,T,d,D,f){try{const O=this.getToken();if(O){const N=i(o);const w=i(r);let A={email:n.email===""?null:n.email||null,first_name:n.firstName,last_name:n.lastName,country_id:n.countryId===""?null:n.countryId,city:null,mobile:n.contactNumber===null?"":n.contactNumber,address:"",dob:null,subscribe_to_news_letter:n.emailGuest||false,cci:n.cardNumber?{nbr:n.cardNumber,holder_name:n.cardHolderName,expiry_month:n.expiryMonth,expiry_year:n.expiryYear}:null};if(T){A=Object.assign(Object.assign({},T),{email:T.email===""?null:T.email})}if(n.id){A=Object.assign(Object.assign({},A),{id:n.id})}const Y={assign_units:true,check_in:e,is_pms:true,is_direct:true,is_in_loyalty_mode:false,promo_key:null,booking:{booking_nbr:u||"",from_date:N,to_date:w,remark:n.message||null,property:{id:_},source:c,currency:l,arrival:{code:d?d:n.selectedArrivalTime},guest:A,rooms:[...a.map((t=>({identifier:f||null,roomtype:{id:t.roomCategoryId,name:t.roomCategoryName,physicalrooms:null,rateplans:null,availabilities:null,inventory:t.inventory,rate:t.rate/s},rateplan:{id:t.ratePlanId,name:t.ratePlanName,rate_restrictions:null,variations:null,cancelation:t.cancelation,guarantee:t.guarantee},unit:typeof D==="undefined"&&t.roomId===""?null:{id:+D||+t.roomId},occupancy:{adult_nbr:t.adultCount,children_nbr:t.childrenCount,infant_nbr:null},bed_preference:t.preference,from_date:N,to_date:w,notes:null,days:this.generateDays(N,w,this.calculateTotalRate(t.rate,s,t.isRateModified,t.rateType)),guest:{email:null,first_name:t.guestName,last_name:null,country_id:null,city:null,mobile:null,address:null,dob:null,subscribe_to_news_letter:null}}))),...E]}};console.log("book user payload",Y);const{data:I}=await t.post(`/DoReservation?Ticket=${O}`,Y);if(I.ExceptionMsg!==""){throw new Error(I.ExceptionMsg)}console.log(I["My_Result"]);return I["My_Result"]}else{throw new Error("Invalid token")}}catch(t){console.error(t);throw new Error(t)}}}export{U as B,Y as a,s as b,a as c,i as d,T as e,u as f,l as g,c as h,_ as i,L as j,M as k,E as l,g as m,N as n,f as o,D as p,d as q,R as r,A as s,p as t,w as u,O as v};
//# sourceMappingURL=p-4a8ca741.js.map