import{r as l,R as C}from"./app-XMKrjtai.js";import{o as E,W as $,y,n as x,H as M,c as A,j as D}from"./use-is-mounted-CvYztsN3.js";import{g as S}from"./transition-C-3xXfQE.js";let j=l.createContext(void 0);function P(){return l.useContext(j)}let f=l.createContext(null);f.displayName="DescriptionContext";function b(){let e=l.useContext(f);if(e===null){let r=new Error("You used a <Description /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(r,b),r}return e}function I(){var e,r;return(r=(e=l.useContext(f))==null?void 0:e.value)!=null?r:void 0}function N(){let[e,r]=l.useState([]);return[e.length>0?e.join(" "):void 0,l.useMemo(()=>function(t){let i=E(s=>(r(n=>[...n,s]),()=>r(n=>{let u=n.slice(),o=u.indexOf(s);return o!==-1&&u.splice(o,1),u}))),a=l.useMemo(()=>({register:i,slot:t.slot,name:t.name,props:t.props,value:t.value}),[i,t.slot,t.name,t.props,t.value]);return C.createElement(f.Provider,{value:a},t.children)},[r])]}let T="p";function k(e,r){let t=l.useId(),i=P(),{id:a=`headlessui-description-${t}`,...s}=e,n=b(),u=y(r);x(()=>n.register(a),[a,n.register]);let o=i||!1,p=l.useMemo(()=>({...n.slot,disabled:o}),[n.slot,o]),d={ref:u,...n.props,id:a};return M({ourProps:d,theirProps:s,slot:p,defaultTag:T,name:n.name||"Description"})}let O=$(k),U=Object.assign(O,{}),m=new Map,c=new Map;function h(e){var r;let t=(r=c.get(e))!=null?r:0;return c.set(e,t+1),t!==0?()=>g(e):(m.set(e,{"aria-hidden":e.getAttribute("aria-hidden"),inert:e.inert}),e.setAttribute("aria-hidden","true"),e.inert=!0,()=>g(e))}function g(e){var r;let t=(r=c.get(e))!=null?r:1;if(t===1?c.delete(e):c.set(e,t-1),t!==1)return;let i=m.get(e);i&&(i["aria-hidden"]===null?e.removeAttribute("aria-hidden"):e.setAttribute("aria-hidden",i["aria-hidden"]),e.inert=i.inert,m.delete(e))}function W(e,{allowed:r,disallowed:t}={}){let i=S(e,"inert-others");x(()=>{var a,s;if(!i)return;let n=D();for(let o of(a=t==null?void 0:t())!=null?a:[])o&&n.add(h(o));let u=(s=r==null?void 0:r())!=null?s:[];for(let o of u){if(!o)continue;let p=A(o);if(!p)continue;let d=o.parentElement;for(;d&&d!==p.body;){for(let v of d.children)u.some(w=>v.contains(w))||n.add(h(v));d=d.parentElement}}return n.dispose},[i,r,t])}export{I as G,N as U,P as a,U as w,W as y};
