<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar">
    </div>
    <div ref="editor" class="text">
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "editoritem",
  data() {
    return {
      // uploadPath,
      editor: null,
      info_: null,
    };
  },
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    isClear: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear();
        this.info_ = null;
      }
    },
    value: function (value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value);
      }
    },
    //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
  },
  mounted() {
    this.seteditor();
    this.editor.txt.html(this.value);
  },
  methods: {
    seteditor() {
      this.editor = new E(this.$refs.toolbar, this.$refs.editor);
      this.editor.customConfig.uploadImgShowBase64 = false; // base 64 存储图片
      this.editor.customConfig.uploadImgServer = "https://upload.qiniup.com/"; // 配置服务器端地址
      this.editor.customConfig.uploadImgParams = {
        token:
          "UugibeFm8mDErUcSRF-vc-oEN98pBejmQuNoXGuG:A5c8Zf_xBDlHMfNOGKwDJwO4ONc=:eyJzY29wZSI6InN0YXRpYyIsImRlYWRsaW5lIjoxNTk3OTk2NjMxfQ==",
      };
      this.editor.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024; // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
      this.editor.customConfig.emotions = [
        {
          title: "编程猫",
          type: "image",
          content: [
            {
              alt: "[编程猫_搓头]",
              src:
                "https://static.codemao.cn/emoji/codemao/编程猫_搓头.gif",
            },
            {
              alt: "[编程猫_点赞]",
              src:
                "https://static.codemao.cn/emoji/codemao/编程猫_点赞.gif",
            },
            {
              alt: "[编程猫_翻白眼]",
              src:
                "https://static.codemao.cn/emoji/codemao/编程猫_翻白眼.gif",
            },
            {
              alt: "[编程猫_嗨起来]",
              src:
                "https://static.codemao.cn/emoji/codemao/编程猫_嗨起来.gif",
            },
            {
              alt: "[编程猫_加油]",
              src:
                "https://static.codemao.cn/emoji/codemao/编程猫_加油.gif",
            },
            {
              alt: "[编程猫_冷漠]",
              src:
                "https://static.codemao.cn/emoji/codemao/编程猫_冷漠.gif",
            },
            {
              alt: "[编程猫_紧张]",
              src:
                "https://static.codemao.cn/emoji/codemao/编程猫_紧张.gif",
            },
            {
              alt: "[编程猫_厉害了]",
              src:
                "https://static.codemao.cn/emoji/codemao/编程猫_厉害了.gif",
            },
            {
              alt: "[编程猫_早呀]",
              src:
                "https://static.codemao.cn/emoji/codemao/编程猫_早呀.gif",
            },
            {
              alt: "[编程猫_溜了溜了]",
              src:
                "https://static.codemao.cn/emoji/codemao/编程猫_溜了溜了.gif",
            },
            {
              alt: "[编程猫_伤心]",
              src:
                "https://static.codemao.cn/emoji/codemao/编程猫_伤心.gif",
            },
            {
              alt: "[编程猫_耍赖]",
              src:
                "https://static.codemao.cn/emoji/codemao/编程猫_耍赖.gif",
            },
            {
              alt: "[编程猫_晚安]",
              src:
                "https://static.codemao.cn/emoji/codemao/编程猫_晚安.gif",
            },
          ],
        },
        {
          title: "emoji",
          type: "emoji",
          content: ["😀", "😃", "😄", "😁", "😆"],
        },
      ];

      // 配置菜单
      this.editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "code", // 插入代码
      ];

      this.editor.customConfig.uploadImgHooks = {
        //   fail: (xhr, editor, result) => {
        //     // 插入图片失败回调
        //   },
        //   success: (xhr, editor, result) => {
        //     // 图片上传成功回调
        //   },
        //   error: (xhr, editor) => {
        //     // 图片上传错误的回调
        //   },
        customInsert: (insertImg, result) => {
          // 图片上传成功，插入图片的回调
          //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
          // console.log(result.data[0].url)
          //insertImg()为插入图片的函数
          //循环插入图片
          // for (let i = 0; i < 1; i++) {
          let url = "https://static.codemao.cn/" + result.hash;
          insertImg(url);
          // }
        },
      };
      this.editor.customConfig.onchange = (html) => {
        this.info_ = html; // 绑定当前逐渐地值
        this.$emit("change", this.info_); // 将内容同步到父组件中
      };
      // 创建富文本编辑器
      this.editor.create();
    },
  },
};
</script>

<style lang="css">
.editor {
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 0;
  border-radius: 10px;
}
.toolbar {
  position: sticky;
  top: 0;
  z-index: 10001;
  background: #fff;
}
.text {
  border: 1px solid #dddddd;
  min-height: 400px;
}
</style>