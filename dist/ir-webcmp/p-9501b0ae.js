import{a as t,f as n}from"./p-05195efb.js";import{h as e}from"./p-fe6c3d31.js";const s=(t,n,e)=>{const s=t.get(n);if(!s){t.set(n,[e])}else if(!s.includes(e)){s.push(e)}};const o=(t,n)=>{let e;return(...s)=>{if(e){clearTimeout(e)}e=setTimeout((()=>{e=0;t(...s)}),n)}};const r=t=>!("isConnected"in t)||t.isConnected;const c=o((t=>{for(let n of t.keys()){t.set(n,t.get(n).filter(r))}}),2e3);const i=()=>{if(typeof t!=="function"){return{}}const e=new Map;return{dispose:()=>e.clear(),get:n=>{const o=t();if(o){s(e,n,o)}},set:t=>{const s=e.get(t);if(s){e.set(t,s.filter(n))}c(e)},reset:()=>{e.forEach((t=>t.forEach(n)));c(e)}}};const u=t=>typeof t==="function"?t():t;const a=(t,n=((t,n)=>t!==n))=>{const e=u(t);let s=new Map(Object.entries(e!==null&&e!==void 0?e:{}));const o={dispose:[],get:[],set:[],reset:[]};const r=()=>{var n;s=new Map(Object.entries((n=u(t))!==null&&n!==void 0?n:{}));o.reset.forEach((t=>t()))};const c=()=>{o.dispose.forEach((t=>t()));r()};const i=t=>{o.get.forEach((n=>n(t)));return s.get(t)};const a=(t,e)=>{const r=s.get(t);if(n(e,r,t)){s.set(t,e);o.set.forEach((n=>n(t,e,r)))}};const Y=typeof Proxy==="undefined"?{}:new Proxy(e,{get(t,n){return i(n)},ownKeys(t){return Array.from(s.keys())},getOwnPropertyDescriptor(){return{enumerable:true,configurable:true}},has(t,n){return s.has(n)},set(t,n,e){a(n,e);return true}});const f=(t,n)=>{o[t].push(n);return()=>{D(o[t],n)}};const N=(n,e)=>{const s=f("set",((t,s)=>{if(t===n){e(s)}}));const o=f("reset",(()=>e(u(t)[n])));return()=>{s();o()}};const M=(...t)=>{const n=t.reduce(((t,n)=>{if(n.set){t.push(f("set",n.set))}if(n.get){t.push(f("get",n.get))}if(n.reset){t.push(f("reset",n.reset))}if(n.dispose){t.push(f("dispose",n.dispose))}return t}),[]);return()=>n.forEach((t=>t()))};const d=t=>{const n=s.get(t);o.set.forEach((e=>e(t,n,n)))};return{state:Y,get:i,set:a,on:f,onChange:N,use:M,dispose:c,reset:r,forceUpdate:d}};const D=(t,n)=>{const e=t.indexOf(n);if(e>=0){t[e]=t[t.length-1];t.length--}};const Y=(t,n)=>{const e=a(t,n);e.use(i());return e};const f={entries:null,direction:"ltr"};const{state:N,onChange:M}=Y(f);function d(t,n){const s=`${t.split(" ")[1]} ${n}`;const o=e(s,"DD MMM YYYY");if(!o.isValid()){throw new Error("Invalid Date")}return o.format("D_M_YYYY")}function E(t,n){const e=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];const[s,o]=t.split(" ");const[r,c]=n.split(" ");const i=e.indexOf(r);if(i!==-1){let t=new Date(`${c}-${i+1}-${o}`);t.setHours(0,0,0,0);return t.getTime()}else{throw new Error("Invalid Month")}}function l(t,n){const e=new Date(t);const s=new Date(n);return Math.ceil((s.getTime()-e.getTime())/(1e3*60*60*24))}function I(t){const n=t.getFullYear();const e=(t.getMonth()+1).toString().padStart(2,"0");const s=t.getDate().toString().padStart(2,"0");return`${n}-${e}-${s}`}function O(t){let n={};const e={"IN-HOUSE":{id:1,clsName:"IN_HOUSE"},CONFIRMED:{id:2,clsName:"CONFIRMED"},"PENDING-CONFIRMATION":{id:3,clsName:"PENDING_CONFIRMATION"},"SPLIT-UNIT":{id:4,clsName:"SPLIT_UNIT"},"CHECKED-IN":{id:5,clsName:"CHECKED_IN"},"CHECKED-OUT":{id:5,clsName:"CHECKED_OUT"},BLOCKED:{id:6,clsName:"BLOCKED"},"BLOCKED-WITH-DATES":{id:7,clsName:"BLOCKED_WITH_DATES"},NOTES:{id:8,clsName:"NOTES"},"OUTSTANDING-BALANCE":{id:9,clsName:"OUTSTANDING_BALANCE"},"TEMP-EVENT":{id:10,clsName:"PENDING_CONFIRMATION"}};t.forEach((t=>{n[t.id]=t;n.statusId=e}));return n}function T(t){return["003","002","004"].includes(t)}function C(t){const n=new Intl.NumberFormat(undefined,{style:"currency",currency:t,minimumFractionDigits:0,maximumFractionDigits:0});return n.format(0).replace(/[0-9]/g,"").trim()}const m=(t,n)=>n.find((n=>n.id===t));function _(t){const n=new Date;const e=t;n.setHours(n.getHours()+e,n.getMinutes(),0,0);return{BLOCKED_TILL_DATE:I(n),BLOCKED_TILL_HOUR:n.getHours().toString(),BLOCKED_TILL_MINUTE:n.getMinutes().toString()}}function p(t,n){const s=e(t,"D_M_YYYY");s.add(n,"days");return s.format("YYYY-MM-DD")}function A(t){const n=e(t,"D_M_YYYY");return n.format("YYYY-MM-DD")}function L(t){return e(t).add(2,"months").format("YYYY-MM-DD")}function w(t,n="DD MMM YYYY"){const s=e(t,n).format("ddd, DD MMM YYYY");return s}function y(t){return e(t).add(1,"days").format("YYYY-MM-DD")}function U(t){return e(t,"YYYY-MM-DD").format("DD/MM ddd")}function g(t,n){let s=[];let o=e.min(e(t).add(1,"days"),e(n));let r=e.max(e(t),e(n));while(o<r){s.push(o.format("YYYY-MM-DD"));o=o.clone().add(1,"days")}return s}export{L as a,p as b,A as c,I as d,Y as e,O as f,y as g,l as h,T as i,d as j,E as k,N as l,_ as m,g as n,C as o,U as p,w as q,m as r};
//# sourceMappingURL=p-9501b0ae.js.map