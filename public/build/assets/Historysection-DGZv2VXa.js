import{u as o,j as t}from"./app-COec9CJE.js";import{d as l}from"./styled-components.browser.esm-DvYKxRV4.js";import{h as s}from"./Historysection.module-wb6MBuCf.js";import{D as n}from"./DashboardLayout-YsE8L9px.js";import"./index-C4JomMCi.js";import"./character-B_L2WyuU.js";const m=()=>{const{props:i}=o(),r=i.loginAttempts;return l.div`
  @media (max-width: 768px) {
  .${s.historyTitles}{
  width:400px;
  }
  
  
  }`,t.jsxs(n,{children:[t.jsx("h2",{style:{fontSize:"1.4rem",fontWeight:"bold",color:"#808892",textAlign:"center"},children:"Orders History"}),t.jsx("div",{className:s.historyContainer,style:{maxHeight:"540px",overflowY:"auto",position:"relative"},children:t.jsxs("table",{className:s.historyTable,children:[t.jsx("thead",{children:t.jsxs("tr",{style:{position:"relative",top:0,backgroundColor:"white",zIndex:10},children:[t.jsx("th",{children:"Date"}),t.jsx("th",{className:s.historyTh,children:"Country"}),t.jsx("th",{children:"IP"}),t.jsx("th",{children:"Status"})]})}),t.jsx("tbody",{children:r.length===0?t.jsx("tr",{children:t.jsx("td",{colSpan:4,style:{textAlign:"center"},className:"text-center py-4",children:"No login attempts found"})}):r.map((e,d)=>t.jsxs("tr",{className:s.historyRow,children:[t.jsx("td",{children:e.created_at_human}),t.jsx("td",{children:e.country}),t.jsx("td",{children:e.ip_address}),t.jsx("td",{children:t.jsx("button",{className:`${s.historyBtn} ${s[e.successful?"approved":"declined"]}`,children:e.successful?"Success":"Failed"})})]},e.id))})]})})]})};export{m as default};
