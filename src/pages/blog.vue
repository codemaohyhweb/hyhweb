<template>
  <div class="blog">
    <div class="b-head"></div>
    <div class="b-content">
      <div class="b-content-l" v-loading="loading">
        <el-row class="bl-box" v-for="(bl,item) in blogs.items" :key="item">
          <router-link :to="{name:'blogs',path: '/blogs', query: { id: bl.id, }}">
            <el-col :span="10">
              <div
                v-if="bl.features['guide-leap']"
                class="bl-img bgimg"
                :style="'background-image:url('+bl.features['guide-leap']['article.default'].variables.thumbs+');'"
              ></div>
              <div v-if="!bl.features['guide-leap']" class="bl-img"></div>
            </el-col>
            <el-col :span="14">
              <div class="bl-content">
                <div class="bl-content-head">
                  <i class="el-icon-time"></i>
                  {{stime(bl.updated_at)}}
                </div>
                <div class="bl-content-body">
                  <div class="bl-content-body-title">{{bl.name}}</div>
                  <div class="bl-content-body-text">{{bl.content.blocks[0].data.text}}</div>
                </div>
              </div>
            </el-col>
          </router-link>
        </el-row>
        <br />
        <el-pagination
          v-if="blogs.meta"
          :page-size="10"
          style="text-align: center;"
          @current-change="topost"
          background
          layout="prev, pager, next"
          :total="blogs.meta.total_count"
        />
        <br />
      </div>
      <div class="b-content-r">
        <div class="br-box">
          <el-input
            placeholder="搜索"
            prefix-icon="el-icon-search"
            v-model="word"
            @keyup.enter.native="search(1)"
          ></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogs: [],
      word: "",
      total_count: "",
      loading: true,
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
            r = "大约" + (s[3] - t[3]) + "小时前";
            break;
          } else if (i == 4) {
            r = "大约" + (s[4] - t[4]) + "分钟前";
            break;
          } else {
            r = "刚刚";
            break;
          }
        }
      }
      return r;
    },
    getblog(page) {
      this.loading = true;
      var _this = this;
      this.$axios({
        url:
          "/baklibapi/articles?_page=" +
          page +
          "&amp;_per_page=10&amp;channel_id=2a274635-2f52-4030-8386-c474f77d44cb&amp;tenant_id=a5e31530-0273-48ba-985d-3f425ab577c1",
        method: "GET",
        timeout: 0,
        headers: {
          Authorization:
            "Bearer 6e2b76bdf1493cbc7db23b57c3dedc75be40d0407230e2f022326ae54ae5adf5",
          "Content-Type": "application/json",
        },
      }).then(function (res) {
        _this.blogs = res.data.message;
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
      this.loading = false;
      var _this = this;
      this.$axios({
        url:
          "/baklibapi/articles?_page=0&amp;_per_page=50&amp;channel_id=2a274635-2f52-4030-8386-c474f77d44cb&amp;tenant_id=a5e31530-0273-48ba-985d-3f425ab577c1",
        method: "GET",
        timeout: 0,
        headers: {
          Authorization:
            "Bearer 6e2b76bdf1493cbc7db23b57c3dedc75be40d0407230e2f022326ae54ae5adf5",
          "Content-Type": "application/json",
        },
      }).then(function (res) {
        _this.blogs = res.data.message;
        var blo = _this.blogs;
        _this.blogs = {};
        _this.blogs.items = [];
        var current_page = page + 1;
        var total_pages = 0;
        var total_count = 0;
        for (var i = 0; i < blo.items.length; i++) {
          if (blo.items[i].name.indexOf(_this.word) >= 0) {
            total_count++;
          }
          for (var o = 0; i < blo.items[i].content.blocks.length - 1; o++) {
            if (blo.items[i].content.blocks[o].data.text) {
              if (
                blo.items[i].content.blocks[o].data.text.indexOf(_this.word) >=
                0
              ) {
                total_count++;
                break;
              }
            }
          }
        }
        total_pages = Math.ceil(total_count / 10);
        for (var f = (page - 1) * 10; f < blo.items.length; f++) {
          if (blo.items[f].name.indexOf(_this.word) >= 0) {
            _this.blogs.items.push(blo.items[f]);
            if (_this.blogs.items.length >= 10) {
              break;
            }
          }
          for (var l = 0; i < blo.items[f].content.blocks.length; l++) {
            if (blo.items[f].content.blocks[l].data.text) {
              if (
                blo.items[f].content.blocks[l].data.text.indexOf(_this.word) >=
                0
              ) {
                _this.blogs.items.push(blo.items[f]);
                break;
              }
            }
          }
          if (_this.blogs.items.length >= 10) {
            break;
          }
        }
        _this.blogs.meta = {
          current_page: current_page,
          total_pages: total_pages,
          total_count: total_count,
        };
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
@media (min-width: 960px) {
  .b-content-l {
    width: 59vw;
  }
  .b-content-r {
    width: 35vw;
  }
  .bl-box {
    padding-left: 180px !important;
  }
}
@media (max-width: 960px) and (min-width: 500px) {
  .b-content-l {
    width: 100vw;
  }
  .b-content-r {
    width: 100vw;
  }
}
.b-content-l {
  vertical-align: top;
  display: inline-block;
}
.b-content-r {
  vertical-align: top;
  display: inline-block;
}
.br-box {
  padding: 20px 60px;
}
.bl-box {
  cursor: pointer;
  height: 150px;
  overflow: hidden;
  padding: 20px;
}
.bl-img {
  border-radius: 10px;
  width: 100%;
  height: 130px;
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