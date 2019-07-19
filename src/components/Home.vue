<template>
  <div>
      <div class="menu">
        <Menu :theme="theme3" active-name="1" mode="vertical" @on-select="jumpToProjectManager" >
            <MenuGroup title="项目管理" >
                <MenuItem name="1" >
                    <Icon type="md-document" />
                    项目管理
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="md-chatbubbles" />
                    模板管理
                </MenuItem>
            </MenuGroup>
            <MenuGroup title="控制台" >
                <MenuItem name="3" >
                    <Icon type="md-document" />
                    模板生成
                </MenuItem>
            </MenuGroup>
        </Menu>
      </div>
      <div class="list">
        <router-view class="router-view" style="margin:0 auto"/>
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
      jumpToProjectManager(e){
        if(e == 1){
          app.$router.push({name:'Project'})
        }else if(e == 2){
          app.$router.push({name:'Template'})
        }else if(e == 3){
          app.$router.push({name:'Generate'})
        }else{
          app.$router.push({name:'Project'})
        }
      }
    },
    created(){
      app = this
      this.jumpToProjectManager(1)
    }
}
</script>
<style scoped>
.menu {float:left; width: 8%;}
.list {float:left; width: 92%;}
</style>