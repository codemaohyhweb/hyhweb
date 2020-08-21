<template>
  <div>
    <el-input v-model="title" style="display:block;margin:auto" placeholder="请输入标题(5-50字)"></el-input>
    <br />
    <editor-bar v-model="detail" :isClear="isClear" @change="change"></editor-bar>
    <br />
    <el-button type="primary" @click="post" style="display:block;margin:auto">发布</el-button>
  </div>
</template>

<script>
import EditorBar from "./writeset";
export default {
  components: {
    EditorBar,
  },
  data() {
    return {
      title: "",
      content: "",
      isClear: false,
      detail: "",
    };
  },
  methods: {
    post() {
      var data = {
        title: this.title,
        content: this.content,
      };
      this.$store.commit("write", data);
    },
    change(val) {
      this.content = val;
    },
  },
};
</script>

<style>
</style>