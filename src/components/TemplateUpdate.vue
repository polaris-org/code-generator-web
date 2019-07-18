<template>
    <Form :label-width="80" ref="formInline" :model="formInline" :rules="ruleInline" style="width:1100px;padding:10px">
        <FormItem prop="name" label="模板名称" >
            <Input v-model="formInline.name" placeholder="Enter something..." style="width: 1000px"></Input>
        </FormItem>
        <FormItem prop="suffix" label="模板后缀" >
            <Input v-model="formInline.suffix" placeholder="Enter something..." style="width: 1000px"></Input>
        </FormItem>

        <FormItem prop="projectId" label="绑定项目">
            <Select v-model="formInline.projectId" filterable >
                <Option v-for="item in projectList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </FormItem>
        
        <FormItem prop="desc" label="描述">
            <Input v-model="formInline.desc" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="Enter something..."></Input>
        </FormItem>

        <FormItem prop="content" label="模板内容">
            <Input v-model="formInline.content" type="textarea" :autosize="{minRows: 20,maxRows: 100}" placeholder="Enter something..."></Input>
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
                projectList: [],
                formInline: {
                    name: "",
                    desc: "",
                    suffix: "",
                    content: "",
                    projectId: 0,
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
                    suffix: [
                    {
                        required: false,
                        message: "Please fill in the suffix.",
                        trigger: "blur"
                    }
                    ],
                    projectId: [
                    {
                        required: true,
                        type: 'number',
                        message: "Please fill in the project.",
                        trigger: "change"
                    }
                    ],
                    content: [
                    {
                        required: true,
                        message: "Please fill in the content.",
                        trigger: "blur"
                    }
                    ]
                }
            }
        },
        methods:{
            handleSubmit(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        axios.put(app.HOST + "/templates/" + app.id, app.formInline, {
                            headers:{token:localStorage.getItem("token")}
                        })
                        .then(function (response) {
                            var resp = response.data
                            if(resp.code == 200){
                                app.$Message.success('更新模板成功');
                                app.$router.push({name:'Template'})
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
            GetTemplateInfo(id){
                axios.get(app.HOST + "/templates/" + id,{
                    headers:{token:localStorage.getItem("token")}
                })
                .then(function (response) {
                    var resp = response.data
                    if(resp.code == 200){
                        app.formInline.name = resp.data.name
                        app.formInline.desc = resp.data.desc
                        app.formInline.suffix = resp.data.suffix
                        app.formInline.content = resp.data.content
                        app.formInline.projectId = resp.data.projectId
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
            },
            getProjectList(){
                axios.get(app.HOST + "/projects?page=" + 1 + "&size=" + 0,{
                    headers:{token:localStorage.getItem("token")}
                })
                .then(function (response) {
                    var resp = response.data
                    if(resp.code == 200){
                        if(resp.data.list){
                            app.projectList = resp.data.list
                        }else{
                            app.data = []
                        }
                    }else{
                        app.$Message.error(resp.msg);
                    }
                })
                .catch(function (error) {
                    app.$Message.error('err: ' + error);
                });
            },
        },
        created(){
            app = this

            var id = app.$route.query.id
            app.id = id
            app.getProjectList()
            app.GetTemplateInfo(id)
        }
    }
</script>
<style scoped>

</style>