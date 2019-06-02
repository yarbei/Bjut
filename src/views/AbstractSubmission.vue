<template>
  <div>
    <div class="info-box">
      <div class="head">{{head}}</div>
      <div class="body" v-show="body1">
        <img src="../assets/img/step1.png" alt>
        <div
          class="note"
        >Choose the proper topic for this abstract from the "Topic" below. It is extremely important that you properly categorize your abstract so that it will go to the appropriate review group.</div>
        <el-form ref="form" :model="form" label-width="170px">
          <el-form-item label="Paper Title:">
            <el-input v-model="form.paper_title"></el-input>
          </el-form-item>
          <el-form-item label="Topic">
            <el-select v-model="form.topic" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Abstract:">
            <el-input type="textarea" v-model="form.abstract"></el-input>
          </el-form-item>
          <el-form-item label="Remarks:">
            <el-input type="textarea" v-model="form.remarks"></el-input>
          </el-form-item>
        </el-form>
        <div class="button-box">
          <button class="return" @click="backToUserCenter">Return</button>
          <button @click="saveAndContinue1">Save and Continue</button>
        </div>
      </div>
      <div class="body body2" v-show="body2">
        <img src="../assets/img/step2.png" alt>
        <div class="note">Upload Extend Abstract:</div>
        <div class="upload">
          <p>
            Upload Notes:
            <br>(1) Only original and unpublished works are invited.
            <br>(2) All full-paper must be submitted in English.
            <br>(3) All full-paper should be submitted no later than Aug. 31, 2019, via email to the secretariat isrerm2020@bjut.edu.cn.
            <br>(4) The symposium will only call for Oral presentation.
            <br>(5) Corresponding author will receive all correspondence concerning the submission and is responsible for informing the other authors of the status of the submission.
          </p>
          <el-upload
            class="upload-demo"
            :action="filed"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :data="act"
          >
            <el-button size="small" type="primary">Extend Abstract</el-button>
          </el-upload>
        </div>
        <div class="button-box">
          <button class="return" @click="returnStep1">Return</button>
          <button @click="saveAndContinue2">Save and Continue</button>
        </div>
      </div>
      <div class="body body3" v-show="body3">
        <img src="../assets/img/step3.png" alt>
        <div class="add-author">Add Author</div>
        <div  class="note">Please select if this is the corresponding author, Only one Corresponding Author is required.</div>
        <el-form ref="form" :model="form" label-width="150px">
          <el-form-item label="First Name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Middle Name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Last Name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Country/Region">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Affiliation">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
        <button>Save and Continue</button>
        <div class="author-list">Author List</div>
        <table border="1">
          <tr>
            <td>Name</td>
            <td>Country/Region</td>
            <td>Affiliation</td>
            <td>Corresponding</td>
            <td>Order</td>
            <td>Manage</td>
          </tr>
          <tr>
            <td>Hu</td>
            <td>Andorra</td>
            <td>TGF</td>
            <td> <label for=""><input type="radio">Yes</label> </td>
            <td><i class="el-icon-top"></i><i class="el-icon-bottom"></i></td>
            <td><i class="el-icon-delete"></i>Delete</td>
          </tr>
        </table>
        <div class="button-box">
          <button class="return" @click="returnStep2">Return</button>
          <button @click="saveAndContinue3">Save and Continue</button>
        </div>
      </div>
      <div class="body body4" v-show="body4">
        <img src="../assets/img/step4.png" alt="">
        <div class="author-list">Author List</div>
        <table>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      head: this.$route.matched[this.$route.matched.length - 1].meta.title,
      filed: "api/",
      act: this.params({
        act: "upload_file"
      }),
      form: {
        paper_title: "",
        topic: "",
        abstract: "",
        remarks: ""
      },
      body1: true,
      body2: false,
      body3: false,
      body4: false,
      fileList: []
    };
  },
  methods: {
    //返回个人中心
    backToUserCenter() {
      this.$router.push({
        path: this.$route.matched[this.$route.matched.length - 2].name
      });
    },
    //保存并继续
    saveAndContinue1() {
      this.body1 = false;
      this.body2 = true;
      this.body3 = false;
      this.body4 = false;
    },
    //步骤2返回步骤1
    returnStep1() {
      this.body1 = true;
      this.body2 = false;
      this.body3 = false;
      this.body4 = false;
    },
    //步骤2保存并跳转到步骤3
    saveAndContinue2() {
      this.body1 = false;
      this.body2 = false;
      this.body3 = true;
      this.body4 = false;
    },
    //步骤3返回步骤2
    returnStep2(){
      this.body1 = false;
      this.body2 = true;
      this.body3 = false;
      this.body4 = false;
    },
    //步骤3保存并跳转到步骤4
    saveAndContinue3() {
      this.body1 = false;
      this.body2 = false;
      this.body3 = false;
      this.body4 = true;
    },
    //上传文件的钩子函数
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
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
    button {
      display: flex;
      padding: 15px 40px;
      box-sizing: border-box;
      background: #2aace8;
      color: #fefefe;
      border: 0;
      margin: 20px auto;
    }
    p {
      font-family: ArialMT;
      font-size: 16px;
      color: #444;
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
        background: #2aace8;
        border: 0;
        margin: 0 12px;
        cursor: pointer;
      }
      button.return {
        background: #eaeaea;
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
      }
    }
    .add-author {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-family: ArialMT;
      font-size: 20px;
      color: #2aace8;
      padding: 18px 0;
      box-sizing: border-box;
      border-bottom: 2px solid #2aace8;
    }
    .author-list{
      width: 100%;
      padding: 10px 18px;
      box-sizing: border-box;
      background: #e9f7fd;
      color: #2793c5;
      margin-top: 40px;
    }
  }
  .body3{
      table{
        width:100%;
        border: 1px solid #eaeaea;
        margin-top: 20px;
        tr td{
          text-align: center;
          height:60px;
          i{
            color: #2aace8;
          }
        }
        tr td:last-child{
          color:#2aace8;
        }
        tr:first-child td{
          font-family: Arial-BoldMT;
          font-size: 16px;
          color: #444;
          font-weight: 700;
        }
        tr td:nth-child(2n){
          width: 20%;
        }
      }
    }
}
</style>


