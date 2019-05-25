<template>
  <div>
    <div class="info-box">
      <div class="head">{{head}}</div>
      <div class="body">
        <div class="note">
          <img src="../assets/img/note.png" alt>
          <span>{{note}}</span>
        </div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="140px"
          class="demo-ruleForm"
          :inline="true"
        >
          <el-form-item label="Email">
            <span>{{email}}</span>
          </el-form-item>
          <el-form-item label="First Name" prop="p_first_name">
            <el-input v-model="ruleForm.p_first_name"></el-input>
          </el-form-item>
          <el-form-item label="Middle Name" prop="p_middle_name">
            <el-input v-model="ruleForm.p_middle_name"></el-input>
          </el-form-item>
          <el-form-item label="Last Name" prop="p_last_name">
            <el-input v-model="ruleForm.p_last_name"></el-input>
          </el-form-item>
          <el-form-item label="Gender" prop="p_gender">
            <el-radio-group v-model="ruleForm.p_gender">
              <el-radio label="1">Male</el-radio>
              <el-radio label="0">Famale</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Birthday">
            <el-col>
              <el-form-item prop="p_birthday">
                <el-date-picker
                  type="date"
                  placeholder
                  v-model="ruleForm.p_birthday"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="Student" prop="p_student">
            <el-radio-group v-model="ruleForm.p_student">
              <el-radio label="1">Yes</el-radio>
              <el-radio label="0">No</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Title" prop="p_title">
            <el-select v-model="ruleForm.p_title" placeholder>
              <el-option label="title1" value="title1"></el-option>
              <el-option label="title2" value="title2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Affiliation" prop="p_affiliation">
            <el-input v-model="ruleForm.p_affiliation"></el-input>
          </el-form-item>
          <el-form-item label="Department" prop="p_department">
            <el-input v-model="ruleForm.p_department"></el-input>
          </el-form-item>
          <el-form-item label="Country/Region" prop="p_country">
            <el-select v-model="ruleForm.p_country" placeholder>
              <el-option label="Country/Region1" value="Country/Region1"></el-option>
              <el-option label="Country/Region2" value="Country/Region2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="State/Province" prop="p_province">
            <el-input v-model="ruleForm.p_province"></el-input>
          </el-form-item>
          <el-form-item label="City" prop="p_city">
            <el-input v-model="ruleForm.p_city"></el-input>
          </el-form-item>
          <el-form-item label="Zip/Postal Code" prop="p_zip">
            <el-input v-model="ruleForm.p_zip"></el-input>
          </el-form-item>
          <el-form-item label="Address" prop="p_address">
            <el-input v-model="ruleForm.p_address"></el-input>
          </el-form-item>
          <el-form-item label="Phone" prop="p_phone" class="phone-fax">
            <el-input v-model.number="ruleForm.p_phone.phone1" class="short"></el-input>
            <i>-</i>
            <el-input v-model.number="ruleForm.p_phone.phone2" class="short"></el-input>
            <i>-</i>
            <el-input v-model.number="ruleForm.p_phone.phone3" class="long"></el-input>
            <i>-</i>
            <el-input v-model.number="ruleForm.p_phone.phone4" class="short"></el-input>
          </el-form-item>
          <el-form-item label="Fax" prop="fax" class="phone-fax">
            <el-input v-model="ruleForm.p_fax.fax1" class="short"></el-input>
            <i>-</i>
            <el-input v-model="ruleForm.p_fax.fax2" class="short"></el-input>
            <i>-</i>
            <el-input v-model="ruleForm.p_fax.fax3" class="long"></el-input>
            <i>-</i>
            <el-input v-model="ruleForm.p_fax.fax4" class="short"></el-input>
          </el-form-item>
        </el-form>
        <div class="button-box">
          <button class="return" @click="returnUserCenter">Return</button>
          <button v-show="isInfo" @click="subUserInfo">Confirm</button>
          <button v-show="isNotInfo" @click="resetForm">Save</button>
          <button v-show="isNotInfo" @click="subUserInfo">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "", //用户邮箱
      head: this.$route.matched[this.$route.matched.length - 1].meta.title, //头部标题
      note: "",
      isInfo: false, //是否显示confirm按钮
      isNotInfo: true, //是否显示save，submit按钮
      ruleForm: {
        //表单绑定数据
        p_first_name: "",
        p_middle_name: "",
        p_last_name: "",
        p_gender: "",
        p_birthday: "",
        p_student: "",
        p_title: "",
        p_affiliation: "",
        p_department: "",
        p_country: "",
        p_province: "",
        p_city: "",
        p_zip: "",
        p_address: "",
        p_phone: { phone1: "", phone2: "", phone3: "", phone4: "" },
        p_fax: { fax1: "", fax2: "", fax3: "", fax4: "" }
      },
      rules: {
        //表单验证规则
        p_first_name: [
          { required: true, message: "请输入firstName", trigger: "blur" }
        ],
        p_middle_name: [],
        p_last_name: [
          { required: true, message: "请输入lasttName", trigger: "blur" }
        ],
        p_gender: [],
        p_birthday: [],
        p_student: [
          { required: true, message: "请选择Yes or No", trigger: "change" }
        ],
        p_title: [
          { required: true, message: "请选择title", trigger: "change" }
        ],
        p_affiliation: [
          { required: true, message: "请输入firstName", trigger: "blur" }
        ],
        p_department: [],
        p_country: [
          { required: true, message: "请选择countryRegion", trigger: "change" }
        ],
        p_province: [],
        p_city: [{ required: true, message: "请输入city", trigger: "blur" }],
        p_zip: [
          { required: true, message: "请输入zipPostalCode", trigger: "blur" }
        ],
        p_address: [
          { required: true, message: "请输入address", trigger: "blur" }
        ],
        p_phone: [
          { required: true, massage: "必填项" },
          { type: "number", massage: "必须为数字" }
        ],
        p_fax: []
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {},
    subUserInfo() {
      this.axios({
        method: "post",
        url: "/api",
        params: this.params({
          act: "change_user",
          ...this.ruleForm
        })
      });
    },
    //返回个人中心
    returnUserCenter() {
      this.$router.push({
        path: this.$route.matched[this.$route.matched.length - 2].name
      });
    }
  },
  created() {
    if (sessionStorage.userEmail) {
      this.email = sessionStorage.userEmail;
    }
    this.axios({
      method: "post",
      url: "/api",
      params: this.params({
        act: "personnel_info",
        p_id: sessionStorage.userId
      })
    })
      .then(res => {
        console.log(res.data.result);
        var data = res.data.result;
        this.ruleForm.p_first_name = data.p_first_name;
        this.ruleForm.p_middle_name = data.p_middle_name;
        this.ruleForm.p_last_name = data.p_last_name;
        this.ruleForm.p_gender = data.p_gender;
        this.ruleForm.p_birthday = data.p_birthday;
        this.ruleForm.p_student = data.p_student;
        this.ruleForm.p_title = data.p_title;
        this.ruleForm.p_affiliation = data.p_affiliation;
        this.ruleForm.p_department = data.p_department;
        this.ruleForm.p_country = data.p_country;
        this.ruleForm.p_province = data.p_province;
        this.ruleForm.p_city = data.p_city;
        this.ruleForm.p_zip = data.p_zip;
        this.ruleForm.p_address = data.p_address;
        this.ruleForm.p_phone = data.p_phone;
        this.ruleForm.P_fax = data.P_fax;
        if (this.ruleForm.p_first_name === "") {
          //判断返回数据是否有p_first_name字段选择显示按钮以及通知消息内容
          this.isInfo = false;
          this.isNotInfo = true;
          this.noet =
            "Note:This information will be used to generate your name badge and for all emailings, so please complete all fields accurately.";
        } else {
          this.isInfo = true;
          this.isNotInfo = false;
          this.note =
            "Note:This information will be used to generate your name badge, so please complete all fields accurately.";
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="less" scoped>
.info-box {
  width: 100%;
  background: #fff;
  border: 1px solid #eaeaea;
  margin-top: 20px;
  .head {
    width: 100%;
    height: 40px;
    background: url("../assets/img/userCenterHeadBg.png") no-repeat center;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 18px;
    color: #fff;
    box-sizing: border-box;
  }
  .body {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    .note {
      width: 100%;
      padding: 10px 30px 10px 10px;
      box-sizing: border-box;
      background: #e9f7fd;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      img {
        width: 15px;
        height: 15px;
        margin-top: 5px;
      }
      span {
        font-family: ArialMT;
        font-size: 16px;
        color: #2793c5;
        line-height: 32px;
        margin-left: 10px;
      }
    }
    .el-form {
      width: 100%;
      margin-top: 30px;
      border-bottom: 1px solid #e3e3e3;
      .el-form-item {
        width: 100%;
        height: 45px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        /deep/ .el-form-item__content {
          width: 382px;
          .el-select {
            width: 100%;
          }
          input {
            border-radius: 0;
            border: solid 1px #e3e3e3;
          }
        }
      }
      .el-form-item.phone-fax {
        /deep/ .el-form-item__content {
          width: 460px;
          i {
            font-size: 16px;
            color: #b22f29;
            margin: 0 6px;
          }
          .el-input.short {
            width: 60px;
          }
          .el-input.long {
            width: 220px;
          }
        }
      }
    }
    .button-box {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        padding: 18px 42px;
        box-sizing: border-box;
        color: #fff;
        font-family: ArialMT;
        font-size: 16px;
        background: #2aace8;
        border: 0;
        margin: 0 12px;
        cursor: pointer;
      }
      button.return {
        background: #eaeaea;
      }
    }
  }
}
</style>


