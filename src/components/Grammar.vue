<template>
    <div style="width:1100px;padding:10px;padding-bottom:200px" id="app" >
        <pre ref="article" id="article">
# 模板语法

在线文档：[http://ibeetl.com/guide/#beetl_4_6](http://ibeetl.com/guide/#beetl_4_6)

# 自定义函数
|     函数名             .|  入参                    .|    描述
|:-------------|:--------|:--------|
printHump        | string | 参数名转驼峰, eg: hello_world -> helloWorld
printCapitalize  | string | 参数名首字母大写， eg: helloWorld -> HelloWorld
convertType        | string, string | 类型转换，eg: Long, Golang -> int64

# 全局参数
全局参数的JSON格式如下：
```
{
    "fields": [
        {
            "name": "id",       //字段名称
            "primarily": true,  //如果值为true，该字段是主键
            "required": true,   //是否非空
            "type": "LONG"      //类型
        },
        {
            "name": "org_id",
            "primarily": false,
            "required": true,
            "type": "LONG"
        }
    ],
    "name": "ppm_bas_object_id" //数据名称
}
```
模板中引用的方式：
```
data name is ${data.name}
data fields size is ${data.fields.~size}
```
# 演示
建议我们在项目中的模板参数中去声明模板中要用到的全部变量，例如：

```
<%
var tableName = data.name;
var names = strutil.split(tableName, "_");
var objName = "";
for(n in names){
	if(nLP.dataIndex < 2){
		continue;
	}
	var link = "_";
	if(nLP.last){
		link = "";
	}
	objName += n + link;
}

var grahqlObject = printCapitalize(printHump(objName));
var talbeObject = printCapitalize(printHump(data.name));
%>
```
这个模板语法的目的是通过Mysql表名得到对象名，假如``data.name``的值为：ppm_pro_project，那么最终输出为：
```
grahqlObject: Project
talbeObject：PpmProProject
```
        </pre>
    </div>
    
</template>
<script>
    import axios from 'axios'
    import marked from 'marked'

    var app = null;
    export default {
        data () {
            return {
            }
        },
        methods: {
           compiledMarkdown () {
                var value = this.$refs.article.innerText
                var after = marked(value, { sanitize: true })
                this.$refs.article.innerHTML = after
            }
        },
        created(){
            app = this
        },
        mounted(){
            app.compiledMarkdown()
        }
    }
</script>
<style scoped>

</style>