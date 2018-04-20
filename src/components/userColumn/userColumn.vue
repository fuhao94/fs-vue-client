<template>
  <div class="userManage">
    <div class="title"></div>
    <div class="userInfo">
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
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: {},
    data() {
      return {
        title: '个人资料',
        userColumn: ''
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    created() {
      this.getUserInfo()
    },
    methods: {
      getUserInfo() {
        this.$http.get('/users/getUserInfo?userId=' + this.userInfo.userId).then((res) => {
          this.userColumn = res.data.msg
        })
      }
    }
  }
</script>

<style scoped>
  .title {
    color: #333;
    background: #f5f5f5;
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

</style>
