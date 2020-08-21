<template>
  <div class="home">
    <div class="h-box" style="background:#f2f4f8">
      <el-row :gutter="24" style="padding:0 5vw;padding-bottom:5vw">
        <el-col :span="col">
          <div class="h-member-box">
            <br>
            <div class="h-member-head">
              <el-image
                class="h-memeber-head_img"
                src="https://static.codemao.cn/nemo/ryc-BqCbv.jpeg"
                fit="cover"
              ></el-image>
            </div>
            <div class="h-member-text">
              <div class="h-member-h">
                活动喵
              </div>
              <div class="h-member-p">
                介绍
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="col">
          <div class="h-member-box"></div>
        </el-col>
        <el-col :span="col">
          <div class="h-member-box"></div>
        </el-col>
        <el-col :span="col">
          <div class="h-member-box"></div>
        </el-col>
        <el-col :span="col">
          <div class="h-member-box"></div>
        </el-col>
        <el-col :span="col">
          <div class="h-member-box"></div>
        </el-col>
        <el-col :span="col">
          <div class="h-member-box"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      col: 6,
      memeber:[
        {
          name:"Leo韩",
          info:"会长",
          id:"697400",
        },
        {
          name:"四氧化三铁",
          info:"副会长",
          id:"697400",
        },
      ]
    };
  },
  created() {
    console.log(document.documentElement.clientWidth);
  },

  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        if (document.body.clientWidth >= 1000) {
          that.col = 6;
          console.log(that.col);
        } else if (document.body.clientWidth >= 800) {
          that.col = 8;
          console.log(that.col);
        } else if (document.body.clientWidth >= 500) {
          that.col = 12;
          console.log(that.col);
        } else {
          that.col = 24;
          console.log(that.col);
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
  height: 25vw;
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
.h-member-text{
  height: 10vw;
  overflow: hidden;
}
.h-member-h{
  font-size: 2vw;
  line-height: 3vw;
}
.h-member-p{
  font-size: 1.5vw;
  line-height: 3vw;
}
</style>