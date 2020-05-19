<template>
  <Row>
    <i-col
      :xs="{span: 22, push: 1}"
      :sm="{span: 16, push: 4}"
      :md="{span: 12, push: 6}"
      :lg="{span: 8, push: 8}"
    >
      <div class="userlogin">
        <span class="userlogin-title">
          <Icon type="md-person" size="21" />用户登录
        </span>
        <i-form ref="loginForm" :model="loginData" :rules="loginRules">
          <FormItem prop="email">
            <i-input type="text" v-model="loginData.email" placeholder="邮箱">
              <Icon type="ios-mail-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem prop="password">
            <i-input type="password" v-model="loginData.password" placeholder="密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem label="记住密码">
            <i-switch v-model="loginData.remember" size="large">
              <span slot="open">开</span>
              <span slot="close">关</span>
            </i-switch>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit">登录</Button>
          </FormItem>
        </i-form>
        <router-link to="/merchart/login">商家入口</router-link>
        <router-link to="/user/register">没有账号？立即注册</router-link>
      </div>
    </i-col>
  </Row>
</template>

<script>
export default {
  name: 'UserLogin',
  data () {
    return {
      loginData: {
        email: '',
        password: '',
        remember: false
      },
      loginRules: {
        email: [
          { required: true, message: '请填写邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式有误', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码小于 6 位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          var formData = this.loginData
          this.$ajax.post('/user/login', {
            email: formData.email,
            password: formData.password
          }).then(res => {
            this.$Message.success('登录成功！')
            this.$validator.updateAllState(formData.remember, res.data)
            this.$router.push('/')
            console.log(res)
          }).catch(err => {
            this.$Message.error('登录失败！')
            console.log(err)
          })
        } else {
          this.$Message.error('内容填写有误！')
        }
      })
    }
  }
}
</script>

<style>
.userlogin {
  margin-top: 100px;
  padding: 50px;
  box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
.userlogin-title {
  display: block;
  margin: 0 auto 20px;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
}
.userlogin input {
  height: 40px;
}
.userlogin button {
  display: block;
  width: 250px;
  margin: 0 auto;
}
.userlogin a:last-child {
  float: right;
}
</style>