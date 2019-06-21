<template>
  <div>
    <img class="banner" src="../assets/img/banner.png" alt>
    <div class="login-box">
      <div class="content1">
        <h1>Welcome to your ISRERM2020 Symposium Profile!</h1>
        <p>If you are visiting this page for the first time, please create an new account by clicking on "Create Account". Once the account has been created, it is possible to access your account at any time, by entering your email and password.</p>
      </div>
      <!-- 登录窗口 -->
      <div class="login-wins" v-show="isLogin">
        <h1>Login</h1>
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
          <el-form-item label="Password" prop="pass">
            <el-input placeholder="password" v-model="formLogin.password" show-password>
              <i slot="prefix" class="el-input__icon el-icon-key"></i>
            </el-input>
          </el-form-item>
        </el-form>
        <button @click="login">Login</button>
        <span class="forgot-pass" @click="forgotPass">Forgot your password?</span>
        <button @click="creatNewProfile">Create Account</button>
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
          <el-form-item label="Email Address" prop="email">
            <el-input placeholder="Email Address" v-model="formPass.email">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="New Password" prop="pass">
            <el-input placeholder="New Password" v-model="formPass.password" show-password>
              <i slot="prefix" class="el-input__icon el-icon-key"></i>
            </el-input>
          </el-form-item>
        </el-form>
        <button @click="sendEmail">Send Email</button>
        <button @click="forgotPassReturn">Back</button>
      </div>
      <!-- 注册窗口 -->
      <div class="login-wins register" v-show="isRegister">
        <h1>Create Account</h1>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formRegister"
          :rules="rules"
        >
          <el-form-item label="Email" prop="email">
            <el-input placeholder="Email" v-model="formRegister.email">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input placeholder="Password" v-model="formRegister.pass" show-password>
              <i slot="prefix" class="el-input__icon el-icon-key"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="Confirm Password" prop="pass">
            <el-input placeholder="Confirm Password" v-model="formRegister.checkPass" show-password>
              <i slot="prefix" class="el-input__icon el-icon-key"></i>
            </el-input>
          </el-form-item>
        </el-form>
        <button @click="confirm">Confirm</button>
        <button @click="RegisterReturn">Back</button>
      </div>
      <div class="content2" v-show="isContent2">
        <h1>Four-step operation to reset your password:</h1>
        <p>1. Click on "Forgot your password?".</p>
        <p>2. Input the registered email address and new password.</p>
        <p>3. Click the confirmation link in the email. Reset the password successfully.</p>
        <p>
          * If you have any problem in accessing your account, please &nbsp;
          <router-link to="/article?id=1">contact us.</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { setTimeout, setInterval, clearInterval } from "timers";
export default {
  data() {
    return {
      isContent2:true,//创建账号是否显示下面内容
      isEmailCode: true,
      isLogin: true, //登录表单是否显示
      isPass: false, //找回密码是否显示
      isRegister: false,
      labelPosition: "top", //输入框提示信息显示的方式
      formLogin: {
        //登录表单绑定的数据
        email: "",
        password: ""
      },
      formPass: {
        //找回密码表单绑定的数据
        email: "",
        password: ""
      },
      formRegister: {
        //注册表单绑定的数据
        email: "",
        pass: "",
        checkPass: ""
      },
      ruleForm: {
        email: "",
        pass: ""
      },
      rules: {
        //表单的验证规则
        email: [
          {
            required: true,
            message: "Email is required",
            trigger: ["blur", "change"]
          },
          {
            type: "email",
            message: "Please input correct Email address",
            trigger: ["blur", "change"]
          }
        ],
        pass: [
          {
            required: true,
            message: "Password is required",
            trigger: ["blur", "change"]
          },
          {
            min: 6,
            message: "Password must be 6 characters at least ",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    //提交登录信息
    login() {
      this.axios({
        method: "post",
        url: "/gaojian/index.php",
        params: this.params({
          act: "login_name",
          email: this.formLogin.email,
          pwd: this.formLogin.password
        })
      }).then(res => {
        if (res.data.code === 200) {
          this.$message.success('Login successfully');
          sessionStorage.userId = res.data.result.p_id;
          sessionStorage.userEmail = this.formLogin.email;
          this.axios({
            method: "post",
            url: "/gaojian/index.php",
            params: this.params({
              act: "personnel_info",
              p_id: sessionStorage.userId
            })
          })
            .then(res => {
              if (res.data.result.p_first_name) {
                this.$router.push({ path: "/userCenter" });
              } else {
                this.$alert(
                  'Please fulfill your personal information.',
                  "Tips"
                ).then(() => {
                  this.$router.push({ path: "/userInfo" });
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.error('Please input correct Email and Password');
        }
      });
    },
    // 点击找回密码按钮
    forgotPass() {
      this.isLogin = false;
      this.isPass = true;
      this.isRegister = false;
    },
    //提交找回密码信息
    sendEmail() {
      this.axios({
        method: "post",
        url: "/gaojian/index.php",
        params: this.params({
          act: "change_password_act",
          toemail: this.formPass.email,
          password: this.formPass.password
        })
      })
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success("A link has been sent to your Email. Please click on the link to Reset the password.");
          } else {
            this.$message.warning("Reset is failed. Please check the Email address.");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击找回密码窗口返回按钮
    forgotPassReturn() {
      this.isLogin = true;
      this.isPass = false;
      this.isRegister = false;
    },
    //点击注册按钮
    creatNewProfile() {
      this.isLogin = false;
      this.isPass = false;
      this.isRegister = true;
      this.isContent2=false;
    },
    //注册窗口点击提交注册信息
    confirm() {
      if (this.formRegister.pass == this.formRegister.checkPass) {
        if (this.isEmailCode) {
          this.axios({
            method: "post",
            url: "/gaojian/index.php",
            params: this.params({
              act: "registers",
              toemail: this.formRegister.email,
              password: this.formRegister.pass
            })
          })
            .then(res => {
              let i = 8;
              this.$message({
                type: "success",
                message: `Please check the confirmation link in your Email! Now back to Home page.`,
                duration: 5000
              });
              this.isEmailCode = false;
              setTimeout(() => {
                this.$router.push({ path: "/" });
              }, 5000);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.warning("Frequent operation, please try again later.");
        }
      } else {
        this.$message.warning("Two input passwords are not same.");
      }
    },
    //注册窗口点击返回按钮
    RegisterReturn() {
      this.isLogin = true;
      this.isPass = false;
      this.isRegister = false;
      this.isContent2=true;
    }
  }
};
</script>
<style lang="less" scoped>
img.banner {
  width: 910px;
  height: 260px;
  margin-left: 30px;
}
.login-box {
  width: 910px;
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
        margin-top: 10px;
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
  .login-wins.register {
    height: 552px;
  }
  .content1,.content2 {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    min-height: 0;
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
      font-size: 20px;
      color: #444;
      margin-bottom: 20px;
    }
    p {
      font-family: ArialMT;
      font-size: 16px;
      line-height: 33px;
      color: #444;
    }
    a {
      font-family: ArialMT;
      font-size: 16px;
      color: #b22f29;
    }
  }
  .content2{
    margin-top: 40px;
  }
}
</style>

