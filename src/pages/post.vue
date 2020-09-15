<template>
  <div id="post">
    <navbar></navbar>
    <div style="height:100vh" v-if="loading" v-loading="loading"></div>
    <div class="r-community-r-detail--forum_container" v-if="!loading">
      <div class="r-community-r-detail--forum_title">{{post.title}}</div>
      <div class="r-community-r-detail--forum_info">
        <i class="r-community-r-detail--icon_view"></i>
        {{post.n_views}}&nbsp;&nbsp;&nbsp;&nbsp;
        <i
          class="r-community-r-detail--icon_comment"
        ></i>
        {{post.n_replies}}
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
            target="_blank"
            :href="'https://shequ.codemao.cn/user/'+post.user.id"
          >{{post.user.nickname}}</a>
        </div>
        <p class="r-community-r-detail--publish_time">{{stime(post.created_at)}}</p>
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
              <p class="c-comment-c-comment_item--content_bottom">{{stime(postc.created_at)}}</p>
              <div
                class="c-comment-c-comment_reply--reply_container"
                v-for="(postcr,index) in postc.earliest_comments"
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
                      <p
                        class="c-comment-c-comment_reply--content_bottom"
                      >{{stime(postcr.created_at)}}</p>
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
          <writeset-vue id="pwrite" v-model="rtext" />
          <el-input
            id="pwrite2"
            v-model="rtext"
            style="display:block;width:90%;margin:0 auto"
            type="textarea"
            :rows="10"
          ></el-input>
        </div>
        <div class="p-write-t">
          <router-link targe="_blank" to="/post/167540" style="margin-right:10px">编程猫社区守则＞</router-link>
          <el-button type="primary" style="margin-right:20px" @click="writepostr">发布回帖</el-button>
        </div>
      </div>
    </div>
    <zfooter></zfooter>
  </div>
</template>

<script>
import writesetVue from "../components/write/writeset.vue";
import zfooter from "../components/footer";
import navbar from "../components/navbar";
export default {
  components: {
    navbar,
    zfooter,
    writesetVue,
  },
  data() {
    return {
      post: {},
      postr: [],
      rtext: "",
      rrtext: "",
      loading: true,
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
    bottom() {
      window.scrollTo(0, document.body.clientHeight - 1000);
    },
    getpostr(page) {
      this.$axios(
        "/codemaoapi/web/forums/posts/" +
          this.$route.params.id +
          "/replies?page=" +
          page +
          "&limit=10&sort=-created_at"
      ).then((res) => {
        this.postr = res.data;
      });
    },
    writepostr() {
      if (this.rtext.length <= 3) {
        this.$message.info("回复内容必须大于3个字哦~");
      } else {
        var data = {
          content: this.rtext,
        };
        this.$axios({
          method: "POST",
          url:
            "/codemaoapi/web/forums/posts/" +
            this.$route.params.id +
            "/replies",
          data: data,
        })
          .then(() => {
            this.$message.success("回复成功~");
            window.location.reload();
          })
          .catch(() => {
            this.$message.error("未知错误");
          });
      }
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
    this.$axios(
      "/codemaoapi/web/forums/posts/" + this.$route.params.id + "/details"
    ).then((res) => {
      this.post = res.data;
      this.loading = false;
    });
    this.getpostr(1);
  },
  watch: {
    "$route.params.id": function () {
      this.$axios(
        "/codemaoapi/web/forums/posts/" + this.$route.params.id + "/details"
      ).then((res) => {
        this.post = res.data;
      });
      this.getpostr(1);
    },
  },
};
</script>

<style>
@import url(../assets/css/post.css);
.p-write {
  overflow: auto;
}
.p-write-t {
  text-align: right;
  padding: 10px 0;
}
@media (max-width: 700px) {
  #pwrite {
    display: none;
  }
}
@media (min-width: 700px) {
  #pwrite2 {
    display: none;
  }
}
</style>