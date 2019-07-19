<template>
    <div style="width:1100px;padding:10px;padding-bottom:200px" id="app" >
        <pre ref="article" id="article">
# 创建项目
通过左侧导航栏进入项目管理，之后点击创建项目按钮开始创建。

|     参数             .|  描述          |
|:-------------|:--------|
项目名称        | 项目的名称
描述            | 对于项目的描述
模板参数        | 根据模板的语法额外扩展模板参数

模板参数举例：
```javascript
<%
var name = data.name
%>
```
# 创建模板
通过左侧导航栏进入模板管理，之后点击创建模板按钮开始创建。

|     参数             .|  描述          |
|:-------------|:--------|
模板名称        | 生成文件的名称
模板后缀        | 生成文件的后缀
绑定项目        | 设置模板项目归属
模板内容        | 自定义模板内容，可以使用**全局参数**和创建项目时设置的**模板参数**。

模板内容举例：
```
name is ${data.name} //这里使用全局参数
name is ${name}      //这里使用模板参数
````

# 模板生成
生成模板时需要选择项目，选择数据类型，再装填数据，之后点击提交按钮，后端会渲染模板，然后输出一个zip压缩包。

|     参数             .|  描述          |
|:-------------|:--------|
项目           | 指定渲染的项目，选择会将会渲染该项目下所有的模板
数据类型        | 标识数据的格式类型
数据            | 为模板提供元数据支持，后端将会根据数据类型去使用对应的解析器解析数据，将其转化为元数据，然后输入到模板内部，成为**全局参数**供我们使用
绑定项目        | 设置模板项目归属
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