import{r as s,u as v,j as e,a as b,n as o,d as N}from"./app-CRzte3xH.js";import{D as f}from"./DashboardLayout-Clkfwr22.js";import{s as d}from"./index-C4JomMCi.js";import"./character-B_L2WyuU.js";const C="/build/assets/upgreed-B3Yr7gP0.svg",F=()=>{const[c,l]=s.useState(null),[i,m]=s.useState(""),[r,h]=s.useState(""),[n,u]=s.useState(""),{ticketCategories:p,lang:x}=v().props,k=t=>{const a=t.target.files[0];a&&l(URL.createObjectURL(a))},g=()=>{l(null)},j=async t=>{t.preventDefault();const a=await b.post(d("client.dashboard.create-ticket.post"),{title:i,ticket_category_id:r,description:n,image:c});a.data.success?(o.success(a.data.message),N.Inertia.visit(d("client.dashboard.tickets"))):o.error(a.data.message)};return e.jsx(f,{children:e.jsxs("div",{className:"createticket-fullWidthDiv",children:[e.jsx("h2",{className:"createticket-title",children:"Create Ticket"}),e.jsxs("div",{className:"createticket-container",children:[e.jsx("center",{children:e.jsx("img",{src:C,alt:"Logo",className:"createticket-logo"})}),e.jsxs("form",{className:"createticket-form",children:[e.jsx("label",{className:"createticket-label",children:"Ticket Title"}),e.jsx("input",{type:"text",placeholder:"Ticket Title",value:i,onChange:t=>m(t.target.value),className:"createticket-input"}),e.jsx("label",{className:"createticket-label",children:"Category"}),e.jsxs("select",{value:r,onChange:t=>h(t.target.value),className:"createticket-select",children:[e.jsx("option",{children:"Select Category"}),p.map(t=>e.jsx("option",{value:t.id,children:t.name[x]},t.id))]}),e.jsx("label",{className:"createticket-label",children:"Uploading the file"}),e.jsxs("div",{className:"createticket-fileUploadContainer",children:[e.jsx("input",{type:"file",id:"file",onChange:k,className:"createticket-fileInput"}),e.jsx("label",{htmlFor:"file",className:"createticket-fileLabel",children:"Attach The File"})]}),c&&e.jsxs("div",{className:"createticket-previewContainer",children:[e.jsx("img",{src:c,alt:"Preview",className:"createticket-previewImage"}),e.jsx("button",{onClick:g,className:"createticket-removeButton",children:"Remove"})]}),e.jsx("label",{className:"createticket-label",children:"Description"}),e.jsx("textarea",{placeholder:"Description of the problem or request",value:n,onChange:t=>u(t.target.value),className:"createticket-textarea"}),e.jsxs("div",{className:"createticket-buttonsContainer",children:[e.jsx("button",{onClick:j,className:"createticket-sendButton",children:"Send"}),e.jsx("button",{type:"button",className:"createticket-cancelButton",children:"Cancel"})]})]})]})]})})};export{F as default};
