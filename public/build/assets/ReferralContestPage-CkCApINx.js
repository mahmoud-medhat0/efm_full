import{u as p,r as f,j as a}from"./app-CRzte3xH.js";import j from"./Layout-M71zc1VQ.js";import h from"./Leaderboard-BA_vQs-5.js";import"./Navbar-BGvFCVw4.js";import"./logo-D1jq1p5V.js";import"./index-C4JomMCi.js";import"./Footer-NMPgbOHb.js";import"./telegram-DHmv4z9l.js";import"./logo2-B8X1GbGV.js";import"./proxy-DQ8ZBAmo.js";const y="/build/assets/refelr-DUbNQfpH.svg";function k(){const{clients:o,referralsLast24Hours:i,referralsLast7Days:n,referralsLast30Days:c,referralsTop100:d}=p().props,r={"Last 24 hours":i.map((s,e)=>({id:e+1,username:s.name,joiningDate:s.joining_date,daysCount:s.days_count,referrals:s.referral_count})).sort((s,e)=>s.referrals-e.referrals),"Last 7 Days":n.map((s,e)=>({id:e+1,username:s.name,joiningDate:s.joining_date,daysCount:s.days_count,referrals:s.referral_count})).sort((s,e)=>s.id-e.id),"Last 30 Days":c.map((s,e)=>({id:e+1,username:s.name,joiningDate:s.joining_date,daysCount:s.days_count,referrals:s.referral_count})).sort((s,e)=>s.id-e.id),"Top 100":d.map((s,e)=>({id:e+1,username:s.name,joiningDate:s.joining_date,daysCount:s.days_count,referrals:s.referral_count})).sort((s,e)=>s.id-e.id)},[t,l]=f.useState("Last 24 hours"),m=s=>{l(s)},u=r[t];return a.jsx(j,{children:a.jsxs("div",{className:"referral-page",children:[a.jsxs("h2",{className:"referral-title-referral",children:["Total subscribers ",a.jsx("span",{className:"referral-subscriber-count",children:o})]}),a.jsx("img",{src:y,alt:"Referral",className:"referral-image"}),a.jsxs("div",{className:"referral-contest",children:[a.jsx("p",{className:"referral-contest-description",children:"Get financial rewards when you encourage your friends to join EFMhub through your referral link."}),a.jsx("div",{className:"referral-time-filters",children:Object.keys(r).map(s=>a.jsx("button",{onClick:()=>m(s),className:t===s?"active-tab":"",children:s},s))}),a.jsx(h,{data:u})]})]})})}export{k as default};
