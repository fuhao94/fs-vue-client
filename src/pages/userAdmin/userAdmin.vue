<template>
  <div class="userAdmin">
    <div class="userMenu">
      <i-menu width="200px" style="height: 100%" theme="light" :active-name=menuIndex @on-select="onSelect">
        <i-menu-group title="内容">
          <i-menu-item name="1">
            <i-icon type="ios-paper-outline"></i-icon>
            文章管理
          </i-menu-item>
          <i-menu-item name="2">
            <i-icon type="chatbubbles"></i-icon>
            评论管理
          </i-menu-item>
          <i-menu-item name="3">
            <i-icon type="ios-search"></i-icon>
            分类管理
          </i-menu-item>
        </i-menu-group>
        <i-menu-group title="用户">
          <i-menu-item name="4">
            <i-icon type="gear-a"></i-icon>
            博客设置
          </i-menu-item>
          <i-menu-item name="5">
            <i-icon type="heart"></i-icon>
            我关注的
          </i-menu-item>
          <i-menu-item name="6">
            <i-icon type="ios-people"></i-icon>
            我的粉丝
          </i-menu-item>
          <i-menu-item name="7">
            <i-icon type="navicon-round"></i-icon>
            栏目管理
          </i-menu-item>
        </i-menu-group>
      </i-menu>
    </div>
    <div class="userContent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    created() {

    },
    computed: {
      ...mapGetters([
        'menuIndex'
      ])
    },
    methods: {
      onSelect(val) {
        switch (Number(val)) {
          case 1:
            this.$router.push('articleManage')
            break
          case 2:
            this.$router.push('commentManage')
            break
          case 3:
            this.$router.push('ClassifyManage')
            break
          case 7:
            this.$router.push('columnManage')
        }
      }
    }
  }
</script>

<style scoped>
  .userAdmin {
    width: 1200px;
    height: 1000px;
    margin: 50px auto;
    display: flex;
    justify-content: space-between;
  }

  .userMenu {
    width: 200px;
    height: 100%;
  }

  .userContent {
    width: 1000px;
    height: 100%;
    background: #fff;
  }
</style>
