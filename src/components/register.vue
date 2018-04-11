<template>
  <div>
    <button @click="register">register</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      register() {
        this.$http.post('/users/register', {username: 'zhangfuhao', password: '123456'}).then((res) => {
          console.log(res.data)
        })
      }
    }
  }
</script>

<style scoped>

</style>
