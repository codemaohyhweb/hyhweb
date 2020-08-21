<template>
  <div style="position:relative">
    <div class="navbar-s"></div>
    <div :class="this.navbarS>=100?'navbarS':''" class="navbar">
      <el-menu :default-active="activeIndex" mode="horizontal" menu-trigger="click" router>
        <el-menu-item>
          <div class="logo"></div>
        </el-menu-item>
        <el-menu-item v-for="(n,index) in navbar" :key="index" :index="n.path">{{n.text}}</el-menu-item>
        <!-- <el-menu-item class="right" v-if="!user.userName" index="/login">登录/注册</el-menu-item>
        <el-submenu class="right" v-if="user.userName" index="/user">
          <template slot="title">
            <el-avatar :size="30" :src="user.avatarUrl"></el-avatar>
          </template>
          <el-menu-item :index="'/user/' + user.userId">我的主页</el-menu-item>
          <el-divider class="nav-divider"></el-divider>
          <el-menu-item index="/new">新建项目</el-menu-item>
          <el-divider class="nav-divider"></el-divider>
          <el-menu-item index="/profile">设置</el-menu-item>
          <el-menu-item index="/help">帮助</el-menu-item>
          <el-divider class="nav-divider"></el-divider>
          <el-menu-item @click="sign_out">退出登录</el-menu-item>
        </el-submenu>-->
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: this.$route.path,
      navbarS: 0,
      navbar: [
        {
          path: "/",
          text: "首页",
        },
        {
          path: "/member",
          text: "成员",
        },
        {
          path: "/forum",
          text: "论坛",
        },
        {
          path: "/class",
          text: "教程",
        },
      ],
    };
  },
  mounted() {
    window.addEventListener("scroll", this.s);
  },
  methods: {
    s() {
      this.navbarS = document.documentElement.scrollTop;
    },
  },
  watch: {
    "$route.path": function () {
      this.activeIndex = this.$route.path;
      var s = false;
      for (var i = 0; i < this.navbar.length; i++) {
        if (this.navbar[i].path == this.$route.path) {
          s = true;
        }
      }
      if (!s) {
        this.$router.push("/");
        this.$message({
          showClose: true,
          type:"error",
          message: "该网页走丢了，已为您跳转首页~",
        });
      }
    },
  },
  //   computed: {
  //     user() {
  //       return this.$store.state.user;
  //     }
  //   }
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
</style>
