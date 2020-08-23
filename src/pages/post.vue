<template>
  <div class="post">
    <div class="r-community-r-detail--forum_container">
      <div class="r-community-r-detail--forum_title">{{post.title}}</div>
      <div class="r-community-r-detail--forum_info">
        <i class="r-community-r-detail--icon_view"></i>
        {{post.n_views}}&nbsp;&nbsp;&nbsp;&nbsp;
        <i
          class="r-community-r-detail--icon_comment"
        ></i>
        {{post.n_comments}}
      </div>
      <div class="r-community-r-detail--forum_user_info">
        <div class="r-community-r-detail--user_face">
          <div
            class="r-community-r-detail--user_head"
            :style="'background-image: url('+post.user.avatar_url+');'"
          ></div>
        </div>
        <div class="r-community-r-detail--author">
          <a
            class="r-community-r-detail--author_link"
            :href="'https://shequ.codemao.cn/user/'+post.user.id"
          >{{post.user.nickname}}</a>
        </div>
        <p class="r-community-r-detail--publish_time" v-format="'YYYY-MM-DD'">{{post.created_at}}</p>
      </div>
      <div class="r-community-r-detail--forum_content" v-html="post.content"></div>
      <el-button type="primary" style="margin:10px auto;display:block" @click="bottom()">发布回帖</el-button>
      <div class="r-community-r-detail--forum_comments_container">
        <p class="r-community-r-detail--comments_title">
          全部回帖:
          <span>{{post.n_replies}}</span>
        </p>
        <div class="c-comment--comment_list" v-for="(postc,item) in postr.items" :key="item">
          <!-- 懒得改了 -->
          <div class="c-comment-c-comment_item--comment_item">
            <div class="c-comment-c-comment_item--user_face">
              <div
                class="c-comment-c-comment_item--user_head"
                :style="'background-image: url('+postc.user.avatar_url+');'"
              ></div>
            </div>
            <div class="c-comment-c-comment_item--content_container">
              <div class="c-comment-c-comment_item--author">
                <a
                  :href="'https://shequ.codemao.cn/user/'+postc.user.id"
                  target="_blank"
                  class="c-comment-c-comment_item--author_link"
                >{{postc.user.nickname}}</a>
              </div>
              <p class="c-comment-c-comment_item--content" v-html="postc.content"></p>
              <p class="c-comment-c-comment_item--content_bottom" v-format="'YYYY-MM-DD'">{{postc.created_at}}</p>
              <div
                class="c-comment-c-comment_reply--reply_container"
                v-for="(postcr,index) in postr.earliest_comments"
                :key="index"
              >
                <div class="c-comment-c-comment_reply--reply_list">
                  <div class="c-comment-c-comment_reply--reply_item">
                    <div class="c-comment-c-comment_reply--user_face">
                      <div
                        class="c-comment-c-comment_reply--user_head"
                        :style="'background-image: url('+postcr.user.avatar_url+');'"
                      ></div>
                    </div>
                    <div class="c-comment-c-comment_reply--content_container">
                      <div class="c-comment-c-comment_reply--author">
                        <a
                          :href="'https://shequ.codemao.cn/user/'+postcr.user.id"
                          target="_blank"
                          class="c-comment-c-comment_reply--author_link"
                        >{{postcr.user.nickname}}</a>：
                        <span>{{postcr.content}}</span>
                      </div>
                      <p class="c-comment-c-comment_reply--content_bottom" v-format="'YYYY-MM-DD'">{{postcr.created_at}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="p-write">
          <writeset-vue v-model="rtext" />
        </div>
        <div class="p-write-t">
          <router-link targe="_blank" to="/post/167540">编程猫社区守则＞</router-link>
          <el-button type="primary" @click="writepostr">发布回帖</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import writesetVue from "../components/writeset.vue";
export default {
  components: {
    writesetVue,
  },
  data() {
    return {
      post: {},
      postr: [],
      rtext: "",
      rrtext: "",
    };
  },
  methods: {
    bottom(){
      window.scrollTo(0, document.body.clientHeight-1000);
    },
    getpostr(page) {
      var _this = this;
      this.$axios(
        "/codemaoapi/web/forums/posts/" +
          this.$route.params.id +
          "/replies?page=" +
          page +
          "&limit=10&sort=-created_at"
      ).then(function (res) {
        _this.postr = res.data;
      });
    },
    writepostr() {
      var data = {
        content: this.rtext,
      };
      this.$axios({
        method: "POST",
        url:
          "/codemaoapi/web/forums/posts/" + this.$route.params.id + "/replies",
        data: data,
      });
    },
    writepostrr(id) {
      var data = {
        parent_id: 0,
        content: this.rrtext,
      };
      this.$axios({
        method: "POST",
        url: "/codemaoapi/web/forums/replies/" + id + "/comments",
        data: data,
      });
    },
  },
  created() {
    var _this = this;
    this.$axios(
      "/codemaoapi/web/forums/posts/" + this.$route.params.id + "/details"
    ).then(function (res) {
      _this.post = res.data;
    });
    this.getpostr(1);
  },
  watch: {
    "$route.params.id": function () {
      var _this = this;
      this.$axios(
        "/codemaoapi/web/forums/posts/" + this.$route.params.id + "/details"
      ).then(function (res) {
        _this.post = res.data;
      });
      this.getpostr(1);
    },
  },
};
</script>

<style>
@import url(../assets/post.css);
.p-write {
  height: 300px;
  overflow: auto;
}
.p-write-t {
  text-align: right;
  padding: 10px 0;
}
</style>