import{r as l,j as s,R as t}from"./app-CRzte3xH.js";const h=({data:r})=>{const[c,d]=l.useState(null),a=e=>{d(n=>n===e?null:e)};return s.jsx("div",{className:"leaderboard",children:s.jsxs("table",{children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"Rank"}),s.jsx("th",{style:{width:"50%"},children:"Name"})]})}),s.jsx("tbody",{children:r.map(e=>s.jsx(t.Fragment,{children:s.jsxs("tr",{className:`rank-row ${e.id===1?"highlight":""}`,onClick:()=>a(e.id),style:{cursor:"pointer"},children:[s.jsx("td",{children:s.jsx("div",{className:"trophy-icon",children:e.id<=5?`🏆 ${e.id}`:e.id})}),s.jsx("td",{children:e.username})]})},e.id))})]})})};export{h as default};
