import{h as n}from"./p-fe6c3d31.js";import{i as T,e as E}from"./p-e0980810.js";import{a as o}from"./p-d0086f2b.js";import{l as t}from"./p-cda0b50c.js";import{c as _}from"./p-a7b295ee.js";async function O(n){const T=[];const E=await s();for(const o of n){for(const n of o.days){for(const o of n.room_types){r(o.physicalrooms,T,E)}}}return T}function r(n,T,E){for(const o of n){for(const n in o.calendar_cell){if(o.calendar_cell[n].Is_Available===false){a(o.calendar_cell[n],T,E)}}}}const A={"004":"BLOCKED","003":"BLOCKED-WITH-DATES","002":"BLOCKED"};const e={"000":"IN-HOUSE","001":"PENDING-CONFIRMATION","002":"CONFIRMED","003":"CHECKED-OUT"};function i(n,T){if(n===null&&T===null)return"";if(T!==null&&T!==""){return`${n!==null&&n!==void 0?n:""} , ${T!==null&&T!==void 0?T:""}`}return n}async function s(){try{const n=_.token;if(n){const{data:T}=await o.post(`/Get_Setup_Entries_By_TBL_NAME_Multi?Ticket=${n}`,{TBL_NAMES:["_STAY_STATUS"]});return T.My_Result.map((n=>({code:n.CODE_NAME,value:n.CODE_VALUE_EN})))}else{throw new Error("Invalid Token")}}catch(n){console.log(n)}}function c(T,E,o){const _=new Date(T);_.setHours(E);_.setMinutes(o);return`${t.entries.Lcz_BlockedTill} ${n(_).format("MMM DD, HH:mm")}`}function R(n,E){var o,t;if(T(n.STAY_STATUS_CODE)){return{ID:n.POOL,NOTES:"",BALANCE:"",NAME:n.My_Block_Info.NOTES!==""?n.My_Block_Info.NOTES:n.STAY_STATUS_CODE==="003"?c(n.My_Block_Info.BLOCKED_TILL_DATE,n.My_Block_Info.BLOCKED_TILL_HOUR,n.My_Block_Info.BLOCKED_TILL_MINUTE):E.find((T=>T.code===n.STAY_STATUS_CODE)).value||"",RELEASE_AFTER_HOURS:n.My_Block_Info.DESCRIPTION,PR_ID:n.My_Block_Info.pr_id,ENTRY_DATE:n.My_Block_Info.BLOCKED_TILL_DATE,ENTRY_HOUR:n.My_Block_Info.BLOCKED_TILL_HOUR,ENTRY_MINUTE:n.My_Block_Info.BLOCKED_TILL_MINUTE,OPTIONAL_REASON:n.My_Block_Info.NOTES,FROM_DATE:n.DATE,TO_DATE:n.DATE,NO_OF_DAYS:1,STATUS:A[n.STAY_STATUS_CODE],POOL:n.POOL,STATUS_CODE:n.STAY_STATUS_CODE,OUT_OF_SERVICE:n.STAY_STATUS_CODE==="004",FROM_DATE_STR:n.My_Block_Info.format.from_date,TO_DATE_STR:n.My_Block_Info.format.to_date}}if(n.booking.booking_nbr==="88237899"){console.log(n)}return{ID:n.POOL,TO_DATE:n.DATE,FROM_DATE:n.DATE,NO_OF_DAYS:1,STATUS:e[(o=n.booking)===null||o===void 0?void 0:o.status.code],NAME:i(n.room.guest.first_name,n.room.guest.last_name),IDENTIFIER:n.room.identifier,PR_ID:n.pr_id,POOL:n.POOL,BOOKING_NUMBER:n.booking.booking_nbr,NOTES:n.booking.is_direct?n.booking.remark:null,is_direct:n.booking.is_direct,BALANCE:(t=n.booking.financial)===null||t===void 0?void 0:t.due_amount,channel_booking_nbr:n.booking.channel_booking_nbr}}function D(n,T){n.NO_OF_DAYS=E(n.FROM_DATE,T.DATE);n.TO_DATE=T.DATE;if(T.booking){const{arrival:E}=T.booking;Object.assign(n,{ARRIVAL_TIME:E.description})}return n}function a(n,T,E){const o=T.findIndex((T=>T.POOL===n.POOL));if(o===-1){const o=R(n,E);T.push(o)}else{const E=D(T[o],n);T[o]=E}}function N(T){let E=[];const o=E=>{const o=n();const t=n(E.to_date,"YYYY-MM-DD");const _=n(E.from_date,"YYYY-MM-DD");if(_.isSame(o,"day")&&o.hour()>=12){return e["000"]}else if(o.isAfter(_,"day")&&o.isBefore(t,"day")){return e["000"]}else if(t.isSame(o,"day")&&o.hour()<12){return e["000"]}else if(t.isSame(o,"day")&&o.hour()>=12||t.isBefore(o,"day")){return e["003"]}else{return e[(T===null||T===void 0?void 0:T.status.code)||"001"]}};const t=T.rooms.filter((n=>!!n["assigned_units_pool"]));t.forEach((n=>{var t,_;E.push({ID:n["assigned_units_pool"],TO_DATE:n.to_date,FROM_DATE:n.from_date,NO_OF_DAYS:n.days.length,ARRIVAL:T.arrival,IS_EDITABLE:true,BALANCE:(t=T.financial)===null||t===void 0?void 0:t.due_amount,STATUS:o(n),NAME:i(n.guest.first_name,n.guest.last_name),PHONE:(_=T.guest.mobile)!==null&&_!==void 0?_:"",ENTRY_DATE:"12-12-2023",RATE:n.total,RATE_PLAN:n.rateplan.name,SPLIT_BOOKING:false,RATE_PLAN_ID:n.rateplan.id,IDENTIFIER:n.identifier,RATE_TYPE:n.roomtype.id,ADULTS_COUNT:n.occupancy.adult_nbr,CHILDREN_COUNT:n.occupancy.children_nbr,PR_ID:+n.unit.id,POOL:n["assigned_units_pool"],GUEST:T.guest,ROOMS:T.rooms,BOOKING_NUMBER:T.booking_nbr,cancelation:n.rateplan.cancelation,guarantee:n.rateplan.guarantee,TOTAL_PRICE:n.gross_total,COUNTRY:T.guest.country_id,FROM_DATE_STR:T.format.from_date,TO_DATE_STR:T.format.to_date,adult_child_offering:n.rateplan.selected_variation.adult_child_offering,ARRIVAL_TIME:T.arrival.description,origin:T.origin,channel_booking_nbr:T.channel_booking_nbr,is_direct:T.is_direct,NOTES:T.is_direct?T.remark:null,SOURCE:{code:T.source.code,description:T.source.description,tag:T.source.tag},ota_notes:T.ota_notes})}));return E}async function S(n){const T=await s();return{ID:n.POOL,NOTES:"",BALANCE:"",NAME:n.NOTES!==""?n.NOTES:n.STAY_STATUS_CODE==="003"?c(n.BLOCKED_TILL_DATE,n.BLOCKED_TILL_HOUR,n.BLOCKED_TILL_MINUTE):T.find((T=>T.code===n.STAY_STATUS_CODE)).value||"",RELEASE_AFTER_HOURS:n.DESCRIPTION,PR_ID:n.pr_id,ENTRY_DATE:n.BLOCKED_TILL_DATE,ENTRY_HOUR:n.BLOCKED_TILL_HOUR,ENTRY_MINUTE:n.BLOCKED_TILL_MINUTE,OPTIONAL_REASON:n.NOTES,FROM_DATE:n.from_date,TO_DATE:n.to_date,NO_OF_DAYS:u(n.from_date,n.to_date),STATUS:A[n.STAY_STATUS_CODE],POOL:n.POOL,STATUS_CODE:n.STAY_STATUS_CODE,OUT_OF_SERVICE:n.STAY_STATUS_CODE==="004",FROM_DATE_STR:n.format.from_date,TO_DATE_STR:n.format.to_date}}function u(T,E){const o=n(T,"YYYY-MM-DD");const t=n(E,"YYYY-MM-DD");const _=t.diff(o,"days");return _}export{N as a,e as b,u as c,i as f,O as g,S as t};
//# sourceMappingURL=p-8941fa43.js.map