<template>
    <div id="app">
       <div class="contains">
         <Form ref="formInline" :model="formInline" :rules="ruleInline" >
          <FormItem prop="title" >
            <Input v-model="formInline.title" placeholder="title">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="describe"  >
            <Input v-model="formInline.describe" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
          </FormItem>
           <Upload
            :before-upload="beforeUpload"
            multiple
            type="drag"
            action="">
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>Click or drag files here to upload</p>
            </div>
        </Upload>
          <FormItem  >
            <Button type="info" @click="submit" >Upload</Button>
          </FormItem>
        </Form>
         <!-- <el-upload
            :http-request="Upload"
            :data="dataObj" 
            multiple
            :show-file-list="false"
            :before-upload="beforeUpload" 
            action=""
          >
            <!-- <i class="el-icon-upload"/>
            <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div> -->
            <!-- <el-button size="small" type="primary">点击上传</el-button> -->
            <!-- <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">请上传图片格式文件</div>
          </el-upload> -->
         

          <Progress :percent="progress" />
          处理进度条
       </div>
    </div>
    
</template>
<script>
import axios from 'axios'
import { clearInterval } from 'timers';

const OSS = require('ali-oss')
var app = null;



export function doUpLoad (url, data) {
  console.log(url)
  console.log(data)
  return new Promise((resolve, reject) => {

    axios({
      url: url,
      method: 'post',
      processData: false,
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => {
        resolve(res)
        alert("上传成功")
      })
      .catch((err) => {
        alert(err)
      })
  })
}

export function doData (params, file, gObjectName) { // 设置请求参数
  console.log(params)
  var request = new FormData()
  // 文件名字，可设置路径
  request.append('key', 'native/' + gObjectName)
  // policy规定了请求的表单域的合法性
  request.append('policy', params.policy)
  // Bucket 拥有者的Access Key Id
  request.append('OSSAccessKeyId', params.accessId)
  // 让服务端返回200,不然，默认会返回204
  request.append('success_action_status', '200')
  request.append('Signature', params.signature)
  // 需要上传的文件filer
  request.append('Filename', 'native/' + gObjectName)
  request.append('name', gObjectName)
  request.append('file', file, gObjectName)
  return request
}



export default {
    data () {
      return {
        tempUrl: '', //存上传后的图片url
        dataObj: {}, //存签名信息
        progress:0,
        formInline: {
          title:'',
          describe:'',
          nativeKey:'',
        },
        ruleInline: {
          title: [
            {
              required: true,
              message: "标题",
              max: 200,
              min:1,
              trigger: "blur"
            }
          ],
          describe: [
            {
              required: true,
              message: "Please fill in the user name",
              max: 200,
              trigger: "blur"
            }
          ]
        }
      }
    },
    methods: {
      beforeUpload(file) {
        return new Promise((resolve, reject) => {
          axios.get(this.HOST + "/oss/police")
        .then(function (response) {
          var data = response.data;
          if(data.code == 200){
            app.dataObj = data.data;
            app.Upload(file);
            resolve(true)
          }else{
            alert(data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
          reject(false)
        });
        })
        
      },
      Upload(file) {

        const that = this
        //判断扩展名
        const tmpcnt = file.name.lastIndexOf(".")
        const exname = file.name.substring(tmpcnt + 1)
        const names = ['jpg', 'jpeg', 'webp', 'png','bmp','mp4','gif']
        if(names.indexOf(exname)< 0 ){
          this.$message.error("不支持的格式!")
          return
        }
        async function multipartUpload () {

          const fileName = Date.parse(new Date()) + app.guid() + "." + exname

          var data = doData(app.dataObj, file, fileName);

          var p = doUpLoad(app.dataObj.host, data);
          
          app.formInline.nativeKey = fileName;
          

          // axios.post(app.HOST + "/animation/", this.formInline)
          // .then(function (response) {
          //   if(response.data.code == 200){
          //     var userInfo = response.data.data;
          //     localStorage.setItem("token", userInfo.token);
          //     localStorage.setItem("nickname", userInfo.nickname);
          //     app.$router.push({name:'Home'})
          //   }else{
          //     form.$Message.error(response.data.msg);
          //   }
          // })
          // .catch(function (error) {
          //   console.log(error);
          // });
          
        }
        multipartUpload ()
      },
      guid() {
          return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
              return v.toString(16);
          });
      },
      submit(){
      var form = this.$refs["formInline"];
      if(! this.formInline.nativeKey){
        form.$Message.error("请上传文件")
        return;
      }
      axios({
        url: app.HOST + "/animation/",
        method: 'post',
        data:this.formInline,
        headers:{
          'token':localStorage.getItem('token')
        }
      })
        .then(function (response) {
          if(response.data.code == 200){
            form.$Message.success("发布成功，等待处理");
            
            var timer = setInterval(function(){
                axios.get(app.HOST + "/animation/progress/" + response.data.data.id)
                 .then(function (r) {
                    if(r.data.code == 200){
                      app.progress = r.data.data.progress * 100;
                      console.log(app.progress)
                      if(r.data.data.status == 'SUCCESS'){
                        app.progress = 100;
                        clearInterval(timer)
                      }
                    }else if(r.data.code == 512){
                       app.progress = 100;
                       clearInterval(timer)
                    }else {
                      
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            }, 500);

          }else{
            form.$Message.error(response.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      
      
    }
      
      
    },
    created () {
      app = this;
    }
  }

</script>

<style scoped>
.contains{
  width: 500px;
  margin: 0 auto;
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
  
}
.el-upload__input {
  display:none!important
}
</style>
