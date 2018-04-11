<template>
  <div>
    <button @click="login">login</button>
  </div>
</template>

<script>
  export default {
    methods: {
      login() {
        this.$http.post('/users/login', {username: 'zfh', password: '123456'}).then((res) => {
          console.log(res.data)
        })
      }
    }
  }
</script>

<style scoped>

</style>
