import{r as p}from"./app-CF6AkNvG.js";import{a as _,s as O,u as k,b as x,c as F,d as T,e as R}from"./index-m12-p1-y.js";/**
 * React Router DOM v6.26.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function m(){return m=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e},m.apply(this,arguments)}function P(e,t){if(e==null)return{};var i={},r=Object.keys(e),a,s;for(s=0;s<r.length;s++)a=r[s],!(t.indexOf(a)>=0)&&(i[a]=e[a]);return i}function j(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function K(e,t){return e.button===0&&(!t||t==="_self")&&!j(e)}const V=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","unstable_viewTransition"],B="6";try{window.__reactRouterVersion=B}catch{}const N=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",W=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,I=p.forwardRef(function(t,i){let{onClick:r,relative:a,reloadDocument:s,replace:o,state:u,target:c,to:n,preventScrollReset:f,unstable_viewTransition:d}=t,w=P(t,V),{basename:S}=p.useContext(_),v,b=!1;if(typeof n=="string"&&W.test(n)&&(v=n,N))try{let l=new URL(window.location.href),h=n.startsWith("//")?new URL(l.protocol+n):new URL(n),g=O(h.pathname,S);h.origin===l.origin&&g!=null?n=g+h.search+h.hash:b=!0}catch{}let L=k(n,{relative:a}),C=z(n,{replace:o,state:u,target:c,preventScrollReset:f,relative:a,unstable_viewTransition:d});function E(l){r&&r(l),l.defaultPrevented||C(l)}return p.createElement("a",m({},w,{href:v||L,onClick:b||s?r:E,ref:i,target:c}))});var U;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(U||(U={}));var y;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(y||(y={}));function z(e,t){let{target:i,replace:r,state:a,preventScrollReset:s,relative:o,unstable_viewTransition:u}=t===void 0?{}:t,c=x(),n=F(),f=T(e,{relative:o});return p.useCallback(d=>{if(K(d,i)){d.preventDefault();let w=r!==void 0?r:R(n)===R(f);c(e,{replace:w,state:a,preventScrollReset:s,relative:o,unstable_viewTransition:u})}},[n,c,f,r,a,i,e,s,o,u])}export{I as L};