(self.webpackChunkpersonal_site=self.webpackChunkpersonal_site||[]).push([[362],{7362:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>g});var s=n(5043),r=n(2582),i=n(6551),a=n(579);const u=t=>{let{label:e,link:n,value:s,format:r}=t;return(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{width:"70%",children:e}),(0,a.jsx)("td",{children:n?(0,a.jsx)("a",{href:n,children:r(s)}):r(s)})]})};u.defaultProps={format:t=>t,link:null,value:null};const o=u,l=t=>{let{data:e}=t;return(0,a.jsx)("table",{children:(0,a.jsx)("tbody",{children:e.map((t=>(0,a.jsx)(o,{format:t.format,label:t.label,link:t.link,value:t.value},t.label)))})})},h=()=>{const[t,e]=(0,s.useState)();return(0,s.useEffect)((()=>{const t=setInterval((()=>(()=>{const t=new Date("1990-02-05T09:24:00");e(((Date.now()-t)/31556925190.079998).toFixed(11))})()),25);return()=>{clearInterval(t)}}),[]),(0,a.jsx)(a.Fragment,{children:t})},c=[{key:"age",label:"Current age",value:(0,a.jsx)(h,{})},{key:"countries",label:"Countries visited",value:53,link:"https://www.google.com/maps/d/embed?mid=1iBBTscqateQ93pWFVfHCUZXoDu8&z=2"},{key:"location",label:"Current city",value:"New York, NY"}],d=()=>(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("h3",{children:"Some stats about me"}),(0,a.jsx)(l,{data:c})]});var f=n(446),$=n.n(f);const m=[{label:"Stars this repository has on github",key:"stargazers_count",link:"https://github.com/mldangelo/personal-site/stargazers"},{label:"Number of people watching this repository",key:"subscribers_count",link:"https://github.com/mldangelo/personal-site/stargazers"},{label:"Number of forks",key:"forks",link:"https://github.com/mldangelo/personal-site/network"},{label:"Number of spoons",value:"0"},{label:"Number of linter warnings",value:"0"},{label:"Open github issues",key:"open_issues_count",link:"https://github.com/mldangelo/personal-site/issues"},{label:"Last updated at",key:"pushed_at",link:"https://github.com/mldangelo/personal-site/commits",format:t=>$()(t).format("MMMM DD, YYYY")},{label:"Lines of Javascript powering this website",value:"2115",link:"https://github.com/mldangelo/personal-site/graphs/contributors"}],p=()=>{const[t,e]=(0,s.useState)(m),n=(0,s.useCallback)((async()=>{const t=await fetch(""),n=await t.json();e(m.map((t=>({...t,value:Object.keys(n).includes(t.key)?n[t.key]:t.value}))))}),[]);return(0,s.useEffect)((()=>{n()}),[n]),(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{children:"Some stats about this site"}),(0,a.jsx)(l,{data:t})]})},g=()=>(0,a.jsx)(i.A,{title:"Stats",description:"Some statistics about Mikhil Wankhede",children:(0,a.jsxs)("article",{className:"post",id:"stats",children:[(0,a.jsx)("header",{children:(0,a.jsx)("div",{className:"title",children:(0,a.jsx)("h2",{"data-testid":"heading",children:(0,a.jsx)(r.N_,{to:"/stats",children:"Stats"})})})}),(0,a.jsx)(d,{}),(0,a.jsx)(p,{})]})})},446:function(t){t.exports=function(){"use strict";var t=1e3,e=6e4,n=36e5,s="millisecond",r="second",i="minute",a="hour",u="day",o="week",l="month",h="quarter",c="year",d="date",f="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,p={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},g=function(t,e,n){var s=String(t);return!s||s.length>=e?t:""+Array(e+1-s.length).join(n)+t},v={s:g,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),s=Math.floor(n/60),r=n%60;return(e<=0?"+":"-")+g(s,2,"0")+":"+g(r,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var s=12*(n.year()-e.year())+(n.month()-e.month()),r=e.clone().add(s,l),i=n-r<0,a=e.clone().add(s+(i?-1:1),l);return+(-(s+(n-r)/(i?r-a:a-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:c,w:o,d:u,D:d,h:a,m:i,s:r,ms:s,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",b={};b[y]=p;var M=function(t){return t instanceof k},w=function t(e,n,s){var r;if(!e)return y;if("string"==typeof e){var i=e.toLowerCase();b[i]&&(r=i),n&&(b[i]=n,r=i);var a=e.split("-");if(!r&&a.length>1)return t(a[0])}else{var u=e.name;b[u]=e,r=u}return!s&&r&&(y=r),r||!s&&y},D=function(t,e){if(M(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new k(n)},S=v;S.l=w,S.i=M,S.w=function(t,e){return D(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var k=function(){function p(t){this.$L=w(t.locale,null,!0),this.parse(t)}var g=p.prototype;return g.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(S.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var s=e.match($);if(s){var r=s[2]-1||0,i=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],r,s[3]||1,s[4]||0,s[5]||0,s[6]||0,i)):new Date(s[1],r,s[3]||1,s[4]||0,s[5]||0,s[6]||0,i)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},g.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},g.$utils=function(){return S},g.isValid=function(){return!(this.$d.toString()===f)},g.isSame=function(t,e){var n=D(t);return this.startOf(e)<=n&&n<=this.endOf(e)},g.isAfter=function(t,e){return D(t)<this.startOf(e)},g.isBefore=function(t,e){return this.endOf(e)<D(t)},g.$g=function(t,e,n){return S.u(t)?this[e]:this.set(n,t)},g.unix=function(){return Math.floor(this.valueOf()/1e3)},g.valueOf=function(){return this.$d.getTime()},g.startOf=function(t,e){var n=this,s=!!S.u(e)||e,h=S.p(t),f=function(t,e){var r=S.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return s?r:r.endOf(u)},$=function(t,e){return S.w(n.toDate()[t].apply(n.toDate("s"),(s?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,p=this.$M,g=this.$D,v="set"+(this.$u?"UTC":"");switch(h){case c:return s?f(1,0):f(31,11);case l:return s?f(1,p):f(0,p+1);case o:var y=this.$locale().weekStart||0,b=(m<y?m+7:m)-y;return f(s?g-b:g+(6-b),p);case u:case d:return $(v+"Hours",0);case a:return $(v+"Minutes",1);case i:return $(v+"Seconds",2);case r:return $(v+"Milliseconds",3);default:return this.clone()}},g.endOf=function(t){return this.startOf(t,!1)},g.$set=function(t,e){var n,o=S.p(t),h="set"+(this.$u?"UTC":""),f=(n={},n[u]=h+"Date",n[d]=h+"Date",n[l]=h+"Month",n[c]=h+"FullYear",n[a]=h+"Hours",n[i]=h+"Minutes",n[r]=h+"Seconds",n[s]=h+"Milliseconds",n)[o],$=o===u?this.$D+(e-this.$W):e;if(o===l||o===c){var m=this.clone().set(d,1);m.$d[f]($),m.init(),this.$d=m.set(d,Math.min(this.$D,m.daysInMonth())).$d}else f&&this.$d[f]($);return this.init(),this},g.set=function(t,e){return this.clone().$set(t,e)},g.get=function(t){return this[S.p(t)]()},g.add=function(s,h){var d,f=this;s=Number(s);var $=S.p(h),m=function(t){var e=D(f);return S.w(e.date(e.date()+Math.round(t*s)),f)};if($===l)return this.set(l,this.$M+s);if($===c)return this.set(c,this.$y+s);if($===u)return m(1);if($===o)return m(7);var p=(d={},d[i]=e,d[a]=n,d[r]=t,d)[$]||1,g=this.$d.getTime()+s*p;return S.w(g,this)},g.subtract=function(t,e){return this.add(-1*t,e)},g.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var s=t||"YYYY-MM-DDTHH:mm:ssZ",r=S.z(this),i=this.$H,a=this.$m,u=this.$M,o=n.weekdays,l=n.months,h=function(t,n,r,i){return t&&(t[n]||t(e,s))||r[n].slice(0,i)},c=function(t){return S.s(i%12||12,t,"0")},d=n.meridiem||function(t,e,n){var s=t<12?"AM":"PM";return n?s.toLowerCase():s},$={YY:String(this.$y).slice(-2),YYYY:this.$y,M:u+1,MM:S.s(u+1,2,"0"),MMM:h(n.monthsShort,u,l,3),MMMM:h(l,u),D:this.$D,DD:S.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(i),HH:S.s(i,2,"0"),h:c(1),hh:c(2),a:d(i,a,!0),A:d(i,a,!1),m:String(a),mm:S.s(a,2,"0"),s:String(this.$s),ss:S.s(this.$s,2,"0"),SSS:S.s(this.$ms,3,"0"),Z:r};return s.replace(m,(function(t,e){return e||$[t]||r.replace(":","")}))},g.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},g.diff=function(s,d,f){var $,m=S.p(d),p=D(s),g=(p.utcOffset()-this.utcOffset())*e,v=this-p,y=S.m(this,p);return y=($={},$[c]=y/12,$[l]=y,$[h]=y/3,$[o]=(v-g)/6048e5,$[u]=(v-g)/864e5,$[a]=v/n,$[i]=v/e,$[r]=v/t,$)[m]||v,f?y:S.a(y)},g.daysInMonth=function(){return this.endOf(l).$D},g.$locale=function(){return b[this.$L]},g.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),s=w(t,e,!0);return s&&(n.$L=s),n},g.clone=function(){return S.w(this.$d,this)},g.toDate=function(){return new Date(this.valueOf())},g.toJSON=function(){return this.isValid()?this.toISOString():null},g.toISOString=function(){return this.$d.toISOString()},g.toString=function(){return this.$d.toUTCString()},p}(),x=k.prototype;return D.prototype=x,[["$ms",s],["$s",r],["$m",i],["$H",a],["$W",u],["$M",l],["$y",c],["$D",d]].forEach((function(t){x[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),D.extend=function(t,e){return t.$i||(t(e,k,D),t.$i=!0),D},D.locale=w,D.isDayjs=M,D.unix=function(t){return D(1e3*t)},D.en=b[y],D.Ls=b,D.p={},D}()}}]);
//# sourceMappingURL=362.7578957f.chunk.js.map