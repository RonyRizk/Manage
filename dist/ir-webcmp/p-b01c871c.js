import{h as n}from"./p-fe6c3d31.js";import"./p-cda0b50c.js";import"./p-a7b295ee.js";const t={"000":"IN-HOUSE","001":"PENDING-CONFIRMATION","002":"CONFIRMED","003":"CHECKED-OUT"};function r(n,t){if(n===null&&t===null)return"";if(t!==null&&t!==""){return`${n!==null&&n!==void 0?n:""} , ${t!==null&&t!==void 0?t:""}`}return n}function e(e){let i=[];const o=r=>{const i=n();const o=n(r.to_date,"YYYY-MM-DD");const u=n(r.from_date,"YYYY-MM-DD");if(u.isSame(i,"day")&&i.hour()>=12){return t["000"]}else if(i.isAfter(u,"day")&&i.isBefore(o,"day")){return t["000"]}else if(o.isSame(i,"day")&&i.hour()<12){return t["000"]}else if(o.isSame(i,"day")&&i.hour()>=12||o.isBefore(i,"day")){return t["003"]}else{return t[(e===null||e===void 0?void 0:e.status.code)||"001"]}};const u=e.rooms.filter((n=>!!n["assigned_units_pool"]));u.forEach((n=>{var t,u;i.push({ID:n["assigned_units_pool"],TO_DATE:n.to_date,FROM_DATE:n.from_date,NO_OF_DAYS:n.days.length,ARRIVAL:e.arrival,IS_EDITABLE:true,BALANCE:(t=e.financial)===null||t===void 0?void 0:t.due_amount,STATUS:o(n),NAME:r(n.guest.first_name,n.guest.last_name),PHONE:(u=e.guest.mobile)!==null&&u!==void 0?u:"",ENTRY_DATE:"12-12-2023",RATE:n.total,RATE_PLAN:n.rateplan.name,SPLIT_BOOKING:false,RATE_PLAN_ID:n.rateplan.id,IDENTIFIER:n.identifier,RATE_TYPE:n.roomtype.id,ADULTS_COUNT:n.occupancy.adult_nbr,CHILDREN_COUNT:n.occupancy.children_nbr,PR_ID:+n.unit.id,POOL:n["assigned_units_pool"],GUEST:e.guest,ROOMS:e.rooms,BOOKING_NUMBER:e.booking_nbr,cancelation:n.rateplan.cancelation,guarantee:n.rateplan.guarantee,TOTAL_PRICE:n.gross_total,COUNTRY:e.guest.country_id,FROM_DATE_STR:e.format.from_date,TO_DATE_STR:e.format.to_date,adult_child_offering:n.rateplan.selected_variation.adult_child_offering,ARRIVAL_TIME:e.arrival.description,origin:e.origin,channel_booking_nbr:e.channel_booking_nbr,is_direct:e.is_direct,NOTES:e.is_direct?e.remark:null,SOURCE:{code:e.source.code,description:e.source.description,tag:e.source.tag},ota_notes:e.ota_notes})}));return i}function i(t,r){const e=n(t,"YYYY-MM-DD");const i=n(r,"YYYY-MM-DD");const o=i.diff(e,"days");return o||1}function o(n){return["003","002","004"].includes(n)}function u(n){const t=new Intl.NumberFormat(undefined,{style:"currency",currency:n,minimumFractionDigits:0,maximumFractionDigits:0});return t.format(0).replace(/[0-9]/g,"").trim()}function c(n){return n<10?n.toString().padStart(2,"0"):n.toString()}function s(n,t){const r=u(n);return r+t.toFixed(2)}export{i as c,s as f,o as i,c as r,e as t};
//# sourceMappingURL=p-b01c871c.js.map