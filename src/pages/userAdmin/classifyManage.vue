<template>
  <div class="classifyManage">
    <div class="header">
      <i-input v-model="type" placeholder="分类名..." style="width: 200px"></i-input>
      <i-button type="primary" @click.native="addClassify">添加</i-button>
    </div>
    <i-table :disabled-hover="disabledHover" :columns="classify" :data="classifyList"></i-table>
  </div>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'

  export default {
    data() {
      let _this = this
      return {
        disabledHover: true,
        classify: [
          {
            title: '类别',
            key: 'name'
          },
          {
            title: '操作',
            key: 'edit',
            width: 150,
            align: 'center',
            render(h, params) {
              return h('div', [
                h('i-button', {
                  props: {
                    type: 'text'
                  },
                  style: {
                    color: '#216e9d'
                  },
                  on: {
                    click: () => {
                      _this.classifyChange(params.row)
                    }
                  }
                }, '编辑'),
                h('i-button', {
                  props: {
                    type: 'text'
                  },
                  style: {
                    color: '#c92027'
                  },
                  on: {
                    click: () => {
                      _this.classifyDel(params.row)
                    }
                  }
                }, '删除')
              ])
            }
          },
          {
            title: '前台是否显示',
            key: 'isShow',
            width: 150,
            align: 'center',
            render(h, params) {
              return h('div', [
                h('i-switch', {
                  props: {
                    size: 'default',
                    value: params.row.isShow
                  },
                  on: {
                    'on-change': (value) => {
                      this.classifyChange(value, params.row)
                    }
                  }
                })
              ])
            }
          },
          {
            title: '文章数',
            width: 100,
            align: 'center',
            key: 'art_count'
          }
        ],
        classifyList: [],
        type: ''
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
        this.setMenuIndex('3')
        this.getClassifyList()
      },
      classifyChange(val, data) {

      },
      getClassifyList() {
        this.$http.get('/users/getClassifyList?userId=' + this.userInfo.userId).then((res) => {
          if (res.data.status === 1000) {
            this.classifyList = res.data.result
          }
        })
      },
      addClassify() {
        if (this.type.trim() == '') return
        this.$http.post('/users/addClassify', {userId: this.userInfo.userId, type: this.type}).then((res) => {
          if (res.data.status === 1000) {
            this.type = ''
            this.$Message.success(res.data.result)
            this.getClassifyList()
          }
        })
      },
      classifyDel(data) {
        this.$Modal.confirm({
          title: '提示',
          content: `<p>确认删除 <span style="color:#c92027;font-weight: bold">${data.name}</span> 分类吗？</p>`,
          onOk: () => {
            this.$http.post('/users/classifyDelete', {
              userId: this.userInfo.userId,
              classify_id: data._id
            }).then((res) => {
              if (res.data.status === 1000) {
                this.$Message.success(res.data.result)
                this.getClassifyList()
              } else {
                this.$Message.error(res.data.result)
              }
            })
          }
        })
      },
      ...mapMutations({
        setMenuIndex: 'SET_MENU_INDEX'
      })
    }
  }
</script>

<style scoped>
  .header {
    margin: 30px 0 20px;
    text-align: right;
  }

  .classifyManage {
    width: 95%;
    margin: 0 auto 20px;
  }
</style>
