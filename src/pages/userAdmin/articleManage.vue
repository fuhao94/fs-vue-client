<template>
  <div class="articleManage">
    <article-list :articleList="articleList" :art_total="art_total" @changePage="changePage"></article-list>
  </div>
</template>

<script>
  import articleList from 'components/articleList/articleList'
  import {mapGetters, mapMutations} from 'vuex'
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
      this.init()
    },
    methods: {
      init() {
        this.getArticleList()
        this.setMenuIndex('1')
      },
      getArticleList() {
        let data = {
          keyWords: this.keyWords,
          page: this.page,
          pageSize: this.pageSize,
          userId: this.userInfo.userId
        }
        this.$http.post('/art/getArticleList', data).then((res) => {
          if (res.data.result) {
            this.articleList = res.data.result
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
      },
      ...mapMutations({
        setMenuIndex: 'SET_MENU_INDEX'
      })
    }
  }
</script>

<style scoped>
  .articleManage {
    height: 100%;
  }
</style>
