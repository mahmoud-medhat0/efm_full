import{u as a,j as s,k as l}from"./app-D5tAo3T1.js";import{W as m}from"./WelcomeTab-Bnt-kjJg.js";import i from"./Layout-bCqR9lEd.js";import"./character-DSGNMOII.js";import"./index-C4JomMCi.js";import"./ArrowUpCircleIcon-BKuxvaq1.js";import"./LinkIcon-BJNJOmDj.js";import"./Footer-BoKqNbxL.js";import"./use-text-value-BSobmdq0.js";import"./use-is-mounted-BC9AsRRG.js";import"./twitter-C2_HC0eX.js";import"./Navbar-QisTH05G.js";import"./ShoppingCartIcon-DDYyYOZS.js";import"./DocumentTextIcon-4vLNbiMw.js";import"./DocumentCheckIcon-PTqTWkrm.js";import"./Modal-NmMUXifU.js";import"./Button-C5FNtKkC.js";import"./XMarkIcon-BLKRS7bN.js";const H=()=>{const{props:r}=a(),e=r.deposits;return s.jsx(i,{children:s.jsxs("div",{children:[s.jsx(m,{}),s.jsx("div",{className:"w-full px-2 py-12 sm:px-0",children:s.jsxs("div",{className:"mb-8",children:[s.jsx("h3",{className:"text-lg mb-2",children:"Deposit History :"}),s.jsxs("table",{className:"w-full shadow-md",children:[s.jsx("thead",{className:"border-b border-black font-normal",children:s.jsxs("tr",{children:[s.jsx("th",{className:"text-left py-3 px-2",children:"Date"}),s.jsx("th",{className:"text-left py-3",children:"Deposit"}),s.jsx("th",{className:"text-left py-3",children:"Price"}),s.jsx("th",{className:"text-left py-3",children:"Status"})]})}),s.jsxs("tbody",{className:"divide-y divide-blue-100",children:[e.map(t=>s.jsxs("tr",{children:[s.jsx("td",{className:"pt-3 pb-2 px-2 text-sm",children:l(t.created_at).format("DD MMM YYYY HH:mm:ss A")}),s.jsx("td",{className:"pt-3 pb-2 px-2 text-sm",children:t.amount}),s.jsx("td",{className:"pt-3 pb-2 px-2 text-sm",children:t.total}),s.jsx("td",{className:"pt-3 pb-2 px-2 text-sm text-left",children:s.jsx("span",{className:`px-2 py-1 rounded ${t.status=="success"?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800"}`,children:t.status})})]})),e.length===0&&s.jsx("tr",{children:s.jsx("td",{className:"pt-3 pb-2 px-2 text-sm",children:"You don't have any deposit."})})]})]})]})})]})})};export{H as default};