import{u as a,j as t,k as l}from"./app-DnwVPCvX.js";import{W as m}from"./WelcomeTab-C3p52K47.js";import i from"./Layout-C55iLGtS.js";import"./character-B_L2WyuU.js";import"./index-C4JomMCi.js";import"./LinkIcon-DNG4mUFc.js";import"./Footer-CJ7QVpaB.js";import"./use-is-mounted-2dSE6H2i.js";import"./transition-Dnw9dGD8.js";import"./floating-ui.dom-BHs9XJpa.js";import"./twitter-C2_HC0eX.js";import"./Navbar-DgARwqnY.js";import"./logo-D1jq1p5V.js";import"./ShoppingCartIcon-BAUxRgnw.js";import"./DocumentCheckIcon-D5EgzIhn.js";import"./use-text-value-BmbIRdmV.js";import"./use-inert-others-BWQhoM6k.js";import"./Modal-BTfXK1QU.js";import"./Button-B-xO-iFO.js";import"./XMarkIcon-BroYbB6F.js";const M=()=>{const{props:r}=a(),e=r.deposits;return t.jsx(i,{children:t.jsxs("div",{children:[t.jsx(m,{}),t.jsx("div",{className:"w-full px-2 py-12 sm:px-0",children:t.jsxs("div",{className:"mb-8",children:[t.jsx("h3",{className:"text-lg mb-2",children:"Deposit History :"}),t.jsxs("table",{className:"w-full shadow-md",children:[t.jsx("thead",{className:"border-b border-black font-normal",children:t.jsxs("tr",{children:[t.jsx("th",{className:"text-left py-3 px-2",children:"Date"}),t.jsx("th",{className:"text-left py-3",children:"Deposit"}),t.jsx("th",{className:"text-left py-3",children:"Price"}),t.jsx("th",{className:"text-left py-3",children:"Status"})]})}),t.jsxs("tbody",{className:"divide-y divide-blue-100",children:[e.map(s=>t.jsxs("tr",{children:[t.jsx("td",{className:"pt-3 pb-2 px-2 text-sm",children:l(s.created_at).format("DD MMM YYYY HH:mm:ss A")}),t.jsx("td",{className:"pt-3 pb-2 px-2 text-sm",children:s.amount}),t.jsx("td",{className:"pt-3 pb-2 px-2 text-sm",children:s.total}),t.jsx("td",{className:"pt-3 pb-2 px-2 text-sm text-left",children:t.jsx("span",{className:`px-2 py-1 rounded ${s.status=="success"?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800"}`,children:s.status})})]})),e.length===0&&t.jsx("tr",{children:t.jsx("td",{className:"pt-3 pb-2 px-2 text-sm",children:"You don't have any deposit."})})]})]})]})})]})})};export{M as default};