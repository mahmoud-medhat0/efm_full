import{u as l,j as s}from"./app-DgXNYMZa.js";import{W as a}from"./WelcomeTab-iV3GGzYx.js";import i from"./Layout-CBCN1yop.js";import"./character-B_L2WyuU.js";import"./index-C4JomMCi.js";import"./LinkIcon-CD2Fd5fY.js";import"./Footer-Cgu-F_25.js";import"./use-is-mounted--4L4TJ-5.js";import"./transition-D_71pHip.js";import"./twitter-C2_HC0eX.js";import"./Navbar-CHWRe2Nx.js";import"./logo-D1jq1p5V.js";import"./ShoppingCartIcon-AyV1LdbY.js";import"./DocumentCheckIcon-BkhPwaZl.js";import"./use-text-value-BiNMJwaO.js";import"./use-inert-others-B0Vxxcvr.js";import"./Modal-CGmvU2_W.js";import"./Button-CkQoCE_F.js";import"./XMarkIcon-Bcp_2t9n.js";const H=()=>{const{props:r}=l(),t=r.orders;return s.jsx(i,{children:s.jsxs("div",{children:[s.jsx(a,{}),s.jsx("div",{className:"w-full px-2 py-12 sm:px-0",children:s.jsxs("div",{className:"mb-8",children:[s.jsx("h3",{className:"text-lg mb-2",children:"Orders History :"}),s.jsxs("table",{className:"w-full shadow-md",children:[s.jsx("thead",{className:"border-b border-black font-normal",children:s.jsxs("tr",{children:[s.jsx("th",{className:"text-left py-3 px-2",children:"Date"}),s.jsx("th",{className:"text-left py-3",children:"Service"}),s.jsx("th",{className:"text-left py-3",children:"Price"}),s.jsx("th",{className:"text-left py-3",children:"Status"})]})}),s.jsx("tbody",{className:"divide-y divide-blue-100",children:t.length===0?s.jsx("tr",{children:s.jsx("td",{colSpan:4,className:"text-center py-4",children:"No orders found"})}):t.map(e=>s.jsxs("tr",{children:[s.jsx("td",{className:"py-3 px-2",children:e.created_at}),s.jsx("td",{className:"py-3",children:e.service_name}),s.jsx("td",{className:"py-3",children:e.price}),s.jsx("td",{className:"pt-3 pb-2 px-2 text-sm text-left",children:s.jsx("span",{className:`px-2 py-1 rounded ${e.status=="success"?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800"}`,children:e.status})})]},e.id))})]})]})})]})})};export{H as default};
