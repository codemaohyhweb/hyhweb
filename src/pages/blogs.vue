<template>
  <div class="blogs">
    <div class="bs-head">
      <h1>{{blogs.name}}</h1>
      <p>
        {{stime(blogs.updated_at)}}
      </p>
    </div>
    <div class="bs-content">
      {{blogs.description}}
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
      return time.substr(0, 4);
    },
    getblog() {
      var _this = this;
      this.$axios({
        url:
          "/baklibapi/articles/" +
          _this.$route.params.id +
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
        console.log(_this.blogs)
      });
    },
  },
  created() {
    this.getblog(1);
  },
};
</script>

<style>
.b-head {
  width: 100vw;
  height: 300px;
  background: linear-gradient(#1280ff, #297eff);
}
.b-content-l {
  width: 60vw;
  vertical-align: middle;
  display: inline-block;
}
.b-content-r {
  width: 40vw;
  vertical-align: middle;
  display: inline-block;
}
.bl-box {
  height: 150px;
  overflow: hidden;
  padding: 10px;
  padding-left: 180px;
}
.bl-img {
  border-radius: 10px;
  width: 100%;
  height: 150px;
  margin: auto;
  background: #297eff;
}
.bl-content {
  padding: 20px;
}
.bl-content-body-title {
  padding: 10px 0;
  font-weight: 600;
  font-size: 18px;
}
.bl-content-body-text {
  font-size: 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>