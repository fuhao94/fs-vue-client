<template>
  <div class="index">
    <div class="header">
      <div class="main">
        <h2 class="header-title">{{userInfo.username}}的博客</h2>
        <h3 class="header-description">{{userInfo.description}}</h3>
      </div>
    </div>
    <div class="content">
      <div class="header">

      </div>
      <div class="user_all">
        <div class="aside"></div>
        <div class="main">
          <article-list
            :articleList="articleList"
            @hasDelete="hasDelete"
            @changePage="changePage"
            :art_total="art_total"
          ></article-list>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {UTCformat} from '../../common/js/date'
  import ArticleList from 'components/articleList/articleList'

  export default {
    components: {
      ArticleList
    },
    data() {
      return {
        keyWords: '',
        placeholder: '',
        page: 1,
        pageSize: 5,
        article_type: ['original', 'transfer', 'translate'],
        articleList: [],
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
      searchFocus() {
        this.$refs.searchInput.$el.style.width = '300px'
      },
      searchBlur() {
        this.$refs.searchInput.$el.style.width = '150px'
      },
      getArticleList(type) {
        this.articleList = []
        let header = {
          userId: this.userInfo.userId
        }
        let data = {
          article_type: type ? type : 'original',
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
      tanChange(name) {
        this.page = 1
        this.getArticleList(this.article_type[name])
      },
      hasDelete(type) {
        this.getArticleList(type)
      },
      changePage(page) {
        this.page = page
        this.getArticleList()
      }
    }
  }
</script>

<style scoped>
  .index {
    background: url("/static/images/bg-yellow.png") repeat;
    height: 100%;
  }

  .header {
    width: 100%;
    height: 100px;
    z-index: 1;
    color: #454545;
    font: bold 24px/40px 'microsoft yahei';
  }

  .header .main {
    background: url("/static/images/title-yellow.png") no-repeat right bottom;
    background-size: 680px;
    width: 1076px;
    margin: 0 auto;
    height: 100px;
  }

  .header-title {
    padding-top: 32px;
    font-size: 24px;
  }

  .header-description {
    font-size: 14px;
    color: #666;
    height: 20px;
    line-height: 20px;
  }

  .content {
    width: 1156px;
    position: absolute;
    top: 360px;
    left: 50%;
    margin-top: -170px;
    transform: translateX(-50%);
    z-index: 10;
  }

  .content .header {
    width: 1156px;
    height: 48px;
    background: #454545;
    margin-top: -40px;
  }

  .content .user_all {
    display: flex;
    justify-content: space-between;
  }

  .content .main {
    width: 800px;
    background: #fff;
    position: relative;
    padding: 20px 0;
  }

  .content .aside {
    width: 340px;
    margin-right: 16px;
    /*background: #fff;*/
    /*border: 1px solid #ccc;*/
    /*border-top: none;*/
  }
</style>
