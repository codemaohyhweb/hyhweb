<template>
  <div class="post_err">
    <br />
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-position="top"
      label-width="100%"
      class="demo-ruleForm"
    >
      <h1>编程猫后援会官网反馈平台</h1>
      <el-divider></el-divider>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" placeholder="您的名字"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="pe">
        <el-input placeholder="您的联系方式(QQ/电话号码/微信)" v-model="ruleForm.pe"></el-input>
      </el-form-item>
      <el-form-item label="反馈内容" prop="content">
        <el-input
          resize="none"
          type="textarea"
          rows="8"
          minlength="20"
          maxlength="300"
          show-word-limit
          placeholder="反馈的内容（15-300字左右）"
          v-model="ruleForm.content"
        ></el-input>
      </el-form-item>
      <br />
      <el-form-item>
        <el-button type="primary" style="width:100%" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
      <br />
      <el-divider>CodemaoHYH</el-divider>
      <br />
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        pe: "",
        content: "",
      },
      rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        pe: [{ required: true, message: "不能为空", trigger: "blur" }],
        content: [
          { required: true, message: "不能为空", trigger: "blur" },
          { min: 20, max: 300, message: "字数须在20-300之间", trigger: "blur" },
        ],
      },
      submitForm() {
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            var data = {
              name: this.ruleForm.name,
              pe: this.ruleForm.pe,
              content: this.ruleForm.content,
            };
            this.$axios({
              method: "POST",
              data: data,
              url: "/api/post_err/add",
            })
              .then((res) => {
                console.log(res);

                if (res.status == 201) {
                  this.$message.success("已成功提交反馈");
                } else {
                  this.$message.info("操作过于频繁！");
                }
              })
              .catch((err) => {
                console.log(err);
                this.$message.error("未知错误");
              });
          } else {
            return false;
          }
        });
      },
    };
  },
};
</script>

<style>
.post_err {
  width: 50vw;
  padding: 0 5vw;
  background: #ffffff;
  border-radius: 10px;
  margin: 0 auto;
}
.post_err h1 {
  text-align: center;
}
@media (max-width: 700px) {
  .post_err {
    width: auto !important;
    padding: 0 5vw !important;
  }
}
</style>