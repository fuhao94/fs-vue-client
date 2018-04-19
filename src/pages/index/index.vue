<template>
  <div class="index">
    <div class="header">
      <div class="main">
        <div class="header-top">
          <div class="header-title">{{userInfo.username}}的博客</div>
          <div class="header-edit">
            <i-button style="color: #e4e4e4" type="ghost" shape="circle" icon="edit">修改个人资料</i-button>
            <i-button style="color: #e4e4e4" type="ghost" shape="circle" icon="gear-b">管理博客</i-button>
          </div>
        </div>
        <div class="header-description">{{userInfo.description}}</div>
      </div>
    </div>
    <div class="content">
      <div class="main">
        <i-tabs @on-click="tanChange">
          <i-tab-pane v-for="(item,index) in article_type" :key="index"
                      :label="item==='original'?'原创':item==='transfer'?'转载':item==='translate'?'翻译':''">
            <article-list :articleList="articleList" @hasDelete="hasDelete" :art_total="art_total"></article-list>
          </i-tab-pane>
        </i-tabs>
        <transition name="keysearch">
          <i-input ref="searchInput"
                   @on-blur="searchBlur"
                   @on-focus="searchFocus"
                   class="searchInput"
                   v-model="keyWords"
                   icon="ios-search"
                   :placeholder="placeholder"></i-input>
        </transition>
      </div>
      <div class="aside"></div>
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
        pageSize: 10,
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
        this.getArticleList(this.article_type[name])
      },
      hasDelete(type) {
        this.getArticleList(type)
      }
    }
  }
</script>

<style scoped>
  .index {
    background: #f4f4f4;
  }

  .header {
    background: url("/static/images/bg_header.png") no-repeat fixed center;
    background-size: cover;
    width: 100%;
    height: 310px;
    z-index: 1;
  }

  .header .main {
    width: 1076px;
    margin: 0 auto;
  }

  .header-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 32px 0 16px;
  }

  .header-title {
    font-size: 32px;
    color: #fff;
  }

  .header-description {
    color: #e4e4e4;
    font-size: 16px;
  }

  .content {
    position: absolute;
    top: 360px;
    left: 50%;
    margin-top: -170px;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    justify-content: space-between;
  }

  .content .main {
    width: 800px;
    background: #fff;
    margin-right: 16px;
    position: relative;
  }

  .searchInput {
    width: 150px;
    position: absolute;
    top: 2px;
    right: 10px;
  }

  .content .aside {
    width: 340px;
    background: #fff;
  }
</style>
