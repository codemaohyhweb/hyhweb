(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5d6fd462"],{"88a3":function(t,a,e){},a2e6:function(t,a,e){"use strict";var i=e("88a3"),s=e.n(i);s.a},aca7:function(t,a,e){t.exports=e.p+"img/logo.60df13d1.jpg"},eea6:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"home"},[i("div",{staticClass:"h-box",staticStyle:{padding:"40px 0 30px 0",background:"#f2f4f8"}},[i("el-carousel",{staticStyle:{margin:"0 auto",width:"90%"},attrs:{trigger:"click",interval:4e3,type:t.col>=12?"":"card",height:"250px"}},t._l(t.api[0].items,(function(t,a){return i("el-carousel-item",{key:a,staticStyle:{"border-radius":"10px"}},[i("a",{attrs:{href:t.href,target:"_blank"}},[i("div",{staticClass:"bgimg",style:"width:100%;height:100%;background-image:url("+t.src+");"})])])})),1)],1),i("div",{staticClass:"h-box"},[i("div",{staticClass:"h-box-h"},[t._v("关于我们")]),i("div",{staticClass:"h-ab-box"},[i("div",{staticClass:"h-ab-logo"},[i("el-image",{staticClass:"h-ab-logo-img",attrs:{src:e("aca7")}})],1),i("div",{staticClass:"h-ab-content"},[i("div",{staticClass:"h-ab-content-box"},[t._v(t._s(t.api[3].content))])])])]),i("div",{staticClass:"h-box",staticStyle:{background:"#f2f4f8"}},[i("div",{staticClass:"h-box-h"},[t._v("重要成员")]),i("el-row",{staticStyle:{padding:"0 5vw","padding-bottom":"5vw"},attrs:{gutter:24}},t._l(t.api[1].items,(function(a,e){return i("el-col",{key:e,attrs:{span:t.col}},[i("div",{staticClass:"h-member-box"},[i("br"),i("div",{staticClass:"h-member-head"},[i("el-image",{staticClass:"h-memeber-head_img",attrs:{src:a.avatar,fit:"cover"}})],1),i("div",{staticClass:"h-member-text"},[i("div",{staticClass:"h-member-h"},[t._v(t._s(a.name))]),i("div",{staticClass:"h-member-p"},[t._v(t._s(a.dep))]),i("div",{staticClass:"h-member-a"},[i("a",{staticStyle:{display:"block"},attrs:{href:"https://shequ.codemao.cn/user/"+a.id,target:"_blank"}},[t._v("前去拜访")])])])])])})),1)],1),i("div",{staticClass:"h-box"},[i("div",{staticClass:"h-box-h"},[t._v("时间轴")]),i("el-timeline",{staticStyle:{width:"50%",margin:"auto","text-align":"left"},attrs:{reverse:!0}},t._l(t.api[2].items,(function(a,e){return i("el-timeline-item",{key:e,attrs:{timestamp:a.time,placement:"top"}},[i("el-card",[t._v(t._s(a.content))])],1)})),1)],1),i("el-backtop",{attrs:{target:".home"}})],1)},s=[],c={data:function(){return{col:6,api:[]}},created:function(){document.body.clientWidth>=1e3?this.col=6:document.body.clientWidth>=800?this.col=8:document.body.clientWidth>=500?this.col=12:this.col=24,this.getapi()},methods:{getavaurl:function(){for(var t=this,a=0;a<this.api[1].items.length;a++)this.$axios.get("/codemaoapi/api/user/info/detail/"+this.api[1].items[a].id).then((function(a){for(var e=0;e<t.api[1].items.length;e++)t.api[1].items[e].id==a.data.data.userInfo.user.id&&(t.api[1].items[e].avatar=a.data.data.userInfo.user.avatar)}))},getapi:function(){var t={url:"/baklibapi/articles/3cd6b2a0-86c1-409a-b0a1-24822c14a581?tenant_id=a5e31530-0273-48ba-985d-3f425ab577c1",method:"GET",timeout:0,headers:{Authorization:"Bearer 6e2b76bdf1493cbc7db23b57c3dedc75be40d0407230e2f022326ae54ae5adf5","Content-Type":"application/json"}},a=this;this.$axios(t).then((function(t){a.api=JSON.parse(t.data.message.content.blocks[0].data.text),a.getavaurl()}))}},mounted:function(){var t=this;window.onresize=function(){return function(){document.body.clientWidth>=1e3?t.col=6:document.body.clientWidth>=800?t.col=8:document.body.clientWidth>=500?t.col=12:t.col=24}()}}},o=c,n=(e("a2e6"),e("9ca4")),l=Object(n["a"])(o,i,s,!1,null,null,null);a["default"]=l.exports}}]);
//# sourceMappingURL=chunk-5d6fd462.977ab899.js.map