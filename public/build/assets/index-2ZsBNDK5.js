import{r as s}from"./app-XT5EYP2d.js";/**
 * @remix-run/router v1.19.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function C(){return C=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},C.apply(this,arguments)}var S;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(S||(S={}));function f(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Z(e){let{pathname:t="/",search:a="",hash:n=""}=e;return a&&a!=="?"&&(t+=a.charAt(0)==="?"?a:"?"+a),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function U(e){let t={};if(e){let a=e.indexOf("#");a>=0&&(t.hash=e.substr(a),e=e.substr(0,a));let n=e.indexOf("?");n>=0&&(t.search=e.substr(n),e=e.substr(0,n)),e&&(t.pathname=e)}return t}var y;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(y||(y={}));function D(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let a=t.endsWith("/")?t.length-1:t.length,n=e.charAt(a);return n&&n!=="/"?null:e.slice(a)||"/"}function M(e,t){t===void 0&&(t="/");let{pathname:a,search:n="",hash:r=""}=typeof e=="string"?U(e):e;return{pathname:a?a.startsWith("/")?a:W(a,t):t,search:A(n),hash:_(r)}}function W(e,t){let a=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(r=>{r===".."?a.length>1&&a.pop():r!=="."&&a.push(r)}),a.length>1?a.join("/"):"/"}function x(e,t,a,n){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(n)+"].  Please separate it out to the ")+("`to."+a+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function B(e){return e.filter((t,a)=>a===0||t.route.path&&t.route.path.length>0)}function N(e,t){let a=B(e);return t?a.map((n,r)=>r===a.length-1?n.pathname:n.pathnameBase):a.map(n=>n.pathnameBase)}function b(e,t,a,n){n===void 0&&(n=!1);let r;typeof e=="string"?r=U(e):(r=C({},e),f(!r.pathname||!r.pathname.includes("?"),x("?","pathname","search",r)),f(!r.pathname||!r.pathname.includes("#"),x("#","pathname","hash",r)),f(!r.search||!r.search.includes("#"),x("#","search","hash",r)));let l=e===""||r.pathname==="",i=l?"/":r.pathname,o;if(i==null)o=a;else{let u=t.length-1;if(!n&&i.startsWith("..")){let m=i.split("/");for(;m[0]==="..";)m.shift(),u-=1;r.pathname=m.join("/")}o=u>=0?t[u]:"/"}let h=M(r,o),d=i&&i!=="/"&&i.endsWith("/"),c=(l||i===".")&&a.endsWith("/");return!h.pathname.endsWith("/")&&(d||c)&&(h.pathname+="/"),h}const R=e=>e.join("/").replace(/\/\/+/g,"/"),A=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,_=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,E=["post","put","patch","delete"];new Set(E);const z=["get",...E];new Set(z);/**
 * React Router v6.26.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},P.apply(this,arguments)}const j=s.createContext(null),p=s.createContext(null),L=s.createContext(null),v=s.createContext({outlet:null,matches:[],isDataRoute:!1});function k(e,t){let{relative:a}=t===void 0?{}:t;g()||f(!1);let{basename:n,navigator:r}=s.useContext(p),{hash:l,pathname:i,search:o}=G(e,{relative:a}),h=i;return n!=="/"&&(h=i==="/"?n:R([n,i])),r.createHref({pathname:h,search:o,hash:l})}function g(){return s.useContext(L)!=null}function O(){return g()||f(!1),s.useContext(L).location}function w(e){s.useContext(p).static||s.useLayoutEffect(e)}function T(){let{isDataRoute:e}=s.useContext(v);return e?X():$()}function $(){g()||f(!1);let e=s.useContext(j),{basename:t,future:a,navigator:n}=s.useContext(p),{matches:r}=s.useContext(v),{pathname:l}=O(),i=JSON.stringify(N(r,a.v7_relativeSplatPath)),o=s.useRef(!1);return w(()=>{o.current=!0}),s.useCallback(function(d,c){if(c===void 0&&(c={}),!o.current)return;if(typeof d=="number"){n.go(d);return}let u=b(d,JSON.parse(i),l,c.relative==="path");e==null&&t!=="/"&&(u.pathname=u.pathname==="/"?t:R([t,u.pathname])),(c.replace?n.replace:n.push)(u,c.state,c)},[t,n,i,l,e])}const q=s.createContext(null);function F(e){let t=s.useContext(v).outlet;return t&&s.createElement(q.Provider,{value:e},t)}function G(e,t){let{relative:a}=t===void 0?{}:t,{future:n}=s.useContext(p),{matches:r}=s.useContext(v),{pathname:l}=O(),i=JSON.stringify(N(r,n.v7_relativeSplatPath));return s.useMemo(()=>b(e,JSON.parse(i),l,a==="path"),[e,i,l,a])}var I=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(I||{}),J=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(J||{});function K(e){let t=s.useContext(j);return t||f(!1),t}function Q(e){let t=s.useContext(v);return t||f(!1),t}function V(e){let t=Q(),a=t.matches[t.matches.length-1];return a.route.id||f(!1),a.route.id}function X(){let{router:e}=K(I.UseNavigateStable),t=V(J.UseNavigateStable),a=s.useRef(!1);return w(()=>{a.current=!0}),s.useCallback(function(r,l){l===void 0&&(l={}),a.current&&(typeof r=="number"?e.navigate(r):e.navigate(r,P({fromRouteId:t},l)))},[e,t])}function H(e){let{to:t,replace:a,state:n,relative:r}=e;g()||f(!1);let{future:l,static:i}=s.useContext(p),{matches:o}=s.useContext(v),{pathname:h}=O(),d=T(),c=b(t,N(o,l.v7_relativeSplatPath),h,r==="path"),u=JSON.stringify(c);return s.useEffect(()=>d(JSON.parse(u),{replace:a,state:n,relative:r}),[d,u,r,a,n]),null}function ee(e){return F(e.context)}new Promise(()=>{});export{H as N,ee as O,p as a,k as b,O as c,G as d,Z as e,D as s,T as u};
