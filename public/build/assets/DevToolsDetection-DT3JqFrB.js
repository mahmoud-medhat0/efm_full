import{r as n,_ as o,a as u}from"./app-CRzte3xH.js";import{s as w}from"./index-C4JomMCi.js";const g=()=>{const[r,l]=n.useState(window.innerHeight),[i,c]=n.useState(window.innerWidth);return n.useEffect(()=>{const s=e=>{(e.key==="F12"||e.ctrlKey&&e.shiftKey&&(e.key==="I"||e.key==="J")||e.metaKey&&e.altKey&&e.key==="I")&&(e.preventDefault(),o.error("Developer tools are disabled.",{position:"top-right",duration:5e3}),t("Developer tools are disabled."))},a=e=>{e.preventDefault(),o.error("Right-click is disabled.",{position:"top-right",duration:5e3}),t("Right-click is disabled.")},d=e=>{(window.innerHeight!==r||window.innerWidth!==i)&&(e.preventDefault(),o.error("Please do not open developer tools.",{position:"top-right",duration:5e3}),t("Please do not open developer tools.")),l(window.innerHeight),c(window.innerWidth)},p=()=>{const e=performance.now();debugger;performance.now()-e>5&&(o.error("Developer tools are open!",{position:"top-right",duration:5e3}),t("Developer tools are open!"))},t=e=>{u.post(w("client.dashboard.cli-ban"),{cause:e})};document.addEventListener("keydown",s),document.addEventListener("contextmenu",a),window.addEventListener("resize",d);const h=setInterval(p,1e3);return()=>{document.removeEventListener("keydown",s),document.removeEventListener("contextmenu",a),window.removeEventListener("resize",d),clearInterval(h)}},[r,i]),null};export{g as default};
