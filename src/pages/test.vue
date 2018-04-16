<template>
  <div></div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created() {
      this.$http.post('https://restapi.amap.com/v3/ip?ip=&output=xml&key=43202ac9c4bbbe5ef5d65478de3617be').then((res) => {
        console.log(res.data)
      })
    }
  }
</script>

<style scoped>

</style>
