<template>
  <div class="e404">
    <div class="e404-body">
      <div class="e404-box">
        <h1>404</h1>
        <h4>呀，文件丢失了……</h4>
        <a href="//www.codemaohyh.cn">返回首页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.e404 {
  position: relative;
  text-align: center;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  backdrop-filter: blur(5px);
  background-image: url(https://www.codemaohyh.cn/img/logo.60df13d1.jpg);
}

.e404-body {
  height: 100vh;
}

.e404-box {
  border-radius: 20px;
  width: 70vw;
  margin: 10vh auto;
  background-color: #ffffff;
}

.e404-box h1 {
  font-size: 10vw;
  text-shadow: 0 3px 12px #1280ff;
  line-height: 5vw;
  color: #1280ff;
}

.e404-box h4 {
  margin-top: 15vh;
  margin-bottom: 5vh;
  font-size: 2vw;
  line-height: 10vh;
}

.e404-box a {
  text-decoration: none;
  font-size: 2vw;
  line-height: 0;
  display: inline-block;
  margin: 10vh 0;
  border-radius: 6vh;
  padding: 6vh 10vh;
  color: #1280ff;
  border: 1px solid #1280ff;
  transition: 0.2s ease-out;
}

.e404-box a:hover {
  background-color: #1280ff;
  color: #ffffff;
}
</style>