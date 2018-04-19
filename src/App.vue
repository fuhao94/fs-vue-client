<template>
  <div id="app">
    <toolbar></toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import Toolbar from 'components/toolbar/toolbar'

  export default {
    components: {
      Toolbar
    },
    created() {
      console.log('%c既然都按下F12了，就去github给个star吧！', 'background:black;color:#fff')
      console.log('https://github.com/isEddrick/fs-vue-client.git')
    }
  }
</script>

<style>
  @import "common/style/reset.css";

  #app {
    width: 100%;
    height: 100%;
  }
</style>
