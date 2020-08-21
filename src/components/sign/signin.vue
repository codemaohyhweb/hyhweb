<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-position="top"
      label-width="100%"
      class="demo-ruleForm"
      v-if="index==0"
    >
      <el-form-item prop="id">
        <el-input v-model="ruleForm.id" placeholder="用户名/手机号/邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input placeholder="密码" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
      <el-button
        type="text"
        @click="$alert('目前还不支持手机验证码登录', '抱歉', { confirmButtonText: '确定'});"
      >手机验证码登录</el-button>
    </el-form>
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="ruleForm2"
      label-position="top"
      label-width="100%"
      class="demo-ruleForm"
      v-if="index==1"
    >
      <el-form-item prop="phone">
        <el-input v-model="ruleForm2.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="vpass">
        <el-row :gutter="20">
          <el-col :span="15">
            <el-input placeholder="验证码" v-model="ruleForm2.vpass" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="8">
            <el-button @click="vpb_on" :disabled="vpb_d">{{vpb_text}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%" @click="submitForm('ruleForm2')">登录</el-button>
      </el-form-item>
      <el-button type="text" @click="index=0">密码登录</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      index: 0,
      vpb_text: "发送验证码",
      vpb_d: false,
      ruleForm: {
        id: "",
        pass: "",
      },
      rules: {
        id: [{ required: true, message: "不能为空", trigger: "blur" }],
        pass: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
      ruleForm2: {
        phone: "",
        vpass: "",
      },
      rules2: {
        phone: [{ validator: checkPhone, trigger: "blur" }],
        vpass: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    vpb_on() {
      this.$refs["ruleForm2"].validateField("phone", (err) => {
        if (err) {
          return false;
        } else {
          this.tackBtn();
          this.$axios
            .post("/api/captcha/rule", { identity: this.ruleForm2.phone })
            .then(function (response) {
              console.log(response);
            });
        }
      });
    },
    tackBtn() {
      //验证码倒数60秒
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.vpb_text = "发送验证码";
          this.vpb_d = false;
        } else {
          this.vpb_d = true;
          this.vpb_text = time + "秒后重试";
          time--;
        }
      }, 1000);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName == "ruleForm") {
            this.$store.commit("signin", {
              id: this.ruleForm.id,
              password: this.ruleForm.pass,
            });
          } else {
            this.$alert("这是一段内容");
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>