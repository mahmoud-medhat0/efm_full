import{u as a,j as e}from"./app-Bw3hyzoD.js";import n from"./Layout-CCTVsdYZ.js";import{W as d}from"./WelcomeTab-Bcp3BkjO.js";import"./Footer-DbhNv8ru.js";import"./index-C4JomMCi.js";import"./use-is-mounted-CKg1ykqA.js";import"./transition-DQpv3uWQ.js";import"./twitter-C2_HC0eX.js";import"./Navbar-L2Qd65Y3.js";import"./character-DSGNMOII.js";import"./ShoppingCartIcon-Dm6OlYFL.js";import"./DocumentCheckIcon-CYwOf9B5.js";import"./use-text-value-u1YJa0tj.js";import"./use-inert-others-CwhAaUoP.js";import"./Modal-TV5-ZvrY.js";import"./Button-IMyx9a5g.js";import"./XMarkIcon-CnZRWy86.js";import"./LinkIcon-WnLhJxVh.js";const k=()=>{const{referrals:o,parent:t}=a().props;console.log(o);const i={parent:{name:(t==null?void 0:t.name)??"",id:(t==null?void 0:t.id)??""},children:o},r={referralTree:{display:"flex",flexDirection:"column",alignItems:"center"},parent:{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:"20px",padding:"10px",border:"6px solid #ccc",borderRadius:"5px",backgroundColor:"#f9f9f9"},circle:{backgroundColor:"#be9e88",color:"white",width:"50px",height:"50px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",marginBottom:"10px"},label:{backgroundColor:"#2d3a4a",color:"white",padding:"10px",borderRadius:"5px",textAlign:"center",fontSize:"18px",fontWeight:"bold"},children:{display:"flex",flexWrap:"nowrap",justifyContent:"flex-start",gap:"15px",position:"relative"},child:{display:"flex",flexDirection:"column",alignItems:"center",position:"relative",marginTop:"20px"},arrow:{content:'""',position:"absolute",top:"-20px",left:"50%",transform:"translateX(-50%)",width:"0",height:"0",borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderTop:"10px solid #2d3a4a"},childrenContainer:{display:"flex",flexWrap:"nowrap",justifyContent:"flex-start",gap:"15px",position:"relative",padding:"20px",border:"6px solid #ccc",borderRadius:"5px",backgroundColor:"#f9f9f9",overflowX:"auto",overflowY:"auto",maxHeight:"300px",maxWidth:"100%"}};return e.jsx(n,{children:e.jsxs("div",{className:"w-full h-auto mt-20",children:[e.jsx(d,{}),e.jsxs("div",{style:r.referralTree,children:[t&&e.jsxs(e.Fragment,{children:[e.jsx("h3",{children:"Parent"}),e.jsxs("div",{style:r.parent,children:[e.jsx("div",{style:r.circle,children:i.parent.id}),e.jsx("div",{style:r.label,children:e.jsxs("strong",{children:["Parent (",i.parent.name,")"]})})]})]}),e.jsxs("div",{className:"w-full mt-10",style:r.referralTree,children:[e.jsx("h3",{children:"Referral Tree"}),e.jsxs("div",{style:r.childrenContainer,children:[" ",i.children.map((l,s)=>e.jsxs("div",{style:r.child,children:[e.jsx("div",{style:r.arrow}),e.jsx("div",{style:r.circle,children:l.id}),e.jsxs("div",{style:r.label,children:[l.name," ",e.jsx("br",{})]})]},s))]})]})]})]})})};export{k as default};