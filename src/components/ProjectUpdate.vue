<template>
    <Form :label-width="80" ref="formInline" :model="formInline" :rules="ruleInline" style="width:1100px;padding:10px">
        <FormItem prop="name" label="项目名称" >
            <Input v-model="formInline.name" placeholder="Enter something..." style="width: 1000px"></Input>
        </FormItem>
        
        <FormItem prop="desc" label="描述">
            <Input v-model="formInline.desc" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="Enter something..."></Input>
        </FormItem>

        <FormItem prop="properties" label="扩展参数">
            <Input v-model="formInline.properties" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">Submit</Button>
            <Button style="margin-left: 8px" @click="back">Cancel</Button>
        </FormItem>
    </Form>
</template>
<script>
    import axios from 'axios'
    var app = null;

    export default {
        data () {
            return {
                id:0,
                formInline: {
                    name: "",
                    desc: "",
                    properties: "",
                },
                ruleInline: {
                    name: [
                    {
                        required: true,
                        message: "Please fill in the user name",
                        trigger: "blur"
                    }
                    ],
                    desc: [
                    {
                        required: false,
                        message: "Please fill in the desc.",
                        trigger: "blur"
                    }
                    ],
                    properties: [
                    {
                        required: false,
                        message: "Please fill in the properties.",
                        trigger: "blur"
                    }
                    ]
                }
            }
        },
        //app.HOST + "/projects/", this.formInline
        methods:{
            handleSubmit(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        axios.put(app.HOST + "/projects/" + app.id, app.formInline, {
                            headers:{token:localStorage.getItem("token")}
                        })
                        .then(function (response) {
                            var resp = response.data
                            if(resp.code == 200){
                                app.$Message.success('更新项目成功');
                                app.$router.push({name:'Project'})
                            }else{
                               app.$Message.error(resp.msg);
                            }
                        })
                        .catch(function (error) {
                            app.$Message.error(error);
                        });
                        
                    } else {
                        app.$Message.warning('参数校验失败');
                    }
                });
            },
            GetProjectInfo(id){
                axios.get(app.HOST + "/projects/" + id,{
                    headers:{token:localStorage.getItem("token")}
                })
                .then(function (response) {
                    var resp = response.data
                    if(resp.code == 200){
                        app.formInline.name = resp.data.name
                        app.formInline.desc = resp.data.desc
                        app.formInline.properties = resp.data.properties
                    }else{
                        app.$Message.error(resp.msg);
                    }
                })
                .catch(function (error) {
                    app.$Message.error('err: ' + error);
                });
            },
            back(){
                this.$router.go(-1);
            }
        },
        created(){
            app = this

            var id = app.$route.query.id
            app.id = id
            app.GetProjectInfo(id)
        }
    }
</script>
<style scoped>

</style>