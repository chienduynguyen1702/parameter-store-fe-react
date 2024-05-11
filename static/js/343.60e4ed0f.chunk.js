"use strict";(self.webpackChunkclouding_frontend=self.webpackChunkclouding_frontend||[]).push([[343],{42343:(e,r,s)=>{s.r(r),s.d(r,{default:()=>_});var i=s(47313),a=s(2135),d=s(75627),t=s(62563),o=s(46123),n=s.n(o),u=s(31641),l=s(25230),c=s(59197),m=s(18477),q=s(10807),Z=s(13489),y=s(86903),h=s(46417);const _=()=>{const e=(0,l.g)(),r=(0,c.Z)().get("token"),[s,o]=(0,i.useState)(0),[_,p]=(0,i.useState)(!1),[w,P]=(0,i.useState)(!1),g=(0,d.cI)({resolver:(0,t.X)(y.zW)}),{handleSubmit:b}=g;return(0,h.jsx)("div",{className:u.Z.login,style:{minHeight:e},children:(0,h.jsxs)("div",{className:u.Z.wrapper,children:[(0,h.jsx)(q.u_,{outerClassName:"",visible:_,onClose:()=>p(!1),children:(0,h.jsxs)("div",{className:u.Z.content,children:[(0,h.jsx)(q.Ee,{className:u.Z.image,src:"images/Tick.png",srcSet:"images/Tick.png"}),(0,h.jsx)("p",{className:u.Z.title1,children:"Password Changed Successfully!"}),(0,h.jsx)("p",{className:u.Z.title2,children:"Please use your new password to log in"}),(0,h.jsx)("button",{className:u.Z.button,children:(0,h.jsx)(a.rU,{className:"button",to:"/sign-in",children:"Sign in"})})]})}),(0,h.jsx)(q.jA,{}),(0,h.jsx)("div",{className:n()("h2",u.Z.title),children:"Reset Password"}),(0,h.jsx)("div",{className:u.Z.head}),(0,h.jsx)(d.RV,{...g,children:(0,h.jsxs)("form",{onSubmit:b((async e=>{if(e.password===e.rePassword){P(!0);try{await(0,m._v)(500),await(0,Z.c0)({password:e.password},r),p(!0)}catch(s){o(1)}finally{P(!1)}}else o(1)})),className:u.Z.body,children:[(0,h.jsx)(q.LX,{name:"password",type:"password",placeholder:"Enter new Password",icon:"lock"}),(0,h.jsx)(q.LX,{name:"rePassword",type:"password",placeholder:"Re-enter new Password",icon:"lock"}),(0,h.jsx)(q.Z6,{loading:w,type:"submit",value:"Confirm",className:n()("button",u.Z.button)}),s?(0,h.jsx)("p",{className:u.Z.redLine,children:"Passwords do not match"}):(0,h.jsx)("p",{className:n()(u.Z.redLine,u.Z.hidden),children:"."}),(0,h.jsx)("div",{className:u.Z.note,children:"This site is protected by reCAPTCHA and the Google Privacy Policy."})]})})]})})}},86903:(e,r,s)=>{s.d(r,{b1:()=>a,sw:()=>t,zW:()=>d});var i=s(3463);const a=i.Ry({email:i.Z_().email("Please re-enter your email").required("Email is required"),password:i.Z_().min(6,"Password must be at least 6 characters").required("Password is required")}),d=i.Ry({password:i.Z_().min(6,"Password must be at least 6 characters").required("Password is required"),rePassword:i.Z_().min(6,"Password must be at least 6 characters").required("rePassword is required")}),t=i.Ry({email:i.Z_().email("Please enter correct email format").required("Email is required")});i.Ry({username:i.Z_().required("Username is required").min(2,"Username must be at least 2 characters long"),email:i.Z_().email("Please enter correct email format").required("Email is required"),birthday:i.hT("Birthday is required").required("Birthday is required").typeError("Birthday is required"),phone:i.Z_().required("Phone is required").matches(/^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/,"Please enter correct phone number format"),address:i.Z_().required("Address is required"),city:i.Z_().required("City is required"),country:i.Z_().required("Country is required"),userType:i.Z_().required("User type is required"),agency:i.Z_().when("userType",{is:e=>"KOC"===e,then:i.Z_().required("Agency is required")}),roles:i.IX().min(1).required().of(i.Ry().shape({id:i.Z_(),text:i.Z_()})).typeError("Role is required"),color:i.Z_(),bio:i.Z_(),newPassword:i.Z_().required("Password is required").min(6,"Password must be at least 6 characters"),confirmNewPassword:i.Z_().oneOf([i.iH("newPassword")],"Passwords do not match\t"),category:i.Z_().required("Category is required"),tier:i.Z_().required("Tier is required"),platforms:i.IX().min(1).required().of(i.Ry().shape({id:i.Z_(),text:i.Z_()})).typeError("Platforms is required")}),i.Ry().shape({username:i.Z_().required("Username is required").min(2,"Username must be at least 2 characters long"),email:i.Z_().email("Please enter correct email format").required("Email is required"),birthday:i.hT("Birthday is required").required("Birthday is required").typeError("Birthday is required"),phone:i.Z_().required("Phone is required").matches(/^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/,"Please enter correct phone number format"),address:i.Z_().required("Address is required"),city:i.Z_().required("City is required"),country:i.Z_().required("Country is required"),userType:i.Z_().required("User type is required"),agency:i.Z_().when("userType",{is:e=>"KOC"===e,then:i.Z_().nullable().required().typeError("Agency is required"),otherwise:i.Z_().nullable()}),roles:i.IX().min(1).required().of(i.Ry().shape({id:i.Z_(),text:i.Z_()})).typeError("Role is required"),color:i.Z_(),bio:i.Z_(),category:i.Z_().required("Category is required"),tier:i.Z_().required("Tier is required"),platforms:i.IX().min(1).required().of(i.Ry().shape({id:i.Z_(),text:i.Z_()})).typeError("Platforms is required")},[["newPassword","confirmNewPassword"]]),i.Ry({name:i.Z_().required("Role name is required"),description:i.Z_().required("Role description is required")}),i.Ry({name:i.Z_().required("Setting name is required"),color:i.Z_().required("Color is required")}),i.Ry({name:i.Z_().required("Setting name is required"),color:i.Z_().required("Color is required")}),i.Ry({name:i.Z_(),value:i.Z_(),description:i.Z_(),projectId:i.Rx()}),i.Ry({name:i.Z_(),description:i.Z_()})}}]);