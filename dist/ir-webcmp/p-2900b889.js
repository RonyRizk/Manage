const t="ir-webcmp";let e;let n;let s;let l=false;let o=false;let c=false;let i=false;let f=null;let r=false;const u=(t,e="")=>{{return()=>{}}};const a=(t,e)=>{{return()=>{}}};const d="{visibility:hidden}.hydrated{visibility:inherit}";const p={};const h="http://www.w3.org/2000/svg";const y="http://www.w3.org/1999/xhtml";const m=t=>t!=null;const b=t=>{t=typeof t;return t==="object"||t==="function"};function $(t){var e,n,s;return(s=(n=(e=t.head)===null||e===void 0?void 0:e.querySelector('meta[name="csp-nonce"]'))===null||n===void 0?void 0:n.getAttribute("content"))!==null&&s!==void 0?s:undefined}const w=(t,e,...n)=>{let s=null;let l=null;let o=null;let c=false;let i=false;const f=[];const r=e=>{for(let n=0;n<e.length;n++){s=e[n];if(Array.isArray(s)){r(s)}else if(s!=null&&typeof s!=="boolean"){if(c=typeof t!=="function"&&!b(s)){s=String(s)}if(c&&i){f[f.length-1].t+=s}else{f.push(c?v(null,s):s)}i=c}}};r(n);if(e){if(e.key){l=e.key}if(e.name){o=e.name}{const t=e.className||e.class;if(t){e.class=typeof t!=="object"?t:Object.keys(t).filter((e=>t[e])).join(" ")}}}if(typeof t==="function"){return t(e===null?{}:e,f,k)}const u=v(t,null);u.l=e;if(f.length>0){u.o=f}{u.i=l}{u.u=o}return u};const v=(t,e)=>{const n={p:0,h:t,t:e,m:null,o:null};{n.l=null}{n.i=null}{n.u=null}return n};const g={};const S=t=>t&&t.h===g;const k={forEach:(t,e)=>t.map(j).forEach(e),map:(t,e)=>t.map(j).map(e).map(O)};const j=t=>({vattrs:t.l,vchildren:t.o,vkey:t.i,vname:t.u,vtag:t.h,vtext:t.t});const O=t=>{if(typeof t.vtag==="function"){const e=Object.assign({},t.vattrs);if(t.vkey){e.key=t.vkey}if(t.vname){e.name=t.vname}return w(t.vtag,e,...t.vchildren||[])}const e=v(t.vtag,t.vtext);e.l=t.vattrs;e.o=t.vchildren;e.i=t.vkey;e.u=t.vname;return e};const C=(t,e)=>{if(t!=null&&!b(t)){if(e&4){return t==="false"?false:t===""||!!t}if(e&2){return parseFloat(t)}if(e&1){return String(t)}return t}return t};const M=t=>xt(t).$;const P=(t,e,n)=>{const s=M(t);return{emit:t=>x(s,e,{bubbles:!!(n&4),composed:!!(n&2),cancelable:!!(n&1),detail:t})}};const x=(t,e,n)=>{const s=Dt.ce(e,n);t.dispatchEvent(s);return s};const R=new WeakMap;const T=(t,e,n)=>{let s=Ft.get(t);if(qt&&n){s=s||new CSSStyleSheet;if(typeof s==="string"){s=e}else{s.replaceSync(e)}}else{s=e}Ft.set(t,s)};const U=(t,e,n)=>{var s;const l=L(e);const o=Ft.get(l);t=t.nodeType===11?t:At;if(o){if(typeof o==="string"){t=t.head||t;let e=R.get(t);let n;if(!e){R.set(t,e=new Set)}if(!e.has(l)){{n=At.createElement("style");n.innerHTML=o;const e=(s=Dt.v)!==null&&s!==void 0?s:$(At);if(e!=null){n.setAttribute("nonce",e)}t.insertBefore(n,t.querySelector("link"))}if(e){e.add(l)}}}else if(!t.adoptedStyleSheets.includes(o)){t.adoptedStyleSheets=[...t.adoptedStyleSheets,o]}}return l};const E=t=>{const e=t.g;const n=t.$;const s=e.p;const l=u("attachStyles",e.S);const o=U(n.shadowRoot?n.shadowRoot:n.getRootNode(),e);if(s&10){n["s-sc"]=o;n.classList.add(o+"-h");if(s&2){n.classList.add(o+"-s")}}l()};const L=(t,e)=>"sc-"+t.S;const N=(t,e,n,s,l,o)=>{if(n!==s){let c=Ut(t,e);let i=e.toLowerCase();if(e==="class"){const e=t.classList;const l=W(n);const o=W(s);e.remove(...l.filter((t=>t&&!o.includes(t))));e.add(...o.filter((t=>t&&!l.includes(t))))}else if(e==="style"){{for(const e in n){if(!s||s[e]==null){if(e.includes("-")){t.style.removeProperty(e)}else{t.style[e]=""}}}}for(const e in s){if(!n||s[e]!==n[e]){if(e.includes("-")){t.style.setProperty(e,s[e])}else{t.style[e]=s[e]}}}}else if(e==="key");else if(e==="ref"){if(s){s(t)}}else if(!c&&e[0]==="o"&&e[1]==="n"){if(e[2]==="-"){e=e.slice(3)}else if(Ut(Wt,i)){e=i.slice(2)}else{e=i[2]+e.slice(3)}if(n){Dt.rel(t,e,n,false)}if(s){Dt.ael(t,e,s,false)}}else{const i=b(s);if((c||i&&s!==null)&&!l){try{if(!t.tagName.includes("-")){const l=s==null?"":s;if(e==="list"){c=false}else if(n==null||t[e]!=l){t[e]=l}}else{t[e]=s}}catch(t){}}if(s==null||s===false){if(s!==false||t.getAttribute(e)===""){{t.removeAttribute(e)}}}else if((!c||o&4||l)&&!i){s=s===true?"":s;{t.setAttribute(e,s)}}}}};const F=/\s/;const W=t=>!t?[]:t.split(F);const A=(t,e,n,s)=>{const l=e.m.nodeType===11&&e.m.host?e.m.host:e.m;const o=t&&t.l||p;const c=e.l||p;{for(s in o){if(!(s in c)){N(l,s,o[s],undefined,n,e.p)}}}for(s in c){N(l,s,o[s],c[s],n,e.p)}};const D=(t,o,f,r)=>{const u=o.o[f];let a=0;let d;let p;let b;if(!l){c=true;if(u.h==="slot"){if(e){r.classList.add(e+"-s")}u.p|=u.o?2:1}}if(u.t!==null){d=u.m=At.createTextNode(u.t)}else if(u.p&1){d=u.m=At.createTextNode("")}else{if(!i){i=u.h==="svg"}d=u.m=At.createElementNS(i?h:y,u.p&2?"slot-fb":u.h);if(i&&u.h==="foreignObject"){i=false}{A(null,u,i)}if(m(e)&&d["s-si"]!==e){d.classList.add(d["s-si"]=e)}if(u.o){for(a=0;a<u.o.length;++a){p=D(t,u,a,d);if(p){d.appendChild(p)}}}{if(u.h==="svg"){i=false}else if(d.tagName==="foreignObject"){i=true}}}{d["s-hn"]=s;if(u.p&(2|1)){d["s-sr"]=true;d["s-cr"]=n;d["s-sn"]=u.u||"";b=t&&t.o&&t.o[f];if(b&&b.h===u.h&&t.m){H(t.m,false)}}}return d};const H=(t,e)=>{Dt.p|=1;const n=t.childNodes;for(let t=n.length-1;t>=0;t--){const l=n[t];if(l["s-hn"]!==s&&l["s-ol"]){B(l).insertBefore(l,z(l));l["s-ol"].remove();l["s-ol"]=undefined;c=true}if(e){H(l,e)}}Dt.p&=~1};const q=(t,e,n,l,o,c)=>{let i=t["s-cr"]&&t["s-cr"].parentNode||t;let f;if(i.shadowRoot&&i.tagName===s){i=i.shadowRoot}for(;o<=c;++o){if(l[o]){f=D(null,n,o,t);if(f){l[o].m=f;i.insertBefore(f,z(e))}}}};const I=(t,e,n)=>{for(let s=e;s<=n;++s){const e=t[s];if(e){const t=e.m;Y(e);if(t){{o=true;if(t["s-ol"]){t["s-ol"].remove()}else{H(t,true)}}t.remove()}}}};const V=(t,e,n,s)=>{let l=0;let o=0;let c=0;let i=0;let f=e.length-1;let r=e[0];let u=e[f];let a=s.length-1;let d=s[0];let p=s[a];let h;let y;while(l<=f&&o<=a){if(r==null){r=e[++l]}else if(u==null){u=e[--f]}else if(d==null){d=s[++o]}else if(p==null){p=s[--a]}else if(_(r,d)){G(r,d);r=e[++l];d=s[++o]}else if(_(u,p)){G(u,p);u=e[--f];p=s[--a]}else if(_(r,p)){if(r.h==="slot"||p.h==="slot"){H(r.m.parentNode,false)}G(r,p);t.insertBefore(r.m,u.m.nextSibling);r=e[++l];p=s[--a]}else if(_(u,d)){if(r.h==="slot"||p.h==="slot"){H(u.m.parentNode,false)}G(u,d);t.insertBefore(u.m,r.m);u=e[--f];d=s[++o]}else{c=-1;{for(i=l;i<=f;++i){if(e[i]&&e[i].i!==null&&e[i].i===d.i){c=i;break}}}if(c>=0){y=e[c];if(y.h!==d.h){h=D(e&&e[o],n,c,t)}else{G(y,d);e[c]=undefined;h=y.m}d=s[++o]}else{h=D(e&&e[o],n,o,t);d=s[++o]}if(h){{B(r.m).insertBefore(h,z(r.m))}}}}if(l>f){q(t,s[a+1]==null?null:s[a+1].m,n,s,o,a)}else if(o>a){I(e,l,f)}};const _=(t,e)=>{if(t.h===e.h){if(t.h==="slot"){return t.u===e.u}{return t.i===e.i}}return false};const z=t=>t&&t["s-ol"]||t;const B=t=>(t["s-ol"]?t["s-ol"]:t).parentNode;const G=(t,e)=>{const n=e.m=t.m;const s=t.o;const l=e.o;const o=e.h;const c=e.t;let f;if(c===null){{i=o==="svg"?true:o==="foreignObject"?false:i}{if(o==="slot");else{A(t,e,i)}}if(s!==null&&l!==null){V(n,s,e,l)}else if(l!==null){if(t.t!==null){n.textContent=""}q(n,null,e,l,0,l.length-1)}else if(s!==null){I(s,0,s.length-1)}if(i&&o==="svg"){i=false}}else if(f=n["s-cr"]){f.parentNode.textContent=c}else if(t.t!==c){n.data=c}};const J=t=>{const e=t.childNodes;let n;let s;let l;let o;let c;let i;for(s=0,l=e.length;s<l;s++){n=e[s];if(n.nodeType===1){if(n["s-sr"]){c=n["s-sn"];n.hidden=false;for(o=0;o<l;o++){i=e[o].nodeType;if(e[o]["s-hn"]!==n["s-hn"]||c!==""){if(i===1&&c===e[o].getAttribute("slot")){n.hidden=true;break}}else{if(i===1||i===3&&e[o].textContent.trim()!==""){n.hidden=true;break}}}}J(n)}}};const K=[];const Q=t=>{let e;let n;let s;let l;let c;let i;let f=0;const r=t.childNodes;const u=r.length;for(;f<u;f++){e=r[f];if(e["s-sr"]&&(n=e["s-cr"])&&n.parentNode){s=n.parentNode.childNodes;l=e["s-sn"];for(i=s.length-1;i>=0;i--){n=s[i];if(!n["s-cn"]&&!n["s-nr"]&&n["s-hn"]!==e["s-hn"]){if(X(n,l)){c=K.find((t=>t.k===n));o=true;n["s-sn"]=n["s-sn"]||l;if(c){c.j=e}else{K.push({j:e,k:n})}if(n["s-sr"]){K.map((t=>{if(X(t.k,n["s-sn"])){c=K.find((t=>t.k===n));if(c&&!t.j){t.j=c.j}}}))}}else if(!K.some((t=>t.k===n))){K.push({k:n})}}}}if(e.nodeType===1){Q(e)}}};const X=(t,e)=>{if(t.nodeType===1){if(t.getAttribute("slot")===null&&e===""){return true}if(t.getAttribute("slot")===e){return true}return false}if(t["s-sn"]===e){return true}return e===""};const Y=t=>{{t.l&&t.l.ref&&t.l.ref(null);t.o&&t.o.map(Y)}};const Z=(t,i)=>{const f=t.$;const r=t.g;const u=t.O||v(null,null);const a=S(i)?i:w(null,null,i);s=f.tagName;if(r.C){a.l=a.l||{};r.C.map((([t,e])=>a.l[e]=f[t]))}a.h=null;a.p|=4;t.O=a;a.m=u.m=f.shadowRoot||f;{e=f["s-sc"]}{n=f["s-cr"];l=(r.p&1)!==0;o=false}G(u,a);{Dt.p|=1;if(c){Q(a.m);let t;let e;let n;let s;let l;let o;let c=0;for(;c<K.length;c++){t=K[c];e=t.k;if(!e["s-ol"]){n=At.createTextNode("");n["s-nr"]=e;e.parentNode.insertBefore(e["s-ol"]=n,e)}}for(c=0;c<K.length;c++){t=K[c];e=t.k;if(t.j){s=t.j.parentNode;l=t.j.nextSibling;n=e["s-ol"];while(n=n.previousSibling){o=n["s-nr"];if(o&&o["s-sn"]===e["s-sn"]&&s===o.parentNode){o=o.nextSibling;if(!o||!o["s-nr"]){l=o;break}}}if(!l&&s!==e.parentNode||e.nextSibling!==l){if(e!==l){if(!e["s-hn"]&&e["s-ol"]){e["s-hn"]=e["s-ol"].parentNode.nodeName}s.insertBefore(e,l)}}}else{if(e.nodeType===1){e.hidden=true}}}}if(o){J(a.m)}Dt.p&=~1;K.length=0}};const tt=(t,e)=>{if(e&&!t.M&&e["s-p"]){e["s-p"].push(new Promise((e=>t.M=e)))}};const et=(t,e)=>{{t.p|=16}if(t.p&4){t.p|=512;return}tt(t,t.P);const n=()=>nt(t,e);return Jt(n)};const nt=(t,e)=>{const n=u("scheduleUpdate",t.g.S);const s=t.R;let l;if(e){{t.p|=256;if(t.T){t.T.map((([t,e])=>at(s,t,e)));t.T=undefined}}{l=at(s,"componentWillLoad")}}n();return st(l,(()=>ot(t,s,e)))};const st=(t,e)=>lt(t)?t.then(e):e();const lt=t=>t instanceof Promise||t&&t.then&&typeof t.then==="function";const ot=async(t,e,n)=>{var s;const l=t.$;const o=u("update",t.g.S);const c=l["s-rc"];if(n){E(t)}const i=u("render",t.g.S);{ct(t,e)}if(c){c.map((t=>t()));l["s-rc"]=undefined}i();o();{const e=(s=l["s-p"])!==null&&s!==void 0?s:[];const n=()=>ft(t);if(e.length===0){n()}else{Promise.all(e).then(n);t.p|=4;e.length=0}}};const ct=(t,e,n)=>{try{f=e;e=e.render();{t.p&=~16}{t.p|=2}{{{Z(t,e)}}}}catch(e){Et(e,t.$)}f=null;return null};const it=()=>f;const ft=t=>{const e=t.g.S;const n=t.$;const s=u("postUpdate",e);const l=t.R;const o=t.P;if(!(t.p&64)){t.p|=64;{dt(n)}{at(l,"componentDidLoad")}s();{t.U(n);if(!o){ut()}}}else{{at(l,"componentDidUpdate")}s()}{t.L(n)}{if(t.M){t.M();t.M=undefined}if(t.p&512){Gt((()=>et(t,false)))}t.p&=~(4|512)}};const rt=t=>{{const e=xt(t);const n=e.$.isConnected;if(n&&(e.p&(2|16))===2){et(e,false)}return n}};const ut=e=>{{dt(At.documentElement)}Gt((()=>x(Wt,"appload",{detail:{namespace:t}})))};const at=(t,e,n)=>{if(t&&t[e]){try{return t[e](n)}catch(t){Et(t)}}return undefined};const dt=t=>t.classList.add("hydrated");const pt=(t,e)=>xt(t).N.get(e);const ht=(t,e,n,s)=>{const l=xt(t);const o=l.$;const c=l.N.get(e);const i=l.p;const f=l.R;n=C(n,s.F[e][0]);const r=Number.isNaN(c)&&Number.isNaN(n);const u=n!==c&&!r;if((!(i&8)||c===undefined)&&u){l.N.set(e,n);if(f){if(s.W&&i&128){const t=s.W[e];if(t){t.map((t=>{try{f[t](n,c,e)}catch(t){Et(t,o)}}))}}if((i&(2|16))===2){if(f.componentShouldUpdate){if(f.componentShouldUpdate(n,c,e)===false){return}}et(l,false)}}}};const yt=(t,e,n)=>{if(e.F){if(t.watchers){e.W=t.watchers}const s=Object.entries(e.F);const l=t.prototype;s.map((([t,[s]])=>{if(s&31||n&2&&s&32){Object.defineProperty(l,t,{get(){return pt(this,t)},set(n){ht(this,t,n,e)},configurable:true,enumerable:true})}else if(n&1&&s&64){Object.defineProperty(l,t,{value(...e){const n=xt(this);return n.A.then((()=>n.R[t](...e)))}})}}));if(n&1){const n=new Map;l.attributeChangedCallback=function(t,e,s){Dt.jmp((()=>{const e=n.get(t);if(this.hasOwnProperty(e)){s=this[e];delete this[e]}else if(l.hasOwnProperty(e)&&typeof this[e]==="number"&&this[e]==s){return}this[e]=s===null&&typeof this[e]==="boolean"?false:s}))};t.observedAttributes=s.filter((([t,e])=>e[0]&15)).map((([t,s])=>{const l=s[1]||t;n.set(l,t);if(s[0]&512){e.C.push([t,l])}return l}))}}return t};const mt=async(t,e,n,s,l)=>{if((e.p&32)===0){e.p|=32;{l=Nt(n);if(l.then){const t=a();l=await l;t()}if(!l.isProxied){{n.W=l.watchers}yt(l,n,2);l.isProxied=true}const t=u("createInstance",n.S);{e.p|=8}try{new l(e)}catch(t){Et(t)}{e.p&=~8}{e.p|=128}t();bt(e.R)}if(l.style){let t=l.style;const e=L(n);if(!Ft.has(e)){const s=u("registerStyles",n.S);T(e,t,!!(n.p&1));s()}}}const o=e.P;const c=()=>et(e,true);if(o&&o["s-rc"]){o["s-rc"].push(c)}else{c()}};const bt=t=>{{at(t,"connectedCallback")}};const $t=t=>{if((Dt.p&1)===0){const e=xt(t);const n=e.g;const s=u("connectedCallback",n.S);if(!(e.p&1)){e.p|=1;{if(n.p&(4|8)){wt(t)}}{let n=t;while(n=n.parentNode||n.host){if(n["s-p"]){tt(e,e.P=n);break}}}if(n.F){Object.entries(n.F).map((([e,[n]])=>{if(n&31&&t.hasOwnProperty(e)){const n=t[e];delete t[e];t[e]=n}}))}{mt(t,e,n)}}else{kt(t,e,n.D);bt(e.R)}s()}};const wt=t=>{const e=t["s-cr"]=At.createComment("");e["s-cn"]=true;t.insertBefore(e,t.firstChild)};const vt=t=>{if((Dt.p&1)===0){const e=xt(t);const n=e.R;{if(e.H){e.H.map((t=>t()));e.H=undefined}}{at(n,"disconnectedCallback")}}};const gt=(t,e={})=>{var n;const s=u();const l=[];const o=e.exclude||[];const c=Wt.customElements;const i=At.head;const f=i.querySelector("meta[charset]");const r=At.createElement("style");const a=[];let p;let h=true;Object.assign(Dt,e);Dt.q=new URL(e.resourcesUrl||"./",At.baseURI).href;t.map((t=>{t[1].map((e=>{const n={p:e[0],S:e[1],F:e[2],D:e[3]};{n.F=e[2]}{n.D=e[3]}{n.C=[]}{n.W={}}const s=n.S;const i=class extends HTMLElement{constructor(t){super(t);t=this;Tt(t,n);if(n.p&1){{{t.attachShadow({mode:"open"})}}}}connectedCallback(){if(p){clearTimeout(p);p=null}if(h){a.push(this)}else{Dt.jmp((()=>$t(this)))}}disconnectedCallback(){Dt.jmp((()=>vt(this)))}componentOnReady(){return xt(this).I}};n.V=t[0];if(!o.includes(s)&&!c.get(s)){l.push(s);c.define(s,yt(i,n,1))}}))}));{r.innerHTML=l+d;r.setAttribute("data-styles","");const t=(n=Dt.v)!==null&&n!==void 0?n:$(At);if(t!=null){r.setAttribute("nonce",t)}i.insertBefore(r,f?f.nextSibling:i.firstChild)}h=false;if(a.length){a.map((t=>t.connectedCallback()))}else{{Dt.jmp((()=>p=setTimeout(ut,30)))}}s()};const St=(t,e)=>e;const kt=(t,e,n,s)=>{if(n){n.map((([n,s,l])=>{const o=Ot(t,n);const c=jt(e,l);const i=Ct(n);Dt.ael(o,s,c,i);(e.H=e.H||[]).push((()=>Dt.rel(o,s,c,i)))}))}};const jt=(t,e)=>n=>{try{{if(t.p&256){t.R[e](n)}else{(t.T=t.T||[]).push([e,n])}}}catch(t){Et(t)}};const Ot=(t,e)=>{if(e&4)return At;if(e&8)return Wt;if(e&16)return At.body;return t};const Ct=t=>(t&2)!==0;const Mt=t=>Dt.v=t;const Pt=new WeakMap;const xt=t=>Pt.get(t);const Rt=(t,e)=>Pt.set(e.R=t,e);const Tt=(t,e)=>{const n={p:0,$:t,g:e,N:new Map};{n.A=new Promise((t=>n.L=t))}{n.I=new Promise((t=>n.U=t));t["s-p"]=[];t["s-rc"]=[]}kt(t,n,e.D);return Pt.set(t,n)};const Ut=(t,e)=>e in t;const Et=(t,e)=>(0,console.error)(t,e);const Lt=new Map;const Nt=(t,e,n)=>{const s=t.S.replace(/-/g,"_");const l=t.V;const o=Lt.get(l);if(o){return o[s]}
/*!__STENCIL_STATIC_IMPORT_SWITCH__*/return import(`./${l}.entry.js${""}`).then((t=>{{Lt.set(l,t)}return t[s]}),Et)};const Ft=new Map;const Wt=typeof window!=="undefined"?window:{};const At=Wt.document||{head:{}};const Dt={p:0,q:"",jmp:t=>t(),raf:t=>requestAnimationFrame(t),ael:(t,e,n,s)=>t.addEventListener(e,n,s),rel:(t,e,n,s)=>t.removeEventListener(e,n,s),ce:(t,e)=>new CustomEvent(t,e)};const Ht=t=>Promise.resolve(t);const qt=(()=>{try{new CSSStyleSheet;return typeof(new CSSStyleSheet).replaceSync==="function"}catch(t){}return false})();const It=[];const Vt=[];const _t=(t,e)=>n=>{t.push(n);if(!r){r=true;if(e&&Dt.p&4){Gt(Bt)}else{Dt.raf(Bt)}}};const zt=t=>{for(let e=0;e<t.length;e++){try{t[e](performance.now())}catch(t){Et(t)}}t.length=0};const Bt=()=>{zt(It);{zt(Vt);if(r=It.length>0){Dt.raf(Bt)}}};const Gt=t=>Ht().then(t);const Jt=_t(Vt,true);export{St as F,g as H,M as a,gt as b,P as c,rt as f,it as g,w as h,Ht as p,Rt as r,Mt as s};
//# sourceMappingURL=p-2900b889.js.map