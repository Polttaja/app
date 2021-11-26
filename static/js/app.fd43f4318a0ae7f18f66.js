webpackJsonp([1],{"/KV2":function(a,t){},NHnr:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=e("7+uW"),i={render:function(){var a=this.$createElement,t=this._self._c||a;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]},n=e("VU/8")({name:"App"},i,!1,null,null,null).exports,o=e("/ocq"),l={name:"Login",data:function(){return{activeTab:0,email:"",password:"",password2:"",isLoading:!1,alerts:[],token:""}},methods:{login:function(){var a=this;this.isLoading=!0,this.axios.post("https://api.polttaja.fi/user/login",{email:this.email,password:this.password}).then(function(t){a.isLoading=!1,t.data.success&&(localStorage.token=t.data.token,a.$router.push("Home")),a.alerts.length=0,a.alerts.push(t.data),console.log(t.data)})},register:function(){var a=this;this.isLoading=!0,this.axios.post("https://api.polttaja.fi/user/register",{email:this.email,password:this.password,password2:this.password2}).then(function(t){a.isLoading=!1,t.data.success&&a.login(),a.alerts.length=0,a.alerts.push(t.data)})}},mounted:function(){localStorage.token&&(this.token=localStorage.token,this.$router.push("Home"))}},r={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("section",{staticClass:"container"},[e("b-tabs",{model:{value:a.activeTab,callback:function(t){a.activeTab=t},expression:"activeTab"}},[a._l(a.alerts,function(t){return e("b-notification",{key:t.message,attrs:{type:"is-warning","aria-close-label":"Close notification"}},[a._v("\n      "+a._s(t.message)+"\n    ")])}),a._v(" "),e("b-tab-item",{attrs:{label:"Kirjaudu"}},[e("b-field",{attrs:{label:"Sähköposti"}},[e("b-input",{attrs:{type:"email",placeholder:"etunimi.sukunimi@gmail.com",maxlength:"256",checkHtml5Validity:""},model:{value:a.email,callback:function(t){a.email=t},expression:"email"}})],1),a._v(" "),e("b-field",{attrs:{label:"Salasana"}},[e("b-input",{attrs:{plcaeholder:"salasana",type:"password",maxlength:"128","password-reveal":""},model:{value:a.password,callback:function(t){a.password=t},expression:"password"}})],1),a._v(" "),e("b-button",{attrs:{type:"is-primary"},on:{click:a.login}},[a._v("Kirjaudu")])],1),a._v(" "),e("b-tab-item",{attrs:{label:"Rekisteröidy"}},[e("b-field",{attrs:{label:"Sähköposti"}},[e("b-input",{attrs:{type:"email",placeholder:"etunimi.sukunimi@gmail.com",maxlength:"256",checkHtml5Validity:""},model:{value:a.email,callback:function(t){a.email=t},expression:"email"}})],1),a._v(" "),e("b-field",{attrs:{label:"Salasana"}},[e("b-input",{attrs:{type:"password",maxlength:"128","password-reveal":""},model:{value:a.password,callback:function(t){a.password=t},expression:"password"}})],1),a._v(" "),e("b-field",{attrs:{label:"Salasana uudestaan"}},[e("b-input",{attrs:{type:"password",maxlength:"128","password-reveal":""},model:{value:a.password2,callback:function(t){a.password2=t},expression:"password2"}})],1),a._v(" "),e("b-button",{attrs:{type:"is-primary"},on:{click:a.register}},[a._v("Rekisteröidy")])],1)],2),a._v(" "),e("b-loading",{attrs:{"is-full-page":!0},model:{value:a.isLoading,callback:function(t){a.isLoading=t},expression:"isLoading"}})],1)},staticRenderFns:[]},u=e("VU/8")(l,r,!1,null,null,null).exports,c={name:"Home",data:function(){return{isLoading:!0,alerts:[],token:"",aliases:[],columns:[{field:"alias",label:"Alias"},{field:"email",label:"Ohjattu sähköposti"},{field:"created",label:"Luontipäivä"}]}},methods:{logOut:function(){localStorage.removeItem("token"),this.$router.push("/")},list:function(){var a=this;this.axios.post("https://api.polttaja.fi/alias/list",{token:this.token}).then(function(t){a.isLoading=!1,t.data.success||(localStorage.removeItem("token"),a.$router.push("/")),a.aliases=t.data.aliases.map(function(a){return a.alias=a.alias+"@polttaja.fi",a.created=new Date(1e3*a.created).toLocaleDateString("fi-FI"),a})})},newAlias:function(){var a=this;this.isLoading=!0,this.axios.post("https://api.polttaja.fi/alias/new",{token:this.token,random:!0}).then(function(t){a.isLoading=!1,t.data.success||(a.alerts.length=0,a.alerts.push({message:t.data.message})),a.list()})}},mounted:function(){localStorage.token?(this.token=localStorage.token,this.list()):this.$router.push("/")}},p={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("section",{staticClass:"container mt-2"},[e("b-button",{attrs:{type:"is-primary",outlined:""},on:{click:a.newAlias}},[a._v("Uusi")]),a._v(" "),e("b-button",{staticClass:"is-pulled-right",attrs:{type:"is-danger",outlined:""},on:{click:a.logOut}},[a._v("Kirjaudu ulos")]),a._v(" "),e("hr"),a._v(" "),a._l(a.alerts,function(t){return e("b-notification",{key:t.message,attrs:{type:"is-warning","aria-close-label":"Close notification"}},[a._v("\n    "+a._s(t.message)+"\n  ")])}),a._v(" "),e("b-table",{attrs:{data:a.aliases,columns:a.columns}}),a._v(" "),e("b-loading",{attrs:{"is-full-page":!0},model:{value:a.isLoading,callback:function(t){a.isLoading=t},expression:"isLoading"}})],2)},staticRenderFns:[]},d=e("VU/8")(c,p,!1,null,null,null).exports,m={name:"Verify",data:function(){return{isLoading:!0,status:"Varmistetaan tiliä..."}},methods:{verify:function(){var a=this;this.axios.get("https://api.polttaja.fi/user/verify",{params:{key:this.$route.params.key}}).then(function(t){t.data.success&&(localStorage.token=t.data.token,a.$router.push("/")),a.isLoading=!1,a.status=t.data.message})}},mounted:function(){this.verify()}},h={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("section",{staticClass:"container mt-2"},[e("center",[e("p",[a._v("\n        "+a._s(a.status)+"\n      ")])]),a._v(" "),e("b-loading",{attrs:{"is-full-page":!0},model:{value:a.isLoading,callback:function(t){a.isLoading=t},expression:"isLoading"}})],1)},staticRenderFns:[]},g=e("VU/8")(m,h,!1,null,null,null).exports;s.a.use(o.a);var f=new o.a({routes:[{path:"/",name:"Login",component:u},{path:"/Home",name:"Home",component:d},{path:"/Verify/:key",name:"Verify",component:g}]}),b=e("k5jX"),v=(e("/KV2"),e("mtWM")),k=e.n(v),_=e("aLYK");s.a.config.productionTip=!1,s.a.use(_.a,k.a),s.a.use(b.a),new s.a({el:"#app",router:f,components:{App:n},template:"<App/>"})}},["NHnr"]);
//# sourceMappingURL=app.fd43f4318a0ae7f18f66.js.map