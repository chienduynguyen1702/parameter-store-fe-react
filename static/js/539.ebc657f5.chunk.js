"use strict";(self.webpackChunkclouding_frontend=self.webpackChunkclouding_frontend||[]).push([[539],{11539:(e,t,s)=>{s.r(t),s.d(t,{default:()=>b});var a=s(47313),n=s(58467),o=s(63849),l=s(48648),i=s(31616),r=s(70816),c=s.n(r),d=s(75627),m=s(10807),h=s(46417);const u=e=>{let{title:t="",method:s,handleSubmit:a,onClose:n}=e;return(0,h.jsx)(d.RV,{...s,children:(0,h.jsxs)("form",{onSubmit:s.handleSubmit(a),children:[(0,h.jsxs)(m.ck,{title:t,className:"pb-4 borderBottom",classTitle:"title-green",children:[(0,h.jsx)(m.LX,{name:"name",label:"Organization name",type:"text",defaultValue:"Tnter organization name",placeholder:"Enter organization name",tooltip:"Organization name is required"}),(0,h.jsx)(m.LX,{name:"alias_name",label:"Alias name",type:"text",defaultValue:"Enter alias name",placeholder:"Enter organization name",tooltip:"Organization name is required"}),(0,h.jsx)(m.LX,{name:"description",label:"Description",type:"text",defaultValue:"Enter description",placeholder:"Enter description"}),(0,h.jsx)(m.LX,{name:"address",label:"Address",type:"text",defaultValue:"Enter address",placeholder:"Enter address"}),(0,h.jsx)(m.LX,{name:"establishment_date",label:"Establishment date",type:"text",tooltip:"Enter establishment date with format DD-MM-YYYY"})]}),(0,h.jsxs)("div",{className:"pt-5 d-flex justify-content-end align-items-center",children:[(0,h.jsx)("div",{children:(0,h.jsx)("p",{onClick:n,className:"button-white me-2",children:"Cancel"})}),(0,h.jsx)("div",{children:(0,h.jsx)(m.Z6,{threeDotsWidth:"20",threeDotsHeight:"20",type:"submit",className:"button px-4",value:"Done",notMaxWidth:!0,loading:!1})})]})]})})};var p=s(42161),x=s(23560);const j=e=>{let{orgData:t,onClose:s,editedItemId:n}=e;const o=(0,d.cI)({}),{editOrganizationMutation:l}=(0,p.o8)(n);return(0,a.useEffect)((()=>{t.establishment_date=c()(t.establishment_date).format("DD-MM-YYYY"),o.reset(t)}),[t,o]),(0,h.jsx)(u,{title:"Edit Organization",method:o,handleSubmit:e=>{const t={data:e,org_id:n};l.mutate(t,{onSuccess:()=>{s()},onError:e=>{console.log("error",e.response.data.error),x.Am.error(e.response.data.error,{autoClose:5e3})}})},onLoading:!1,orgData:t,onClose:s})},f=()=>{const{id:e}=(0,n.UO)();console.log("org id",e);const{data:t,isLoading:s}=(0,p.o8)(),[r,d]=(0,a.useState)(void 0),[u,x]=(0,a.useState)(!1);return s?(0,h.jsx)("p",{children:"Loading..."}):t?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(m.u_,{outerClassName:"outerModal",visible:u||"undefined"!==typeof r,onClose:()=>{x(!1),d(void 0)},children:"undefined"!==typeof r&&(0,h.jsx)(j,{editedItemId:r,orgData:t,onClose:()=>d(void 0)})}),(0,h.jsxs)(m.Zb,{title:"".concat(t.name),classTitle:"title-blue",className:"mb-5",head:(0,h.jsx)(h.Fragment,{children:(0,h.jsx)("div",{className:"cursor-pointer ms-auto",onClick:()=>{x(!0),(e=>{d(e)})(t.id)},children:(0,h.jsx)(m.JO,{name:"edit",size:24})})}),children:[(0,h.jsx)(o.Z,{children:(0,h.jsx)(l.Z,{direction:"horizontal",gap:3,className:"py-2",children:(0,h.jsxs)("div",{className:"detail-item",children:[(0,h.jsx)("p",{className:"me-auto",children:"Description:"}),(0,h.jsx)("p",{className:"detail-content status-text",children:t.description})]})})}),(0,h.jsxs)(o.Z,{className:"borderBottom py-2 mb-2",children:[(0,h.jsxs)(i.Z,{xs:12,md:5,children:[(0,h.jsxs)(l.Z,{direction:"horizontal",gap:3,className:"py-2",children:[(0,h.jsx)("p",{className:"me-auto",children:"Total project:"}),(0,h.jsx)("p",{className:"status-text ",children:t.project_count})]}),(0,h.jsxs)(l.Z,{direction:"horizontal",gap:3,className:"py-2",children:[(0,h.jsx)("p",{className:"me-auto",children:"Establishment date:"}),(0,h.jsx)("p",{className:"detail-content status-text",children:c()(t.establishment_date).format("DD-MM-YYYY")})]})]}),(0,h.jsxs)(i.Z,{xs:12,md:{span:5,offset:1},children:[(0,h.jsxs)(l.Z,{direction:"horizontal",gap:3,className:"py-2",children:[(0,h.jsx)("p",{className:"me-auto",children:"Members: "}),(0,h.jsx)("p",{className:"detail-content status-text",children:t.user_count})]}),(0,h.jsxs)(l.Z,{direction:"horizontal",gap:3,className:"py-2",children:[(0,h.jsx)("p",{className:"me-auto",children:"Address:"}),(0,h.jsx)("p",{className:"detail-content status-text",children:t.address})]})]})]})]})]}):(0,h.jsx)("p",{children:"No organization data available"})};function b(){return(0,h.jsx)(f,{})}},31616:(e,t,s)=>{s.d(t,{Z:()=>c});var a=s(46123),n=s.n(a),o=s(47313),l=s(68524),i=s(46417);const r=o.forwardRef(((e,t)=>{const[{className:s,...a},{as:o="div",bsPrefix:r,spans:c}]=function(e){let{as:t,bsPrefix:s,className:a,...o}=e;s=(0,l.vE)(s,"col");const i=(0,l.pi)(),r=(0,l.zG)(),c=[],d=[];return i.forEach((e=>{const t=o[e];let a,n,l;delete o[e],"object"===typeof t&&null!=t?({span:a,offset:n,order:l}=t):a=t;const i=e!==r?"-".concat(e):"";a&&c.push(!0===a?"".concat(s).concat(i):"".concat(s).concat(i,"-").concat(a)),null!=l&&d.push("order".concat(i,"-").concat(l)),null!=n&&d.push("offset".concat(i,"-").concat(n))})),[{...o,className:n()(a,...c,...d)},{as:t,bsPrefix:s,spans:c}]}(e);return(0,i.jsx)(o,{...a,ref:t,className:n()(s,!c.length&&r)})}));r.displayName="Col";const c=r},63849:(e,t,s)=>{s.d(t,{Z:()=>c});var a=s(46123),n=s.n(a),o=s(47313),l=s(68524),i=s(46417);const r=o.forwardRef(((e,t)=>{let{bsPrefix:s,className:a,as:o="div",...r}=e;const c=(0,l.vE)(s,"row"),d=(0,l.pi)(),m=(0,l.zG)(),h="".concat(c,"-cols"),u=[];return d.forEach((e=>{const t=r[e];let s;delete r[e],null!=t&&"object"===typeof t?({cols:s}=t):s=t;const a=e!==m?"-".concat(e):"";null!=s&&u.push("".concat(h).concat(a,"-").concat(s))})),(0,i.jsx)(o,{ref:t,...r,className:n()(a,c,...u)})}));r.displayName="Row";const c=r}}]);