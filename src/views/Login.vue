
<template>
    <Form ref="formLogin" :model="formLogin" :rules="formLoginRules"  class="card-box">
        <FormItem class="formLogin-title">
            <h3>系统登录</h3>
        </FormItem>
        <FormItem prop="username">
            <Input size="large" type="text" v-model="formLogin.username" placeholder="用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input size="large"  type="password" v-model="formLogin.password" placeholder="密码">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <div >
                <div class="ivu-col ivu-col-span-15">
                  <Input size="large"  type="password" v-model="formLogin.sureword" placeholder="验证码">
                    <Icon type="ios-barcode" slot="prepend"></Icon>
                </Input>
                </div>
                <!-- 验证码 -->
                <div class="ivu-col ivu-col-span-9">
                  <canvas width="120" height="36" id="c1" style="border:1px solid greenyellow" @click="createyan"></canvas>
                </div>
              </div>            
        </FormItem>
          <FormItem class="login-no-bottom">
            <Checkbox-group v-model="formLogin.remember">
                <Checkbox label="记住密码" name="remember"></Checkbox>
            </Checkbox-group>
        </FormItem>
        <FormItem class="login-no-bottom">
            <Row >
                <Col :xs="{ span: 4, offset: 6 }" >
                    <i-button type="primary" @click="handleSubmit('formLogin')">登录</i-button>
                </Col>
                <Col :xs="{ span: 4, offset: 6 }">
                    <i-button  type="primary" @click="formLoginReset('formLogin')">重置</i-button>
                </Col>
            </Row>
        </FormItem>
    </Form>    
</template>
<script>
    export default {
        data () {
            return {
                formLogin: {
                    username: '',
                    password: '',
                    sureword: '',
                    remember: []
                },
                veriCaranCode:'',     
                formLoginRules: {
                    username: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    sessionStorage.setItem('user', JSON.stringify(this.formLogin.username));
                    if (valid) {
                        this.$Message.success('提交成功!');
                        this.$router.push({ path: '/page1' });
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                     if(this.formLogin.remember[0] == "记住密码"){
                        sessionStorage.setItem('username', JSON.stringify(this.formLogin.username));
                        sessionStorage.setItem('password', JSON.stringify(this.formLogin.password));
                    }else{
                        sessionStorage.removeItem('username');
                        sessionStorage.removeItem('password');
                    }
                })
            },
            formLoginReset(name){
                this.$refs[name].resetFields();
            },
                 //1.新建一个函数产生随机数
            rn(min,max){
                return  parseInt(Math.random()*(max-min)+min);
            },
            //2.新建一个函数产生随机颜色
            rc(min,max){
                var r = this.rn(min,max);
                var g = this.rn(min,max);
                var b = this.rn(min,max);
                return `rgb(${r},${g},${b})`;
            },
            createyan(){
                //3.填充背景颜色,颜色要浅一点
                var w=120;
                var h=40;
                var ctx=c1.getContext("2d");
                console.log(ctx.text)
                ctx.fillStyle=this.rc(180,230);
                ctx.fillRect(0,0,w,h);
                //4.随机产生字符串
                var array = [];
                var pool="ABCDEFGHIJKLIMNPQRSTUVWSYZ1234567890";
                for(var i=0;i<4;i++){
                    var c=pool[this.rn(0,pool.length)];//随机的字
                    array.push(c);
                    var fs=this.rn(18,40);//字体的大小
                    var deg=this.rn(-30,30);//字体的旋转角度
                    ctx.font=fs+'px Simhei';
                    ctx.textBaseline="top";
                    ctx.fillStyle=this.rc(80,150);
                    ctx.save();
                    ctx.translate(30*i+15,15);
                    ctx.rotate(deg*Math.PI/180);
                    ctx.fillText(c,-15+5,-15);
                    ctx.restore();
                }
                this.veriCaranCode = array.join("");
                //5.随机产生5条干扰线,干扰线的颜色要浅一点
                for(var i=0;i<5;i++){
                    ctx.beginPath();
                    ctx.moveTo(this.rn(0,w),this.rn(0,h));
                    ctx.lineTo(this.rn(0,w),this.rn(0,h));
                    ctx.strokeStyle=this.rc(180,230);
                    ctx.closePath();
                    ctx.stroke();
                }
                //6.随机产生40个干扰的小点
                for(var i=0;i<40;i++){
                    ctx.beginPath();
                    ctx.arc(this.rn(0,w),this.rn(0,h),1,0,2*Math.PI);
                    ctx.closePath();
                    ctx.fillStyle=this.rc(150,200);
                    ctx.fill();
                }
            },
        },
        mounted() {
            this.createyan();
            if(sessionStorage.getItem('username')){
                this.formLogin.username = JSON.parse(sessionStorage.getItem('username'));
            }
            if(sessionStorage.getItem('password')){
                this.formLogin.password = JSON.parse(sessionStorage.getItem('password'));
            }
        }
    }
</script>


<style >
  .card-box {
    padding: 20px;
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    margin: 130px auto;
    width: 400px;
   /* border: 2px solid #8492A6;*/
  }
  
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .formLogin-title {
      text-align: center;
      font-size: 28px;
  }
  .formLogin-title h3{
      font-size: 18px;
  }
  .login-no-bottom {
      	margin-bottom: 10px;
  }
 
</style>