import{r as t,j as s,R as i}from"./app-B3LvP6vR.js";const o=({data:n})=>{const[r,a]=t.useState(null),d=e=>{a(r===e?null:e)};return s.jsx("div",{className:"leaderboard",children:s.jsxs("table",{children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"Rank"}),s.jsx("th",{style:{width:"50%"},children:"Name"})]})}),s.jsx("tbody",{children:n.map((e,l)=>s.jsxs(i.Fragment,{children:[s.jsxs("tr",{className:`rank-row ${e.id===1?"highlight":""}`,onClick:()=>d(e.id),style:{cursor:"pointer"},children:[s.jsx("td",{children:e.id<=5&&s.jsxs("div",{className:"trophy-icon",children:["🏆 ",e.id]})}),s.jsx("td",{children:e.username})]}),r===e.id&&s.jsx("tr",{className:"details-row",children:s.jsx("td",{colSpan:"2",children:s.jsxs("div",{className:"extra-info",children:[s.jsxs("span",{children:["Joining Date: ",e.joiningDate]}),s.jsxs("span",{style:{marginLeft:"33%"},children:["Days Count: ",e.daysCount]}),s.jsxs("span",{style:{marginLeft:"28%"},children:["Referrals: ",e.referrals]})]})})})]},l))})]})})};export{o as default};
