import{u as l,r as d,j as e,a as i,_ as n}from"./app-DnwVPCvX.js";import{u as p}from"./upgreed-DkaPh9uY.js";import{o as u,w as m,i as g,v as h,b as x}from"./banx-BZo8_k35.js";import{D as j}from"./DashboardLayout-B4xzSw_q.js";import"./index-C4JomMCi.js";import"./character-B_L2WyuU.js";const U="/build/assets/money-check%201-CbAqWtfu.svg",y=()=>{const s=l();s.props.methods;const c=s.props.plans,[o,r]=d.useState(c[0].id);return e.jsxs(j,{children:[e.jsx("h2",{className:"UpgradeAccount-upgradeTitle",children:"Upgrade Account"}),e.jsxs("div",{className:"UpgradeAccount-upgradeContainer",children:[e.jsxs("div",{className:"UpgradeAccount-accountBalance",children:[e.jsxs("div",{className:"UpgradeAccount-balanceInfo",children:[e.jsx("span",{className:"UpgradeAccount-balanceLabel",children:"Current Balance"}),e.jsxs("span",{className:"UpgradeAccount-balanceAmount",children:[s.props.auth.client.balance," EGP"]})]}),e.jsx("img",{src:p,alt:"Balance Icon",className:"UpgradeAccount-logoUpgrade"}),e.jsxs("div",{className:"UpgradeAccount-balanceDate",children:["Date: ",new Date().toLocaleDateString()]})]}),e.jsxs("form",{className:"UpgradeAccount-upgradeForm",onSubmit:async a=>{a.preventDefault();const t=await i.post(route("client.dashboard.membership.upgrade.balance"),{_method:"POST",plan:o});t.data.success?(n.success("Membership upgraded successfully",{duration:2e3,position:"top-right"}),setTimeout(()=>{window.location.reload()},2e3)):n.error(t.data.message,{duration:5e3,position:"top-right"})},children:[e.jsx("label",{className:"UpgradeAccount-formLabel",children:"Select Payment"}),e.jsx("div",{className:"UpgradeAccount-selectContainer",children:e.jsxs("div",{className:"UpgradeAccount-selectWrapper",children:[e.jsx("img",{className:"UpgradeAccount-selectIcon",src:U,alt:"icon"}),e.jsx("select",{className:"UpgradeAccount-formInput",children:e.jsx("option",{children:"Upgrade Using Balance"})})]})}),e.jsx("label",{className:"UpgradeAccount-formLabel",children:"Plan"}),e.jsx("div",{className:"UpgradeAccount-selectContainer",children:e.jsx("select",{className:"UpgradeAccount-formInput",onChange:a=>r(a.target.value),children:c.map(a=>e.jsx("option",{value:a.id,children:a.name},a.id))})}),e.jsxs("div",{className:"UpgradeAccount-buttonsContainer",children:[e.jsx("button",{className:"UpgradeAccount-upgradeButton",children:"Upgrade"}),e.jsx("button",{className:"UpgradeAccount-cancelButton",children:"Cancel"})]})]}),e.jsxs("div",{className:"UpgradeAccount-paymentLogos",children:[e.jsx("img",{src:u,alt:"Logo 1"}),e.jsx("img",{src:m,alt:"Logo 2"}),e.jsx("img",{src:g,alt:"Logo 3"}),e.jsx("img",{src:h,alt:"Logo 3"}),e.jsx("img",{src:x,alt:"Logo 3"})]})]})]})};export{y as default};