import{u as a,j as t,k as r}from"./app-DhjE0Fqk.js";import{W as m}from"./WelcomeTab-E9RwVy2Q.js";import x from"./Layout-BAlB8_VL.js";import"./character-B_L2WyuU.js";import"./index-C4JomMCi.js";import"./LinkIcon-Bdk7753w.js";import"./Footer-ZL7qsFAX.js";import"./use-is-mounted-Jrwj4a06.js";import"./transition-CoRYRpbI.js";import"./twitter-C2_HC0eX.js";import"./Navbar-CEYCIjP2.js";import"./ShoppingCartIcon-aROtudnC.js";import"./DocumentCheckIcon-CtmW2Rp1.js";import"./use-text-value-CZvw38PD.js";import"./use-inert-others-i5xYTQO9.js";import"./Modal-CdK54mN2.js";import"./Button-C5oEC9WM.js";import"./XMarkIcon-CHwd_4p0.js";const D=()=>{const{props:l}=a(),e=l.transactions;return t.jsx(x,{children:t.jsxs("div",{children:[t.jsx(m,{}),t.jsx("div",{className:"w-full px-2 py-12 sm:px-0",children:t.jsxs("div",{className:"mb-8",children:[t.jsx("h3",{className:"text-lg mb-2",children:"Transaction History :"}),t.jsxs("table",{className:"w-full shadow-md",children:[t.jsx("thead",{className:"border-b border-black font-normal",children:t.jsxs("tr",{children:[t.jsx("th",{className:"text-left py-3 px-2",children:"Date"}),t.jsx("th",{className:"text-left py-3",children:"Tnx"}),t.jsx("th",{className:"text-left py-3",children:"Type"}),t.jsx("th",{className:"text-left py-3",children:"Amount"}),t.jsx("th",{className:"text-left py-3",children:"Fees"}),t.jsx("th",{className:"text-left py-3",children:"Final Amount"}),t.jsx("th",{className:"text-left py-3",children:"Status"})]})}),t.jsxs("tbody",{className:"divide-y divide-blue-100",children:[e.map(s=>t.jsxs("tr",{children:[t.jsx("td",{className:"pt-3 pb-2 px-2 text-sm",children:r(s.created_at).format("DD MMM YYYY HH:mm:ss A")}),t.jsx("td",{className:"pt-3 pb-2 px-2 text-sm",children:s.tnx}),t.jsx("td",{className:"pt-3 pb-2 px-2 text-sm",children:s.type}),t.jsx("td",{className:"pt-3 pb-2 px-2 text-sm",children:s.amount}),t.jsx("td",{className:"pt-3 pb-2 px-2 text-sm",children:s.fee}),t.jsx("td",{className:"pt-3 pb-2 px-2 text-sm",children:s.total}),t.jsx("td",{className:"pt-3 pb-2 px-2 text-sm text-left",children:t.jsx("span",{className:`px-2 py-1 rounded ${s.status=="success"?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800"}`,children:s.status})})]})),e.length===0&&t.jsx("tr",{children:t.jsx("td",{className:"pt-3 pb-2 px-2 text-sm",children:"You don't have any transaction."})})]})]})]})})]})})};export{D as default};