<template>
  <div class="login">
    <div class="content">
      <i-form ref="formInline" :model="formInline" :rules="ruleInline">
        <form-item prop="user">
          <i-input type="text" v-model="formInline.user" placeholder="用户名">
            <icon type="ios-person-outline" slot="prepend"></icon>
          </i-input>
        </form-item>
        <form-item prop="password">
          <i-input type="password" v-model="formInline.password" placeholder="密码">
            <icon type="ios-locked-outline" slot="prepend"></icon>
          </i-input>
        </form-item>
        <form-item>
          <i-button type="primary" @click="handleSubmit('formInline')">登录</i-button>
        </form-item>
      </i-form>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        formInline: {
          user: '张福浩',
          password: '123456'
        },
        ruleInline: {
          user: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      login() {
        this.$http.post('/users/login', {
          username: this.formInline.user,
          password: this.formInline.password
        }).then((res) => {
          res = res.data
          if (res.status === 1000) {
            this.$Message.success('登录成功!')
            this.setIsLogin(1)
            this.setUserInfo(res.msg)
            setTimeout(() => {
              this.$router.push('/index')
            }, 1500)
          } else {
            this.$Message.error(res.msg)
          }
        })
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.login()
          } else {
            this.$Message.error('Fail!')
          }
        })
      },

      ...mapMutations({
        setIsLogin: 'SET_IS_LOGIN',
        setUserInfo: 'SET_USER_INFO'
      })
    }
  }
</script>

<style scoped>
  .login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .content {
    width: 300px;
    margin: 0 auto;
    text-align: center;
  }
</style>
