(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6162e5ac"],{"78f6":function(t,e,s){},be57:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"post"},[s("div",{staticClass:"r-community-r-detail--forum_container"},[s("div",{staticClass:"r-community-r-detail--forum_title"},[t._v(t._s(t.post.title))]),s("div",{staticClass:"r-community-r-detail--forum_info"},[s("i",{staticClass:"r-community-r-detail--icon_view"}),t._v(" "+t._s(t.post.n_views)+" "),s("i",{staticClass:"r-community-r-detail--icon_comment"}),t._v(" "+t._s(t.post.n_comments)+" ")]),s("div",{staticClass:"r-community-r-detail--forum_user_info"},[s("div",{staticClass:"r-community-r-detail--user_face"},[s("div",{staticClass:"r-community-r-detail--user_head",style:"background-image: url("+t.post.user.avatar_url+");"})]),s("div",{staticClass:"r-community-r-detail--author"},[s("a",{staticClass:"r-community-r-detail--author_link",attrs:{href:"https://shequ.codemao.cn/user/"+t.post.user.id}},[t._v(t._s(t.post.user.nickname))])]),s("p",{directives:[{name:"format",rawName:"v-format",value:"YYYY-MM-DD",expression:"'YYYY-MM-DD'"}],staticClass:"r-community-r-detail--publish_time"},[t._v(t._s(t.post.created_at))])]),s("div",{staticClass:"r-community-r-detail--forum_content",domProps:{innerHTML:t._s(t.post.content)}}),s("el-button",{staticStyle:{margin:"10px auto",display:"block"},attrs:{type:"primary"},on:{click:function(e){return t.bottom()}}},[t._v("发布回帖")]),s("div",{staticClass:"r-community-r-detail--forum_comments_container"},[s("p",{staticClass:"r-community-r-detail--comments_title"},[t._v(" 全部回帖: "),s("span",[t._v(t._s(t.post.n_replies))])]),t._l(t.postr.items,(function(e,a){return s("div",{key:a,staticClass:"c-comment--comment_list"},[s("div",{staticClass:"c-comment-c-comment_item--comment_item"},[s("div",{staticClass:"c-comment-c-comment_item--user_face"},[s("div",{staticClass:"c-comment-c-comment_item--user_head",style:"background-image: url("+e.user.avatar_url+");"})]),s("div",{staticClass:"c-comment-c-comment_item--content_container"},[s("div",{staticClass:"c-comment-c-comment_item--author"},[s("a",{staticClass:"c-comment-c-comment_item--author_link",attrs:{href:"https://shequ.codemao.cn/user/"+e.user.id,target:"_blank"}},[t._v(t._s(e.user.nickname))])]),s("p",{staticClass:"c-comment-c-comment_item--content",domProps:{innerHTML:t._s(e.content)}}),s("p",{directives:[{name:"format",rawName:"v-format",value:"YYYY-MM-DD",expression:"'YYYY-MM-DD'"}],staticClass:"c-comment-c-comment_item--content_bottom"},[t._v(t._s(e.created_at))]),t._l(e.earliest_comments,(function(e,a){return s("div",{key:a,staticClass:"c-comment-c-comment_reply--reply_container"},[s("div",{staticClass:"c-comment-c-comment_reply--reply_list"},[s("div",{staticClass:"c-comment-c-comment_reply--reply_item"},[s("div",{staticClass:"c-comment-c-comment_reply--user_face"},[s("div",{staticClass:"c-comment-c-comment_reply--user_head",style:"background-image: url("+e.user.avatar_url+");"})]),s("div",{staticClass:"c-comment-c-comment_reply--content_container"},[s("div",{staticClass:"c-comment-c-comment_reply--author"},[s("a",{staticClass:"c-comment-c-comment_reply--author_link",attrs:{href:"https://shequ.codemao.cn/user/"+e.user.id,target:"_blank"}},[t._v(t._s(e.user.nickname))]),t._v("： "),s("span",[t._v(t._s(e.content))])]),s("p",{directives:[{name:"format",rawName:"v-format",value:"YYYY-MM-DD",expression:"'YYYY-MM-DD'"}],staticClass:"c-comment-c-comment_reply--content_bottom"},[t._v(t._s(e.created_at))])])])])])}))],2)])])}))],2),s("div",[s("div",{staticClass:"p-write"},[s("writeset-vue",{model:{value:t.rtext,callback:function(e){t.rtext=e},expression:"rtext"}})],1),s("div",{staticClass:"p-write-t"},[s("router-link",{attrs:{targe:"_blank",to:"/post/167540"}},[t._v("编程猫社区守则＞")]),s("el-button",{attrs:{type:"primary"},on:{click:t.writepostr}},[t._v("发布回帖")])],1)])],1)])},i=[],c=s("5eb2"),o={components:{writesetVue:c["a"]},data:function(){return{post:{},postr:[],rtext:"",rrtext:""}},methods:{bottom:function(){window.scrollTo(0,document.body.clientHeight-1e3)},getpostr:function(t){var e=this;this.$axios("/codemaoapi/web/forums/posts/"+this.$route.params.id+"/replies?page="+t+"&limit=10&sort=-created_at").then((function(t){e.postr=t.data}))},writepostr:function(){if(this.rtext.length<=3)this.$message.info("回复内容必须大于3个字哦~");else{var t={content:this.rtext},e=this;this.$axios({method:"POST",url:"/codemaoapi/web/forums/posts/"+this.$route.params.id+"/replies",data:t}).then((function(){e.$message.success("回复成功~"),window.location.reload()})).catch((function(){e.$message.error("未知错误")}))}},writepostrr:function(t){var e={parent_id:0,content:this.rrtext};this.$axios({method:"POST",url:"/codemaoapi/web/forums/replies/"+t+"/comments",data:e})}},created:function(){var t=this;this.$axios("/codemaoapi/web/forums/posts/"+this.$route.params.id+"/details").then((function(e){t.post=e.data})),this.getpostr(1)},watch:{"$route.params.id":function(){var t=this;this.$axios("/codemaoapi/web/forums/posts/"+this.$route.params.id+"/details").then((function(e){t.post=e.data})),this.getpostr(1)}}},r=o,n=(s("c6c0"),s("9ca4")),m=Object(n["a"])(r,a,i,!1,null,null,null);e["default"]=m.exports},c6c0:function(t,e,s){"use strict";var a=s("78f6"),i=s.n(a);i.a}}]);
//# sourceMappingURL=chunk-6162e5ac.f189417b.js.map