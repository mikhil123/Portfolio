(this["webpackJsonppersonal-site"]=this["webpackJsonppersonal-site"]||[]).push([[0],{21:function(e,n,t){"use strict";var c=t(0),i=t(1),l=t(16),a=t(3),s=t(12),r=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_GA_TRACKING_ID:"UA-68649021-1"}),j=r.NODE_ENV,b=r.REACT_APP_GA_TRACKING_ID;"production"===j&&s.a.initialize(b);var o=function(){var e=Object(a.f)().pathname;return Object(i.useEffect)((function(){"production"===j&&(s.a.set({page:e}),s.a.pageview(e))}),[e]),null},u=t(5),h=t(22),d=[{index:!0,label:"Mikhil Wankhede'",path:"/"},{label:"Resume",path:"/resume"},{label:"Projects",path:"/projects"},{label:"Contact",path:"/contact"}],O=Object(i.lazy)((function(){return t.e(5).then(t.t.bind(null,168,7))})),x=function(){var e=Object(i.useState)(!1),n=Object(h.a)(e,2),t=n[0],l=n[1];return Object(c.jsxs)("div",{className:"hamburger-container",children:[Object(c.jsx)("nav",{className:"main",id:"hambuger-nav",children:Object(c.jsx)("ul",{children:t?Object(c.jsx)("li",{className:"menu close-menu",children:Object(c.jsx)("div",{onClick:function(){return l(!t)},className:"menu-hover",children:"\u2715"})}):Object(c.jsx)("li",{className:"menu open-menu",children:Object(c.jsx)("div",{onClick:function(){return l(!t)},className:"menu-hover",children:"\u2630"})})})}),Object(c.jsx)(i.Suspense,{fallback:Object(c.jsx)(c.Fragment,{}),children:Object(c.jsx)(O,{right:!0,isOpen:t,children:Object(c.jsx)("ul",{className:"hamburger-ul",children:d.map((function(e){return Object(c.jsx)("li",{children:Object(c.jsx)(u.b,{to:e.path,onClick:function(){return l(!t)},children:Object(c.jsx)("h3",{className:e.index&&"index-li",children:e.label})})},e.label)}))})})})]})},m=function(){return Object(c.jsxs)("header",{id:"header",children:[Object(c.jsx)("h1",{className:"index-link",children:d.filter((function(e){return e.index})).map((function(e){return Object(c.jsx)(u.b,{to:e.path,children:e.label},e.label)}))}),Object(c.jsx)("nav",{className:"links",children:Object(c.jsx)("ul",{children:d.filter((function(e){return!e.index})).map((function(e){return Object(c.jsx)("li",{children:Object(c.jsx)(u.b,{to:e.path,children:e.label})},e.label)}))})}),Object(c.jsx)(x,{})]})},p=t(25),f=function(){return Object(c.jsxs)("section",{id:"sidebar",children:[Object(c.jsxs)("section",{id:"intro",children:[Object(c.jsx)(u.b,{to:"/",className:"logo",children:Object(c.jsx)("img",{src:"".concat("","/images/me.jpg"),alt:""})}),Object(c.jsx)("header",{children:Object(c.jsx)("h2",{children:"Mikhil Wankhede"})})]}),Object(c.jsxs)("section",{className:"blurb",children:[Object(c.jsx)("h2",{children:"About"}),Object(c.jsxs)("p",{children:["Hi, I'm Mikhil. I like building things. I am a ",Object(c.jsx)("a",{href:"http://nitc.ac.in/",children:"NIT, Calicut"})," post-graduate in Information Security. I specialize in rapidly building web applications."]}),Object(c.jsx)("ul",{className:"actions",children:Object(c.jsx)("li",{children:window.location.pathname.includes("/resume")?Object(c.jsx)(u.b,{to:"/about",className:"button",children:"About Me"}):Object(c.jsx)(u.b,{to:"/resume",className:"button",children:"Learn More"})})})]}),Object(c.jsxs)("section",{id:"footer",children:[Object(c.jsx)(p.a,{}),Object(c.jsxs)("p",{className:"copyright",children:["\xa9 Mikhil Wankhede ",Object(c.jsx)(u.b,{to:"/",children:"mikhilwankhede.com"}),"."]})]})]})},k=function(){var e=Object(a.f)().pathname;return Object(i.useEffect)((function(){window.scrollTo(0,0)}),[e]),null},N=function(e){return Object(c.jsxs)(l.b,{children:[Object(c.jsx)(o,{}),Object(c.jsx)(k,{}),Object(c.jsxs)(l.a,{titleTemplate:"%s | Mikhil Wankhede",defaultTitle:"Mikhil Wankhede",defer:!1,children:[e.title&&Object(c.jsx)("title",{children:e.title}),Object(c.jsx)("meta",{name:"description",content:e.description})]}),Object(c.jsxs)("div",{id:"wrapper",children:[Object(c.jsx)(m,{}),Object(c.jsx)("div",{id:"main",children:e.children}),e.fullPage?null:Object(c.jsx)(f,{})]})]})};N.defaultProps={children:null,fullPage:!1,title:null,description:"Mikhil Wankhede' personal website."};n.a=N},25:function(e,n,t){"use strict";var c=t(0),i=(t(1),t(29)),l=t(30),a=t(31),s=t(32),r=[{link:"https://github.com/mikhil123",label:"Github",icon:l.faGithub},{link:"https://www.linkedin.com/in/mikhil-wankhede-b9398a53/",label:"LinkedIn",icon:a.faLinkedinIn},{link:"mailto:mikhilwankhede19@gmail.com",label:"Email",icon:s.faEnvelope}];n.a=function(){return Object(c.jsx)("ul",{className:"icons",children:r.map((function(e){return Object(c.jsx)("li",{children:Object(c.jsx)("a",{href:e.link,children:Object(c.jsx)(i.a,{icon:e.icon})})},e.label)}))})}},45:function(e,n,t){},46:function(e,n,t){"use strict";t.r(n);var c=t(0),i=t(1),l=t.n(i),a=t(15),s=t(5),r=t(3),j=t(21),b=(t(45),Object(i.lazy)((function(){return Promise.all([t.e(2),t.e(7)]).then(t.bind(null,165))}))),o=Object(i.lazy)((function(){return t.e(8).then(t.bind(null,172))})),u=Object(i.lazy)((function(){return t.e(9).then(t.bind(null,166))})),h=Object(i.lazy)((function(){return t.e(10).then(t.bind(null,167))})),d=Object(i.lazy)((function(){return t.e(11).then(t.bind(null,171))})),O=Object(i.lazy)((function(){return t.e(6).then(t.bind(null,169))})),x=Object(i.lazy)((function(){return Promise.all([t.e(4),t.e(12)]).then(t.bind(null,170))})),m=function(){return Object(c.jsx)(s.a,{basename:"",children:Object(c.jsx)(i.Suspense,{fallback:Object(c.jsx)(j.a,{}),children:Object(c.jsxs)(r.c,{children:[Object(c.jsx)(r.a,{exact:!0,path:"/",component:u}),Object(c.jsx)(r.a,{path:"/about",component:b}),Object(c.jsx)(r.a,{path:"/projects",component:d}),Object(c.jsx)(r.a,{path:"/stats",component:x}),Object(c.jsx)(r.a,{path:"/contact",component:o}),Object(c.jsx)(r.a,{path:"/resume",component:O}),Object(c.jsx)(r.a,{component:h,status:404})]})})})},p=function(){return Object(c.jsx)(l.a.StrictMode,{children:Object(c.jsx)(m,{})})},f=document.getElementById("root");f.hasChildNodes()?Object(a.hydrate)(Object(c.jsx)(p,{}),f):Object(a.render)(Object(c.jsx)(p,{}),f)}},[[46,1,3]]]);
//# sourceMappingURL=main.41343a26.chunk.js.map