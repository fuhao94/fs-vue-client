<template>
  <div class="toolbar">
    <div class="toolbar-left">
      <img src="/static/images/blog_logo.png" alt="logo">
      <ul class="navigation">
        <li><a>首页</a></li>
        <li><a>个人</a></li>
        <li><a>关于</a></li>
      </ul>
    </div>
    <ul class="userEdit">
      <li>
        <i-input v-model="keyWords" @on-enter="search">
          <i-select v-model="search_type" slot="prepend" style="width: 80px">
            <i-option value="art">文章</i-option>
            <i-option value="user">用户</i-option>
          </i-select>
          <i-button slot="append" icon="ios-search" @click="search"></i-button>
        </i-input>
      </li>
      <li v-if="isLogin===0" class="login_status">
        <router-link class="user_dis" to="/login">
          登录
        </router-link>
        <router-link to="/register">
          注册
        </router-link>
      </li>
      <li v-else class="login_status">
        <router-link class="user_dis" to="/userAdmin">
          <img src="/static/images/default_avatar.png">
        </router-link>
        <Dropdown>
          <router-link to="/userAdmin">
            {{userInfo.username}}
          </router-link>
          <i-dropdown-menu slot="list">
            <!--<router-link :to="{path:'/userAdmin',query:{userId:}}"></router-link>-->
            <i-dropdown-item>我的博客</i-dropdown-item>
            <i-dropdown-item>消息</i-dropdown-item>
            <i-dropdown-item>账号设置</i-dropdown-item>
            <i-dropdown-item>反馈</i-dropdown-item>
            <i-dropdown-item>帮助</i-dropdown-item>
            <i-dropdown-item @click.native="logout">退出</i-dropdown-item>
          </i-dropdown-menu>
        </Dropdown>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        keyWords: '',
        search_type: 'art'
      }
    },
    computed: {
      ...mapGetters([
        'isLogin',
        'userInfo'
      ])
    },
    created() {

    },
    methods: {
      logout() {
        this.$http.post('/users/logout').then((res) => {
          if (res.data.status === 1000) {
            this.$Message.success('退出成功!')
            this.setIsLogin(0)
          }
        })
      },
      search() {
        if (this.keyWords === '') return
        let data = {
          search_type: this.search_type,
          keyWords: this.keyWords
        }
        this.$http.get('/users/userList?search_type=' + this.search_type + '&keyWords=' + this.keyWords).then((res) => {
          console.log(res.data)
        })
      },

      ...mapMutations({
        setIsLogin: 'SET_IS_LOGIN'
      })
    }
  }
</script>

<style scoped>
  .toolbar, .toolbar-left, .toolbar-left .navigation, .userEdit, ul li {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .toolbar {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    position: absolute;
    top: 0;
    background: #f4f4f4;
  }

  .toolbar-left img {
    width: 28px;
    height: 28px;
  }

  .login_status img {
    width: 24px;
    height: 24px;
  }

  ul li {
    padding-left: 20px;
  }

  .user_dis {
    padding: 20px;
  }
</style>
