import{u as a,j as s,k as l}from"./app-XT5EYP2d.js";import{W as m}from"./WelcomeTab-C-hVkiDw.js";import i from"./Layout-BOmtIH-0.js";import"./dev-BSoyqUDd.js";import"./index-C4JomMCi.js";import"./ArrowUpCircleIcon-Bc1BVW6u.js";import"./LinkIcon-BmjfRxax.js";import"./Footer-DtGjXFzd.js";import"./use-text-value-B-Zv-jm3.js";import"./use-is-mounted-heIW7ehX.js";import"./twitter-C2_HC0eX.js";import"./Navbar-DjKs6fs7.js";import"./ShoppingCartIcon-Cz0UDGjB.js";import"./StarIcon-XN0IBIAQ.js";import"./DocumentTextIcon-BgJ6AnUx.js";import"./Modal-VPWXQtnu.js";import"./Button-mKUeDsbC.js";import"./XMarkIcon-ClV7MSxM.js";const H=()=>{const{props:r}=a(),e=r.deposits;return s.jsx(i,{children:s.jsxs("div",{children:[s.jsx(m,{}),s.jsx("div",{className:"w-full px-2 py-12 sm:px-0",children:s.jsxs("div",{className:"mb-8",children:[s.jsx("h3",{className:"text-lg mb-2",children:"Deposit History :"}),s.jsxs("table",{className:"w-full shadow-md",children:[s.jsx("thead",{className:"border-b border-black font-normal",children:s.jsxs("tr",{children:[s.jsx("th",{className:"text-left py-3 px-2",children:"Date"}),s.jsx("th",{className:"text-left py-3",children:"Deposit"}),s.jsx("th",{className:"text-left py-3",children:"Price"}),s.jsx("th",{className:"text-left py-3",children:"Status"})]})}),s.jsxs("tbody",{className:"divide-y divide-blue-100",children:[e.map(t=>s.jsxs("tr",{children:[s.jsx("td",{className:"pt-3 pb-2 px-2 text-sm",children:l(t.created_at).format("DD MMM YYYY HH:mm:ss A")}),s.jsx("td",{className:"pt-3 pb-2 px-2 text-sm",children:t.amount}),s.jsx("td",{className:"pt-3 pb-2 px-2 text-sm",children:t.total}),s.jsx("td",{className:"pt-3 pb-2 px-2 text-sm text-left",children:s.jsx("span",{className:`px-2 py-1 rounded ${t.status=="success"?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800"}`,children:t.status})})]})),e.length===0&&s.jsx("tr",{children:s.jsx("td",{className:"pt-3 pb-2 px-2 text-sm",children:"You don't have any deposit."})})]})]})]})})]})})};export{H as default};
