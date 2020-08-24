<template>
  <div>
    <el-form ref="form" :model="api" style="padding:30px">
      <el-tabs v-model="index" type="card">
        <el-tab-pane label="首页轮播图" name="1">
          <div class="box" :key="i" v-for="(item,i) in api[0].items">
            <el-badge style="width:100%;margin:20px 0" type="primary" :value="i">
              <el-form-item label="轮播图跳转链接">
                <el-input v-model="api[0].items[i].href" clearable></el-input>
              </el-form-item>
              <el-form-item label="轮播图图片链接">
                <el-input v-model="api[0].items[i].src" clearable></el-input>
              </el-form-item>
              <div style="margin:10px auto;text-align:center">
                <el-button @click="api[0].items.splice(i, 1)">删除</el-button>
                <el-button @click="move(0,i)">移动</el-button>
              </div>
            </el-badge>
          </div>
          <el-button
            style="display:block;margin:10px auto"
            @click="api[0].items.push({ src: '', href: '', });"
          >添加</el-button>
        </el-tab-pane>
        <el-tab-pane label="首页关于我们" name="2">
          <el-form-item label="轮播图跳转链接">
            <el-input v-model="api[3].content" type="textarea" :rows="10"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="首页重要成员" name="3">
          <div class="box" :key="i" v-for="(item,i) in api[1].items">
            <el-form-item label="成员id">
              <el-input v-model="api[1].items[i].id" clearable></el-input>
            </el-form-item>
            <el-form-item label="成员名字">
              <el-input v-model="api[1].items[i].name" clearable></el-input>
            </el-form-item>
            <el-form-item label="成员介绍">
              <el-input v-model="api[1].items[i].dep" clearable></el-input>
            </el-form-item>
            <div style="margin:10px auto;text-align:center">
              <el-button @click="api[1].items.splice(i, 1)">删除</el-button>
              <el-button @click="move(1,i)">移动</el-button>
            </div>
          </div>
          <el-button
            style="display:block;margin:10px auto"
            @click="api[1].items.push({ id: '', name: '', dep:'',avatar:''});"
          >添加</el-button>
        </el-tab-pane>
        <el-tab-pane label="首页时间轴" name="4">
          <div class="box" :key="i" v-for="(item,i) in api[2].items">
            <el-form-item label="时间轴时间">
              <el-input v-model="api[2].items[i].time" clearable></el-input>
            </el-form-item>
            <el-form-item label="时间轴内容">
              <el-input v-model="api[2].items[i].content" clearable></el-input>
            </el-form-item>
            <div style="margin:10px auto;text-align:center">
              <el-button @click="api[2].items.splice(i, 1)">删除</el-button>
              <el-button @click="move(2,i)">移动</el-button>
            </div>
          </div>
          <el-button
            style="display:block;margin:10px auto"
            @click="api[2].items.push({ time:'',content:''});"
          >添加</el-button>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" style="display:block;width:100%" @click="to">上传</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      api: [],
      index: "1",
    };
  },
  created() {
    var ids = ["371087"];
    var _this = this;
    this.$axios({ method: "GET", url: "/codemaoapi/web/users/details" }).then(
      function (response) {
        if (!ids.includes(response.data.id)) {
          this.$router.push("/");
        } else {
          var settings = {
            url:
              "/baklibapi/articles/3cd6b2a0-86c1-409a-b0a1-24822c14a581?tenant_id=a5e31530-0273-48ba-985d-3f425ab577c1",
            method: "GET",
            timeout: 0,
            headers: {
              Authorization:
                "Bearer 6e2b76bdf1493cbc7db23b57c3dedc75be40d0407230e2f022326ae54ae5adf5",
              "Content-Type": "application/json",
            },
          };
          _this.$axios(settings).then(function (res) {
            _this.api = JSON.parse(
              res.data.message.content.blocks[0].data.text
            );
          });
        }
      }
    );
  },
  watch: {
    api: function () {
      console.log(this.api);
    },
  },
  methods: {
    move(o, i) {
      this.api[o].items[i];
      this.$prompt("请输入要转移的位置（例如：0）", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\d*$/,
        inputErrorMessage: "请输入一个数字",
      }).then(({ value }) => {
        if (value << 0 || value >= this.api[o].items.lenght) {
          this.$message({
            type: "error",
            message: "数组没有该项",
          });
        } else {
          var t = this.api[o].items[i];
          this.api[o].items.splice(i, 1, this.api[o].items[value]);
          this.api[o].items.splice(value, 1, t);
        }
      });
    },
    to() {
      var _this = this;
      var p = JSON.stringify(this.api);
      console.log(p);
      this.$axios({
        method: "put",
        url: "/baklibapi/articles/3cd6b2a0-86c1-409a-b0a1-24822c14a581",
        params: {
          tenant_id: "a5e31530-0273-48ba-985d-3f425ab577c1",
          content: p,
        },
        headers: {
          Authorization:
            "Bearer 6e2b76bdf1493cbc7db23b57c3dedc75be40d0407230e2f022326ae54ae5adf5",
          "Content-Type": "application/json",
        },
      })
        .then(function () {
          _this.$message.success("成功~");
        })
        .catch(function () {
          _this.$message.error("未知错误");
        });
    },
  },
};
</script>

<style>
.box {
  border-bottom: 1px solid #1280ff;
  padding: 8px 10px;
}
</style>