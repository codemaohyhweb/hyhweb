<template>
  <div>
    <el-row type="flex" justify="center" :gutter="20">
      <el-col :span="12" v-loading="loading">
        <div v-if="index==0" class="all-post-boxs">
          <div style="padding:10px">全部帖子（{{posts.total}}）</div>
          <el-row>
            <el-col v-for="(post,item) in posts.items" :key="item">
              <router-link class="forum_to" :to="'/post/'+post.id">
                <li class="c-post_list--post_body">
                  <div class="c-post_list--post_container">
                    <div class="c-post_list--post_header">
                      <img :src="post.user.avatar_url" alt="头像" class="c-post_list--pointer" />
                      <span class="c-post_list--pointer">{{post.user.nickname}}</span>
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
        <div v-if="index==1" class="all-post-boxs">
          <div style="padding:10px">
            <el-page-header
              @back="index=0"
              :content="'为您找到（'+this.s_posts.total+'）条关于‘'+this.search_text+'’的帖子'"
            ></el-page-header>
          </div>
          <el-row>
            <el-col v-for="(post,item) in s_posts.items" :key="item">
              <router-link class="forum_to" :to="'/post/'+post.id">
                <li class="c-post_list--post_body">
                  <div class="c-post_list--post_container">
                    <div class="c-post_list--post_header">
                      <img :src="post.user.avatar_url" alt="头像" class="c-post_list--pointer" />
                      <span class="c-post_list--pointer">{{post.user.nickname}}</span>
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
                background
                layout="prev, pager, next"
                :total="s_posts.total"
              />
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="all-post-boxs" style="text-align:center;padding:20px">
          <el-input
            placeholder="搜索"
            prefix-icon="el-icon-search"
            v-model="search_text"
            @keyup.enter.native="search(1)"
          ></el-input>
          <br />
          <br />
          <el-button type="primary" style="width:100%" icon="el-icon-edit" @click="write">发布帖子</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      posts: { offset: -20 },
      s_posts: { offset: -20 },
      search_text: "",
      loading: true,
    };
  },
  methods: {
    search(p) {
      this.$axios({
        method: "GET",
        url:
          "/api/web/works/subjects/labels/1053/posts?keyword=" +
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
          "/api/web/works/subjects/labels/1053/posts?limit=20&offset=" +
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
    write() {
      this.$confirm("是否要跳转至编程猫发布？", "该功能暂时还未能使用", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.open("https://shequ.codemao.cn/work_shop/856")
        })
    },
  },
  created() {
    this.getpost(1);
  },
};
</script>

<style>
@import url(../assets/forum.css);
.all-post-boxs {
  position: relative;
  margin: 30px auto;
  border-radius: 10px;
  box-shadow: 0 4px 9px rgb(168, 165, 165);
}
</style>