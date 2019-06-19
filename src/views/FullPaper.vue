<template>
  <div>
    <div class="info-box">
      <div class="head">{{head}}</div>
      <div class="body" v-show="body1">
        <img src="../assets/img/fullstep1.png" alt>
        <div
          class="note"
        >Choose the proper topic for this abstract from the "Topic" below. It is extremely important that you properly categorize your abstract so that it will go to the appropriate review group.</div>
        <el-form ref="form" :model="form" label-width="170px">
          <el-form-item label="Paper Title:" required>
            <el-input v-model="form.paper_title"></el-input>
          </el-form-item>
          <el-form-item label="Abstract:" required>
            <el-input type="textarea" v-model="form.abstract"></el-input>
          </el-form-item>
          <el-form-item label="Remarks:">
            <el-input type="textarea" v-model="form.remarks"></el-input>
          </el-form-item>
        </el-form>
        <div class="button-box">
          <button class="return" @click="backToUserCenter">Return</button>
          <button @click="saveAndContinue('form')">Save and Continue</button>
        </div>
      </div>
      <div class="body body2" v-show="body2">
        <img src="../assets/img/fullstep2.png" alt>
        <div class="note">Upload Extend Full-Paper :</div>
        <div class="upload">
          <p>
            Upload Notes:
            <br>(1) Only original and unpublished works are invited.
            <br>(2) All full-paper must be submitted in English.
            <br>(3) All full-paper should be submitted no later than Aug. 31, 2019, via email to the secretariat isrerm2020@bjut.edu.cn.
            <br>(4) The symposium will only call for Oral presentation.
            <br>(5) Corresponding author will receive all correspondence concerning the submission and is responsible for informing the other authors of the status of the submission.
            <br>
            <a href class="el-icon-download">Abstract Template.doc</a>
          </p>
          <p class="up">
          <span>*Extend Abstract</span>
          <el-upload
            class="upload-demo"
            :action="filed"
            :on-success="uploadSuccess"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :data="act"
          >
            <el-button class="el-icon-upload" size="small" type="primary">Upload Full-Paper </el-button>
          </el-upload>
          </p>
        </div>
        <div class="button-box">
          <button class="return" @click="returnStep1">Return</button>
          <button @click="saveAndContinue2">Save and Continue</button>
        </div>
      </div>
      <div class="body body3" v-show="body3">
        <h1>
          The full-paper was submitted successfully, ID as:
          <span>{{full_id}}</span>
        </h1>
        <p>
          A confirmation email with important information concerning your full-paper has been sent to your email address as following:
          <br>If you do not receive a confirmation email within the next few hours, please:
          <br>• Make sure the email address listed above are correct and valid
          <br>• Check your junk mail or spam folder to make sure it did not end up there by accident
          <br>If you have questions, please contact the conference group isrerm2020@bjut.edu.cn
          <br>Thank you.
        </p>
        <button class="back-to-usercenter" @click="backToUserCenter">Back to User Center</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      head: this.$route.matched[this.$route.matched.length - 1].meta.title,
      filed: "/gaojian/index.php",
      act: this.params({
        act: "upload_file",
        email:sessionStorage.userEmail
      }),
      form: {
        paper_title: "",
        abstract: "",
        remarks: "",
        file: ""
      },
      body1: true,
      body2: false,
      body3: false,
      fileList: [],
      full_id: ""
    };
  },
  methods: {
    //返回个人中心
    backToUserCenter() {
      this.$router.push({
        path: this.$route.matched[this.$route.matched.length - 2].name
      });
    },
    //步骤1保存并继续
    saveAndContinue() {
      if (this.form.paper_title) {
        if (this.form.abstract) {
          this.body1 = false;
          this.body2 = true;
          this.body3 = false;
        } else {
          this.$message.warning("abstract必填！");
          return false;
        }
      } else {
        this.$message.warning("paper_title必填！");
        return false;
      }
    },
    //步骤2返回步骤1
    returnStep1() {
      this.body1 = true;
      this.body2 = false;
      this.body3 = false;
    },
    //步骤2上传数据
    saveAndContinue2() {
      if (this.form.file) {
        this.$loading();
        this.axios({
          url: "/gaojian/index.php",
          method: "post",
          params: this.params({
            act: "file_uploud",
            p_id: sessionStorage.userId,
            paper_title: this.form.paper_title,
            abstract: this.form.abstract,
            remarks: this.form.remarks,
            type: "1",
            file: this.form.file
          })
        })
          .then(res => {
            if (res.data.code == 200) {
              this.$loading().close();
              this.full_id = res.data.result.info.number;
              this.body1 = false;
              this.body2 = false;
              this.body3 = true;
            } else {
              this.$message.warning("提交失败！");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message.warning("文件必传！");
      }
    },
    //上传文件的钩子函数
    uploadSuccess(res) {
      if (res.code === 200) {
        this.$message.success("上传成功！");
        this.form.file = res.result;
      } else {
        this.$message.warning(res.message);
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
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
    .back-to-usercenter{
      margin: 0 auto;
      background: #2793c5;
    }
    button {
      display: flex;
      padding: 15px 40px;
      box-sizing: border-box;
      background: #b22f29;
      color: #fefefe;
      border: 0;
      margin: 20px;
      font-size: 16px;
    }
    p {
      font-family: ArialMT;
      font-size: 16px;
      color: #444;
    }
    p.up {
      display: flex;
      align-items: center;
      span {
        font-family: ArialMT;
        font-size: 16px;
        line-height: 32px;
        letter-spacing: 0px;
        color: #444444;
      }
    }
    .note {
      padding: 15px 20px;
      box-sizing: border-box;
      width: 100%;
      background: #e9f7fd;
      color: #2793c5;
      font-size: 16px;
      font-family: ArialMT;
      margin-top: 30px;
    }
    .el-form {
      width: 100%;
      margin-top: 30px;
      border-bottom: 1px solid #e3e3e3;
      .el-form-item {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        /deep/ .el-form-item__content {
          margin-left: 30px !important;
          .el-select {
            width: 100%;
          }
          input {
            width: 382px;
            border-radius: 0;
            border: solid 1px #e3e3e3;
          }
          textarea {
            width: 570px;
            height: 160px;
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
        background: #2793c5;
        border: 0;
        margin: 0 12px;
        cursor: pointer;
      }
      button.return {
        background: #eaeaea;
        color: #444;
      }
    }
    .upload {
      width: 100%;
      border: 1px solid #eaeaea;
      border-top-width: 4px;
      margin-top: 20px;
      padding: 15px 20px;
      box-sizing: border-box;
      p {
        font-family: ArialMT;
        font-size: 16px;
        color: #444444;
        line-height: 32px;
        a{
          color: #444;
        }
      }
    }
  }
  .body.body3 {
    h1 {
      font-family: ArialMT;
      font-size: 20px;
      color: #444;
      font-weight: 700;
      line-height: 70px;
      span {
        color: #b22f29;
      }
    }
    p {
      font-family: ArialMT;
      font-size: 16px;
      color: #444;
      line-height: 32px;
    }
  }
}
</style>


