"use strict";(self.webpackChunkclouding_frontend=self.webpackChunkclouding_frontend||[]).push([[966],{68966:(e,t,s)=>{s.r(t),s.d(t,{default:()=>I});var a=s(47313),l=s(58467),n=s(23560),r=s(10807),i=s(70816),o=s.n(i),c=s(46417);const d=e=>{let{item:t,setEditedItemId:s,archiveMutation:a}=e;return(0,c.jsxs)("div",{className:"tableRow",children:[(0,c.jsx)("div",{className:"tableCell py-3 ps-2 roundedLeft",children:(0,c.jsx)("p",{children:t.name})}),(0,c.jsx)("p",{className:"tableCell",children:t.value}),(0,c.jsx)("div",{className:"tableCell",children:(0,c.jsx)("p",{className:"status-default",style:{backgroundColor:t.stage.color},children:t.stage.name})}),(0,c.jsx)("div",{className:"tableCell",children:(0,c.jsx)("p",{className:"status-default",style:{backgroundColor:t.environment.color},children:t.environment.name})}),(0,c.jsx)("p",{className:"tableCell",children:o()(t.updatedAt).format("YYYY-MM-DD HH:MM:SS")}),(0,c.jsx)("p",{className:"tableCell",children:t.isApplied.toString()}),(0,c.jsx)("div",{className:"tableCell roundedRight",children:(0,c.jsx)(r.Cg,{itemId:t.id,name:"parameter",setEditedItemId:s,archiveMutation:a})})]})},m=e=>{let{listParameters:t,isSuccess:s,isLoading:a,totalPage:l,setEditedItemId:n,archiveMutation:i}=e;return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{className:"tableOuter",children:[(0,c.jsxs)("div",{className:"tableContainer",children:[(0,c.jsxs)("div",{className:"tableHead",children:[(0,c.jsx)("div",{className:"tableCell pb-4",children:"Name"}),(0,c.jsx)("div",{className:"tableCell",children:"Value"}),(0,c.jsx)("div",{className:"tableCell",children:"Stage"}),(0,c.jsx)("div",{className:"tableCell",children:"Environment"}),(0,c.jsx)("div",{className:"tableCell",children:"Updated at"}),(0,c.jsx)("div",{className:"tableCell",children:"Is Applied"}),(0,c.jsx)("div",{className:"tableCell"})]}),s&&t.map((e=>(0,c.jsx)(d,{item:e,setEditedItemId:n,archiveMutation:i},e.id)))]}),s&&0===t.length&&(0,c.jsx)(r.Jd,{})]}),(s&&0!==t.length||a)&&(0,c.jsx)(r.tl,{pageCount:l||5})]})};var h=s(75627),p=s(63849),u=s(31616);const j=e=>{let{title:t="",method:s,handleSubmit:a,onLoading:l,onClose:n,parameterInfo:i,stages:o,environments:d}=e;const m=o.map((e=>e.name));console.log("stagesName",m);const j=d.map((e=>e.name));return console.log("environmentsName",j),(0,c.jsx)(h.RV,{...s,children:(0,c.jsxs)("form",{onSubmit:s.handleSubmit(a),children:[(0,c.jsxs)(r.ck,{title:t,className:"pb-4 borderBottom",classTitle:"title-green",children:[(0,c.jsx)(r.LX,{name:"name",label:"Parameter name",type:"text",placeholder:"Enter Parameter name",tooltip:"Parameter name is required"}),(0,c.jsx)(r.LX,{name:"value",label:"Value",type:"text",placeholder:"Enter value",tooltip:"Parameter value is required"}),(0,c.jsx)(r.LX,{label:"Description",name:"description",type:"text",placeholder:"Enter description"}),(0,c.jsxs)(p.Z,{children:[(0,c.jsx)(u.Z,{sm:12,md:6,children:(0,c.jsx)(r.Jm,{name:"stage",data:m,label:"Stage",tooltip:"Stage is required"})}),(0,c.jsx)(u.Z,{sm:12,md:6,children:(0,c.jsx)(r.Jm,{name:"environment",data:j,label:"Environment",tooltip:"Environment is required"})})]})]}),(0,c.jsxs)("div",{className:"pt-5 d-flex justify-content-end align-items-center",children:[(0,c.jsx)("div",{children:(0,c.jsx)("p",{onClick:n,className:"button-white me-2",children:"Cancel"})}),(0,c.jsx)("div",{children:(0,c.jsx)(r.Z6,{threeDotsWidth:"20",threeDotsHeight:"20",type:"submit",className:"button px-4",value:"Done",notMaxWidth:!0,loading:!1})})]})]})})};var x=s(42161);const v=e=>{let{project_id:t,onClose:s,stages:a,environments:l}=e;const{addParameterMutation:n}=(0,x.Cx)(),r=(0,h.cI)({});return(0,c.jsx)(j,{title:"Add Parameter",method:r,handleSubmit:e=>{const a={data:e,project_id:t};n.mutate(a,{onSuccess:()=>{s()},onError:()=>{console.log("Add parameter error")}})},onLoading:!1,onClose:s,stages:a,environments:l})};var b=s(13489);const g=e=>{let{project_id:t,editedItemId:s,onClose:l,stages:n,environments:r}=e;const{editParameterMutation:i}=(0,x.Cx)(),o=(0,h.cI)({});return console.log("editedItemId",s),console.log("project_id",t),(0,a.useEffect)((()=>{(async()=>{try{const e=(await(0,b.vF)(t,s)).data.data.parameter;console.log("parameterData EditForm",e),o.reset(e)}catch(e){console.error("Error fetching parram data:",e)}})()}),[s,o]),(0,c.jsx)(j,{title:"Edit Parameter",method:o,handleSubmit:e=>{const a={data:e,parameter_id:s,project_id:t};i.mutate(a,{onSuccess:()=>{l()},onError:e=>{console.error("Error editing parameter:",e)}})},onLoading:!1,onClose:l,stages:n,environments:r})};var N=s(48648),C=s(97689);function f(e){let{stages:t,environments:s,versions:l,parentFc:n}=e;const{queryString:i,setQueryString:o}=(0,C.N)(),d=(0,a.useMemo)((()=>i.settings?Array.isArray(i.settings)?[...i.settings]:[i.settings]:[]),[i.settings]),m=(0,a.useMemo)((()=>{const e={};return d.forEach((t=>{e[t]=!0})),e}),[d]),p=(0,h.cI)({defaultValues:m});return(0,c.jsx)(h.RV,{...p,children:(0,c.jsxs)("form",{onSubmit:p.handleSubmit((e=>{const t={...i};t.settings&&delete t.settings;const s=Object.keys(e).filter((t=>e[t]));s.length>0&&(t.settings=s),t.page=1,o(t),n(!1)})),children:[(0,c.jsxs)("div",{className:"borderTop borderBottom py-3",children:[(0,c.jsx)(r.J$,{classLabel:"mb-2",label:"Stages",tooltip:"Search and filter by Stages"}),t.map((e=>(0,c.jsx)(r.jb,{name:e.name,content:e.name},e.id)))]}),(0,c.jsxs)("div",{className:"borderBottom py-3",children:[(0,c.jsx)(r.J$,{classLabel:"mb-2",label:"Environments",tooltip:"Search and filter by Environments"}),s.map((e=>(0,c.jsx)(r.jb,{name:e.name,content:e.name},e.id)))]}),(0,c.jsx)("div",{className:"borderBottom py-3",children:(0,c.jsx)(r.WL,{label:"Version",tooltip:"Filter by Version",name:"version",suggestions:l.map((e=>({label:e.name,value:e.name})))})}),(0,c.jsxs)(N.Z,{direction:"horizontal",className:"mt-4 justify-content-end",children:[(0,c.jsx)("p",{onClick:()=>{p.reset();const e={...i};e.settings&&delete e.settings,o(e),n(!1)},className:"button-white",children:"Reset"}),(0,c.jsx)("button",{className:"button ms-2",children:"Apply"})]})]})})}const y=e=>{let{item:t,setEditedItemId:s,archiveMutation:a}=e;return(0,c.jsxs)("div",{className:"tableRow",children:[(0,c.jsx)("div",{className:"tableCell py-3 ps-2 roundedLeft",children:(0,c.jsx)("p",{children:t.name})}),(0,c.jsx)("p",{className:"tableCell",children:t.value}),(0,c.jsx)("div",{className:"tableCell",children:(0,c.jsx)("p",{className:"status-default",style:{backgroundColor:t.stage.color},children:t.stage.name})}),(0,c.jsx)("div",{className:"tableCell",children:(0,c.jsx)("p",{className:"status-default",style:{backgroundColor:t.environment.color},children:t.environment.name})}),(0,c.jsx)("p",{className:"tableCell",children:t.updatedAt}),(0,c.jsx)("p",{className:"tableCell",children:t.isApplied.toString()})]})},S=e=>{let{listNotAppliedParameters:t,totalPage:s}=e;return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{className:"tableOuter",children:[(0,c.jsxs)("div",{className:"tableContainer",children:[(0,c.jsxs)("div",{className:"tableHead",children:[(0,c.jsx)("div",{className:"tableCell pb-4",children:"Name"}),(0,c.jsx)("div",{className:"tableCell",children:"Value"}),(0,c.jsx)("div",{className:"tableCell",children:"Stage"}),(0,c.jsx)("div",{className:"tableCell",children:"Environment"}),(0,c.jsx)("div",{className:"tableCell",children:"Updated at"}),(0,c.jsx)("div",{className:"tableCell",children:"Is Applied"})]}),t.map((e=>(0,c.jsx)(y,{item:e},e.id)))]}),0===t.length&&(0,c.jsx)(r.Jd,{})]}),0!==t.length&&(0,c.jsx)(r.tl,{pageCount:t.length})]})};const P=function(e){let{title:t="Apply Parameters",onClose:s,listParameters:a}=e;const{applyParametersMutation:n}=(0,x.jK)(),{id:i}=(0,l.UO)(),o=a.filter((e=>!1===e.isApplied)),d=(0,h.cI)({});return(0,c.jsx)(h.RV,{...d,children:(0,c.jsxs)("form",{onSubmit:d.handleSubmit((e=>{const t={data:e,project_id:i};n.mutate(t.project_id,{onSuccess:()=>{s()},onError:e=>{console.error("Error applying parameter:",e)}})})),children:[(0,c.jsxs)(r.ck,{title:t,className:"pb-4 borderBottom",classTitle:"title-green",children:[(0,c.jsx)("p",{children:"This project auto update mode is not set."}),(0,c.jsx)("p",{children:"These parameters below was updated, but was not applied by agent pull. Confirm to apply"}),(0,c.jsx)("div",{}),(0,c.jsx)("br",{}),(0,c.jsx)(S,{listNotAppliedParameters:o})]}),(0,c.jsxs)("div",{className:"pt-5 d-flex justify-content-end align-items-center",children:[(0,c.jsx)("div",{children:(0,c.jsx)("p",{onClick:s,className:"button-white me-2",children:"Cancel"})}),(0,c.jsx)("div",{children:(0,c.jsx)(r.Z6,{threeDotsWidth:"20",threeDotsHeight:"20",type:"submit",className:"button px-4",value:"Confirm",notMaxWidth:!0,loading:!1})})]})]})})},E="Parameter_filter__PwaDt",I=()=>{const{id:e}=(0,l.UO)(),[t,s]=(0,a.useState)(!1),[i,o]=(0,a.useState)(void 0),[d,h]=(0,a.useState)(!1),{listParameters:p,isLoading:u,isSuccess:j,pagination:N,versions:C}=(0,x.Cx)(e),{overview:y}=(0,x.f_)(e),{stages:S,environments:I}=(0,x.f_)(e),{archivedList:A,isSuccess:M,isLoading:_,search:L,handleSearch:k,archiveMutation:w,unarchiveMutation:D}=(0,x.Ry)({archivedParameters:{listArchivedAPI:b.sz,archiveAPI:b.YX,unarchiveAPI:b.Sm,keyArchivistList:"parameter-archivist-list",keyList:"parameters",title:"Parameter",project_id:e}});return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(r.u_,{outerClassName:"outerModal",visible:t||"undefined"!==typeof i,onClose:()=>{s(!1),o(void 0)},children:[t&&(0,c.jsx)(v,{project_id:e,onClose:()=>s(!1),stages:S,environments:I}),"undefined"!==typeof i&&(0,c.jsx)(g,{project_id:e,editedItemId:i,onClose:()=>o(void 0),stages:S,environments:I})]}),(0,c.jsx)(r.u_,{outerClassName:"outerModal",visible:d,onClose:()=>{h(!1)},children:(0,c.jsx)(P,{project_id:e,onClose:()=>h(!1),versions:C,listParameters:p})}),(0,c.jsx)("div",{className:E,children:(0,c.jsx)(r.D4,{handleClickApply:()=>{!0===y.auto_update?n.Am.warning("This project is in auto update mode. No need to apply parameters."):h(!0)},titleButton:"Apply Parameters",className:"me-2"})}),(0,c.jsx)(r.Zb,{title:"".concat(j?null===N||void 0===N?void 0:N.total:"0"," Parameters"),classTitle:"title-purple",head:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r.HK,{placeholder:"Search by name"}),(0,c.jsxs)("div",{className:"d-flex",children:[(0,c.jsx)(r.xn,{className:"me-2",children:(0,c.jsx)(f,{stages:S,environments:I,versions:C})}),(0,c.jsx)(r.i6,{handleClickAdd:()=>s(!0),titleButton:"Add Parameter",className:"me-2"}),(0,c.jsx)(r.kg,{title:"Archived Parameters",archivedList:A,isSuccess:M,isLoading:_,search:L,handleSearch:k,unarchiveMutation:D})]})]}),children:(0,c.jsx)(m,{listParameters:p,isSuccess:j,isLoading:u,totalPage:null===N||void 0===N?void 0:N.totalPage,setEditedItemId:o,archiveMutation:w})})]})}},31616:(e,t,s)=>{s.d(t,{Z:()=>c});var a=s(46123),l=s.n(a),n=s(47313),r=s(68524),i=s(46417);const o=n.forwardRef(((e,t)=>{const[{className:s,...a},{as:n="div",bsPrefix:o,spans:c}]=function(e){let{as:t,bsPrefix:s,className:a,...n}=e;s=(0,r.vE)(s,"col");const i=(0,r.pi)(),o=(0,r.zG)(),c=[],d=[];return i.forEach((e=>{const t=n[e];let a,l,r;delete n[e],"object"===typeof t&&null!=t?({span:a,offset:l,order:r}=t):a=t;const i=e!==o?"-".concat(e):"";a&&c.push(!0===a?"".concat(s).concat(i):"".concat(s).concat(i,"-").concat(a)),null!=r&&d.push("order".concat(i,"-").concat(r)),null!=l&&d.push("offset".concat(i,"-").concat(l))})),[{...n,className:l()(a,...c,...d)},{as:t,bsPrefix:s,spans:c}]}(e);return(0,i.jsx)(n,{...a,ref:t,className:l()(s,!c.length&&o)})}));o.displayName="Col";const c=o},63849:(e,t,s)=>{s.d(t,{Z:()=>c});var a=s(46123),l=s.n(a),n=s(47313),r=s(68524),i=s(46417);const o=n.forwardRef(((e,t)=>{let{bsPrefix:s,className:a,as:n="div",...o}=e;const c=(0,r.vE)(s,"row"),d=(0,r.pi)(),m=(0,r.zG)(),h="".concat(c,"-cols"),p=[];return d.forEach((e=>{const t=o[e];let s;delete o[e],null!=t&&"object"===typeof t?({cols:s}=t):s=t;const a=e!==m?"-".concat(e):"";null!=s&&p.push("".concat(h).concat(a,"-").concat(s))})),(0,i.jsx)(n,{ref:t,...o,className:l()(a,c,...p)})}));o.displayName="Row";const c=o}}]);