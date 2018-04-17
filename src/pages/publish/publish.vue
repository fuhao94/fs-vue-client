<template>
  <div class="publish">
    <div class="content">
      <div class="article_title">
        <i-input v-model="article.article_title" style="width: 92%" placeholder="请输入文章题目">
          <i-select v-model="article.article_type" slot="prepend" style="width: 80px;">
            <i-option value="original">原创</i-option>
            <i-option value="transfer">转载</i-option>
            <i-option value="translate">翻译</i-option>
          </i-select>
        </i-input>
        <i-button type="error" style="width: 6%" @click.native="publish">{{isPublish?'发布文章':'修改文章'}}</i-button>
      </div>
      <div class="main">
        <mavon-editor v-model="article.article_content"/>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        article: {
          article_title: '',
          article_type: '',
          article_content: ''
        },
        isPublish: true
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
        if (this.$route.query.article_id) {
          this.getDetail()
          this.isPublish = false
        }
      },
      publish() {
        let data = {
          userId: this.userInfo.userId,
          article_title: this.article.article_title,
          article_type: this.article.article_type,
          article_content: this.article.article_content
        }
        if (this.isPublish) {
          this.$http.post('/art/add', data).then((res) => {
            if (res.data.status === 1000) {
              this.$Message.success('文章发布成功')
            }
          })
        } else {
          data.article_id = this.$route.query.article_id
          this.$http.post('/art/articleEdit', data).then((res) => {
            if (res.data.status === 1000) {
              this.$Message.success('文章修改成功')
              this.getDetail()
            }
          })
        }
      },
      getDetail() {
        let url = '/art/getArticleDetail?article_id=' + this.$route.query.article_id
        this.$http.get(url).then((res) => {
          res = res.data
          if (res.status === 1000) {
            this.article = res.msg
          }
        })
      }
    }
  }
</script>

<style scoped>
  .publish {
    background: #f4f4f4;
  }

  .content {
    width: 100%;
    height: 100%;
  }

  .article_title {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }

  .main {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }
</style>
