(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-165db13d"],{8896:function(t,s,e){"use strict";var a=e("a7cb"),n=e.n(a);n.a},a7cb:function(t,s,e){},b7d3:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"blogs"},[e("div",{staticClass:"b-head"}),e("div",{staticClass:"bs-box"},[e("div",{staticClass:"bs-head"},[e("h1",[t._v(t._s(t.blogs.name))]),e("p",[t._v(t._s(t.stime(t.blogs.updated_at)))])]),e("div",{staticClass:"bs-content",domProps:{innerHTML:t._s(t.blogs.content.blocks[0].data.text)}})])])},n=[],o={data:function(){return{blogs:{}}},methods:{stime:function(t){this.$store.commit(t),setTimeout((function(){return this.$store.state.date}),1e3)},getblog:function(){var t=this;this.$axios({url:"/baklibapi/articles/"+t.$route.params.id+"?tenant_id=a5e31530-0273-48ba-985d-3f425ab577c1",method:"GET",timeout:0,headers:{Authorization:"Bearer 6e2b76bdf1493cbc7db23b57c3dedc75be40d0407230e2f022326ae54ae5adf5","Content-Type":"application/json"}}).then((function(s){t.blogs=s.data.message,console.log(t.blogs)}))}},created:function(){this.getblog(1)}},i=o,c=(e("8896"),e("9ca4")),d=Object(c["a"])(i,a,n,!1,null,null,null);s["default"]=d.exports}}]);
//# sourceMappingURL=chunk-165db13d.c9d03def.js.map