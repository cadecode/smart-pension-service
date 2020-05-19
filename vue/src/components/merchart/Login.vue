<template>
  <Row>
    <i-col
      :xs="{span: 22, push: 1}"
      :sm="{span: 16, push: 4}"
      :md="{span: 12, push: 6}"
      :lg="{span: 8, push: 8}"
    >
      <div class="merchartlogin">
        <span class="merchartlogin-title">
          <Icon type="md-card" size="21" />商家登录
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
          <FormItem label="商家类型">
            <RadioGroup v-model="loginData.merchartType">
              <Radio label="group">机构</Radio>
              <Radio label="shop">店铺</Radio>
            </RadioGroup>
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
        <router-link to="/user/login">用户入口</router-link>
        <router-link to="/merchart/register">商家入驻？立即注册</router-link>
      </div>
    </i-col>
  </Row>
</template>

<script>
export default {
  name: 'MerchatLogin',
  data () {
    return {
      loginData: {
        email: '',
        password: '',
        remember: false,
        merchartType: 'group'
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
          var formData = this.loginData,
            type = formData.merchartType
          this.$ajax.post('/merchart/login/' + type, {
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
.merchartlogin {
  margin-top: 100px;
  padding: 50px;
  box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
.merchartlogin-title {
  display: block;
  margin: 0 auto 20px;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
}
.merchartlogin input {
  height: 40px;
}
.merchartlogin button {
  display: block;
  width: 250px;
  margin: 0 auto;
}
.merchartlogin a:last-child {
  float: right;
}
</style>