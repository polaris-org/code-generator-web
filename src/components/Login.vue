<template>
  <div class="contains">
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
      <FormItem prop="username" inline>
        <Input type="text" v-model="formInline.username" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password" inline>
        <Input
          type="password"
          v-model="formInline.password"
          placeholder="Password"
        >
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem inline>
        <Button type="primary" @click="handleSubmit('formInline')"
          >Signin</Button
        >
      </FormItem>
      <FormItem inline>
        <Button type="info" @click="register"
          >Register</Button
        >
      </FormItem>
    </Form>
  </div>
</template>
<script>
import axios from 'axios'

var app = null;

export default {
  data() {
    return {
      formInline: {
        username: "",
        password: ""
      },
      ruleInline: {
        username: [
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
          var form = this;
          axios.post(app.HOST + "/tokens/", this.formInline)
          .then(function (response) {
            if(response.data.code == 200){
              var userInfo = response.data.data;
              localStorage.setItem("token", userInfo.token);
              localStorage.setItem("nickname", userInfo.nickname);
              app.$router.push({name:'Home'})
            }else{
              form.$Message.error(response.data.msg);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        } else {
          
        }
      });
    },
    register(){
      app.$router.push({name:'Register'})
    }
  },
  created () {
    app = this;
  },

};
</script>

<style scoped>
.contains {
  width: 300px;
  height: 200px;
  margin: 0 auto;
}
</style>
