<template>
  <div class="blogs">
    <div class="b-head"></div>
    <div class="bs-box">
      <div class="bs-head">
        <h1>{{blogs.name}}</h1>
        <p>{{stime(blogs.updated_at)}}</p>
      </div>
      <div class="bs-content">
        <div v-for="(c,index) in blogs.content.blocks" :key="index">
          <el-image
            v-if="c.type=='qiniuImage'"
            style="width: 100%"
            :src="blogs.content.blocks[0].data.url"
            :preview-src-list="[blogs.content.blocks[0].data.url]"
          />
          <p
            v-if="!c.type || c.type=='paragraph'"
            :style="'text-align:'+c.data.alignment"
            v-html="c.data.text"
          ></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogs: {},
    };
  },
  methods: {
    stime(time) {
      Date.prototype.format = function (format) {
        var o = {
          "M+": this.getMonth() + 1, //month
          "d+": this.getDate(), //day
          "h+": this.getHours(), //hour
          "m+": this.getMinutes(), //minute
          "s+": this.getSeconds(), //second
          "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
          S: this.getMilliseconds(), //millisecond
        };
        if (/(y+)/i.test(format)) {
          format = format.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }
        return format;
      };
      var t = [
        time.split("-")[0],
        time.split("-")[1],
        time.split("-")[2].split("T")[0],
        time.split("-")[2].split("T")[1].split(":")[0],
        time.split("-")[2].split("T")[1].split(":")[1],
        time.split("-")[2].split("T")[1].split(":")[2].split(".")[0],
      ];
      var s = [
        new Date().format("yyyy"),
        new Date().format("MM"),
        new Date().format("dd"),
        new Date().format("hh"),
        new Date().format("mm"),
        new Date().format("ss"),
      ];
      var r = "";
      for (var i = 0; i < t.length; i++) {
        var q = t[i];
        var p = s[i];
        if (p - q > 0) {
          if (i == 0 || i == 1 || i == 2) {
            r = t[0] + "-" + t[1] + "-" + t[2];
            break;
          } else if (i == 3) {
            r = "大约"+(s[3] - t[3]) + "小时前";
            console.log(r)
            break;
          } else if (i == 4) {
            r = "大约"+(s[4] - t[4]) + "分钟前";
            break;
          } else {
            r = "刚刚";
            break;
          }
        }
      }
      return r;
    },
    getblog() {
      var _this = this;
      this.$axios({
        url:
          "/baklibapi/articles/" +
          _this.$route.query.id +
          "?tenant_id=a5e31530-0273-48ba-985d-3f425ab577c1",
        method: "GET",
        timeout: 0,
        headers: {
          Authorization:
            "Bearer 6e2b76bdf1493cbc7db23b57c3dedc75be40d0407230e2f022326ae54ae5adf5",
          "Content-Type": "application/json",
        },
      }).then(function (res) {
        _this.blogs = res.data.message;
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
.bs-box {
  width: 800px;
  margin: 30px auto;
  box-shadow: 0 10px 33px rgba(9, 16, 43, 0.15);
  padding: 20px;
}
.bs-head {
  line-height: 40px;
  margin-bottom: 20px;
}
</style>