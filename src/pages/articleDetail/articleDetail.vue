<template>
  <div class="article">
    11
  </div>
</template>

<script>

  export default {
    data() {
      return {
        article_id: this.$route.params.id
      }
    },
    created() {
      this.getArticleDetail()
    },
    methods: {
      getArticleDetail() {
        let url = '/art/getArticleDetail?article_id=' + this.article_id
        this.$http.get(url).then((res) => {

        })
      }
    }
  }
</script>

<style scoped>

</style>
