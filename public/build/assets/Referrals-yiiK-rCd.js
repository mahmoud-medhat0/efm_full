import{u as n,j as e}from"./app-COec9CJE.js";import d from"./Layout-MXURpFDZ.js";import{W as p}from"./WelcomeTab-Opv5w9ET.js";import"./Footer-B7rd0gqH.js";import"./index-C4JomMCi.js";import"./use-is-mounted-CCRlakar.js";import"./transition-VqfsRRSr.js";import"./floating-ui.dom-BHs9XJpa.js";import"./twitter-C2_HC0eX.js";import"./Navbar-BxgzAsJ3.js";import"./character-B_L2WyuU.js";import"./logo-D1jq1p5V.js";import"./ShoppingCartIcon-BoyvUJyB.js";import"./DocumentCheckIcon-BcKFN93d.js";import"./use-text-value-sMsgAvM-.js";import"./use-inert-others-DhRxfHYI.js";import"./Modal-Bxf_qK32.js";import"./Button-CU5kjcKN.js";import"./XMarkIcon-B4CghFnI.js";import"./LinkIcon-Cm_CqC5L.js";const _=()=>{const{referrals:l,parent:t,referral_count:a}=n().props,o={parent:{name:(t==null?void 0:t.name)??"",id:(t==null?void 0:t.id)??""},children:l},r={referralTree:{display:"flex",flexDirection:"column",alignItems:"center"},parent:{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:"20px",padding:"10px",border:"6px solid #ccc",borderRadius:"5px",backgroundColor:"#f9f9f9"},circle:{backgroundColor:"#be9e88",color:"white",width:"50px",height:"50px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",marginBottom:"10px"},label:{backgroundColor:"#2d3a4a",color:"white",padding:"10px",borderRadius:"5px",textAlign:"center",fontSize:"18px",fontWeight:"bold"},children:{display:"flex",flexWrap:"nowrap",justifyContent:"flex-start",gap:"15px",position:"relative"},child:{display:"flex",flexDirection:"column",alignItems:"center",position:"relative",marginTop:"20px"},arrow:{content:'""',position:"absolute",top:"-20px",left:"50%",transform:"translateX(-50%)",width:"0",height:"0",borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderTop:"10px solid #2d3a4a"},childrenContainer:{display:"flex",flexWrap:"nowrap",justifyContent:"flex-start",gap:"15px",position:"relative",padding:"20px",border:"6px solid #ccc",borderRadius:"5px",backgroundColor:"#f9f9f9",overflowX:"auto",overflowY:"auto",maxHeight:"300px",maxWidth:"100%"}};return e.jsx(d,{children:e.jsxs("div",{className:"w-full h-auto mt-20",children:[e.jsx(p,{}),e.jsxs("div",{style:r.referralTree,children:[t&&e.jsxs(e.Fragment,{children:[e.jsx("h3",{children:"Parent"}),e.jsxs("div",{style:r.parent,children:[e.jsx("div",{style:r.circle,children:o.parent.id}),e.jsx("div",{style:r.label,children:e.jsxs("strong",{children:["Parent (",o.parent.name,")"]})})]})]}),e.jsxs("div",{className:"w-full mt-10",style:r.referralTree,children:[e.jsxs("h3",{children:["Referral Tree (",a,")"]}),e.jsxs("div",{style:r.childrenContainer,children:[" ",o.children.map((i,s)=>e.jsxs("div",{style:r.child,children:[e.jsx("div",{style:r.arrow}),e.jsx("div",{style:r.circle,children:i.profile_image?e.jsx("img",{src:i.profile_image,alt:i.name,style:{borderRadius:"50%",width:"100%",height:"100%"}}):i.id}),e.jsxs("div",{style:r.label,children:[i.name," ",e.jsx("br",{})]})]},s))]})]})]})]})})};export{_ as default};