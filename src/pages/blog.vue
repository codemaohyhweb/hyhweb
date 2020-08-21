<template>
  <div class="blog">
    <div class="b-head"></div>
    <div class="b-content">
      <div class="b-content-l">
        <el-row class="bl-box" v-for="(bl,item) in blogs.items" :key="item">
          <div @click="toblog(bl.id)">
            <el-col :span="10">
              <el-image
                v-if="bl.features['guide-leap']"
                fit="cover"
                class="bl-img"
                :src="bl.features['guide-leap']['article.default'].variables.thumbs"
              ></el-image>
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
          </div>
        </el-row>
        <br />
        <el-pagination
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
    };
  },
  methods: {
    stime(time) {
      return time.substr(0, 4);
    },
    toblog(id) {
      this.$router.push({
        name: "blogs",
        path: "/blogs",
        params: {
          id: id,
        },
      });
    },
    getblog(page) {
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
        console.log(_this.blogs.items[0]);
      });
    },
    topost(currentPage) {
      this.getblog(currentPage);
    },
    search(page) {
      var blo = this.blogs;
      this.blogs = {};
      this.blogs.items = [];
      var current_page = page+1;
      var total_pages = 0;
      var total_count = 0;
      for (var i = 0; i < blo.items.length; i++) {
        if ((blo.items[i].name.indexOf(this.word))>=0) {
          total_count++;
        }
      }
      total_pages = Math.ceil(total_count / 10);
      for (var f = (page-1)*10; f < blo.items.length; f++) {
        if ((blo.items[f].name.indexOf(this.word))>=0) {
          this.blogs.items.push(blo.items[f]);
          if (this.blogs.items.length >= 10) {
            break;
          }
        }
      }
      this.blogs.meta = {
        "current_page": current_page,
        "total_pages": total_pages,
        "total_count": total_count,
      };
      console.log(this.blogs)
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
  width: 59vw;
  vertical-align: top;
  display: inline-block;
}
.b-content-r {
  width: 40vw;
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