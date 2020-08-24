<template>
  <div class="home">
    <div class="h-box" style="padding:40px 0 30px 0;background:#f2f4f8">
      <el-carousel
        trigger="click"
        style="margin:0 auto;width:90%"
        :interval="4000"
        :type="col>=12?'':'card'"
        height="250px"
      >
        <el-carousel-item
          v-for="(rc,index) in api[0].items"
          :key="index"
          style="border-radius: 10px"
        >
          <a :href="rc.href" target="_blank">
            <div class="bgimg" :style="'width:100%;height:100%;background-image:url('+rc.src+');'"></div>
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="h-box">
      <div class="h-box-h">关于我们</div>
      <div class="h-ab-box">
        <div class="h-ab-logo">
          <el-image class="h-ab-logo-img" :src="require('../assets/logo.jpg')"></el-image>
        </div>
        <div class="h-ab-content">
          <div class="h-ab-content-box">{{api[3].content}}</div>
        </div>
      </div>
    </div>
    <div class="h-box" style="background:#f2f4f8">
      <div class="h-box-h">重要成员</div>
      <el-row :gutter="24" style="padding:0 5vw;padding-bottom:5vw">
        <el-col v-for="(m,item) in api[1].items" :key="item" :span="col">
          <div class="h-member-box">
            <br />
            <div class="h-member-head">
              <el-image class="h-memeber-head_img" :src="m.avatar" fit="cover"></el-image>
            </div>
            <div class="h-member-text">
              <div class="h-member-h">{{m.name}}</div>
              <div class="h-member-p">{{m.dep}}</div>
              <div class="h-member-a">
                <a
                  style="display:block"
                  :href="'https://shequ.codemao.cn/user/'+m.id"
                  target="_blank"
                >前去拜访</a>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="h-box">
      <div class="h-box-h">时间轴</div>
      <el-timeline :reverse="true" style="width:50%;margin:auto;text-align:left">
        <el-timeline-item
          v-for="(a, index) in api[2].items"
          :key="index"
          :timestamp="a.time"
          placement="top"
        >
          <el-card>{{a.content}}</el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <el-backtop target=".home"></el-backtop>
  </div>
</template>

<script>
export default {
  data() {
    return {
      col: 6,
      api: [],
    };
  },
  created() {
    if (document.body.clientWidth >= 1000) {
      this.col = 6;
    } else if (document.body.clientWidth >= 800) {
      this.col = 8;
    } else if (document.body.clientWidth >= 500) {
      this.col = 12;
    } else {
      this.col = 24;
    }
    this.getapi();
  },
  methods: {
    getavaurl() {
      var _this = this;
      for (var i = 0; i < this.api[1].items.length; i++) {
        this.$axios
          .get("/codemaoapi/api/user/info/detail/" + this.api[1].items[i].id)
          .then(function (res) {
            for (var s = 0; s < _this.api[1].items.length; s++) {
              if (_this.api[1].items[s].id == res.data.data.userInfo.user.id) {
                _this.api[1].items[s].avatar =
                  res.data.data.userInfo.user.avatar;
              }
            }
          });
      }
    },
    getapi() {
      var settings = {
        url:
          "/baklibapi/articles/3cd6b2a0-86c1-409a-b0a1-24822c14a581?tenant_id=a5e31530-0273-48ba-985d-3f425ab577c1",
        method: "GET",
        timeout: 0,
        headers: {
          Authorization:
            "Bearer 6e2b76bdf1493cbc7db23b57c3dedc75be40d0407230e2f022326ae54ae5adf5",
          "Content-Type": "application/json",
        },
      };
      var _this = this;
      this.$axios(settings).then(function (res) {
        _this.api = JSON.parse(res.data.message.content.blocks[0].data.text);
        _this.getavaurl();
      });
    },
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        if (document.body.clientWidth >= 1000) {
          that.col = 6;
        } else if (document.body.clientWidth >= 800) {
          that.col = 8;
        } else if (document.body.clientWidth >= 500) {
          that.col = 12;
        } else {
          that.col = 24;
        }
      })();
    };
  },
};
</script>

<style>
.h-box {
  text-align: center;
  width: 100vw;
}
.h-box-h {
  font-size: 20px;
  color: #111;
  padding: 30px 0;
  font-weight: 600;
}
.h-member-box {
  text-align: center;
  border-radius: 10px;
  background: #ffffff;
  padding-bottom: 20px;
}
.h-memeber-head_img {
  height: 12vw;
  width: 12vw;
  border-radius: 50%;
  display: block !important;
  margin: 1.5vw auto;
}
.h-member-h {
  font-size: 18px;
  font-weight: 600;
  line-height: 40px;
  /*animation: text both infinite 2s ease-in-out;*/
}
.h-member-p {
  font-size: 15px;
  line-height: 40px;
  background: #297eff;
  color: #fff;
  margin: 0.5vw 0;
}
.h-member-a {
  font-size: 15px;
  color: #666;
  transition: 0.3s ease-out;
  position: relative;
  width: 30%;
  padding: 5px;
  margin: auto;
}
.h-member-a:hover.h-member-a::before {
  left: 25%;
  width: 50%;
}
.h-member-a::before {
  content: "";
  position: absolute;
  left: 40%;
  width: 20%;
  height: 2px;
  border-radius: 2px;
  bottom: 0;
  background: #409eff;
  transition: 0.2s ease-out;
}
.h-ab-box {
  width: 70vw;
  margin: 20px auto;
  margin-bottom: 70px;
  border-radius: 10px;
  background: #f7f8fa;
  color: #111;
}
@media (max-width: 700px) {
  .h-ab-box {
    width: 100vw !important;
  }
  .h-ab-logo {
    width: 100vw !important;
    height: 100vw !important;
    display: block !important;
  }
  .h-ab-logo-img {
    width: 90vw !important;
    top: 5vw !important;
    left: 5vw !important;
    height: 90vw !important;
  }
  .h-ab-content {
    width: 100vw !important;
    display: block !important;
  }
}
.h-ab-content {
  width: 400px;
  display: inline-block;
  vertical-align: top;
}
.h-ab-content-box {
  text-indent: 2rem;
  text-align: left;
  padding: 3rem 4rem;
}
.h-ab-logo {
  width: 400px;
  height: 400px;
  display: inline-block;
  vertical-align: top;
  position: relative;
}
.h-ab-logo-img {
  width: 400px;
  top: -20px;
  left: -20px;
  border-radius: 10px;
  position: absolute;
  height: 400px;
  box-shadow: 0 10px 33px rgba(9, 16, 43, 0.15);
}
</style>