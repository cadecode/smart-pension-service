<template>
  <Row>
    <i-col
      :xs="{span: 22, push: 1}"
      :sm="{span: 16, push: 4}"
      :md="{span: 12, push: 6}"
      :lg="{span: 8, push: 8}"
    >
      <!-- 卡片 -->
      <Card class="useraccount" title="用户设置" icon="ios-options" :padding="0">
        <CellGroup>
          <a @click="avatarModal.flag = true">
            <Cell title="头像" label="点击更换">
              <Avatar :src="info.avatar" icon="md-person" slot="extra" />
            </Cell>
          </a>
          <a @click="nameModal.flag = true">
            <Cell title="名称" label="点击修改" :extra="info.name" />
          </a>
          <a @click="emailModal.flag = true">
            <Cell title="邮箱" label="点击修改" :extra="info.email" />
          </a>
          <a @click="passwordModal.flag = true">
            <Cell title="更改密码">
              <Icon type="ios-arrow-forward" slot="extra" />
            </Cell>
          </a>
          <Cell title="注册时间" :extra="info.registerDate" />
          <a @click="handleLoginOut">
            <Cell title="退出登录">
              <Icon type="ios-arrow-forward" slot="extra" />
            </Cell>
          </a>
        </CellGroup>
      </Card>
    </i-col>
    <!-- 对话框 -->
    <Modal v-model="avatarModal.flag">
      <p slot="header">
        <Icon type="ios-information-circle" size="21" color="#008EF0"></Icon>更换头像
      </p>
    </Modal>
    <Modal v-model="nameModal.flag">
      <p slot="header">
        <Icon type="ios-information-circle" size="21" color="#008EF0"></Icon>修改名称
      </p>
      <i-form :label-width="100">
        <FormItem label="新名称">
          <i-input type="text" v-model="nameModal.form.newName" placeholder="输入名称"></i-input>
        </FormItem>
      </i-form>
    </Modal>
    <Modal v-model="emailModal.flag">
      <p slot="header">
        <Icon type="ios-information-circle" size="21" color="#008EF0"></Icon>修改邮箱
      </p>
      <i-form :label-width="100">
        <FormItem label="新邮箱">
          <i-input type="text" v-model="emailModal.form.newEmail" placeholder="输入邮箱"></i-input>
        </FormItem>
        <FormItem label="验证密码">
          <i-input type="password" v-model="emailModal.form.password" placeholder="输入密码"></i-input>
        </FormItem>
      </i-form>
    </Modal>
    <Modal v-model="passwordModal.flag">
      <p slot="header">
        <Icon type="ios-information-circle" size="21" color="#008EF0"></Icon>更改密码
      </p>
      <i-form :label-width="100">
        <FormItem label="新密码">
          <i-input type="text" v-model="passwordModal.form.newPassword" placeholder="输入密码"></i-input>
        </FormItem>
        <FormItem label="确认密码">
          <i-input type="text" v-model="passwordModal.form.newConfirm" placeholder="确认密码"></i-input>
        </FormItem>
        <FormItem label="验证旧密码">
          <i-input type="password" v-model="passwordModal.form.password" placeholder="输入密码"></i-input>
        </FormItem>
      </i-form>
    </Modal>
  </Row>
</template>

<script>
export default {
  name: 'UserAccount',
  data () {
    return {
      info: {
        avatar: '',
        email: '',
        name: '',
        registerDate: ''
      },
      avatarModal: {
        flag: false,
        form: {

        }
      },
      nameModal: {
        flag: false,
        form: {
          newName: ''
        }
      },
      emailModal: {
        flag: false,
        form: {
          newEmail: '',
          password: ''
        }
      },
      passwordModal: {
        flag: false,
        form: {
          newPassword: '',
          newConfirm: '',
          password: ''
        }
      },
      rules: [

      ]
    }
  },
  created () {
    this.$ajax.post('/user/account', {
      email: this.$store.state.email
    }).then(res => {
      this.info = res.data
      console.log(res)
    }).catch(err => {
      this.$Message.error('登录失效！')
      this.$validator.deleteAllState()
      this.$router.push('/')
      console.log(err)
    })
  },
  methods: {
    handleLoginOut () {
      this.$validator.deleteAllState()
      this.$Message.info('退出登录！')
      this.$router.push('/')
    }
  }
}
</script>

<style>
.useraccount {
  margin-top: 100px;
  padding: 30px;
  box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
</style>