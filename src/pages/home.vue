<template>
  <div>
    <Header></Header>
    <p>我是首页 home组件</p>
    <!-- <div id="pdfPage2.vue">
      <button class="no-print" @click="pdfBtn">打印按钮</button>
      <div id="padDom">
        <h1>这是打印标题</h1>
        <div>这是打印内容1</div>
        <div>这是打印内容2</div>
        <div>这是打印内容3</div>
        <div>这是打印内容4</div>
      </div>
    </div> -->
    <div id="PdfPage1">
      <button @click="pdfBtn">导出为PDF</button>
      <div id="pdfDom">
        <h1>这是打印标题</h1>
        <div>这是打印内容1111</div>
        <div>这是打印内容2222</div>
      </div>


    </div>
    <Time-picker confirm placeholder="选择时间" style="width: 168px"></Time-picker>
    <Time-picker confirm type="timerange" placement="bottom-end" placeholder="选择时间" style="width: 168px"></Time-picker>
    <div v-for="v in data">{{v}}</div>

    <div id="canvas"></div>
    <button @click="btn1()">按钮</button>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <Form-item prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <Form-item prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
        </Form-item>
    </Form>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import htmlToPdf from "@/utils/htmlToPdf";
export default {
  name: "Home",
  components: { Header },
  data() {
    return {
      msg:"helloworld",
      data:{name:'lxq', age:30,},
      htmlTitle:'pdf文件标题',
      formInline: {
                    user: '',
                    password: ''
                },
      ruleInline: {
          user: [
              { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          password: [
              { required: true, message: '请填写密码', trigger: 'blur' },
              { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ]
      }
    }
  },
  mounted() {
    console.log('加载完成');
  },
  created(){
    console.log(this.msg)
  },
  methods: {
    pdfBtn(){
      htmlToPdf.getPdf(this.htmlTitle)
      // window.print();
    },
    handleSubmit(name) {
      debugger;
      this.$refs[name].validate((valid) => {
          if (valid) {
              this.$Message.success('提交成功!');
          } else {
              this.$Message.error('表单验证失败!');
          }
      })
    },
    btn1(){
    console.log('进来了')
    this.$http.get('http://vue.studyit.io/api/getlunbo').then(res => {
      console.log('====',res)
    })
    // const canvas = document.getElementById('canvas');
    // const content = canvas.getContext('2d');
    // content.fillStyle('red')
    // content.fillRect(50,50,200,200)
  }
  }
};

console.log('hello')
</script>

<style scoped>
@media print {
  .no-print{
    display: none;
  }
}
@page{
  margin: 60px 10px;
}
</style>
