<template>
  <div class="blogs">
    <navbar></navbar>
    <div class="b-head"></div>
    <div class="bs-box">
      <div style="padding:5vw">
        <div class="bs-head">
          <h1>{{blogs.title}}</h1>
          <p>{{stime(blogs.time)}}</p>
        </div>
        <div class="bs-content">
          <div v-html="blogs.content"></div>
        </div>
      </div>
    </div>
    <zfooter></zfooter>
  </div>
</template>

<script>
import zfooter from "../components/footer";
import navbar from "../components/navbar";
import marked from "marked";
export default {
  components: {
    navbar,
    zfooter,
  },
  data() {
    return {
      blogs: {},
    };
  },
  methods: {
    stime(time) {
      var s = Math.round(new Date() / 1000);
      var r = "";
      //计算时间差
      var timediff = s - time;
      var days = (timediff / 86400).toFixed();
      if (days > 1) {
        r = new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
      } else {
        var remain = timediff % 86400;
        var hours = (remain / 3600).toFixed();
        if (hours >= 1) {
          r = hours + "小时前";
        } else {
          remain = remain % 3600;
          var mins = (remain / 60).toFixed();
          if (mins >= 2) {
            r = hours + "分钟前";
          } else {
            r = "刚刚";
          }
        }
      }
      return r;
    },
    getblog() {
      var _this = this;
      this.$axios({
        url: "/api/blogs/content/" + _this.$route.params.id,
        method: "GET",
      }).then(function (res) {
        _this.blogs = res.data[0];
        _this.blogs.content = marked(res.data[0].content);
      });
    },
  },
  created() {
    this.getblog(1);
  },
};
</script>

<style>
.bs-content {
  line-height: 30px;
}
.bs-content img {
  width: 100%;
}
.bs-box {
  width: 70vw;
  margin: 30px auto;
  box-shadow: 0 10px 33px rgba(9, 16, 43, 0.15);
}
@media (max-width: 700px) {
  .bs-box {
    width: 100vw !important;
    margin: 0 !important;
  }
}
.bs-head {
  line-height: 40px;
  margin-bottom: 20px;
}
</style>