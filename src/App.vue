<template>
  <div id="app">
    <div class="banner" >
        <h2 style="float:left;cursor:pointer" @click="home">CodeGen</h2>
        <div class="banner-item" icon="logo-dribbble" type="primary" v-if="!token" @click="login">登录</div>
        <div class="banner-item" icon="ios-exit" type="warning" v-if="token" @click="exit">退出</div>
        <div class="demo-avatar banner-item" v-if="token">
          当前登录用户：{{this.nickname}}
      </div>
    </div>
    <router-view class="router-view"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data (){
    return {
      nickname: '',
      token:''
    }
  },
  methods: {
    exit(){
      localStorage.removeItem("nickname")
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
      window.location.reload()
    },
    login(){
      this.$router.push({name:'Login'})
    },
    upload(){
      this.$router.push({name:'Upload'})
    },
    home (){
      this.$router.push({name:'Home'})
    }
  },
  created (){
    this.nickname = localStorage.getItem("nickname")
    this.token = localStorage.getItem("token")
  },
  watch: {
    "$route": function (to, from) {
      this.nickname = localStorage.getItem("nickname")
      this.token = localStorage.getItem("token")
      console.log("watch")
　　}
  }
}
</script>

<style>
.banner {width: 100%; padding: 10px 20px; overflow: hidden}
.banner .banner-item {float: right; margin-right: 20px;line-height:35px;cursor:pointer}
</style>
