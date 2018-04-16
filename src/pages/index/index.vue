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
        <i-tabs>
          <i-tab-pane label="原创" :disabled="original">
            <ul>
              <li v-for="(item,index) in articleList" :key="index">
                <router-link :to="{path:`/articleDetail/${item._id}`}">
                  <h3 class="article_title">{{item.article_title}}</h3>
                  <p class="article_content">{{item.article_content}}</p>
                  <div class="article_control">
                    <div class="art_info">
                      <div class="art_time">{{item.meta.updateAt}}</div>
                      <div class="art_count">
                        <i-icon type="ios-book-outline"></i-icon>
                        {{item.article_count}}
                      </div>
                      <div class="art_comment">
                        <i-icon type="chatbubble-working"></i-icon>
                        1
                      </div>
                    </div>
                    <div class="art_setting"></div>
                  </div>
                </router-link>
              </li>
            </ul>
          </i-tab-pane>
          <i-tab-pane label="转载" :disabled="transfer"></i-tab-pane>
          <i-tab-pane label="翻译" :disabled="translate"></i-tab-pane>
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

  export default {
    data() {
      return {
        keyWords: '',
        placeholder: '',
        original: false,
        transfer: false,
        translate: false,
        article_type: 'original',
        page: 1,
        pageSize: 10,
        articleList: []
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
      getArticleList() {
        let url = '/art/getArticleList?article_type=original' + '&article_title=' + '111'
        let header = {
          userId: this.userInfo.userId
        }
        let data = {
          article_type: this.article_type,
          keyWords: this.keyWords,
          page: this.page,
          pageSize: this.pageSize
        }
        this.$http.post('/art/getArticleList', data, {headers: header}).then((res) => {
          this.articleList = res.data.msg
          this.articleList.forEach((item) => {
            item.article_content = item.article_content.replace(/#/g, '')
            item.meta.updateAt = UTCformat(item.meta.updateAt)
          })
        })
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
    position: absolute;
    top: 50px;
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

  .main ul {
    padding: 0 20px 10px
  }

  .main ul li {
    border-bottom: 1px dashed #e9e9e9;
    padding-top: 16px;
  }

  .main ul li:last-child {
    border-bottom: none;
  }

  .main .article_title {
    color: #4f4f4f;
    font-size: 20px;
    margin-bottom: 8px;
  }

  .main .article_content {
    color: #999;
    font-size: 14px;
    margin-bottom: 8px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    height: 42px;
  }

  .main .article_control, .main .article_control .art_info {
    color: #999;
    font-size: 14px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .art_count, .art_comment {
    margin-left: 24px;
  }
</style>
