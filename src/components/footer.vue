<template>
  <footer>
    <div class="footer">
      <div class="footer-box">
        <div class="footer-item">
          <div class="footer-item-h">关于我们</div>
          <div class="footer-item-p">编程猫后援会</div>
          <div class="footer-item-p">
            <a href="https://shequ.codemao.cn" target="_blank" rel="noopener noreferrer">编程猫社区</a>
          </div>
          <div class="footer-item-p">
            <a
              href="https://qm.qq.com/cgi-bin/qm/qr?k=nT-42kovrX3KEPoiwo8DlERw27LGmBUu&jump_from=webapi"
              target="_blank"
              rel="noopener noreferrer"
            >加入我们</a>
          </div>
        </div>
        <div class="footer-item">
          <div class="footer-item-h">联系我们</div>
          <div class="footer-item-p">
            <a href="/#/post_err" target="_blank" rel="noopener noreferrer">反馈问题</a>
          </div>
        </div>
        <div class="footer-item">
          <div class="footer-item-h">友情链接</div>
          <div class="footer-item-p">
            <a href="https://www.codemao.cn" target="_blank" rel="noopener noreferrer">编程猫</a>
          </div>
          <div class="footer-item-p">
            <a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=bCaAxbOWcdOkT6kanFFTu5D9OBJUzI2r&jump_from=webapi" rel="noopener noreferrer">曈星社</a>
          </div>
        </div>
        <div class="footer-item">
          <div class="footer-other">
            <div class="footer-other-item">
              <a
                href="https://space.bilibili.com/444138308?from=search&seid=3399642198415679525"
                target="_blank"
                rel="noopener noreferrer"
              >
                <el-image
                  class="footer-other-item-icon"
                  :src="require('../assets/img/bilibili.svg')"
                ></el-image>
              </a>
            </div>
            <div class="footer-other-item">
              <a
                href="https://qm.qq.com/cgi-bin/qm/qr?k=nT-42kovrX3KEPoiwo8DlERw27LGmBUu&jump_from=webapi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <el-image
                  style="width: 30px; margin-top: 35px; height: 30px;"
                  class="footer-other-item-icon"
                  :src="require('../assets/img/qq.svg')"
                ></el-image>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
.footer {
  width: 100vw;
  background: #1a1e2f;
  text-align: center;
}
.footer-box {
  padding: 5vw 20vh;
}
.footer-item {
  display: inline-block;
  vertical-align: top;
  padding: 50px 40px;
  text-align: left;
}
@media (max-width: 700px) {
  .footer-item {
    display: block !important;
    text-align: center !important;
    padding: 0 !important;
  }
  .footer-box {
    padding: 5vh 2vw;
  }
  .footer-other-item {
    width: 80vw !important;
    display: block !important;
  }
}
.footer-item-h {
  color: #fff;
  margin-bottom: 15px;
  font-size: 17px;
}
.footer-item-p {
  color: #54565a;
  transition: 0.2s;
  font-size: 15px;
  line-height: 30px;
  cursor: pointer;
}
.footer-item-p:hover {
  color: #1280ff;
}
.footer-other {
  border-left: 1px solid #bbbbbb;
  padding-left: 20px;
}
.footer-other-item-icon {
  width: 50px;
  height: 50px;
  line-height: 100px;
  display: inline-block;
  vertical-align: top;
  color: #fff !important;
}
.footer-other-item {
  color: #bbb;
  width: 100px;
  text-align: center;
  height: 100px;
  display: inline-block;
  vertical-align: top;
}
.footer-other-item-icon {
  width: 40px;
  margin-top: 30px;
  height: 40px;
}
</style>