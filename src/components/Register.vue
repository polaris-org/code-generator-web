<template>
  <div class="contains">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="username" inline>
        <Input v-model="formInline.username" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="code"  >
        <Input v-model="formInline.code" placeholder="code">
          <Icon type="ios-code" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem  >
        <Button type="info" @click="sendMail" class="sendMail" >{{this.count}}</Button>
      </FormItem>
      <FormItem prop="password" >
        <Input
          v-model="formInline.password"
          placeholder="Password"
          type="text"
        >
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem >
        <Button type="primary" @click="handleSubmit('formInline')"
          >Register</Button
        >
      </FormItem>
    </Form>
  </div>
</template>
<script>
import axios from "axios";

var app = null;

export default {
  data() {
    return {
      count: "send",
      formInline: {
        username: "",
        password: "",
        code: ""
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var from = this;
          axios
            .post(app.HOST + "/user/", this.formInline)
            .then(function(response) {
              if (response.data.code == 200) {
                from.$Message.success("注册成功");
                app.$router.push({name:'Login'})
              } else {
                from.$Message.error(response.data.msg);
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
        }
      });
    },
    sendMail(){
      var form = this.$refs["formInline"];
      if(! this.formInline.username){
        form.$Message.error("请输入邮箱")
        return;
      }
      if(this.count == 'send'){
        
        var mailInfo = {
          type: 1,
          email: this.formInline.username
        }
        axios.post(app.HOST + "/mail/", mailInfo)
          .then(function (response) {
            if(response.data.code == 200){
              form.$Message.success("发送成功");
              app.count = 60;
              var countTimer = setInterval(function(){
                app.count --;
                if(app.count == 0){
                  app.count = 'send';
                  clearInterval(countTimer)
                }
              }, 1000);
            }else{
              form.$Message.error(response.data.msg);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      
    }
  },
  created() {
    app = this;
  }
};
</script>

<style scoped>
.contains {
  width: 300px;
  height: 200px;
  margin: 0 auto;
}
</style>
