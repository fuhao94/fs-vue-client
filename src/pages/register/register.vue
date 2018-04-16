<template>
  <div class="register">
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
        <form-item prop="repassword">
          <i-input type="password" v-model="formInline.repassword" placeholder="确认密码">
            <icon type="ios-locked-outline" slot="prepend"></icon>
          </i-input>
        </form-item>
        <form-item>
          <i-button type="primary" @click="handleSubmit('formInline')">注册</i-button>
        </form-item>
      </i-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formInline: {
          user: '',
          password: '',
          repassword: ''
        },
        ruleInline: {
          user: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur'}
          ],
          repassword: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      register() {
        this.$http.post('/users/register', {
          username: this.formInline.user,
          password: this.formInline.password
        }).then((res) => {
          if (res.data.status === 1000) {
            this.$Message.success('注册成功！即将跳转到登录页面！')
            setTimeout(() => {
              this.$router.push('/login')
            }, 1500)
          } else {
            this.$Message.error(res.data.msg)
          }
        })
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.formInline.password === this.formInline.repassword) {
              this.register()
            } else {
              this.$Message.error('两次输入的密码不一致')
            }
          } else {
            this.$Message.error('Fail!')
          }
        })
      }
    }
  }
</script>

<style scoped>
  .register {
    width: 500px;
    height: 500px;
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
