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
            <span>{{ruleForm.p_email}}</span>
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
          <el-form-item label="Student" prop="p_student">
            <el-radio-group v-model="ruleForm.p_student">
              <el-radio label="1">Yes</el-radio>
              <el-radio label="0">No</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Title" prop="p_title">
            <el-select v-model="ruleForm.p_title" placeholder>
              <el-option value="title1"></el-option>
              <el-option value="title2"></el-option>
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
              <el-option v-for="item in country" :key="item.id" :value="item.country"></el-option>
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
          <el-form-item label="Phone" class="phone-fax">
            <el-input v-model="phone1" class="short" type="number"></el-input>
            <i>-</i>
            <el-input v-model="phone2" class="short" type="number"></el-input>
            <i>-</i>
            <el-input v-model="phone3" class="long" type="number"></el-input>
            <i>-</i>
            <el-input v-model="phone4" class="short" type="number"></el-input>
          </el-form-item>
          <el-form-item label="Fax" class="phone-fax">
            <el-input v-model="fax1" class="short" type="number"></el-input>
            <i>-</i>
            <el-input v-model="fax2" class="short" type="number"></el-input>
            <i>-</i>
            <el-input v-model="fax3" class="long" type="number"></el-input>
            <i>-</i>
            <el-input v-model="fax4" class="short" type="number"></el-input>
          </el-form-item>
        </el-form>
        <div class="button-box">
          <button class="return" @click="backToUserCenter">Return</button>
          <button v-show="isInfo" @click="subUserInfo">Confirm</button>
          <button v-show="isNotInfo" @click="resetForm">Save</button>
          <button v-show="isNotInfo" @click="subUserInfo">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      country: [],
      head: this.$route.matched[this.$route.matched.length - 1].meta.title, //头部标题
      note: "",
      isInfo: false, //是否显示confirm按钮
      isNotInfo: true, //是否显示save，submit按钮
      phone1: "",
      phone2: "",
      phone3: "",
      phone4: "",
      fax1: "",
      fax2: "",
      fax3: "",
      fax4: "",
      ruleForm: {
        //表单绑定数据
        p_id: "",
        p_email: "",
        p_first_name: "",
        p_middle_name: "",
        p_last_name: "",
        p_gender: "",
        p_student: "",
        p_title: "",
        p_affiliation: "",
        p_department: "",
        p_country: "",
        p_province: "",
        p_city: "",
        p_zip: "",
        p_address: "",
        p_phone: "",
        p_fax: ""
      },
      rules: {
        //表单验证规则
        p_first_name: [
          {
            required: true,
            message: "请输入firstName",
            trigger: ["blur", "change"]
          }
        ],
        p_middle_name: [],
        p_last_name: [
          {
            required: true,
            message: "请输入lasttName",
            trigger: ["blur", "change"]
          }
        ],
        p_student: [
          {
            required: true,
            message: "请选择Yes or No",
            trigger: ["blur", "change"]
          }
        ],
        p_title: [
          {
            required: true,
            message: "请选择title",
            trigger: ["blur", "change"]
          }
        ],
        p_affiliation: [
          {
            required: true,
            message: "请输入firstName",
            trigger: ["blur", "change"]
          }
        ],
        p_department: [],
        p_country: [
          {
            required: true,
            message: "请选择countryRegion",
            trigger: ["blur", "change"]
          }
        ],
        p_province: [],
        p_city: [
          { required: true, message: "请输入city", trigger: ["blur", "change"] }
        ],
        p_zip: [
          {
            required: true,
            message: "请输入zipPostalCode",
            trigger: ["blur", "change"]
          }
        ],
        p_address: [
          {
            required: true,
            message: "请输入address",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    resetForm() {
      for (var item in this.ruleForm) {
        this.ruleForm[item] = "";
      }
    },
    //提交表单
    subUserInfo() {
      this.ruleForm.p_phone =
        this.phone1 + "-" + this.phone2 + "-" + this.phone3 + "-" + this.phone4;
      this.ruleForm.p_fax =
        this.fax1 + "-" + this.fax2 + "-" + this.fax3 + "-" + this.fax4;
      this.axios({
        method: "post",
        url: "/gaojian/index.php",
        params: this.params({
          act: "change_user",
          ...this.ruleForm
        })
      }).then(res => {
        if (res.data.code === 200) {
          this.$message.success("提交成功!");
          // setTimeout(() => {
          //   this.$router.push({ path: "/" });
          // }, 3000);
        }else{
          this.$message.warning(res.data.message);
        }
      });
    },
    //返回个人中心
    backToUserCenter() {
      this.$router.push({
        path: this.$route.matched[this.$route.matched.length - 2].name
      });
    }
  },
  created() {
    if (sessionStorage.userEmail && sessionStorage.userId) {
      this.ruleForm.p_email = sessionStorage.userEmail;
      this.ruleForm.p_id = sessionStorage.userId;
    }
    this.axios({
      method: "post",
      url: "/gaojian/index.php",
      params: this.params({
        act: "personnel_info",
        p_id: sessionStorage.userId
      })
    })
      .then(res => {
        var data = res.data.result;
        this.ruleForm.p_first_name = data.p_first_name;
        this.ruleForm.p_middle_name = data.p_middle_name;
        this.ruleForm.p_last_name = data.p_last_name;
        this.ruleForm.p_gender = data.p_gender;
        this.ruleForm.p_student = data.p_student;
        this.ruleForm.p_title = data.p_title;
        this.ruleForm.p_affiliation = data.p_affiliation;
        this.ruleForm.p_department = data.p_department;
        this.ruleForm.p_country = data.p_country;
        this.ruleForm.p_province = data.p_province;
        this.ruleForm.p_city = data.p_city;
        this.ruleForm.p_zip = data.p_zip;
        this.ruleForm.p_address = data.p_address;
        this.phone1 = data.phone[0];
        this.phone2 = data.phone[1];
        this.phone3 = data.phone[2];
        this.phone4 = data.phone[3];
        this.fax1 = data.fax[0];
        this.fax2 = data.fax[1];
        this.fax3 = data.fax[2];
        this.fax4 = data.fax[3];
        if (data.p_first_name === "") {
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
    this.axios({
      url: "/gaojian/index.php",
      method: "post",
      params: this.params({
        act: "country_list"
      })
    })
      .then(res => {
        this.country = res.data.result;
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
      /deep/ input::-webkit-outer-spin-button,
      /deep/ input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      /deep/ input[type="number"] {
        -moz-appearance: textfield;
      }
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
        color: #444;
      }
    }
  }
}
</style>


