<template>
  <Row class="service-wrapper">
    <i-col :xs="{span: 22, push: 1}" :sm="{span: 16, push: 4}">
      <Card z title="服务检索">
        <p>所在区域：</p>
        <Menu class="menu" mode="horizontal" active-name="_" @on-select="pickCity">
          <MenuItem name="_">全部</MenuItem>
          <MenuItem
            v-for="(item, index) in addressJson"
            :key="index"
            :name="item.name"
          >{{item.name}}</MenuItem>
        </Menu>
        <template v-if="addressIndex !== ''">
          <br />
          <p>县/区：</p>
          <Menu mode="horizontal" active-name="_" @on-select="pickArea">
            <MenuItem name="_">全部</MenuItem>
            <MenuItem
              v-for="(item, index) in addressJson[addressIndex].area"
              :key="index"
              :name="item"
            >{{item}}</MenuItem>
          </Menu>
        </template>
        <br />
        <p>类型：</p>
        <Menu mode="horizontal" active-name="_" @on-select="pickCategory">
          <MenuItem name="_">全部</MenuItem>
          <MenuItem name="生活照料">生活照料</MenuItem>
          <MenuItem name="家政服务">家政服务</MenuItem>
          <MenuItem name="医疗护理">医疗护理</MenuItem>
          <MenuItem name="老年教育">老年教育</MenuItem>
          <MenuItem name="精神慰藉">精神慰藉</MenuItem>
        </Menu>
        <br />
        <p>排序：</p>
        <Menu mode="horizontal" active-name="see" @on-select="pickSort">
          <MenuItem name="see">浏览量</MenuItem>
          <MenuItem name="price">价格</MenuItem>
        </Menu>
        <template v-if="service.length === 0">
          <br />
          <p>暂无符合条件的服务！</p>
        </template>
        <Scroll v-else height="600" :on-reach-bottom="handleReachBottom">
          <List item-layout="vertical">
            <ListItem v-for="(item, index) in service" :key="index">
              <ListItemMeta :avatar="item.avatar" :title="item.name">
                <Avatar slot="avatar" icon="md-person" :src="item.avatar" />
              </ListItemMeta>
              <p>地址：{{item.address}}</p>
              <p>类型：{{item.category}}</p>
              <p>属性：{{item.prop}}</p>
              <template slot="action">
                <li>价格 ￥ {{item.price}} /月起</li>
                <li>
                  浏览量
                  <Icon type="ios-eye" />
                  {{item.see}}
                </li>
                <li>点击查看</li>
              </template>
              <template slot="extra">
                <img :src="'http://localhost:3000' + item.image" />
              </template>
            </ListItem>
          </List>
        </Scroll>
      </Card>
    </i-col>
  </Row>
</template>
<script>
export default {
  name: 'service',
  data () {
    return {
      service: [],
      query: {
        city: '_',
        area: '_',
        category: '_'
      },
      addressIndex: '',
      addressJson: [{        "name": "合肥市",
        "area": ["瑶海区",
          "庐阳区",
          "蜀山区",
          "包河区",
          "长丰县",
          "肥东县",
          "肥西县",
          "庐江县",
          "巢湖市"]      },
      {        "name": "芜湖市",
        "area": ["镜湖区",
          "弋江区",
          "鸠江区",
          "三山区",
          "芜湖县",
          "繁昌县",
          "南陵县",
          "无为县"]      },
      {        "name": "蚌埠市",
        "area": ["龙子湖区",
          "蚌山区",
          "禹会区",
          "淮上区",
          "怀远县",
          "五河县",
          "固镇县"]      },
      {        "name": "淮南市",
        "area": ["大通区",
          "田家庵区",
          "谢家集区",
          "八公山区",
          "潘集区",
          "凤台县",
          "寿县"]      },
      {        "name": "马鞍山市",
        "area": ["花山区",
          "雨山区",
          "博望区",
          "当涂县",
          "含山县",
          "和县"]      },
      {        "name": "淮北市",
        "area": ["杜集区",
          "相山区",
          "烈山区",
          "濉溪县"]      },
      {        "name": "铜陵市",
        "area": ["铜官区",
          "义安区",
          "郊区",
          "枞阳县"]      },
      {        "name": "安庆市",
        "area": ["迎江区",
          "大观区",
          "宜秀区",
          "怀宁县",
          "潜山县",
          "太湖县",
          "宿松县",
          "望江县",
          "岳西县",
          "桐城市"]      },
      {        "name": "黄山市",
        "area": ["屯溪区",
          "黄山区",
          "徽州区",
          "歙县",
          "休宁县",
          "黟县",
          "祁门县"]      },
      {        "name": "滁州市",
        "area": ["琅琊区",
          "南谯区",
          "来安县",
          "全椒县",
          "定远县",
          "凤阳县",
          "天长市",
          "明光市"]      },
      {        "name": "阜阳市",
        "area": ["颍州区",
          "颍东区",
          "颍泉区",
          "临泉县",
          "太和县",
          "阜南县",
          "颍上县",
          "界首市"]      },
      {        "name": "宿州市",
        "area": ["埇桥区",
          "砀山县",
          "萧县",
          "灵璧县",
          "泗县"]      },
      {        "name": "六安市",
        "area": ["金安区",
          "裕安区",
          "叶集区",
          "霍邱县",
          "舒城县",
          "金寨县",
          "霍山县"]      },
      {        "name": "亳州市",
        "area": ["谯城区",
          "涡阳县",
          "蒙城县",
          "利辛县"]
      }]
    }
  },
  methods: {
    getService () {
      console.log('getService')
    },
    pickCity (name) {
      if (name !== '_') {
        var _this = this
        this.addressJson.forEach(function (item, index) {
          if (item.name === name) {
            _this.addressIndex = index
          }
        })
      } else {
        this.addressIndex = ''
      }
      this.query.city = name
      this.getService()
    },
    pickArea (name) {
      this.query.area = name
      this.getService()
    },
    pickCategory (name) {
      this.query.category = name
      this.getService()
    }
  },
  mounted () {
    this.getService()
  }
}</script>
<style>
.service-wrapper {
  margin-top: 100px;
}
.service-wrapper img {
  width: 240px;
}
</style>