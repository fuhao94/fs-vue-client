<template>
  <div class="userManage">
    <ul>
      <li v-for="(item,index) in userColumn.column" :key="index" v-if="item.isShow">
        <div class="title">{{item.column_name}}</div>
        <div class="userInfo" v-if="item.column_name==='个人信息'">
          <div class="head">
            <img src="/static/images/default_avatar.png" width="62" height="62">
            <div class="name">{{userColumn.username}}</div>
          </div>
          <ul class="center">
            <li>
              <span>原创</span>
              <span>10</span>
            </li>
            <li>
              <span>粉丝</span>
              <span>12</span>
            </li>
            <li>
              <span>关注</span>
              <span>21</span>
            </li>
            <li>
              <span>评论</span>
              <span>999</span>
            </li>
          </ul>
          <div class="bottom">
            <div class="badge">
              <img src="/static/images/zhuanlandaren.png" alt="持之以恒">
              <img src="/static/images/chizhiyiheng.png" alt="专栏达人">
            </div>
            <div class="member">
              <div class="integral">积分：<span>10</span></div>
              <div class="visit">访问量：<span>100</span></div>
            </div>
          </div>
        </div>
        <div class="art_search" v-if="item.column_name==='文章搜索'">
          <i-input v-model="keyWords" @on-enter="artSearch" @on-click="artSearch" icon="ios-search"
                   placeholder="请输入文章比标题..."
                   style="width: 90%;"></i-input>
        </div>
        <div class="art_type" v-if="item.column_name==='文章分类'"></div>
        <div class="archives" v-if="item.column_name==='文章存档'"></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {UTCformat} from '@/common/js/date'

  export default {
    props: {},
    data() {
      return {
        title: '个人资料',
        userColumn: '',
        keyWords: '',
        page: 1,
        pageSize: 5
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
        this.getUserInfo()
      },
      getUserInfo() {
        this.$http.get('/users/getUserInfo?userId=' + this.userInfo.userId).then((res) => {
          this.userColumn = res.data.msg
        })
      },
      artSearch() {
        let data = {
          userId: this.userInfo.userId,
          keyWords: this.keyWords,
          page: this.page,
          pageSize: this.pageSize
        }
        this.$http.post('/art/getArticleList', data).then((res) => {
          if (res.data.status === 1000) {
            res.data.result.forEach((item) => {
              item.article_content = item.article_content.replace(/#/g, '')
              item.meta.updateAt = UTCformat(item.meta.updateAt)
            })
            this.$emit('hasArtSearch', res.data)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .userManage ul li {
    margin-bottom: 20px;
  }

  .title {
    color: #333;
    background: #f5f5f5;
    font-size: 12px;
    font-weight: bold;
    height: 29px;
    line-height: 29px;
    padding-left: 11px;
  }

  .userInfo {
    background: #fff;
    padding: 16px;
  }

  .userInfo .head {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
  }

  .userInfo .center {
    display: flex;
    justify-content: center;
    padding: 16px 0;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
  }

  .userInfo .center li {
    width: 25%;
    height: 48px;
  }

  .userInfo .center li span {
    font-size: 14px;
    color: #788087;
    line-height: 24px;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }

  .userInfo .center li span:last-child {
    color: #4f4f4f;
  }

  .userInfo .bottom {

  }

  .userInfo .bottom .badge {
    width: 100%;
    display: inline-block;
    height: 24px;
    margin: 8px 0;
  }

  .userInfo .bottom .badge img {
    width: 29px;
    height: 24px;
    padding-right: 8px;
  }

  .userInfo .bottom .member {
    display: flex;
  }

  .userInfo .bottom .member .integral, .userInfo .bottom .member .visit {
    flex: 1;
    color: #4f4f4f;
    height: 24px;
    font-size: 14px;
    margin-top: 8px;
  }

  .art_search {
    background-color: #fff;
    height: 60px;
    text-align: center;
    line-height: 60px;
  }
</style>
