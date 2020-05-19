<template>
  <Row>
    <i-col
      :xs="{span: 22, push: 1}"
      :sm="{span: 16, push: 4}"
      :md="{span: 12, push: 6}"
      :lg="{span: 8, push: 8}"
    >
      <div class="merchartregister">
        <span class="merchartregister-title">
          <Icon type="md-card" size="21" />商家入驻
        </span>
        <i-form
          ref="registerForm"
          :model="registerData"
          :rules="registerRules"
          label-position="left"
          :label-width="120"
        >
          <FormItem prop="email" label="邮箱">
            <i-input type="text" v-model="registerData.email" placeholder="输入邮箱" />
          </FormItem>
          <FormItem prop="password" label="密码">
            <i-input type="password" v-model="registerData.password" placeholder="输入密码" />
          </FormItem>
          <FormItem prop="confirm" label="确认密码">
            <i-input type="password" v-model="registerData.confirm" placeholder="确认密码" />
          </FormItem>
          <FormItem prop="name" label="名称">
            <i-input type="text" v-model="registerData.name" placeholder="输入名称" />
          </FormItem>
          <FormItem prop="address" label="地址">
            <i-input type="text" v-model="registerData.address" placeholder="输入地址" />
          </FormItem>
          <FormItem prop="corporateName" label="法人姓名">
            <i-input type="text" v-model="registerData.corporateName" placeholder="输入法人姓名" />
          </FormItem>
          <FormItem prop="corporateId" label="法人身份证号">
            <i-input type="text" v-model="registerData.corporateId" placeholder="输入法人身份证号" />
          </FormItem>
          <FormItem prop="creditCode" label="组织机构代码">
            <i-input type="text" v-model="registerData.creditCode" placeholder="输入组织机构代码" />
          </FormItem>
          <FormItem prop="principalName" label="负责人姓名">
            <i-input type="text" v-model="registerData.principalName" placeholder="输入法人姓名" />
          </FormItem>
          <FormItem prop="contactTel" label="联系电话">
            <i-input type="text" v-model="registerData.contactTel" placeholder="输入联系电话" />
          </FormItem>
          <FormItem prop="merchartType" label="商家类型">
            <RadioGroup v-model="registerData.merchartType">
              <Radio label="group">机构</Radio>
              <Radio label="shop">店铺</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem v-if="registerData.merchartType === 'group'" label="机构类型" prop="category">
            <RadioGroup v-model="registerData.category">
              <Radio label="自理型">自理型</Radio>
              <Radio label="护理型">护理型</Radio>
              <Radio label="综合型">综合型</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem v-if="registerData.merchartType === 'group'" label="机构性质" prop="prop">
            <RadioGroup v-model="registerData.prop">
              <Radio label="公办机构">公办机构</Radio>
              <Radio label="民办机构">民办机构</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem v-if="registerData.merchartType === 'group'" prop="price" label="价格">
            <i-input type="text" v-model="registerData.price" placeholder="输入价格 / 月" />
          </FormItem>
          <FormItem :label-width="0">
            <Button type="primary" @click="handleSubmit">注册</Button>
          </FormItem>
        </i-form>
        <router-link to="/merchart/login">已有入驻？立即登录</router-link>
      </div>
    </i-col>
  </Row>
</template>

<script>
export default {
  name: 'MerchartRegister',
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
        confirm: '',
        name: '',
        address: '',
        corporateName: '',
        corporateId: '',
        creditCode: '',
        principalName: '',
        contactTel: '',
        merchartType: '',
        category: '',
        prop: '',
        price: ''
        //  email: 'group1@qq.com',
        // password: '123qwe',
        // confirm: '123qwe',
        // name: '测试机构1',
        // address: '合肥市瑶海区',
        // corporateName: '测试法人1',
        // corporateId: '123456789123456789',
        // creditCode: '123456789123456789',
        // principalName: '测试负责人1',
        // contactTel: '1234567',
        // merchartType: 'group',
        // category: '护理型',
        // prop: '公办机构',
        // price: '2000'
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
        ],
        name: [
          { required: true, message: '请填写商家名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请填写地址', trigger: 'blur' }
        ],
        corporateName: [
          { required: true, message: '请填写法人姓名', trigger: 'blur' }
        ],
        corporateId: [
          { required: true, message: '请填写法人身份证号', trigger: 'blur' },
          { len: 18, message: '位数不正确', trigger: 'blur' }
        ],
        creditCode: [
          { required: true, message: '请填写统一社会信用代码', trigger: 'blur' },
          { len: 18, message: '位数不正确', trigger: 'blur' }
        ],
        principalName: [
          { required: true, message: '请填写负责人姓名', trigger: 'blur' }
        ],
        contactTel: [
          { required: true, message: '请填写联系电话', trigger: 'blur' },
          { min: 5, message: '位数不正确', trigger: 'blur' }
        ],
        merchartType: [
          { required: true, message: '请选择商家类别', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择机构种类', trigger: 'blur' }
        ],
        prop: [
          { required: true, message: '请选择机构性质', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { pattern: /^\d+$/, message: '请输入数值', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          var formData = this.registerData,
            type = formData.merchartType            
          this.$ajax.post('/merchart/register/' + type, {
            email: formData.email,
            password: formData.password,
            address: formData.address,
            name: formData.name,
            corporateName: formData.corporateName,
            corporateId: formData.corporateId,
            creditCode: formData.creditCode,
            principalName: formData.principalName,
            contactTel: formData.contactTel,
            price: formData.price,
            category: formData.category,
            prop: formData.prop
          }).then(res => {
            this.$Message.success('注册成功！')
            this.$router.push('/merchart/login')
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
  },
  mounted () {
    this.$Modal.warning({
      title: '注意',
      content: '内容关系到能否通过审核，请如实填写'
    })
  }
}
</script>

<style>
.merchartregister {
  margin-top: 100px;
  padding: 50px;
  box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
.merchartregister-title {
  display: block;
  margin: 0 auto 20px;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
}
.merchartregister input {
  height: 40px;
}
.merchartregister button {
  display: block;
  width: 250px;
  margin: 0 auto;
}
.merchartregister a:last-child {
  float: right;
}
</style>