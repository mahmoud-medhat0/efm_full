import{u as i,r as a,j as e}from"./app-CRzte3xH.js";import{D as c}from"./DashboardLayout-Clkfwr22.js";import"./index-C4JomMCi.js";import"./character-B_L2WyuU.js";const o=["All","approved","pending","canceled"],m=()=>{const{orders:r}=i().props,[t,n]=a.useState("All"),d=s=>{n(s)},l=t==="All"?r:r.filter(s=>s.status===t);return e.jsxs(c,{children:[e.jsx("center",{children:e.jsx("span",{className:"orderr-title-orders",children:"Orders"})}),e.jsx("div",{className:"orderr-buttons",children:o.map(s=>e.jsx("button",{onClick:()=>d(s),className:t===s?"orderr-active":"",style:{fontSize:"1rem"},children:s},s))}),e.jsx("div",{className:"orderr-container",children:e.jsx("div",{style:{maxHeight:"1840px",overflowY:"auto",position:"relative"},children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"ID"}),e.jsx("th",{children:"Price"}),e.jsx("th",{children:"Target Amount"}),e.jsx("th",{children:"Current Amount"}),e.jsx("th",{children:"Status"})]})}),e.jsx("tbody",{children:l.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:"5",children:"No orders available"})}):l.map(s=>e.jsxs("tr",{children:[e.jsx("td",{children:s.order_id}),e.jsxs("td",{children:["EGP",s.price]}),e.jsx("td",{children:s.target_amount}),e.jsx("td",{children:s.current_amount}),e.jsx("td",{children:e.jsx("span",{className:`orderr-status ${s.status.toLowerCase()}`,children:s.status})})]},s.id))})]})})})]})};export{m as default};
