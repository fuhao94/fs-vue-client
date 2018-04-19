<template>
  <div class="articleManage">
    <article-list :articleList="articleList" :art_total="art_total" @changePage="changePage"></article-list>
  </div>
</template>

<script>
  import articleList from 'components/articleList/articleList'
  import {mapGetters} from 'vuex'
  import {UTCformat} from '../../common/js/date'

  export default {
    components: {
      articleList
    },
    data() {
      return {
        articleList: [],
        page: 1,
        pageSize: 5,
        art_total: 0
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    created() {
      this.getArticleList()
    },
    methods: {
      getArticleList() {
        this.articleList = []
        let header = {
          userId: this.userInfo.userId
        }
        let data = {
          article_type: '',
          keyWords: this.keyWords,
          page: this.page,
          pageSize: this.pageSize
        }
        this.$http.post('/art/getArticleList', data, {headers: header}).then((res) => {
          if (res.data.msg) {
            this.articleList = res.data.msg
            this.art_total = res.data.total
            this.articleList.forEach((item) => {
              item.article_content = item.article_content.replace(/#/g, '')
              item.meta.updateAt = UTCformat(item.meta.updateAt)
            })
          }
        })
      },
      changePage(page) {
        this.page = page
        this.getArticleList()
      }
    }
  }
</script>

<style scoped>
  .articleManage {
    height: 100%;
  }
</style>
