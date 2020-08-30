<template>
  <div>
    <el-dialog title="用户协议" :visible.sync="al_box" width="500px">
      <span style="height:200px;overflow: auto;display:block;text-indent:2rem">
        编程猫后援会是一款由我们提供服务的网站，为说明网站会如何收集、使用和存储你的个人信息及你享有何种权利，我们将通过本指引向你阐述相关事宜，其中要点如下：
        <br />
        <br />i. 我们将逐一说明我们收集的你的个人信息类型及其对应的用途，以便你了解我们针对某一特定功能所收集的具体个人信息的类别、使用理由及收集方式。
        <br />
        <br />ii. 当你使用一些功能时，我们会在获得你的同意后，收集你的一些敏感信息，例如你在使用发贴功能时我们会收集你的文本信息，你在使用登录功能时编程猫API会收集你的手机号码及密码信息，并由编程猫的API处理，除非按照相关法律法规要求必须收集，拒绝提供这些信息仅会使你无法使用相关特定功能，但不影响你正常使用网站的其他功能。
        <br />
        <br />iii. 目前，编程猫后援会官网不会主动共享或转让你的个人信息至（Mai工作室服务器和编程猫API处理）除外的的第三方，如存在其他共享或转让你的个人信息或你需要我们将你的个人信息共享或转让至（编程猫API处理）外的第三方情形时，我们会直接征得或确认第三方征得你对上述行为的明示同意，此外，我们会对对外提供信息的行为进行风险评估。
        <br />
        <br />iv. 目前，编程猫后援会不会主动从（编程猫API处理）外的第三方获取你的个人信息。如未来为业务发展需要从第三方间接获取你的个人信息，我们会在获取前向你明示你个人信息的来源、类型及使用范围，如编程猫后援会开展业务需进行的个人信息处理活动超出你原本向第三方提供个人信息时的授权同意范围，我们将在处理你的该等个人信息前，征得你的明示同意；此外，我们也将会严格遵守相关法律法规的规定，并要求第三方保障其提供的信息的合法性。
        <br />
        <br />v. 你可以通过本指引所列途径访问、更正、删除你的个人信息，也可以撤回同意、注销帐号、投诉举报以及设置隐私功能。
        <br />
        <br />vi. 为了在本指引下收集你的信息，或者向你提供服务、优化我们的服务以及保障你的帐号安全，我们将需要向你索取相关的权限；其中的敏感权限例如通讯录、精确地理位置、摄像头、麦克风、相册等均不会默认开启，只有在你明确同意后才会向我们授权。 需要特别说明的是，获得敏感权限是我们收集特定信息的必要而非充分条件。我们获得具体某一项敏感权限并不代表我们必然会收集你的相关信息；即使我们已经获得敏感权限，也仅在必要时、根据本指引来收集你的相关信息。
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="signForm.al=false;al_box = false">取 消</el-button>
        <el-button type="primary" @click="signForm.al=true;al_box = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-form
      :model="signForm"
      status-icon
      :rules="rules"
      ref="signForm"
      label-position="top"
      label-width="100%"
      class="demo-signForm"
      v-if="index==0"
    >
      <div>
        <i class="el-icon-warning-outline"></i>
        使用编程猫账号登录
      </div>
      <br />
      <el-form-item prop="id">
        <el-input v-model="signForm.id" placeholder="用户名/手机号/邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input placeholder="密码" type="password" v-model="signForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="al">
        <el-checkbox v-model="signForm.al">
          我已阅读并同意
          <span @click="al_box=true">《用户协议》</span>
        </el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%" @click="submitForm('signForm')">登录</el-button>
      </el-form-item>
      <a
        style="float:left;padding:10px;"
        target="_blank"
        href="/#/post_err"
      >登录遇到问题？</a>
      <a
        style="float:right;padding:10px;"
        target="_blank"
        href="https://shequ.codemao.cn"
      >注册账号</a>
      <br>
    </el-form>
    <el-form
      :model="signForm2"
      status-icon
      :rules="rules2"
      ref="signForm2"
      label-position="top"
      label-width="100%"
      class="demo-signForm"
      v-if="index==1"
    >
      <el-form-item prop="phone">
        <el-input v-model="signForm2.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="vpass">
        <el-row :gutter="20">
          <el-col :span="15">
            <el-input placeholder="验证码" v-model="signForm2.vpass" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="8">
            <el-button @click="vpb_on" :disabled="vpb_d">{{vpb_text}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%" @click="submitForm('signForm2')">登录</el-button>
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
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    var als = (rule, value, callback) => {
      if (this.signForm.al == false) {
        return callback(new Error("请勾选用户协议"));
      } else {
        callback();
      }
    };
    return {
      index: 0,
      vpb_text: "发送验证码",
      vpb_d: false,
      al_box: false,
      signForm: {
        id: "",
        pass: "",
        al:false,
      },
      rules: {
        id: [{ required: true, message: "不能为空", trigger: "blur" }],
        pass: [{ required: true, message: "不能为空", trigger: "blur" }],
        al: [{ validator: als, trigger: "blur" }],
      },
      signForm2: {
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
      this.$refs["signForm2"].validateField("phone", (err) => {
        if (err) {
          return false;
        } else {
          this.tackBtn();
          this.$axios
            .post("/api/captcha/rule", { identity: this.signForm2.phone })
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
          if (formName == "signForm") {
            this.$store.commit("signin", {
              id: this.signForm.id,
              password: this.signForm.pass,
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