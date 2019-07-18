<template>
  <div>
      <div class="menu">
        <Menu :theme="theme3" active-name="1" mode="vertical" @on-select="jumpToProjectManager">
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
        }
        
      }
    },
    created(){
      app = this
    }
}
</script>
<style scoped>
.menu {float:left; width: 8%;}
.list {float:left; width: 92%;}
</style>