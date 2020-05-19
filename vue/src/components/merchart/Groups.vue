<template>
  <Row class="groups-wrapper">
    <i-col :xs="{span: 22, push: 1}" :sm="{span: 16, push: 4}">
      <Card z title="机构检索">
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
          <MenuItem name="护理型">护理型</MenuItem>
          <MenuItem name="自理型">自理型</MenuItem>
          <MenuItem name="综合型">综合型</MenuItem>
        </Menu>
        <br />
        <p>属性：</p>
        <Menu mode="horizontal" active-name="_" @on-select="pickProp">
          <MenuItem name="_">全部</MenuItem>
          <MenuItem name="公办机构">公办机构</MenuItem>
          <MenuItem name="民办机构">民办机构</MenuItem>
        </Menu>
        <br />
        <p>排序：</p>
        <Menu mode="horizontal" active-name="see" @on-select="pickSort">
          <MenuItem name="see">浏览量</MenuItem>
          <MenuItem name="price">价格</MenuItem>
        </Menu>
        <template v-if="groups.length === 0">
          <br />
          <p>暂无符合条件的机构！</p>
        </template>
        <Scroll v-else height="600" :on-reach-bottom="handleReachBottom">
          <List item-layout="vertical">
            <ListItem v-for="(item, index) in groups" :key="index">
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
                <li @click="showGroupModal(item.email)">点击查看</li>
              </template>
              <template slot="extra">
                <img :src="'http://localhost:3000' + item.image" />
              </template>
            </ListItem>
          </List>
        </Scroll>
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
  name: "Groups",
  data() {
    return {
      groups: [],
      query: {
        city: "_",
        area: "_",
        category: "_",
        prop: "_",
        sort: "see",
        start: 0
      },
      groupModal: {
        flag: false,
        data: {}
      },
      addressIndex: "",
      addressJson: [
        {
          name: "合肥市",
          area: [
            "瑶海区",
            "庐阳区",
            "蜀山区",
            "包河区",
            "长丰县",
            "肥东县",
            "肥西县",
            "庐江县",
            "巢湖市"
          ]
        },
        {
          name: "芜湖市",
          area: [
            "镜湖区",
            "弋江区",
            "鸠江区",
            "三山区",
            "芜湖县",
            "繁昌县",
            "南陵县",
            "无为县"
          ]
        },
        {
          name: "蚌埠市",
          area: [
            "龙子湖区",
            "蚌山区",
            "禹会区",
            "淮上区",
            "怀远县",
            "五河县",
            "固镇县"
          ]
        },
        {
          name: "淮南市",
          area: [
            "大通区",
            "田家庵区",
            "谢家集区",
            "八公山区",
            "潘集区",
            "凤台县",
            "寿县"
          ]
        },
        {
          name: "马鞍山市",
          area: ["花山区", "雨山区", "博望区", "当涂县", "含山县", "和县"]
        },
        { name: "淮北市", area: ["杜集区", "相山区", "烈山区", "濉溪县"] },
        { name: "铜陵市", area: ["铜官区", "义安区", "郊区", "枞阳县"] },
        {
          name: "安庆市",
          area: [
            "迎江区",
            "大观区",
            "宜秀区",
            "怀宁县",
            "潜山县",
            "太湖县",
            "宿松县",
            "望江县",
            "岳西县",
            "桐城市"
          ]
        },
        {
          name: "黄山市",
          area: [
            "屯溪区",
            "黄山区",
            "徽州区",
            "歙县",
            "休宁县",
            "黟县",
            "祁门县"
          ]
        },
        {
          name: "滁州市",
          area: [
            "琅琊区",
            "南谯区",
            "来安县",
            "全椒县",
            "定远县",
            "凤阳县",
            "天长市",
            "明光市"
          ]
        },
        {
          name: "阜阳市",
          area: [
            "颍州区",
            "颍东区",
            "颍泉区",
            "临泉县",
            "太和县",
            "阜南县",
            "颍上县",
            "界首市"
          ]
        },
        {
          name: "宿州市",
          area: ["埇桥区", "砀山县", "萧县", "灵璧县", "泗县"]
        },
        {
          name: "六安市",
          area: [
            "金安区",
            "裕安区",
            "叶集区",
            "霍邱县",
            "舒城县",
            "金寨县",
            "霍山县"
          ]
        },
        { name: "亳州市", area: ["谯城区", "涡阳县", "蒙城县", "利辛县"] }
      ]
    };
  },
  methods: {
    getGroups() {
      this.query.start = 0;
      var query = this.query;
      this.$ajax
        .post("/merchart/groups", {
          address: query.city + query.area,
          prop: query.prop,
          category: query.category,
          sort: query.sort,
          start: query.start
        })
        .then(res => {
          this.groups = res.data;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    showGroupModal(email) {
      this.$ajax
        .post("/merchart/info/group", {
          email: email
        })
        .then(res => {
          this.groupModal.data = res.data;
          this.groupModal.flag = true;
          console.log(res);
        })
        .catch(err => {
          this.$Message.error("请求失败！");
          console.log(err);
        });
    },
    pickCity(name) {
      if (name !== "_") {
        var _this = this;
        this.addressJson.forEach(function(item, index) {
          if (item.name === name) {
            _this.addressIndex = index;
          }
        });
      } else {
        this.addressIndex = "";
      }
      this.query.city = name;
      this.getGroups();
    },
    pickArea(name) {
      this.query.area = name;
      this.getGroups();
    },
    pickCategory(name) {
      this.query.category = name;
      this.getGroups();
    },
    pickProp(name) {
      this.query.prop = name;
      this.getGroups();
    },
    pickSort(name) {
      this.query.sort = name;
      this.getGroups();
    },
    handleReachBottom() {
      var query = this.query;
      this.$ajax
        .post("/merchart/groups", {
          address: query.city + query.area,
          prop: query.prop,
          category: query.category,
          sort: query.sort,
          start: query.start + 4
        })
        .then(res => {
          this.groups = this.groups.concat(res.data);
          this.query.start += 4;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getGroups();
  }
};
</script>
<style>
.groups-wrapper {
  margin-top: 100px;
}
.groups-wrapper img {
  width: 240px;
}
.menu {
  height: 120px !important;
}
.menu li {
  height: 60px !important;
}
</style>