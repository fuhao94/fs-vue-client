<template>
  <div class="columnManage">
    <i-table :disabled-hover="disabledHover" :columns="columns" :data="columnList"></i-table>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        disabledHover: true,
        columns: [
          {
            title: '栏目名称',
            key: 'column_name'
          },
          {
            title: '栏目类型',
            key: 'column_type'
          },
          {
            title: '是否显示',
            key: 'isShow',
            width: 150,
            render: (h, params) => {
              return h('div', [
                h('i-switch', {
                  props: {
                    size: 'default',
                    value: params.row.isShow
                  },
                  style: {
                    textAlign: 'center'
                  },
                  on: {
                    'on-change': (value) => {
                      this.changeColumnShow(value, params.row)
                    }
                  }
                })
              ])
            }
          }
        ],
        columnList: []
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
        this.getColumnList()
        this.setMenuIndex('7')
      },
      getColumnList() {
        this.$http.get('/users/getColumnList?userId=' + this.userInfo.userId).then((res) => {
          if (res.data.status === 1000) {
            this.columnList = res.data.result.column
          }
        })
      },
      changeColumnShow(value, row) {
        let data = {
          columnId: row._id,
          userId: this.userInfo.userId,
          isShow: value
        }
        this.$http.post('/users/setColumnShow', data).then((res) => {
          if (res.data.status === 1000) {
            this.$Message.success(res.data.msg)
            this.getColumnList()
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
  .columnManage {
    width: 90%;
    margin: 20px auto;
  }
</style>
