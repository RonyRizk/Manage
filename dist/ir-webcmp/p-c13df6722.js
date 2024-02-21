import{a as t}from"./p-16d91b49.js";import{c as e,a as o,d as r}from"./p-eec37187.js";import{g as n}from"./p-70521dff.js";class s{async getCalendarData(r,s,a){try{const i=JSON.parse(sessionStorage.getItem("token"));if(i!==null){const{data:c}=await t.post(`/Get_Exposed_Calendar?Ticket=${i}`,{propertyid:r,from_date:s,to_date:a});if(c.ExceptionMsg!==""){throw new Error(c.ExceptionMsg)}const l=c.My_Result.months;const _=[];const d=await n(l);const w=l.map((t=>{_.push({daysCount:t.days.length,monthName:t.description});return t.days.map((r=>({day:e(r.description,t.description),currentDate:o(r.description,t.description),dayDisplayName:r.description,rate:r.room_types,unassigned_units_nbr:r.unassigned_units_nbr,occupancy:r.occupancy})))})).flat();return Promise.resolve({ExceptionCode:null,ExceptionMsg:"",My_Params_Get_Rooming_Data:{AC_ID:r,FROM:c.My_Params_Get_Exposed_Calendar.from_date,TO:c.My_Params_Get_Exposed_Calendar.to_date},days:w,months:_,myBookings:d,defaultMonths:l})}}catch(t){console.error(t)}}async fetchGuest(e){try{const o=JSON.parse(sessionStorage.getItem("token"));if(o!==null){const{data:r}=await t.post(`/Get_Exposed_Guest?Ticket=${o}`,{email:e});if(r.ExceptionMsg!==""){throw new Error(r.ExceptionMsg)}return r.My_Result}}catch(t){console.log(t);throw new Error(t)}}async editExposedGuest(e,o){try{const r=JSON.parse(sessionStorage.getItem("token"));if(r!==null){const{data:n}=await t.post(`/Edit_Exposed_Guest?Ticket=${r}`,Object.assign(Object.assign({},e),{book_nbr:o}));if(n.ExceptionMsg!==""){throw new Error(n.ExceptionMsg)}return n.My_Result}}catch(t){console.log(t);throw new Error(t)}}async getBookingAvailability(e,o,r,n,s,a,i){try{const c=JSON.parse(sessionStorage.getItem("token"));if(c){const{data:l}=await t.post(`/Get_Exposed_Booking_Availability?Ticket=${c}`,{propertyid:r,from_date:e,to_date:o,adult_nbr:n.adult,child_nbr:n.child,language:s,currency_ref:i.code,room_type_ids:a});if(l.ExceptionMsg!==""){throw new Error(l.ExceptionMsg)}return l["My_Result"]}else{throw new Error("Token doesn't exist")}}catch(t){console.error(t);throw new Error(t)}}async getCountries(e){try{const o=JSON.parse(sessionStorage.getItem("token"));if(o){const{data:r}=await t.post(`/Get_Exposed_Countries?Ticket=${o}`,{language:e});if(r.ExceptionMsg!==""){throw new Error(r.ExceptionMsg)}return r.My_Result}}catch(t){console.error(t);throw new Error(t)}}async fetchSetupEntries(){try{const e=JSON.parse(sessionStorage.getItem("token"));if(e){const{data:o}=await t.post(`/Get_Setup_Entries_By_TBL_NAME_MULTI?Ticket=${e}`,{TBL_NAMES:["_ARRIVAL_TIME","_RATE_PRICING_MODE","_BED_PREFERENCE_TYPE"]});if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}const r=o.My_Result;return{arrivalTime:r.filter((t=>t.TBL_NAME==="_ARRIVAL_TIME")),ratePricingMode:r.filter((t=>t.TBL_NAME==="_RATE_PRICING_MODE")),bedPreferenceType:r.filter((t=>t.TBL_NAME==="_BED_PREFERENCE_TYPE"))}}}catch(t){console.error(t);throw new Error(t)}}async getBlockedInfo(){try{const e=JSON.parse(sessionStorage.getItem("token"));if(e){const{data:o}=await t.post(`/Get_Setup_Entries_By_TBL_NAME_MULTI?Ticket=${e}`,{TBL_NAMES:["_CALENDAR_BLOCKED_TILL"]});if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}return o.My_Result}}catch(t){console.error(t);throw new Error(t)}}async getUserDefaultCountry(){try{const e=JSON.parse(sessionStorage.getItem("token"));if(e){const{data:o}=await t.post(`/Get_Country_By_IP?Ticket=${e}`,{IP:""});if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}return o["My_Result"]}}catch(t){console.error(t);throw new Error(t)}}async blockUnit(e){try{const o=JSON.parse(sessionStorage.getItem("token"));if(o){const{data:r}=await t.post(`/Block_Exposed_Unit?Ticket=${o}`,e);if(r.ExceptionMsg!==""){throw new Error(r.ExceptionMsg)}console.log(r);return r["My_Params_Block_Exposed_Unit"]}}catch(t){console.error(t);throw new Error(t)}}async getUserInfo(e){try{const o=JSON.parse(sessionStorage.getItem("token"));if(o){const{data:r}=await t.post(`/GET_EXPOSED_GUEST?Ticket=${o}`,{email:e});if(r.ExceptionMsg!==""){throw new Error(r.ExceptionMsg)}return r.My_Result}else{throw new Error("Invalid Token")}}catch(t){console.error(t);throw new Error(t)}}async getExposedBooking(e,o){try{const r=JSON.parse(sessionStorage.getItem("token"));if(r){const{data:n}=await t.post(`/Get_Exposed_Booking?Ticket=${r}`,{booking_nbr:e,language:o});if(n.ExceptionMsg!==""){throw new Error(n.ExceptionMsg)}return n.My_Result}else{throw new Error("Invalid Token")}}catch(t){console.error(t)}}generateDays(t,e,o){const r=new Date(t);const n=new Date(e);const s=[];while(r<n){s.push({date:r.toISOString().split("T")[0],amount:o});r.setDate(r.getDate()+1)}return s}calculateTotalRate(t,e,o,r){if(o&&r===2){return+t}return+t/+e}async fetchExposedGuest(e,o){try{const r=JSON.parse(sessionStorage.getItem("token"));if(r){const{data:n}=await t.post(`/Fetch_Exposed_Guests?Ticket=${r}`,{email:e,property_id:o});if(n.ExceptionMsg!==""){throw new Error(n.ExceptionMsg)}return n["My_Result"]}else{throw new Error("Token doesn't exist")}}catch(t){console.error(t);throw new Error(t)}}async fetchExposedBookings(e,o,r,n){try{const s=JSON.parse(sessionStorage.getItem("token"));if(s){const{data:a}=await t.post(`/Fetch_Exposed_Bookings?Ticket=${s}`,{booking_nbr:e,property_id:o,from_date:r,to_date:n});if(a.ExceptionMsg!==""){throw new Error(a.ExceptionMsg)}return a["My_Result"]}else{throw new Error("Token doesn't exist")}}catch(t){console.error(t);throw new Error(t)}}async getPCICardInfoURL(e){try{const o=JSON.parse(sessionStorage.getItem("token"));if(o){const{data:r}=await t.post(`/Get_PCI_Card_Info_URL?Ticket=${o}`,{BOOK_NBR:e});if(r.ExceptionMsg!==""){throw new Error(r.ExceptionMsg)}return r["My_Result"]}else{throw new Error("Token doesn't exist")}}catch(t){console.error(t);throw new Error(t)}}async bookUser(e,o,n,s,a,i,c,l,_,d,w,u,E,y,h){console.log(E);try{const f=JSON.parse(sessionStorage.getItem("token"));if(f){const k=r(n);const g=r(s);let p={email:e.email||null,first_name:e.firstName,last_name:e.lastName,country_id:e.countryId,city:null,mobile:e.contactNumber,address:"",dob:null,subscribe_to_news_letter:e.emailGuest||false,cci:e.cardNumber?{nbr:e.cardNumber,holder_name:e.cardHolderName,expiry_month:e.expiryMonth,expiry_year:e.expiryYear}:null};if(e.id){p=Object.assign(Object.assign({},p),{id:e.id})}const m={assign_units:true,check_in:o,is_pms:true,is_direct:true,booking:{booking_nbr:w||"",from_date:k,to_date:g,remark:e.message||null,property:{id:l},source:c,currency:d,arrival:E?{code:E}:Object.assign({},e.selectedArrivalTime),guest:u||p,rooms:[...a.map((t=>({identifier:h||null,roomtype:{id:t.roomCategoryId,name:t.roomCategoryName,physicalrooms:null,rateplans:null,availabilities:null,inventory:t.inventory,rate:t.rate/i},rateplan:{id:t.ratePlanId,name:t.ratePlanName,rate_restrictions:null,variations:null,cancelation:t.cancelation,guarantee:t.guarantee},unit:typeof y==="undefined"&&t.roomId===""?null:{id:+y||+t.roomId},occupancy:{adult_nbr:t.adultCount,children_nbr:t.childrenCount,infant_nbr:null},bed_preference:t.preference,from_date:k,to_date:g,notes:null,days:this.generateDays(k,g,this.calculateTotalRate(t.rate,i,t.isRateModified,t.rateType)),guest:{email:null,first_name:t.guestName,last_name:null,country_id:null,city:null,mobile:null,address:null,dob:null,subscribe_to_news_letter:null}}))),..._]}};console.log("book user payload",m);const{data:T}=await t.post(`/DoReservation?Ticket=${f}`,m);if(T.ExceptionMsg!==""){throw new Error(T.ExceptionMsg)}console.log(T["My_Result"]);return T["My_Result"]}else{throw new Error("Invalid token")}}catch(t){console.error(t);throw new Error(t)}}}export{s as B};
//# sourceMappingURL=p-c13df6722.js.map