<template>
  <div id="app">
    <div class="banner" >
        <h2 style="float:left;cursor:pointer" @click="home">CodeGen</h2>
        <div class="banner-item" icon="logo-dribbble" type="primary" v-if="!token" @click="login">Login</div>
        <div class="banner-item" icon="ios-exit" type="warning" v-if="token" @click="exit">Exit</div>
        <div class="demo-avatar banner-item" v-if="token">
          <Avatar style="color: #bbb;background-color: #333">{{this.nickname[0]}}</Avatar>
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
