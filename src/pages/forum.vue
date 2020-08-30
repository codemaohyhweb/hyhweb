<template>
  <div style="position:relative">
    <navbar></navbar>
    <div class="f-box">
      <div v-if="index==0" v-loading="loading" class="all-post-boxs f-box-a">
        <div style="padding:10px">全部帖子（{{posts.total}}）</div>
        <el-row>
          <el-col v-for="(post,item) in posts.items" :key="item">
            <router-link class="forum_to" :to="'/post/'+post.id" target="_blank">
              <li class="c-post_list--post_body">
                <div class="c-post_list--post_container">
                  <div class="c-post_list--post_header">
                    <a :href="'https://shequ.codemao.cn/user/'+post.user.id" target="_blank">
                      <img :src="post.user.avatar_url" alt="头像" class="c-post_list--pointer" />
                      <span class="c-post_list--pointer">{{post.user.nickname}}</span>
                    </a>
                  </div>
                  <div class="c-post_list--post_title">
                    <h3 class="c-post_list--pointer">{{post.title}}</h3>
                  </div>
                </div>
              </li>
            </router-link>
          </el-col>
        </el-row>
        <el-row style="padding:10px 0" type="flex" justify="center">
          <el-col :span="20">
            <el-pagination
              :page-size="20"
              style="text-align: center;"
              @current-change="topost"
              background
              layout="prev, pager, next"
              :total="posts.total"
            />
          </el-col>
        </el-row>
      </div>
      <div v-if="index==1" v-loading="loading" class="all-post-boxs f-box-a">
        <div style="padding:10px">
          <el-page-header
            @back="index=0"
            :content="'为您找到（'+this.s_posts.total+'）条关于‘'+this.search_text+'’的帖子'"
          ></el-page-header>
        </div>
        <el-row>
          <el-col v-for="(post,item) in s_posts.items" :key="item">
            <li class="c-post_list--post_body">
              <div class="c-post_list--post_container">
                <div class="c-post_list--post_header">
                  <a :href="'https://shequ.codemao.cn/user/'+post.user.id" target="_blank">
                    <img :src="post.user.avatar_url" alt="头像" class="c-post_list--pointer" />
                    <span class="c-post_list--pointer">{{post.user.nickname}}</span>
                  </a>
                </div>
                <router-link class="forum_to" :to="'/post/'+post.id">
                  <div class="c-post_list--post_title">
                    <h3 class="c-post_list--pointer">{{post.title}}</h3>
                  </div>
                </router-link>
              </div>
            </li>
          </el-col>
        </el-row>
        <el-row style="padding:10px 0" type="flex" justify="center">
          <el-col :span="20">
            <el-pagination
              :page-size="20"
              style="text-align: center;"
              @current-change="stopost"
              background
              layout="prev, pager, next"
              :total="s_posts.total"
            />
          </el-col>
        </el-row>
      </div>
      <div class="all-post-boxs f-box-b" style="text-align:center;">
        <div style="padding:1vw 3vw">
          <el-input
            placeholder="搜索"
            prefix-icon="el-icon-search"
            v-model="search_text"
            @keyup.enter.native="search(1)"
          ></el-input>
          <el-button
            id="write"
            type="primary"
            style="width:100%"
            icon="el-icon-edit"
            @click="write"
          >发布帖子</el-button>
          <el-button
            id="write2"
            size="bigger"
            @click="write2"
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
        </div>
      </div>
    </div>
    <el-dialog title="发帖" :close-on-click-modal="false" :visible.sync="write_box" width="50%">
      <write />
    </el-dialog>
    <el-dialog title="发帖" :close-on-click-modal="false" :visible.sync="write_box2" width="100%">
      <write2 />
    </el-dialog>
    <zfooter></zfooter>
  </div>
</template>

<script>
import write from "../components/write/writepost";
import write2 from "../components/write/write2";
import zfooter from "../components/footer";
import navbar from "../components/navbar";
export default {
  components: {
    navbar,
    zfooter,
    write,
    write2,
  },
  data() {
    return {
      index: 0,
      posts: { offset: -20 },
      s_posts: { offset: -20 },
      search_text: "",
      loading: true,
      write_box: false,
      write_box2: false,
    };
  },
  methods: {
    search(p) {
      this.$axios({
        method: "GET",
        url:
          "/codemaoapi/web/works/subjects/labels/1053/posts?keyword=" +
          this.search_text +
          "&limit=20&offset=" +
          (p - 1) * 20,
      })
        .then((response) => {
          this.s_posts = response.data;
          this.index = 1;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error); //请求失败返回的数据
          this.$message.error("未知错误");
        });
    },
    getpost(p) {
      this.$axios({
        method: "GET",
        url:
          "/codemaoapi/web/works/subjects/labels/1053/posts?limit=20&offset=" +
          (p - 1) * 20,
      })
        .then((response) => {
          this.posts = response.data;
          this.index = 0;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error); //请求失败返回的数据
          this.$message.error("未知错误");
        });
    },
    topost(currentPage) {
      this.getpost(currentPage);
    },
    stopost(currentPage) {
      this.search(currentPage);
    },
    write() {
      if (this.$store.state.user.id) {
        this.write_box = true;
      } else {
        this.$message("请先登录~");
      }
    },
    write2() {
      if (this.$store.state.user.id) {
        this.write_box2 = true;
      } else {
        this.$message("请先登录~");
      }
    },
  },
  created() {
    this.getpost(1);
  },
};
</script>

<style>
@import url(../assets/css/forum.css);
.all-post-boxs {
  position: relative;
  margin: 30px auto;
  border-radius: 10px;
  background: #ffffff;
}

@media (max-width: 700px) {
  .f-box-a {
    width: 100vw;
    margin-top: 5vw;
  }
  .f-box-b {
    position: absolute;
    width: 100vw;
    top: 40px;
    background: #ffffff;
    box-shadow: none !important;
  }
  #write {
    display: none;
  }
  #write2 {
    position: fixed;
    bottom: 20vh;
    right: 40px;
  }
}
@media (min-width: 700px) {
  .f-box-a {
    width: 50vw;
    display: inline-block;
    vertical-align: top;
    margin-left: 10vw;
  }
  .f-box-b {
    width: 25vw;
    display: inline-block;
    vertical-align: top;
    margin-left: 5vw;
  }
  #write {
    margin-top: 10px;
  }
  #write2 {
    display: none;
  }
}
</style>