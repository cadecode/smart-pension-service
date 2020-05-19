<template>
  <Row>
    <i-col
      :xs="{span: 22, push: 1}"
      :sm="{span: 16, push: 4}"
      :md="{span: 12, push: 6}"
      :lg="{span: 8, push: 8}"
    >
      <div class="userregister">
        <span class="userregister-title">
          <Icon type="md-person" size="21" />用户注册
        </span>
        <i-form ref="registerForm" :model="registerData" :rules="registerRules">
          <FormItem prop="email">
            <i-input type="text" v-model="registerData.email" placeholder="邮箱">
              <Icon type="ios-mail-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem prop="password">
            <i-input type="password" v-model="registerData.password" placeholder="密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem prop="confirm">
            <i-input type="password" v-model="registerData.confirm" placeholder="确认密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit">注册</Button>
          </FormItem>
        </i-form>
        <router-link to="/user/login">已有账号？立即登录</router-link>
      </div>
    </i-col>
  </Row>
</template>

<script>
export default {
  name: 'UserRegister',
  data () {
    var emailValidator = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('邮箱已经被注册'))
      }
    }
    var passwordValidator = (rule, value, callback) => {
      if (/[0-9]/.test(value) && /[a-zA-Z]/.test(value)) {
        callback()
      } else {
        callback(new Error('密码必须包含数字和字母'))
      }
    }
    var confirmValidator = (rule, value, callback) => {
      if (value === this.registerData.password) {
        callback()
      } else {
        callback(new Error('两次填写密码不一致'))
      }
    }
    return {
      registerData: {
        email: '',
        password: '',
        confirm: ''
      },
      registerRules: {
        email: [
          { required: true, message: '请填写邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式有误', trigger: 'blur' },
          { validator: emailValidator, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码小于 6 位', trigger: 'blur' },
          { validator: passwordValidator, trigger: 'blur' }
        ],
        confirm: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { validator: confirmValidator, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          var formData = this.registerData
          this.$ajax.post('/user/register', {
            email: formData.email,
            password: formData.password
          }).then(res => {
            this.$Message.success('注册成功！')
            this.$router.push('/user/login')
            console.log(res)
          }).catch(err => {
            this.$Message.error('注册失败！')
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
.userregister {
  margin-top: 100px;
  padding: 50px;
  box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
.userregister-title {
  display: block;
  margin: 0 auto 20px;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
}
.userregister input {
  height: 40px;
}
.userregister button {
  display: block;
  width: 250px;
  margin: 0 auto;
}
.userregister a:last-child {
  float: right;
}
</style>