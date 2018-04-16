<template>
  <div class="publish">
    <div class="content">
      <div class="article_title">
        <i-input v-model="article.title" style="padding-right: 40px" placeholder="请输入文章题目">
          <i-select v-model="article.type" slot="prepend" style="width: 80px;">
            <i-option value="original">原创</i-option>
            <i-option value="transfer">转载</i-option>
            <i-option value="translate">翻译</i-option>
          </i-select>
        </i-input>
        <i-button type="error" @click="publish">发布博客</i-button>
      </div>
      <div class="main">
        <mavon-editor v-model="article.content"/>
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
          title: '',
          type: '',
          content: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    created() {
      // this.getArticleDetail()
    },
    methods: {
      publish() {
        let data = {
          userId: this.userInfo.userId,
          article_title: this.article.title,
          article_type: this.article.type,
          article_content: this.article.content
        }
        console.log(data)
        this.$http.post('/art/add', data).then((res) => {
          if (res.data.status === 1000) {
            this.$Message.success('文章发布成功')
          }
        })
      }
      /* getArticleDetail() {
        this.$http.get('/art/detail').then((res) => {
          res = res.data
          this.article = {
            title: res.msg[0].article_title,
            type: res.msg[0].article_type,
            content: res.msg[0].article_content
          }
        })
      } */
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
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
  }

  .article_title {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    position: relative;
    z-index: 10;
  }

  .main {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }
</style>
