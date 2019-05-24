<template>
  <div>
    <img class="banner" src="../assets/img/banner.png" alt>
    <div class="login-box">
      <!-- 登录窗口 -->
      <div class="login-wins" v-show="isLogin">
        <h1>Log in</h1>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLogin"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item label="Email" prop="email">
            <el-input placeholder="Email" v-model="formLogin.email">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input placeholder="password" v-model="formLogin.password" show-password>
              <i slot="prefix" class="el-input__icon el-icon-key"></i>
            </el-input>
          </el-form-item>
        </el-form>
        <button @click="login">Log in</button>
        <span class="forgot-pass" @click="forgotPass">Forgot your password?</span>
        <button @click="register">Create New Profile</button>
      </div>
      <!-- 找回密码窗口 -->
      <div class="login-wins" v-show="isPass">
        <h1>Forgot Your Password</h1>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formPass"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item label="Email Address" prop="emailAddress">
            <el-input placeholder="Email Address" v-model="formPass.email">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="New Password" prop="newPassword">
            <el-input placeholder="New Password" v-model="formPass.password" show-password>
              <i slot="prefix" class="el-input__icon el-icon-key"></i>
            </el-input>
          </el-form-item>
        </el-form>
        <button @click="sendEmail">Send Email</button>
        <button @click="forgotPassReturn">Return</button>
      </div>
      <div class="content">
        <h1>Welcome to your ISRERM2020 Conference Profile!</h1>
        <p>If you are visiting this page for the first time, please create a new profile by clicking on "Create New Profile". Once the profile has been created, it is possible to access your profile again at any time, by entering your email and password.</p>
        <h2>Four-step operation to reset your new password:</h2>
        <p>1. Clicking on "Forgot your password?".</p>
        <p>2. Input the registered email address and Pre-set new password.</p>
        <p>3. Log-mail to receive confirmation mail.</p>
        <p>4. Click the confirmation link in the mail, Reset the password successfully.</p>
        <p>
          * If you have a problem accessing your profile, please
          <span>contact us.</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLogin: true, //登录表单是否显示
      labelPosition: "top", //输入框提示信息显示的方式
      formLogin: {
        //登录表单绑定的数据
        email: "",
        password: ""
      },
      ruleForm: {
        email: "",
        password: "",
        emailAddress: "",
        newPassword: ""
      },
      rules: {
        //表单的验证规则
        email: [
          { required: true, message: "请输入Email", trigger: "blur" },
          { min: 10, message: "最少10个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码最少6个字符", trigger: "blur" }
        ],
        emailAddress: [
          { required: true, message: "请输入Email", trigger: "blur" },
          { min: 10, message: "最少10个字符", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "最少6个字符", trigger: "blur" }
        ]
      },
      isPass: false,
      formPass: {
        //找回密码表单绑定的数据
        email: "",
        password: ""
      }
    };
  },
  methods: {
    //提交登录信息
    login() {
      this.axios({
        method: "post",
        url: "/api",
        params: this.params({
          act: "login_name",
          email: this.formLogin.email,
          pwd: this.formLogin.password
        })
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success(res.data.message);
          sessionStorage.userId=res.data.p_id,
          sessionStorage.userEmail=this.formLogin.email
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 控制登录窗口和找回密码窗口是否显示
    forgotPass(){
      this.isLogin=false;
      this.isPass=true;
    },
    //提交找回密码信息
    sendEmail(){
      this.axios({
        method:'post',
        url:'/api',
        params:this.params({
          act:''
        })
      })
    },
    //找回密码窗口点击返回按钮
    forgotPassReturn(){
      this.isLogin=true;
      this.isPass=false;
    },
    //点击注册按钮
    register(){
      this.$router.push({path:'/register?id=8'})
    }
  }
};
</script>
<style lang="less" scoped>
img.banner {
  width: 940px;
  height: 260px;
  margin-left: 30px;
}
.login-box {
  width: 940px;
  margin: 30px 0 0 30px;
  padding: 50px 20px;
  box-sizing: border-box;
  background: #fafafa;
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  .login-wins {
    width: 530px;
    height: 490px;
    box-shadow: 0px 5px 10px 0px rgba(158, 197, 215, 0.5);
    background: #fff;
    margin-top: 50px;
    h1 {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 74px;
      background: #2aace8;
      font-family: Arial-BoldMT;
      font-size: 28px;
      color: #fafafa;
      box-sizing: border-box;
    }
    .el-form-item {
      margin-bottom: 0;
      /deep/ .el-form-item__label {
        font-family: Arial-BoldMT;
        font-size: 16px;
        color: #444;
        margin-top: 26px;
        margin-left: 74px;
        padding: 0;
        height: auto;
      }
      /deep/ .el-form-item__content {
        width: 382px;
        margin: 0 auto;
        .el-input__inner {
          height: 47px;
          border: solid 1px #e3e3e3;
          border-radius: 0;
        }
        .el-input__inner:before {
          content: "";
          width: 20px;
          height: 20px;
          background: #000;
        }
      }
    }
    button {
      width: 382px;
      height: 47px;
      background-color: #2aace8;
      color: #fefefe;
      font-family: Arial-BoldMT;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px auto 0;
      border: 0;
      cursor: pointer;
    }
    span.forgot-pass {
      margin: 20px auto 0;
      font-family: Arial-BoldMT;
      font-size: 16px;
      color: #2aace8;
      display: flex;
      width: 382px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
  .content {
    margin-top: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    h1,
    h2,
    p {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    h1 {
      font-family: Arial-BoldMT;
      font-size: 16px;
      font-weight: 700;
      color: #444;
    }
    p {
      font-family: ArialMT;
      font-size: 16px;
      line-height: 33px;
      color: #444;
      margin-top: 20px;
    }
    h2 {
      margin-top: 40px;
    }
    span {
      font-family: ArialMT;
      font-size: 16px;
      color: #b22f29;
    }
  }
}
</style>

