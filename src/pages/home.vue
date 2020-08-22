<template>
  <div class="home">
    <div class="h-box">
      <el-carousel
        trigger="click"
        style="margin:30px auto;width:90%"
        :interval="4000"
        :type="col>=12?'':'card'"
        height="250px"
      >
        <el-carousel-item v-for="(rc,index) in rcs" :key="index" style="border-radius: 10px">
          <a :href="rc.href" target="_blank">
            <div class="bgimg" :style="'width:100%;height:100%;background-image:url('+rc.src+');'"></div>
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="h-box" style="background:#f2f4f8">
      <el-row :gutter="24" style="padding:0 5vw;padding-bottom:5vw">
        <el-col v-for="(m,item) in memebers" :key="item" :span="col">
          <div class="h-member-box">
            <br />
            <div class="h-member-head">
              <el-image
                class="h-memeber-head_img"
                :src="m.ava_src"
                fit="cover"
              ></el-image>
            </div>
            <div class="h-member-text">
              <div class="h-member-h">
                {{m.name}}
              </div>
              <div class="h-member-p">
                {{m.dep}}
              </div>
              <div class="h-member-a">
                前去拜访>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-backtop target=".home"></el-backtop>
  </div>
</template>

<script>
export default {
  data() {
    return {
      col: 6,
      memebers: [
        {
          name: "Leo韩",
          dep: "会长",
          id: "697400",
        },
        {
          name: "四氧化三铁",
          dep: "副会长",
          id: "697400",
        },
      ],
      rcs: [
        {
          href: "/#/blogs?id=ece6191a-e72b-409b-ac2c-2a2f92ce84fb",
          src: "https://static.codemao.cn/whale/HkeMlqdDGD",
        },
        {
          href: "/#/blog",
          src: "https://static.codemao.cn/whale/HkeMlqdDGD",
        },
        {
          href: "/#/blog",
          src: "https://static.codemao.cn/whale/HkeMlqdDGD",
        },
      ],
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
  width: 100vw;
}
.h-member-box {
  text-align: center;
  margin-top: 5vw;
  height: 30vw;
  border-radius: 10px;
  background: #ffffff;
}
.h-memeber-head_img {
  height: 12vw;
  width: 12vw;
  border-radius: 50%;
  display: block !important;
  margin: 1.5vw auto;
}
.h-member-text {
  height: 10vw;
  overflow: hidden;
}
.h-member-h {
  font-size: 18px;
  font-weight: 600;
  line-height: 3vw;
}
.h-member-p {
  font-size: 15px;
  line-height: 3vw;
}
.h-member-a {
  font-size: 15px;
  color: #bbb;
}
</style>