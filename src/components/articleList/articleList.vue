<template>
  <div class="articleList">
    <ul>
      <li v-for="(item,index) in articleList"
          @mouseenter="mouseEnter(index)"
          @mouseleave="mouseLeave()"
          :key="index">
        <router-link :to="{path:`/articleDetail/${item._id}`}">
          <h3 class="article_title">{{item.article_title}}</h3>
          <p class="article_content">{{item.article_content}}</p>
        </router-link>
        <div class="flex_control">
          <div class="article_control">
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

          <div class="art_manage" :class="{art_manage_hover:itemHover==index}">
            <router-link :to="{path:'/publish',query:{article_id:item._id}}">
              <i-button type="text" class="art_manage_edit">编辑</i-button>
            </router-link>
            <i-button type="text" class="art_manage_del"
                      @click.native="confirmDel(item._id,item.article_title,item.article_type)">删除
            </i-button>
          </div>
        </div>
      </li>
      <div class="i-page">
        <i-page show-total show-elevator :page-size="pageSize" :total="art_total"></i-page>
      </div>
    </ul>
    <i-modal v-model="delModel" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>确认删除</span>
      </p>
      <div style="text-align:center">
        <p>{{article_title}}</p>
        <p>是否继续删除？</p>
      </div>
      <div slot="footer">
        <i-button type="error" size="large" long :loading="modal_loading" @click="articleDel">删除</i-button>
      </div>
    </i-modal>
  </div>
</template>

<script>
  export default {
    props: {
      articleList: {
        type: Array,
        default() {
          return []
        }
      },
      art_total: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        article_title: '',
        itemHover: -1,
        delModel: false,
        modal_loading: false,
        art_type: '',
        art_id: '',
        pageSize: 5
      }
    },
    methods: {
      mouseEnter(index) {
        this.itemHover = index
      },
      mouseLeave() {
        this.itemHover = -1
      },
      confirmDel(id, title, type) {
        this.article_title = title
        this.art_type = type
        this.delModel = true
        this.art_id = id
      },
      articleDel() {
        this.$http.post('/art/delete', {article_id: this.art_id}).then((res) => {
          if (res.data.status === 1000) {
            this.$Message.success(res.data.result)
            this.$emit('hasDelete', this.art_type)
            this.delModel = false
          }
        })
      }
    }
  }
</script>

<style scoped>
  ul {
    padding: 0 20px 10px
  }

  ul li {
    border-bottom: 1px dashed #e9e9e9;
    padding: 16px 16px 10px;
  }

  .article_title {
    color: #4f4f4f;
    font-size: 20px;
    margin-bottom: 8px;
  }

  .article_content {
    color: #999;
    font-size: 14px;
    margin-bottom: 8px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    height: 42px;
  }

  .article_control, .main .article_control .art_info {
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

  .flex_control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px;
  }

  .art_manage {
    font-size: 14px;
    height: 24px;
    width: 200px;
    text-align: right;
    display: none;
  }

  .art_manage_hover {
    display: block !important;
  }

  .art_manage_edit {
    color: #216e9d;
  }

  .art_manage_del {
    color: #c92027;
  }

  .i-page {
    text-align: center;
    margin-top: 20px;
  }
</style>
