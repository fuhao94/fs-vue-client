<template>
  <div class="index">
    <toolbar></toolbar>
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
    <div class="content"></div>
    <div class="footer"></div>
  </div>
</template>

<script>
  import Toolbar from 'components/toolbar/toolbar'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      Toolbar
    },
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    created() {
      console.log(this.userInfo)
    },
    methods: {}
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
    width: 1200px;
    height: 1000px;
    background: #fff;
    position: absolute;
    top: 360px;
    left: 50%;
    margin-top: -170px;
    transform: translateX(-50%);
    z-index: 10;
  }
</style>
