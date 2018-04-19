<template>
  <div class="userManage">
    <div class="title"></div>
    <div v-if="user_type==='info'" class="userInfo">
      <img src="/static/images/default_avatar.png" width="62" height="62">
      <div class="name">{{userInfo.username}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      user_type: {
        type: String,
        default: 'info'
      }
    },
    data() {
      return {
        title: '个人资料'
      }
    }
  }
</script>

<style scoped>

</style>
