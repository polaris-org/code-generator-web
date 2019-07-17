<template>
  <div>
      <div class="menu">
        <Menu :theme="theme3" active-name="1" mode="vertical">
            <MenuGroup title="项目管理" @click="jumpToProjectManager()">
                <MenuItem name="1" @click="jumpToProjectManager()">
                    <Icon type="md-document" />
                    项目管理
                </MenuItem>
                <MenuItem name="2" @click="jumpToProjectManager()">
                    <Icon type="md-chatbubbles" />
                    评论管理
                </MenuItem>
            </MenuGroup>
            <MenuGroup title="统计分析">
                <MenuItem name="3">
                    <Icon type="md-heart" />
                    用户留存
                </MenuItem>
                <MenuItem name="4">
                    <Icon type="md-leaf" />
                    流失用户
                </MenuItem>
            </MenuGroup>
        </Menu>
      </div>
      <Button type="primary" @click="jumpToProjectManager()" >Signin</Button
      <div class="list">
        <router-view class="router-view"/>
      </div>
  </div>
</template>
<script>
var app = null;
export default {
    data () {
        return {
            theme3: 'light'
        }
    },
    methods:{
      jumpToProjectManager(){
        alert(1)
        app.$router.push({name:'Project'})
      }
    },
    created(){
      app = this
    }
}
</script>
<style scoped>
.menu {float:left}
.list {float:left}
</style>