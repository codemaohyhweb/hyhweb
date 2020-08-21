<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$axios({
      url: "https://www.baklib.com/",
      method: "POST",
    }).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style>
</style>