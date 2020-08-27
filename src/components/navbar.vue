<template>
  <div style="position:relative">
    <div class="navbar-s"></div>
    <div :class="this.navbarS>=100?'navbarS':''" class="navbar">
      <el-menu :default-active="activeIndex" mode="horizontal" menu-trigger="click" router>
        <el-menu-item class="navbar-logo">
          <div class="logo"></div>
        </el-menu-item>
        <el-menu-item v-for="(n,index) in navbar" :key="index" :index="n.path">{{n.text}}</el-menu-item>
        <el-menu-item class="right" v-if="!user.id">
          <a @click="log_box_w=30;sign_box=true;sign_name='in'">登录</a>
        </el-menu-item>
        <el-submenu index="/" class="right" v-if="user.id">
          <template slot="title">
            <el-avatar :size="30" :src="user.avatar_url" />
          </template>
          <el-menu-item @click="sign_out()">退出登录</el-menu-item>
        </el-submenu>
        <el-menu-item @click="drawer=true" class="navbar-open">
          <i class="el-icon-menu"></i>
        </el-menu-item>
      </el-menu>
    </div>
    <el-dialog title="登录" :close-on-click-modal="false" :visible.sync="sign_box" :width="log_box_w+'%'">
      <signin/>
    </el-dialog>
    <el-drawer :visible.sync="drawer" direction="rtl" :with-header="false">
      <div style="width:300px">
        <el-menu :default-active="activeIndex" menu-trigger="click" router>
          <el-menu-item v-for="(n,index) in navbar" :key="index" :index="n.path">{{n.text}}</el-menu-item>
          <el-menu-item v-if="!user.id">
            <a @click="log_box_w=90;sign_box=true;sign_name='in'">登录</a>
          </el-menu-item>
          <el-submenu index="/" v-if="user.id">
            <template slot="title">
              <el-avatar :size="30" :src="user.avatar_url" />
            </template>
            <el-menu-item @click="sign_out()">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import signin from "./sign/signin";
export default {
  components: {
    signin,
  },
  data() {
    return {
      activeIndex: this.$route.path,
      navbarS: 0,
      drawer: false,
      log_box_w: 30,
      navbar: [
        {
          path: "/",
          text: "首页",
        },
        {
          path: "/blog",
          text: "博客",
        },
        {
          path: "/forum",
          text: "论坛",
        },
      ],
      user: this.$store.state.user,
      sign_box: false,
      sign_name: "in",
    };
  },
  mounted() {
    window.addEventListener("scroll", this.s);
  },
  methods: {
    s() {
      this.navbarS = document.documentElement.scrollTop;
    },
    open() {
      console.log(this.w);
    },
    sign_out() {
      this.$store.state.user = {};
      this.$store.commit("signout");
    },
  },
  watch: {
    "$store.state.user": function () {
      this.user = this.$store.state.user;
    },
  },
  created() {
    this.$store.commit("getuser");
  },
};
</script>
<style>
.navbar {
  z-index: 1000;
  width: 100%;
  user-select: none;
  top: 0;
  position: absolute;
}
.navbar-s {
  height: 60px;
}
.navbarS {
  animation: navbar_fixed 0.3s ease-out;
  top: 0;
  position: fixed;
  box-shadow: 0 10px 33px rgba(9, 16, 43, 0.15);
}
@keyframes navbar_nofixed {
  0% {
    position: fixed;
    top: 0px;
    box-shadow: 0 10px 33px rgba(9, 16, 43, 0.15);
  }
  100% {
    top: -60px;
    box-shadow: none;
  }
}
@keyframes navbar_fixed {
  0% {
    top: -60px;
    opacity: 0;
    box-shadow: none;
  }
  100% {
    top: 0;
    opacity: 1;
    box-shadow: 0 10px 33px rgba(9, 16, 43, 0.15);
  }
}
.right {
  float: right !important;
}

.nav-divider {
  margin: 0;
  width: 90%;
  margin-left: 5%;
}

.el-menu-item {
  font-size: 16px !important;
}
/*修改导航栏效果*/

.el-menu--horizontal > .el-menu-item.is-active::after {
  content: "";
  position: absolute;
  bottom: -3px;
  border-radius: 2px;
  width: 100%;
  height: 2px;
  left: 0;
  background: #409eff;
}
.navbar-open {
  display: none;
  float: right !important;
}
@media (max-width: 700px) {
  .navbar .el-menu-item {
    display: none !important;
  }
  .navbar .el-submenu {
    display: none !important;
  }
  .navbar .navbar-logo {
    display: inline-block !important;
  }
  .navbar .navbar-open {
    display: inline-block !important;
  }
}

</style>
