import{M as U,W as T,y as R,T as z,o as g,u as C,H as x,I as K,$ as G,a as J,w as Q,b as X,D as V,c as Y,d as E}from"./use-is-mounted-CeE4B3wX.js";import{R as b,r as t}from"./app-CF6AkNvG.js";import{c as Z,i as k,u as _,V as ee,A as te,s as ne,r as le}from"./transition-CkJkBAUf.js";import{u as re}from"./Footer-EAFXV2fn.js";var A;let se=(A=b.startTransition)!=null?A:function(e){e()};var oe=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(oe||{}),ae=(e=>(e[e.ToggleDisclosure=0]="ToggleDisclosure",e[e.CloseDisclosure=1]="CloseDisclosure",e[e.SetButtonId=2]="SetButtonId",e[e.SetPanelId=3]="SetPanelId",e[e.LinkPanel=4]="LinkPanel",e[e.UnlinkPanel=5]="UnlinkPanel",e))(ae||{});let ue={0:e=>({...e,disclosureState:C(e.disclosureState,{0:1,1:0})}),1:e=>e.disclosureState===1?e:{...e,disclosureState:1},4(e){return e.linkedPanel===!0?e:{...e,linkedPanel:!0}},5(e){return e.linkedPanel===!1?e:{...e,linkedPanel:!1}},2(e,n){return e.buttonId===n.buttonId?e:{...e,buttonId:n.buttonId}},3(e,n){return e.panelId===n.panelId?e:{...e,panelId:n.panelId}}},h=t.createContext(null);h.displayName="DisclosureContext";function w(e){let n=t.useContext(h);if(n===null){let u=new Error(`<${e} /> is missing a parent <Disclosure /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(u,w),u}return n}let M=t.createContext(null);M.displayName="DisclosureAPIContext";function W(e){let n=t.useContext(M);if(n===null){let u=new Error(`<${e} /> is missing a parent <Disclosure /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(u,W),u}return n}let F=t.createContext(null);F.displayName="DisclosurePanelContext";function ie(){return t.useContext(F)}function ce(e,n){return C(n.type,ue,e,n)}let de=t.Fragment;function pe(e,n){let{defaultOpen:u=!1,...p}=e,s=t.useRef(null),f=R(n,z(a=>{s.current=a},e.as===void 0||e.as===t.Fragment)),c=t.useRef(null),l=t.useRef(null),r=t.useReducer(ce,{disclosureState:u?0:1,linkedPanel:!1,buttonRef:l,panelRef:c,buttonId:null,panelId:null}),[{disclosureState:m,buttonId:o},P]=r,d=g(a=>{P({type:1});let y=Y(s);if(!y||!o)return;let D=a?a instanceof HTMLElement?a:a.current instanceof HTMLElement?a.current:y.getElementById(o):y.getElementById(o);D==null||D.focus()}),I=t.useMemo(()=>({close:d}),[d]),$=t.useMemo(()=>({open:m===0,close:d}),[m,d]),S={ref:f};return b.createElement(h.Provider,{value:r},b.createElement(M.Provider,{value:I},b.createElement(re,{value:d},b.createElement(Z,{value:C(m,{0:k.Open,1:k.Closed})},x({ourProps:S,theirProps:p,slot:$,defaultTag:de,name:"Disclosure"})))))}let fe="button";function me(e,n){let u=t.useId(),{id:p=`headlessui-disclosure-button-${u}`,disabled:s=!1,autoFocus:f=!1,...c}=e,[l,r]=w("Disclosure.Button"),m=ie(),o=m===null?!1:m===l.panelId,P=t.useRef(null),d=R(P,n,o?null:l.buttonRef),I=K();t.useEffect(()=>{if(!o)return r({type:2,buttonId:p}),()=>{r({type:2,buttonId:null})}},[p,r,o]);let $=g(i=>{var v;if(o){if(l.disclosureState===1)return;switch(i.key){case E.Space:case E.Enter:i.preventDefault(),i.stopPropagation(),r({type:0}),(v=l.buttonRef.current)==null||v.focus();break}}else switch(i.key){case E.Space:case E.Enter:i.preventDefault(),i.stopPropagation(),r({type:0});break}}),S=g(i=>{switch(i.key){case E.Space:i.preventDefault();break}}),a=g(i=>{var v;le(i.currentTarget)||s||(o?(r({type:0}),(v=l.buttonRef.current)==null||v.focus()):r({type:0}))}),{isFocusVisible:y,focusProps:D}=G({autoFocus:f}),{isHovered:B,hoverProps:O}=J({isDisabled:s}),{pressed:H,pressProps:L}=Q({disabled:s}),j=t.useMemo(()=>({open:l.disclosureState===0,hover:B,active:H,disabled:s,focus:y,autofocus:f}),[l,B,H,y,s,f]),N=X(e,P),q=o?V({ref:d,type:N,disabled:s||void 0,autoFocus:f,onKeyDown:$,onClick:a},D,O,L):V({ref:d,id:p,type:N,"aria-expanded":l.disclosureState===0,"aria-controls":l.linkedPanel?l.panelId:void 0,disabled:s||void 0,autoFocus:f,onKeyDown:$,onKeyUp:S,onClick:a},D,O,L);return x({mergeRefs:I,ourProps:q,theirProps:c,slot:j,defaultTag:fe,name:"Disclosure.Button"})}let Pe="div",be=U.RenderStrategy|U.Static;function $e(e,n){let u=t.useId(),{id:p=`headlessui-disclosure-panel-${u}`,transition:s=!1,...f}=e,[c,l]=w("Disclosure.Panel"),{close:r}=W("Disclosure.Panel"),m=K(),o=R(n,c.panelRef,a=>{se(()=>l({type:a?4:5}))});t.useEffect(()=>(l({type:3,panelId:p}),()=>{l({type:3,panelId:null})}),[p,l]);let P=_(),[d,I]=ee(s,c.panelRef,P!==null?(P&k.Open)===k.Open:c.disclosureState===0),$=t.useMemo(()=>({open:c.disclosureState===0,close:r}),[c.disclosureState,r]),S={ref:o,id:p,...te(I)};return b.createElement(ne,null,b.createElement(F.Provider,{value:c.panelId},x({mergeRefs:m,ourProps:S,theirProps:f,slot:$,defaultTag:Pe,features:be,visible:d,name:"Disclosure.Panel"})))}let ye=T(pe),Ie=T(me),Se=T($e),ke=Object.assign(ye,{Button:Ie,Panel:Se});export{ke as W};