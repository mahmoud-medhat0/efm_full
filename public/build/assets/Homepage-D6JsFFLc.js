import{r as i,j as c}from"./app-Dt9pCSfL.js";import l from"./AboutUs-DMBl94s1.js";import d from"./Hero-DrvYn7WU.js";import h from"./Payment-XegkTbiE.js";import b from"./Profile-BCLhpfHj.js";import x from"./Membership-BHhyalXr.js";import y from"./Faq-DOb1fQun.js";/* empty css                         */import g from"./Layout-BcB4mJ-2.js";import{b as v,s as m,u as E,a as w,m as p}from"./proxy-CWsalUtd.js";import"./logo2-B8X1GbGV.js";import"./banx-BZo8_k35.js";import"./Navbar-2q5rO9LN.js";import"./logo-D1jq1p5V.js";import"./index-C4JomMCi.js";import"./Footer-DxcwTXB_.js";import"./telegram-DHmv4z9l.js";function A(t){t.values.forEach(o=>o.stop())}function u(t,o){[...o].reverse().forEach(s=>{const e=t.getVariant(s);e&&m(t,e),t.variantChildren&&t.variantChildren.forEach(r=>{u(r,o)})})}function j(t,o){if(Array.isArray(o))return u(t,o);if(typeof o=="string")return u(t,[o]);m(t,o)}function C(){const t=new Set,o={subscribe(n){return t.add(n),()=>void t.delete(n)},start(n,s){const e=[];return t.forEach(r=>{e.push(v(r,n,{transitionOverride:s}))}),Promise.all(e)},set(n){return t.forEach(s=>{j(s,n)})},stop(){t.forEach(n=>{A(n)})},mount(){return()=>{o.stop()}}};return o}function I(){const t=E(C);return w(t.mount,[]),t}const V=I,N=()=>{const t=i.useRef(new Array(6).fill(null)),o=i.useRef(new Array(6).fill(null));i.useEffect(()=>{const s={threshold:.1},e=new IntersectionObserver(r=>{r.forEach(a=>{const f=t.current.indexOf(a.target);a.isIntersecting&&f!==-1?o.current[f].start("visible"):o.current[f].start("hidden")})},s);return t.current.forEach(r=>{r&&e.observe(r)}),()=>{t.current.forEach(r=>{r&&e.unobserve(r)})}},[]),i.useEffect(()=>{const e=window.location.href.split("#");if(e[1]){const r=document.getElementById(e[1]);r&&r.scrollIntoView({behavior:"smooth"})}},[]);const n={hidden:{opacity:0,y:50},visible:{opacity:1,y:0}};return c.jsx(g,{children:c.jsx(p.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.3},children:[d,l,b,x,h,y].map((s,e)=>{const r=V();return o.current[e]=r,i.useEffect(()=>{r.start("hidden")},[r]),c.jsx(p.div,{ref:a=>t.current[e]=a,initial:"visible",animate:r,variants:n,transition:{duration:.3},style:R.section,children:c.jsx(s,{})},e)})})})},R={progress:{position:"fixed",top:"20px",left:"20px",width:"50px",height:"50px",borderRadius:"50%",border:"2px solid #333",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",color:"#333",background:"#fff",boxShadow:"0 2px 10px rgba(0, 0, 0, 0.1)",zIndex:999},arrow:{fontSize:"1.5rem"},section:{padding:"20px"}};export{N as default};