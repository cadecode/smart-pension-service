<template>
  <div class="head" ref="head">
    <Row>
      <i-col :xs="{span: 22, push: 1}" :sm="{span: 18, push: 3}">
        <div class="head-l">
          <a href="/">
            <img :src="logo" />
          </a>
        </div>
        <div class="head-r">
          <Menu mode="horizontal" @on-select="push">
            <Row>
              <i-col :xs="0" :sm="0" :md="24">
                <MenuItem name="/">
                  <Icon type="ios-backspace" />返回首页
                </MenuItem>
                <MenuItem name="/groups">
                  <Icon type="ios-heart" />养老机构
                </MenuItem>
                <MenuItem name="/service">
                  <Icon type="ios-home" />居家服务
                </MenuItem>
                <MenuItem :name="avatar().link">
                  <Avatar :src="avatar().img" icon="md-person" />
                </MenuItem>
              </i-col>
              <i-col :xs="24" :md="0">
                <Submenu name>
                  <template slot="title">
                    <Icon type="ios-menu" />菜单
                  </template>
                  <MenuItem name="/">返回首页</MenuItem>
                  <MenuItem name="/groups">养老机构</MenuItem>
                  <MenuItem name="/service">居家服务</MenuItem>
                </Submenu>
                <MenuItem :name="avatar().link">
                  <Avatar :src="avatar().img" icon="md-person" />
                </MenuItem>
              </i-col>
            </Row>
          </Menu>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>

export default {
  name: 'NavBar',
  data () {
    return {
      logo: require('../../assets/img/logo.jpg'),
    }
  },
  methods: {
    avatar () {
      var type = this.$store.state.type,
        img = this.$store.state.avatar,
        link = '/user/account'
      if (/group|shop/.test(type)) {
        link = '/merchart/' + type + 'account'
      }
      return { link, img }
    },
    push (name) {
      if (this.$router.currentRoute.path !== name) {
        this.$router.push(name)
      }
    }
  },
  mounted () {
    var nav = this.$refs.head,
      before = 0
    window.addEventListener('scroll', function () {
      var now = window.adapter().getScrollOffset().top
      if (now > before) {
        if (now > 70) {
          nav.adapter().addClass('navBar-hide')
        }
      } else {
        nav.adapter().removeClass('navBar-hide')
      }
      before = now;
    })
  }
}
</script>

<style>
.head {
  position: fixed;
  width: 100%;
  height: 70px;
  z-index: 1000;
  top: 0;
  background-color: white;
  box-shadow: 0 5px 2px rgba(0, 0, 0, 0.1);
  font-size: 15px;
  transition: top 0.5s ease-in-out;
}
.navBar-hide {
  top: -70px;
}
.head-content {
  height: 100%;
  margin: 0 auto;
}
.head-l {
  float: left;
  height: 100%;
}
.head-l img {
  height: 25px;
  margin: 25px 0 0 25px;
}
.head-r {
  float: right;
  height: 100%;
}
.head-r ul {
  height: 100%;
  line-height: 69px;
}
</style>