import{T as t,a as r}from"./p-54928856.js";import{c as e}from"./p-a7b295ee.js";import{l as o}from"./p-cda0b50c.js";class a extends t{async fetchData(t,o){try{const a=this.getToken();if(a!==null){const{data:s}=await r.post(`/Get_Exposed_Property?Ticket=${a}`,{id:t,language:o});if(s.ExceptionMsg!==""){throw new Error(s.ExceptionMsg)}const c=s.My_Result;e.adultChildConstraints=c.adult_child_constraints;e.allowedBookingSources=c.allowed_booking_sources;e.allowed_payment_methods=c.allowed_booking_methods;e.currency=c.currency;e.is_vacation_rental=c.is_vacation_rental;e.pickup_service=c.pickup_service;e.max_nights=c.max_nights;e.roomsInfo=c.roomtypes;e.taxes=c.taxes;e.id=c.id;e.country=c.country;e.name=c.name;e.tax_statement=c.tax_statement;e.is_frontdesk_enabled=c.is_frontdesk_enabled;return s}}catch(t){console.log(t);throw new Error(t)}}async fetchLanguage(t,e=["_PMS_FRONT"]){try{const a=this.getToken();if(a!==null){const{data:s}=await r.post(`/Get_Exposed_Language?Ticket=${a}`,{code:t,sections:e});if(s.ExceptionMsg!==""){throw new Error(s.ExceptionMsg)}let c=this.transformArrayToObject(s.My_Result.entries);o.entries=Object.assign(Object.assign({},o.entries),c);o.direction=s.My_Result.direction;return{entries:c,direction:s.My_Result.direction}}}catch(t){console.log(t);throw new Error(t)}}transformArrayToObject(t){let r={};for(const e of t){r[e.code]=e.description}return r}}export{a as R};
//# sourceMappingURL=p-c4e830f92.js.map