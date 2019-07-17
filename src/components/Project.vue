<template>
    <div style="width:1100px;padding:10px">
        <div style="">
            <Button type="info" style="float:right" @click="jumpToCreateProject()">创建项目</Button>
        </div>
        <Table border :columns="columns" :data="data" style="float:right;margin-top:10px"></Table>
    </div>
    
</template>
<script>
    import axios from 'axios'
    var app = null;
    export default {
        data () {
            return {
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '用户ID',
                        key: 'userId'
                    }
                    ,
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '更新'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data: [],
                userId:0,
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data[index].name}<br>Age：${this.data[index].age}<br>Address：${this.data[index].address}`
                })
            },
            remove (index) {
                this.data.splice(index, 1);
            },
            getProjectList(){
                axios.get(app.HOST + "/users/" + app.userId + "/projects?page=1&size=10",{
                    headers:{token:localStorage.getItem("token")}
                })
                .then(function (response) {
                    var resp = response.data
                    if(resp.code == 200){
                        app.data = resp.data.list
                    }else{
                        alert(resp.msg)
                    }
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            jumpToCreateProject(){
                app.$router.push({name:'ProjectCreate'})
            }
        },
        created(){
            app = this
            app.userId = localStorage.getItem("userId")
            app.getProjectList()
        }
    }
</script>