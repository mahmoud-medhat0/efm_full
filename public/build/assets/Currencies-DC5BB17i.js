import{u,r as c,j as e}from"./app-DnwVPCvX.js";import{m as p}from"./mony-DzEy0_kf.js";import{o as C,w as g,i as v,v as y,b as N}from"./banx-BZo8_k35.js";import{D as f}from"./DashboardLayout-B4xzSw_q.js";import"./index-C4JomMCi.js";import"./character-B_L2WyuU.js";const F=()=>{const{lang:a}=u().props,{currencies:r,auth:d}=u().props,[n,b]=c.useState(r[0]),[i,x]=c.useState(0),[t,m]=c.useState(r[0].exchange_rate),l=()=>parseFloat(i*t).toFixed(2);l();const h=s=>{const o=r.find(j=>j.id===s.target.value);setSelectedCurrency(o),m(o.exchange_rate)};return e.jsx(f,{children:e.jsxs("div",{className:"Currencies-currencies-container",children:[e.jsx("h1",{className:"Currencies-title",children:"Currencies"}),e.jsxs("div",{className:"Currencies-card",children:[e.jsxs("div",{className:"Currencies-header",children:[e.jsx("div",{className:"Currencies-logo-container",children:e.jsx("span",{className:"Currencies-result",children:"Result"})}),e.jsx("div",{className:"Currencies-exchange-rate",children:e.jsx("span",{style:{color:"#DFBC8A",fontSize:"20px"},children:"Exchange Rate"})})]}),e.jsxs("div",{className:"Currencies-TOTALRESULT",children:[e.jsxs("h2",{className:"Currencies-result",children:[l()," ",n.name[a]]}),e.jsxs("h3",{className:"Currencies-money",children:["EGP ",t]})]}),e.jsxs("div",{className:"Currencies-balance",children:[e.jsx("span",{style:{fontSize:"16px"},children:"Current balance"}),e.jsxs("span",{children:[d.client.balance," EGP"]})]}),e.jsxs("div",{className:"Currencies-input-group",children:[e.jsx("label",{style:{color:"#DFBC8A"},children:"Amount"}),e.jsxs("div",{className:"Currencies-input-with-icon",children:[e.jsx("img",{src:p,alt:"Currency Icon"}),e.jsx("input",{type:"text",value:i,onChange:s=>x(s.target.value),placeholder:"0"}),e.jsx("span",{className:"Currencies-input-currency",children:n.name[a]})]})]}),e.jsxs("div",{className:"Currencies-input-group",children:[e.jsx("label",{style:{color:"#DFBC8A"},children:"Currency"}),e.jsx("div",{className:"Currencies-select-container",children:e.jsx("select",{value:n.id,onChange:h,children:r.map(s=>e.jsx("option",{value:s.id,children:s.name[a]},s.id))})})]}),e.jsxs("footer",{className:"Currencies-footer-logos",children:[e.jsx("img",{src:C,alt:"Orange"}),e.jsx("img",{src:g,alt:"WePay"}),e.jsx("img",{src:v,alt:"InstaPay"}),e.jsx("img",{src:y,alt:"Vodafone"}),e.jsx("img",{src:N,alt:"Banque Misr"})]})]})]})})};export{F as default};