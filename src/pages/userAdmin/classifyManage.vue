<template>
  <div>333333</div>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {}
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.setMenuIndex('3')
      },
      ...mapMutations({
        setMenuIndex: 'SET_MENU_INDEX'
      })
    }
  }
</script>

<style scoped>

</style>
