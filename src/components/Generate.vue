<template>
    <div style="width:1100px;padding:10px">
        <Form :label-width="120" ref="formInline" :model="formInline" :rules="ruleInline" style="width:1100px;padding:10px">
            <FormItem prop="projectId" label="选择项目">
                <Select v-model="formInline.projectId" filterable >
                    <Option v-for="item in projectList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem prop="datasType" label="数据类型">
                <RadioGroup v-model="formInline.datasType">
                    <Radio label="MYSQL">Mysql DDL</Radio>
                    <Radio label="GOLANG">Golang Struct</Radio>
                    <Radio label="JAVA">Java Class</Radio>
                </RadioGroup>
            </FormItem>

            <FormItem prop="datas" label="数据">
                <Input v-model="formInline.datas" type="textarea" :autosize="{minRows: 20,maxRows: 100}" placeholder="Enter something..." @on-blur="onDatasBlur"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">Submit</Button>
                <Button style="margin-left: 8px" >Cancel</Button>
            </FormItem>
        </Form>

    </div>
    
</template>
<script>
    import axios from 'axios'

    var app = null;
    export default {
        data () {
            return {
                formInline: {
                    projectId:"",
                    datas:"",
                    datasType:"",
                },
                ruleInline: {
                    projectId: [
                    {
                        required: true,
                        type: 'number',
                        message: "Please fill in the user projectId",
                        trigger: "blur"
                    }
                    ],
                    datas: [
                    {
                        required: true,
                        message: "Please fill in the datas.",
                        trigger: "blur"
                    }
                    ],
                    datasType: [
                    {
                        required: true,
                        type: 'string',
                        message: "Please fill in the datasType.",
                        trigger: "blur"
                    }
                    ]
                },
                projectList: []
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        axios({
                            method: 'post',
                            url: app.HOST + "/projects/" + app.formInline.projectId + "/generate",
                            data: app.formInline,
                            responseType: 'blob',
                            headers: {
                                'token': localStorage.getItem("token")
                            }
                        })
                        .then(function (response) {
                            if(response.data.type == 'application/json'){
                                var b = new Blob([response.data])
                                var reader = new FileReader();
                                reader.onload = function(event){
                                    var content = reader.result;
                                    var resp = JSON.parse(content)
                                    if(resp.code != 200){
                                        app.$Message.error(resp.msg);
                                    }
                                };
                                reader.readAsText(b);
                            }else{
                                app.download(response.data, response.headers['filename'])
                            }
                        })
                        .catch(function (error) {
                            app.$Message.error("err: " + error);
                        });
                        
                    } else {
                        app.$Message.warning('参数校验失败');
                    }
                });
            },
            download (data, filename) {
                if (!data) {
                    return
                }
                let url = window.URL.createObjectURL(new Blob([data]))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', filename)

                document.body.appendChild(link)
                link.click()
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
                            // app.projectList.splice(0,0,{id:"",name:"取消选择"})
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
            onDatasBlur(){
                localStorage.setItem("datas", app.formInline.datas);
            }
        },
        created(){
            app = this
            app.getProjectList()
            app.formInline.datas = localStorage.getItem("datas");
        }
    }
</script>
<style scoped>
.page{float:right;margin-top:20px}
</style>