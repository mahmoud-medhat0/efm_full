import{u as i,r as d,j as s}from"./app-DwP5ZHId.js";import{D as c}from"./DashboardLayout-D1zeXqou.js";import"./index-C4JomMCi.js";const o=["All","approved","pending","canceled"],u=()=>{const{orders:r}=i().props,[t,n]=d.useState("All"),a=e=>{n(e)},l=t==="All"?r:r.filter(e=>e.status===t);return s.jsxs(c,{children:[s.jsx("span",{className:"title-orders",children:"Orders"}),s.jsx("div",{className:"buttons",children:o.map(e=>s.jsx("button",{onClick:()=>a(e),className:t===e?"active":"",style:{fontSize:"1rem"},children:e},e))}),s.jsx("div",{className:"container",children:s.jsx("div",{style:{maxHeight:"1840px",overflowY:"auto",position:"relative"},children:s.jsxs("table",{children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"ID"}),s.jsx("th",{children:"Price"}),s.jsx("th",{children:"Target Amount"}),s.jsx("th",{children:"Current Amount"}),s.jsx("th",{children:"Status"})]})}),s.jsx("tbody",{children:l.length===0?s.jsx("tr",{children:s.jsx("td",{colSpan:"5",children:"No orders available"})}):l.map(e=>s.jsxs("tr",{children:[s.jsx("td",{children:e.order_id}),s.jsxs("td",{children:["EGP",e.price]}),s.jsx("td",{children:e.target_amount}),s.jsx("td",{children:e.current_amount}),s.jsx("td",{children:s.jsx("span",{className:`status ${e.status.toLowerCase()}`,children:e.status})})]},e.id))})]})})})]})};export{u as default};
