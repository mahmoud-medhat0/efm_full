import{r as p,u as m,j as e}from"./app-CRzte3xH.js";import{D as x}from"./DashboardLayout-Clkfwr22.js";import{m as u}from"./mony-DzEy0_kf.js";import{S as h}from"./react-select.esm-BoJSfVEw.js";import"./index-C4JomMCi.js";import"./character-B_L2WyuU.js";import"./emotion-react.browser.esm-lj91vLIe.js";import"./floating-ui.dom-BHs9XJpa.js";const j="/build/assets/linkorder-BqH-dy07.svg",w="/build/assets/startorder-CDAWafUl.svg",N="/build/assets/endorder-XV2Vs7vm.svg",k=()=>{const[s,t]=p.useState(null),n=m().props,l=n.app_url,a=n.services,o=a.map(r=>({value:r.id,label:e.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"12px"},children:[e.jsx("img",{src:l+`/storage/${r.icon}`,alt:"YouTube Icon",style:{width:"20px",marginRight:"8px"}}),r.name]})})),c=r=>{const d=a.find(i=>i.id===r.value);t(d)};return e.jsxs(x,{children:[e.jsx("h2",{className:"newOrderTitle",children:"New Order"}),e.jsx("div",{className:"newOrderContainer",children:e.jsxs("div",{className:"neworder-orderForm",children:[e.jsxs("div",{className:"neworder-priceSection",children:[e.jsx("span",{className:"neworder-priceLabel",children:"Price"}),e.jsx("span",{className:"neworder-priceValue",children:"$0.0"})]}),e.jsx("label",{className:"neworder-orderLabel",children:"Select a service"}),e.jsx("div",{className:"neworder-inputWrapperordrer",children:e.jsx(h,{options:o,className:"neworder-orderInput",styles:{control:r=>({...r,fontSize:"15px"})},placeholder:"Select a service",style:{fontSize:"15px"},onChange:r=>c(r)})}),e.jsx("label",{className:"neworder-orderLabel",children:"Link of order"}),e.jsxs("div",{className:"neworder-inputWrapperordrer",children:[e.jsx("span",{className:"neworder-inputIcon",children:e.jsx("img",{src:j,alt:"Clock Icon"})}),e.jsx("input",{type:"text",placeholder:"Enter The link of order",style:{fontSize:"15px"},className:"neworder-orderInput"})]}),s&&s.time_type==="custom"&&e.jsxs(e.Fragment,{children:[e.jsx("label",{className:"neworder-orderLabel",children:"Order time type"}),e.jsxs("div",{className:"neworder-timeInputs",children:[e.jsxs("div",{className:"neworder-inputWrapperordrer",children:[e.jsx("span",{className:"neworder-inputIcon",children:e.jsx("img",{src:w,alt:"Clock Icon"})}),e.jsx("input",{type:"text",placeholder:"Start Time",className:"neworder-orderInput1"})]}),e.jsxs("div",{className:"neworder-inputWrapperordrer",children:[e.jsx("span",{className:"neworder-inputIcon",children:e.jsx("img",{src:N,alt:"Clock Icon"})}),e.jsx("input",{type:"text",placeholder:"End Time",className:"neworder-orderInput"})]})]})]}),e.jsx("label",{className:"neworder-orderLabel",children:"Amount"}),e.jsxs("div",{className:"neworder-inputWrapperordrer",children:[e.jsx("span",{className:"neworder-inputIcon",children:e.jsx("img",{src:u,alt:"Clock Icon"})}),e.jsx("input",{type:"text",placeholder:"Enter The amount",className:"neworder-orderInput"})]}),e.jsxs("div",{className:"neworder-buttonsContainer",children:[e.jsx("button",{className:"neworder-upgradeButton",children:"Send Request"}),e.jsx("button",{className:"neworder-cancelButton",children:"Cancel"})]})]})})]})};export{k as default};
