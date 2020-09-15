<template>
  <div class="blog">
    <navbar></navbar>
    <div class="b-head"></div>
    <div class="b-content">
      <div class="b-content-l" v-loading="loading">
        <div v-if="!loading">
          <el-page-header class="bl-box" @back="getblog(1);" v-if="issearch" content="搜索结果"></el-page-header>
          <div class="bl-none" v-if="!blogs.items.length"></div>
          <div class="bl-box" v-for="(bl,item) in blogs.items" :key="item">
            <router-link :to="'/blogs/'+bl.id">
              <div class="bl-box-1">
                <div
                  v-if="bl.bgurl"
                  class="bl-img bgimg"
                  :style="'background-image:url('+bl.bgurl+');'"
                ></div>
                <div v-if="!bl.bgurl" class="bl-img"></div>
              </div>
              <div class="bl-box-2">
                <div class="bl-content">
                  <div class="bl-content-head">
                    <i class="el-icon-time"></i>
                    {{stime(bl.time)}}
                  </div>
                  <div class="bl-content-body">
                    <div class="bl-content-body-title">{{bl.title}}</div>
                    <div class="bl-content-body-text">{{bl.content}}</div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <br />
          <el-pagination
            v-if="blogs.meta"
            :page-size="10"
            style="text-align: center;"
            @current-change="topost"
            background
            layout="prev, pager, next"
            :total="blogs.total"
          />
          <br />
        </div>
      </div>
      <div class="b-content-r">
        <div class="br-box">
          <el-input
            placeholder="搜索:标题/内容"
            prefix-icon="el-icon-search"
            v-model="word"
            @keyup.enter.native="search(1)"
          ></el-input>
        </div>
      </div>
    </div>
    <zfooter></zfooter>
  </div>
</template>

<script>
import zfooter from "../components/footer";
import navbar from "../components/navbar";
export default {
  components: {
    navbar,
    zfooter,
  },
  data() {
    return {
      blogs: [],
      word: "",
      total_count: "",
      loading: true,
      issearch: false,
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
        r = new Date(parseInt(time) * 1000)
          .toLocaleString()
          .replace(/:\d{1,2}$/, " ");
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
    getblog(page) {
      this.loading = true;
      this.issearch = false;
      var _this = this;
      this.$axios({
        url: "/api/blogs/items/" + page,
        method: "GET",
      }).then(function (res) {
        _this.blogs = res.data;
        _this.loading = false;
      });
    },
    topost(currentPage) {
      if (this.word) {
        this.search(currentPage);
      } else {
        this.getblog(currentPage);
      }
    },
    search(page) {
      this.issearch = true;
      this.loading = false;
      var _this = this;
      this.$axios({
        url: "/api/blogs/search/" + this.word + "/" + page,
        method: "GET",
      }).then(function (res) {
        _this.blogs = res.data;
        _this.loading = false;
      });
    },
  },
  created() {
    this.getblog(1);
  },
};
</script>

<style>
@media (min-width: 1300px) {
  .b-content-l {
    width: 650px;
  }
  .b-content-r {
    width: 500px;
  }
  .bl-box {
    text-align: left;
    padding-left: 0 !important;
  }
  .b-content {
    text-align: center;
  }
}
@media (min-width: 700px) and (max-width: 1300px) {
  .b-content-l {
    width: 550px;
  }
  .b-content-r {
    width: 400px;
  }
  .bl-box {
    text-align: left;
    padding-left: 0 !important;
  }
  .b-content {
    text-align: center;
  }
}
@media (max-width: 700px) {
  .b-content-l {
    width: 100vw;
  }
  .b-content-r {
    width: 100vw;
  }
  .bl-box-1 {
    width: 100% !important;
    height: 50vw !important;
  }
  .bl-box-2 {
    width: 100% !important;
  }
}
.bl-box-1 {
  width: 40%;
  height: 130px;
  display: inline-block;
  vertical-align: top;
}
.bl-box-2 {
  display: inline-block;
  vertical-align: top;
  width: 60%;
}
.b-content-l {
  vertical-align: top;
  display: inline-block;
  min-height: 200px;
}
.b-content-r {
  vertical-align: top;
  display: inline-block;
  min-height: 200px;
}
.br-box {
  padding: 20px 60px;
}
.bl-box {
  cursor: pointer;
  padding: 20px;
}
.bl-img {
  border-radius: 10px;
  width: 100%;
  height: 100%;
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
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.bl-content-body-text {
  font-size: 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.bl-none::after {
  content: "无数据";
  color: #534e4e;
  margin-top: 20px;
  display: block;
  text-align: center;
}
</style>