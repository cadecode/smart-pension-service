<template>
  <Row>
    <i-col :xs="{span: 22, push: 1}" :sm="{span: 16, push: 4}">
      <Card class="recommendbox-wrapper">
        <p slot="title">
          <Icon type="md-happy" />推荐机构
        </p>
        <router-link to="/groups" slot="extra">更多机构</router-link>
        <template v-if="groups.length === 0">
          <br />
          <p>暂无推荐机构！</p>
        </template>
        <div
          class="recommendgroup-box"
          v-for="(group, index) in groups"
          :key="index"
          @click="showGroupModal(group.email)"
        >
          <Card>
            <p slot="title">{{group.name}}</p>
            <p slot="extra">￥{{group.price}}/月起</p>
            <img :src="'http://localhost:3000' + group.image" />
          </Card>
        </div>
      </Card>
      <Card class="recommendbox-wrapper">
        <p slot="title">
          <Icon type="md-flame" />热门服务
        </p>
        <router-link to="/service" slot="extra">更多服务</router-link>
        <template v-if="service.length === 0">
          <br />
          <p>暂无热门服务！</p>
        </template>
      </Card>
    </i-col>
    <Modal v-model="groupModal.flag" :closable="false">
      <Card title="机构信息">
        <CellGroup>
          <Cell title="名称" :extra="groupModal.data.name"></Cell>
          <Cell title="地址" :extra="groupModal.data.address"></Cell>
          <Cell title="负责人" :extra="groupModal.data.principalName"></Cell>
          <Cell title="联系电话" :extra="groupModal.data.contactTel"></Cell>
          <Cell title="类型" :extra="groupModal.data.category"></Cell>
          <Cell title="属性" :extra="groupModal.data.prop"></Cell>
        </CellGroup>
      </Card>
    </Modal>
  </Row>
</template>
<script>
export default {
  name: 'Recommend',
  data () {
    return {
      groups: [],
      service: [],
      groupModal: {
        flag: false,
        data: {}
      }
    }
  },
  methods: {
    showGroupModal (email) {
      this.$ajax.post('/merchart/info/group', {
        email: email
      }).then(res => {
        this.groupModal.data = res.data
        this.groupModal.flag = true
        console.log(res)
      }).catch(err => {
        this.$Message.error('请求失败！')
        console.log(err)
      })
    }
  },
  created () {
    this.$ajax.post('/merchart/recommend/group', {}).then(res => {
      this.groups = res.data
      console.log(res)
    }).catch(err => {
      this.$Message.error('请求失败！')
      console.log(err)
    })
  }
}
</script>
<style>
.recommendbox-wrapper {
  margin: 20px 0;
}
.recommendgroup-box {
  display: inline-block;
  width: 33.33%;
  padding: 20px;
  cursor: pointer;
}
.recommendgroup-box img {
  width: 100%;
}
</style>