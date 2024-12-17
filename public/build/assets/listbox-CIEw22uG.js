import{r as a,R as T,e as N}from"./app-CRzte3xH.js";import{s as ue,n as G,M as le,W as V,y as H,d as j,o as x,p as ce,H as K,$ as Se,e as he,w as ye,D as de,f as $e,u as Ie,j as we,A as Ee,h as Pe,g as $,x as Le,F as se,_ as Me}from"./use-is-mounted-CM4-4v2X.js";import{l as Te,T as Ce,j as De,p as ke}from"./form-fields-BiOU4Ey8.js";import{K as Ae,z as _e,a as Fe,I as Ne,p as Ue,s as Qe,u as Be,c as S,f as ie}from"./use-text-value-9tTb54_S.js";import{F as je,v as Ve,c as He,i as q,y as Ke,k as ze,x as Ze,n as Ge,u as qe,V as We,m as Xe,f as Ye,R as Je,b as et,a as tt,A as ot,t as nt,r as it}from"./transition-Cr4uNon6.js";import{a as rt,G as at,y as lt}from"./use-inert-others-BFqfSEku.js";function st({title:e,titleId:n,...i},o){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:o,"aria-labelledby":n},i),e?a.createElement("title",{id:n},e):null,a.createElement("path",{fillRule:"evenodd",d:"M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z",clipRule:"evenodd"}))}const Vt=a.forwardRef(st);function ut({title:e,titleId:n,...i},o){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:o,"aria-labelledby":n},i),e?a.createElement("title",{id:n},e):null,a.createElement("path",{fillRule:"evenodd",d:"M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z",clipRule:"evenodd"}))}const Ht=a.forwardRef(ut);function ct(e,n){return e!==null&&n!==null&&typeof e=="object"&&typeof n=="object"&&"id"in e&&"id"in n?e.id===n.id:e===n}function dt(e=ct){return a.useCallback((n,i)=>{if(typeof e=="string"){let o=e;return(n==null?void 0:n[o])===(i==null?void 0:i[o])}return e(n,i)},[e])}function pt(e,n){let[i,o]=a.useState(n);return!e&&i!==n&&o(n),e?i:n}function ft(e,n){let[i,o]=a.useState(e),r=ue(e);return G(()=>o(r.current),[r,o,...n]),i}var vt=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(vt||{}),bt=(e=>(e[e.Single=0]="Single",e[e.Multi=1]="Multi",e))(bt||{}),xt=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))(xt||{}),mt=(e=>(e[e.OpenListbox=0]="OpenListbox",e[e.CloseListbox=1]="CloseListbox",e[e.GoToOption=2]="GoToOption",e[e.Search=3]="Search",e[e.ClearSearch=4]="ClearSearch",e[e.RegisterOption=5]="RegisterOption",e[e.UnregisterOption=6]="UnregisterOption",e))(mt||{});function re(e,n=i=>i){let i=e.activeOptionIndex!==null?e.options[e.activeOptionIndex]:null,o=Me(n(e.options.slice()),f=>f.dataRef.current.domRef.current),r=i?o.indexOf(i):null;return r===-1&&(r=null),{options:o,activeOptionIndex:r}}let gt={1(e){return e.dataRef.current.disabled||e.listboxState===1?e:{...e,activeOptionIndex:null,listboxState:1,__demoMode:!1}},0(e){if(e.dataRef.current.disabled||e.listboxState===0)return e;let n=e.activeOptionIndex,{isSelected:i}=e.dataRef.current,o=e.options.findIndex(r=>i(r.dataRef.current.value));return o!==-1&&(n=o),{...e,listboxState:0,activeOptionIndex:n,__demoMode:!1}},2(e,n){var i,o,r,f,m;if(e.dataRef.current.disabled||e.listboxState===1)return e;let d={...e,searchQuery:"",activationTrigger:(i=n.trigger)!=null?i:1,__demoMode:!1};if(n.focus===S.Nothing)return{...d,activeOptionIndex:null};if(n.focus===S.Specific)return{...d,activeOptionIndex:e.options.findIndex(l=>l.id===n.id)};if(n.focus===S.Previous){let l=e.activeOptionIndex;if(l!==null){let t=e.options[l].dataRef.current.domRef,c=ie(n,{resolveItems:()=>e.options,resolveActiveIndex:()=>e.activeOptionIndex,resolveId:p=>p.id,resolveDisabled:p=>p.dataRef.current.disabled});if(c!==null){let p=e.options[c].dataRef.current.domRef;if(((o=t.current)==null?void 0:o.previousElementSibling)===p.current||((r=p.current)==null?void 0:r.previousElementSibling)===null)return{...d,activeOptionIndex:c}}}}else if(n.focus===S.Next){let l=e.activeOptionIndex;if(l!==null){let t=e.options[l].dataRef.current.domRef,c=ie(n,{resolveItems:()=>e.options,resolveActiveIndex:()=>e.activeOptionIndex,resolveId:p=>p.id,resolveDisabled:p=>p.dataRef.current.disabled});if(c!==null){let p=e.options[c].dataRef.current.domRef;if(((f=t.current)==null?void 0:f.nextElementSibling)===p.current||((m=p.current)==null?void 0:m.nextElementSibling)===null)return{...d,activeOptionIndex:c}}}}let u=re(e),g=ie(n,{resolveItems:()=>u.options,resolveActiveIndex:()=>u.activeOptionIndex,resolveId:l=>l.id,resolveDisabled:l=>l.dataRef.current.disabled});return{...d,...u,activeOptionIndex:g}},3:(e,n)=>{if(e.dataRef.current.disabled||e.listboxState===1)return e;let i=e.searchQuery!==""?0:1,o=e.searchQuery+n.value.toLowerCase(),r=(e.activeOptionIndex!==null?e.options.slice(e.activeOptionIndex+i).concat(e.options.slice(0,e.activeOptionIndex+i)):e.options).find(m=>{var d;return!m.dataRef.current.disabled&&((d=m.dataRef.current.textValue)==null?void 0:d.startsWith(o))}),f=r?e.options.indexOf(r):-1;return f===-1||f===e.activeOptionIndex?{...e,searchQuery:o}:{...e,searchQuery:o,activeOptionIndex:f,activationTrigger:1}},4(e){return e.dataRef.current.disabled||e.listboxState===1||e.searchQuery===""?e:{...e,searchQuery:""}},5:(e,n)=>{let i={id:n.id,dataRef:n.dataRef},o=re(e,r=>[...r,i]);return e.activeOptionIndex===null&&e.dataRef.current.isSelected(n.dataRef.current.value)&&(o.activeOptionIndex=o.options.indexOf(i)),{...e,...o}},6:(e,n)=>{let i=re(e,o=>{let r=o.findIndex(f=>f.id===n.id);return r!==-1&&o.splice(r,1),o});return{...e,...i,activationTrigger:1}}},ae=a.createContext(null);ae.displayName="ListboxActionsContext";function W(e){let n=a.useContext(ae);if(n===null){let i=new Error(`<${e} /> is missing a parent <Listbox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(i,W),i}return n}let X=a.createContext(null);X.displayName="ListboxDataContext";function z(e){let n=a.useContext(X);if(n===null){let i=new Error(`<${e} /> is missing a parent <Listbox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(i,z),i}return n}function Rt(e,n){return j(n.type,gt,e,n)}let Ot=a.Fragment;function St(e,n){var i;let o=rt(),{value:r,defaultValue:f,form:m,name:d,onChange:u,by:g,invalid:l=!1,disabled:t=o||!1,horizontal:c=!1,multiple:p=!1,__demoMode:C=!1,...D}=e;const _=c?"horizontal":"vertical";let F=H(n),P=Te(f),[h=p?[]:void 0,E]=Ce(r,u,P),[L,I]=a.useReducer(Rt,{dataRef:a.createRef(),listboxState:C?0:1,options:[],searchQuery:"",activeOptionIndex:null,activationTrigger:1,optionsVisible:!1,__demoMode:C}),A=a.useRef({static:!1,hold:!1}),v=a.useRef(null),M=a.useRef(null),U=a.useRef(new Map),R=dt(g),Q=a.useCallback(O=>j(b.mode,{1:()=>h.some(y=>R(y,O)),0:()=>R(h,O)}),[h]),b=a.useMemo(()=>({...L,value:h,disabled:t,invalid:l,mode:p?1:0,orientation:_,compare:R,isSelected:Q,optionsPropsRef:A,buttonRef:v,optionsRef:M,listRef:U}),[h,t,l,p,L,U]);G(()=>{L.dataRef.current=b},[b]);let Z=b.listboxState===0;je(Z,[b.buttonRef,b.optionsRef],(O,y)=>{var k;I({type:1}),Ee(y,Pe.Loose)||(O.preventDefault(),(k=b.buttonRef.current)==null||k.focus())});let Y=a.useMemo(()=>({open:b.listboxState===0,disabled:t,invalid:l,value:h}),[b,t,h,l]),J=x(O=>{let y=b.options.find(k=>k.id===O);y&&ne(y.dataRef.current.value)}),ee=x(()=>{if(b.activeOptionIndex!==null){let{dataRef:O,id:y}=b.options[b.activeOptionIndex];ne(O.current.value),I({type:2,focus:S.Specific,id:y})}}),te=x(()=>I({type:0})),s=x(()=>I({type:1})),w=ce(),B=x((O,y,k)=>{w.dispose(),w.microTask(()=>O===S.Specific?I({type:2,focus:S.Specific,id:y,trigger:k}):I({type:2,focus:O,trigger:k}))}),oe=x((O,y)=>(I({type:5,id:O,dataRef:y}),()=>I({type:6,id:O}))),ne=x(O=>j(b.mode,{0(){return E==null?void 0:E(O)},1(){let y=b.value.slice(),k=y.findIndex(Oe=>R(Oe,O));return k===-1?y.push(O):y.splice(k,1),E==null?void 0:E(y)}})),fe=x(O=>I({type:3,value:O})),ve=x(()=>I({type:4})),be=a.useMemo(()=>({onChange:ne,registerOption:oe,goToOption:B,closeListbox:s,openListbox:te,selectActiveOption:ee,selectOption:J,search:fe,clearSearch:ve}),[]),[xe,me]=_e({inherit:!0}),ge={ref:F},Re=a.useCallback(()=>{if(P!==void 0)return E==null?void 0:E(P)},[E,P]);return T.createElement(me,{value:xe,props:{htmlFor:(i=b.buttonRef.current)==null?void 0:i.id},slot:{open:b.listboxState===0,disabled:t}},T.createElement(Ve,null,T.createElement(ae.Provider,{value:be},T.createElement(X.Provider,{value:b},T.createElement(He,{value:j(b.listboxState,{0:q.Open,1:q.Closed})},d!=null&&h!=null&&T.createElement(De,{disabled:t,data:{[d]:h},form:m,onReset:Re}),K({ourProps:ge,theirProps:D,slot:Y,defaultTag:Ot,name:"Listbox"}))))))}let ht="button";function yt(e,n){var i;let o=z("Listbox.Button"),r=W("Listbox.Button"),f=a.useId(),m=Fe(),{id:d=m||`headlessui-listbox-button-${f}`,disabled:u=o.disabled||!1,autoFocus:g=!1,...l}=e,t=H(o.buttonRef,n,Ke()),c=ze(),p=x(R=>{switch(R.key){case $.Enter:ke(R.currentTarget);break;case $.Space:case $.ArrowDown:R.preventDefault(),N.flushSync(()=>r.openListbox()),o.value||r.goToOption(S.First);break;case $.ArrowUp:R.preventDefault(),N.flushSync(()=>r.openListbox()),o.value||r.goToOption(S.Last);break}}),C=x(R=>{switch(R.key){case $.Space:R.preventDefault();break}}),D=x(R=>{var Q;if(it(R.currentTarget))return R.preventDefault();o.listboxState===0?(N.flushSync(()=>r.closeListbox()),(Q=o.buttonRef.current)==null||Q.focus({preventScroll:!0})):(R.preventDefault(),r.openListbox())}),_=x(R=>R.preventDefault()),F=Ne([d]),P=at(),{isFocusVisible:h,focusProps:E}=Se({autoFocus:g}),{isHovered:L,hoverProps:I}=he({isDisabled:u}),{pressed:A,pressProps:v}=ye({disabled:u}),M=a.useMemo(()=>({open:o.listboxState===0,active:A||o.listboxState===0,disabled:u,invalid:o.invalid,value:o.value,hover:L,focus:h,autofocus:g}),[o.listboxState,o.value,u,L,h,A,o.invalid,g]),U=de(c(),{ref:t,id:d,type:$e(e,o.buttonRef),"aria-haspopup":"listbox","aria-controls":(i=o.optionsRef.current)==null?void 0:i.id,"aria-expanded":o.listboxState===0,"aria-labelledby":F,"aria-describedby":P,disabled:u||void 0,autoFocus:g,onKeyDown:p,onKeyUp:C,onKeyPress:_,onClick:D},E,I,v);return K({ourProps:U,theirProps:l,slot:M,defaultTag:ht,name:"Listbox.Button"})}let pe=a.createContext(!1),$t="div",It=le.RenderStrategy|le.Static;function wt(e,n){var i;let o=a.useId(),{id:r=`headlessui-listbox-options-${o}`,anchor:f,portal:m=!1,modal:d=!0,transition:u=!1,...g}=e,l=Ze(f);l&&(m=!0);let t=z("Listbox.Options"),c=W("Listbox.Options"),p=Ge(t.optionsRef),C=qe(),[D,_]=We(u,t.optionsRef,C!==null?(C&q.Open)===q.Open:t.listboxState===0);Xe(D,t.buttonRef,c.closeListbox);let F=t.__demoMode?!1:d&&t.listboxState===0;Ye(F,p);let P=t.__demoMode?!1:d&&t.listboxState===0;lt(P,{allowed:x(()=>[t.buttonRef.current,t.optionsRef.current])});let h=t.listboxState!==0,E=Ue(h,t.buttonRef)?!1:D,L=D&&t.listboxState===1,I=pt(L,t.value),A=x(s=>t.compare(I,s)),v=a.useMemo(()=>{var s;if(l==null||!((s=l==null?void 0:l.to)!=null&&s.includes("selection")))return null;let w=t.options.findIndex(B=>A(B.dataRef.current.value));return w===-1&&(w=0),w},[l,t.options]),M=(()=>{if(l==null)return;if(v===null)return{...l,inner:void 0};let s=Array.from(t.listRef.current.values());return{...l,inner:{listRef:{current:s},index:v}}})(),[U,R]=Je(M),Q=et(),b=H(t.optionsRef,n,l?U:null),Z=ce();a.useEffect(()=>{var s;let w=t.optionsRef.current;w&&t.listboxState===0&&w!==((s=Ie(w))==null?void 0:s.activeElement)&&(w==null||w.focus({preventScroll:!0}))},[t.listboxState,t.optionsRef,t.optionsRef.current]);let Y=x(s=>{var w,B;switch(Z.dispose(),s.key){case $.Space:if(t.searchQuery!=="")return s.preventDefault(),s.stopPropagation(),c.search(s.key);case $.Enter:if(s.preventDefault(),s.stopPropagation(),t.activeOptionIndex!==null){let{dataRef:oe}=t.options[t.activeOptionIndex];c.onChange(oe.current.value)}t.mode===0&&(N.flushSync(()=>c.closeListbox()),(w=t.buttonRef.current)==null||w.focus({preventScroll:!0}));break;case j(t.orientation,{vertical:$.ArrowDown,horizontal:$.ArrowRight}):return s.preventDefault(),s.stopPropagation(),c.goToOption(S.Next);case j(t.orientation,{vertical:$.ArrowUp,horizontal:$.ArrowLeft}):return s.preventDefault(),s.stopPropagation(),c.goToOption(S.Previous);case $.Home:case $.PageUp:return s.preventDefault(),s.stopPropagation(),c.goToOption(S.First);case $.End:case $.PageDown:return s.preventDefault(),s.stopPropagation(),c.goToOption(S.Last);case $.Escape:s.preventDefault(),s.stopPropagation(),N.flushSync(()=>c.closeListbox()),(B=t.buttonRef.current)==null||B.focus({preventScroll:!0});return;case $.Tab:s.preventDefault(),s.stopPropagation(),N.flushSync(()=>c.closeListbox()),Le(t.buttonRef.current,s.shiftKey?se.Previous:se.Next);break;default:s.key.length===1&&(c.search(s.key),Z.setTimeout(()=>c.clearSearch(),350));break}}),J=ft(()=>{var s;return(s=t.buttonRef.current)==null?void 0:s.id},[t.buttonRef.current]),ee=a.useMemo(()=>({open:t.listboxState===0}),[t.listboxState]),te=de(l?Q():{},{id:r,ref:b,"aria-activedescendant":t.activeOptionIndex===null||(i=t.options[t.activeOptionIndex])==null?void 0:i.id,"aria-multiselectable":t.mode===1?!0:void 0,"aria-labelledby":J,"aria-orientation":t.orientation,onKeyDown:Y,role:"listbox",tabIndex:t.listboxState===0?0:void 0,style:{...g.style,...R,"--button-width":tt(t.buttonRef,!0).width},...ot(_)});return T.createElement(nt,{enabled:m?e.static||D:!1},T.createElement(X.Provider,{value:t.mode===1?t:{...t,isSelected:A}},K({ourProps:te,theirProps:g,slot:ee,defaultTag:$t,features:It,visible:E,name:"Listbox.Options"})))}let Et="div";function Pt(e,n){let i=a.useId(),{id:o=`headlessui-listbox-option-${i}`,disabled:r=!1,value:f,...m}=e,d=a.useContext(pe)===!0,u=z("Listbox.Option"),g=W("Listbox.Option"),l=u.activeOptionIndex!==null?u.options[u.activeOptionIndex].id===o:!1,t=u.isSelected(f),c=a.useRef(null),p=Qe(c),C=ue({disabled:r,value:f,domRef:c,get textValue(){return p()}}),D=H(n,c,v=>{v?u.listRef.current.set(o,v):u.listRef.current.delete(o)});G(()=>{if(!u.__demoMode&&u.listboxState===0&&l&&u.activationTrigger!==0)return we().requestAnimationFrame(()=>{var v,M;(M=(v=c.current)==null?void 0:v.scrollIntoView)==null||M.call(v,{block:"nearest"})})},[c,l,u.__demoMode,u.listboxState,u.activationTrigger,u.activeOptionIndex]),G(()=>{if(!d)return g.registerOption(o,C)},[C,o,d]);let _=x(v=>{var M;if(r)return v.preventDefault();g.onChange(f),u.mode===0&&(N.flushSync(()=>g.closeListbox()),(M=u.buttonRef.current)==null||M.focus({preventScroll:!0}))}),F=x(()=>{if(r)return g.goToOption(S.Nothing);g.goToOption(S.Specific,o)}),P=Be(),h=x(v=>{P.update(v),!r&&(l||g.goToOption(S.Specific,o,0))}),E=x(v=>{P.wasMoved(v)&&(r||l||g.goToOption(S.Specific,o,0))}),L=x(v=>{P.wasMoved(v)&&(r||l&&g.goToOption(S.Nothing))}),I=a.useMemo(()=>({active:l,focus:l,selected:t,disabled:r,selectedOption:t&&d}),[l,t,r,d]);return!t&&d?null:K({ourProps:d?{}:{id:o,ref:D,role:"option",tabIndex:r===!0?void 0:-1,"aria-disabled":r===!0?!0:void 0,"aria-selected":t,disabled:void 0,onClick:_,onFocus:F,onPointerEnter:h,onMouseEnter:h,onPointerMove:E,onMouseMove:E,onPointerLeave:L,onMouseLeave:L},theirProps:m,slot:I,defaultTag:Et,name:"Listbox.Option"})}let Lt=a.Fragment;function Mt(e,n){let{options:i,placeholder:o,...r}=e,f={ref:H(n)},m=z("ListboxSelectedOption"),d=a.useMemo(()=>({}),[]),u=m.value===void 0||m.value===null||m.mode===1&&Array.isArray(m.value)&&m.value.length===0;return T.createElement(pe.Provider,{value:!0},K({ourProps:f,theirProps:{...r,children:T.createElement(T.Fragment,null,o&&u?o:i)},slot:d,defaultTag:Lt,name:"ListboxSelectedOption"}))}let Tt=V(St),Ct=V(yt),Dt=Ae,kt=V(wt),At=V(Pt),_t=V(Mt),Kt=Object.assign(Tt,{Button:Ct,Label:Dt,Options:kt,Option:At,SelectedOption:_t});export{Ht as F,Kt as M,Vt as a};
