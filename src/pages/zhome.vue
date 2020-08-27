<template>
  <div class="app">
    <div style="background:#eee;padding:3vw">
      <el-page-header @back="goBack" content="api数据管理"></el-page-header>
    </div>
    <el-form class="zhome" ref="form" :model="api" style="padding:30px">
      <div class="box">
        <el-button @click="cz" :disabled="zb<=1">撤回</el-button>
        <el-button style="float:right" @click="cy" :disabled="zb>=zapib.length">重做</el-button>
      </div>
      <el-tabs v-model="index" type="card">
        <el-tab-pane label="首页轮播图" name="1">
          <draggable v-model="api[0].items" handle=".rank">
            <div class="box" :key="i" v-for="(item,i) in api[0].items">
              <el-badge style="width:100%;margin:20px 0;" type="primary" :value="i">
                <div class="rank">
                  <i class="el-icon-rank" style="float:left"></i>
                  <p style="text-align:center">点我拖拽</p>
                </div>
                <el-form-item label="轮播图跳转链接">
                  <el-input v-model="api[0].items[i].href" clearable></el-input>
                </el-form-item>
                <el-form-item label="轮播图图片链接">
                  <el-input v-model="api[0].items[i].src" clearable></el-input>
                </el-form-item>
                <div style="margin:10px auto;text-align:center">
                  <el-button @click="api[0].items.splice(i, 1)">删除</el-button>
                </div>
              </el-badge>
            </div>
          </draggable>
          <el-button
            style="display:block;margin:10px auto"
            @click="api[0].items.push({ src: '', href: '', });"
          >添加</el-button>
        </el-tab-pane>
        <el-tab-pane label="首页关于我们" name="2">
          <el-form-item label="关于我们">
            <el-input v-model="api[3].content" type="textarea" :rows="10"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="首页重要成员" name="3">
          <draggable v-model="api[1].items" handle=".rank">
            <div class="box" :key="i" v-for="(item,i) in api[1].items">
              <div class="rank">
                <i class="el-icon-rank" style="float:left"></i>
                <p style="text-align:center">点我拖拽</p>
              </div>
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
              </div>
            </div>
          </draggable>
          <el-button
            style="display:block;margin:10px auto"
            @click="api[1].items.push({ id: '', name: '', dep:'',avatar:''});"
          >添加</el-button>
        </el-tab-pane>
        <el-tab-pane label="首页时间轴" name="4">
          <draggable v-model="api[2].items" handle=".rank">
            <div class="box" :key="i" v-for="(item,i) in api[2].items">
              <div class="rank">
                <i class="el-icon-rank" style="float:left"></i>
                <p style="text-align:center">点我拖拽</p>
              </div>
              <el-form-item label="时间轴时间">
                <el-input v-model="api[2].items[i].time" clearable></el-input>
              </el-form-item>
              <el-form-item label="时间轴内容">
                <el-input v-model="api[2].items[i].content" clearable></el-input>
              </el-form-item>
              <div style="margin:10px auto;text-align:center">
                <el-button @click="api[2].items.splice(i, 1)">删除</el-button>
              </div>
            </div>
          </draggable>
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
    <el-backtop target=".app" :visibility-height="100"></el-backtop>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      api: [],
      index: "1",
      zapib: [],
      zb: 0,
    };
  },
  /*created() {
    var ids = [];
    var s = [];
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
    this.$axios(settings).then(function (res) {
      ids=JSON.parse(res.data.message.content.blocks[0].data.text)[4];
      s=res.data.message.content.blocks[0].data.text;
    });
    var _this = this;
    this.$axios({ method: "GET", url: "/codemaoapi/web/users/details" }).then(
      function (response) {
        if (ids.includes(response.data.id)) {
          _this.api=s;
        }else{
          _this.$router.push("/")
        }
      }
    );
  },*/
  created() {
    var _this = this;
  },
  watch: {
    api: {
      handler(val) {
        this.zapib.push(JSON.stringify(this.api));
        console.log(val);
        this.zb = this.zapib.length;
      },
      // 这里是关键，代表递归监听 demo 的变化
      deep: true,
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
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
    cz() {
      if (this.zb > 1) {
        console.log(this.zapib, this.zb);
        this.api = JSON.parse(this.zapib[this.zb - 2]);
        this.zb = this.zb - 1;
      }
    },
    cy() {
      if (this.zb < this.zapib.length) {
        console.log(this.zapib, this.zb);
        this.api = JSON.parse(this.zapib[this.zb]);
        this.zb = this.zb + 1;
      }
    },
  },
};
</script>

<style>
.app {
  height: 100vh;
  overflow-y: auto;
}
.box {
  border-bottom: 1px solid #1280ff;
  padding: 8px 10px;
}
.rank {
  padding: 10px;
  background: #00000022;
  transition: 0.2s;
}
.rank:hover {
  background: #00000055;
}
</style>