<template>
  <div id="app">
    <navbar/>
    <router-view></router-view>
    <zfooter/>
  </div>
</template>

<script>
import navbar from './components/navbar'
import zfooter from './components/footer'
export default {
  name: "App",
  components:{
    navbar,
    zfooter,
  }
};
</script>

<style>
@font-face{
     font-family: '站酷庆科黄油体'; 
     src:url('./assets/font/站酷庆科黄油体.ttf') format('truetype'),
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
* {
  margin: 0;
  padding: 0;
}
*::-webkit-scrollbar{
  width: 8px;
}
*::-webkit-scrollbar-thumb{
  background: #d3d8d8;
  border-radius: 5px;
}
.logo::after{
  content: "编程猫后援会";
  font-family: 站酷庆科黄油体;
  font-size: 20px;
  color: #297EFF !important;
}
a{
  text-decoration: none;
  color: inherit;
}
a:hover{
  color: #409EFF;
}
.bgimg{
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
