<template>
  <div>
    <el-input v-model="title" style="display:block;margin:auto" placeholder="请输入标题(5-50字)"></el-input>
    <br>
    <el-input v-model="content" style="display:block;margin:auto" type="textarea" :rows="10"></el-input>
    <br>
    <el-button type="primary" @click="post" style="width:100%;display:block;margin:auto">发布</el-button>
  </div>
</template>

<script>
export default {
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
      if (this.title.length < 5 || this.title.length > 50) {
        this.$message.error("( ఠൠఠ )ﾉ标题要求（5-50字内）");
      } else {
        if (this.content.length <= 20) {
          this.$message.error("内容太少了~再肝点吧ε=ε=ε=(~￣▽￣)~");
        } else {
          var data = {
            title: this.title,
            content: this.content,
          };
          this.$store.commit("write", data);
        }
      }
    },
    change(val) {
      this.content = val;
    },
  },
};
</script>

<style>
</style>