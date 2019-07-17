<template>
    <div id="app">
       <div class="contains">
         <div class="wrapper">
           <div class="display-unit">
              <video ref="video" controls="controls" style="display:none" class="source">
              
              </video>
              <img ref="img" src="" class="source" style="display:none"/>
           </div>
         </div>
       </div>
    </div>
</template>
<script>
import axios from 'axios'
var app = null;

export default {
    data () {
      return {
        source: ''
      }
    },
    methods: {
      getAnimationInfo(){
        axios.get(this.HOST + '/animation/' + this.$route.params.id)
        .then(function (response) {
          if(response.data.code == 200){
            var animation = response.data.data;
            var suffix = animation.nativeSuffix;
            if(suffix == 'mp4'){
              app.$refs.video.src = animation.processedUrl;
              app.$refs.video.poster = animation.coverUrl;
              app.$refs.video.style.display = "block";
            }else{
              app.$refs.img.src = animation.processedUrl;
              app.$refs.img.style.display = "block";
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      
    },
    created () {
      app = this;
      this.getAnimationInfo();
    }
  }

</script>

<style scoped>
.contains{
  overflow:hidden; 
}
.contains .wrapper{
  width: 100%;
}
.contains .wrapper .display-unit{
  width: 800px;
  overflow: hidden;
  margin: 20px auto;
}

.contains .wrapper .display-unit .source{
  width: 100%
}
</style>
