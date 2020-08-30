<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  background: #f9f9fa;
}
* {
  margin: 0;
  padding: 0;
}
*::-webkit-scrollbar {
  width: 8px;
}
*::-webkit-scrollbar-thumb {
  background: #d3d8d8;
  border-radius: 5px;
}
.logo::after {
  content: "编程猫后援会";
  font-size: 20px;
  color: #297eff !important;
}
a {
  text-decoration: none;
  color: inherit;
}
a:hover {
  color: #409eff;
}
.bgimg {
  background-position: center !important;
  background-size: cover !important;
}
.b-head {
  width: 100vw;
  height: 200px;
  background: url(./assets/img/codemaohyhbg.jpg) center;
  background-size: cover;
}
</style>
