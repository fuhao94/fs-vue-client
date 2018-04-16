<template>
  <div class="mdeditor">
    <toolbar></toolbar>
    <div class="content">
      <div class="article_title">
        <i-input v-model="article.article_title" style="padding-right: 40px" placeholder="请输入文章题目">
          <i-select v-model="article.article_type" slot="prepend" style="width: 80px">
            <Option value="original">原创</Option>
            <Option value="transfer">转载</Option>
            <Option value="translate">翻译</Option>
          </i-select>
        </i-input>
        <i-button type="error" @click="publish">发布博客</i-button>
      </div>
      <VmMarkdown :theme="theme"
                  width="100%"
                  height="100%"
                  v-on:gethtml="showHtml"
                  v-on:getMarkString="showMarkString"
                  :defaultText="intro">
      </VmMarkdown>
    </div>
  </div>
</template>

<script>
  import Toolbar from 'components/toolbar/toolbar'
  import VmMarkdown from 'vm-markdown'

  export default {
    components: {
      Toolbar,
      VmMarkdown
    },
    data() {
      return {
        test: '',
        theme: 'dark',
        intro: '开始你的文章之旅',
        article: {
          article_title: '',
          article_type: 'original',
          article_content: ''
        }
      }
    },
    methods: {
      showHtml(data) {
        // console.log(data)
        // this.article.article_content = data
      },
      showMarkString(val) {
        console.log(val)
        this.article.article_content = val
      },
      publish() {
        console.log(this.article.article_content)
      }
    }
  }
</script>

<style scoped>
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
  }
</style>
