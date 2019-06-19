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
          <el-form-item label="Paper Title:" required>
            <el-input v-model="form.paper_title"></el-input>
          </el-form-item>
          <el-form-item label="Topic" required>
            <el-select v-model="form.topic" placeholder>
              <el-option v-for="item in topic" :key="item.id" :value="item.title"></el-option>
            </el-select>
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
              <el-button size="small" type="primary">Extend Abstract</el-button>
            </el-upload>
          </p>
        </div>
        <div class="button-box">
          <button class="return" @click="returnStep1">Return</button>
          <button @click="saveAndContinue2">Save and Continue</button>
        </div>
      </div>
      <div class="body body3" v-show="body3">
        <img src="../assets/img/step3.png" alt>
        <div class="add-author">
          Add Author
          <el-checkbox @change="useMyInfomation" v-model="my_infomation">Use My infomation</el-checkbox>
        </div>
        <div
          class="note"
        >Please select if this is the corresponding author, Only one Corresponding Author is required.</div>
        <el-form ref="form" :model="form" label-width="150px">
          <el-form-item label=" ">
            <el-checkbox v-model="corresponding_author">Corresponding Author</el-checkbox>
          </el-form-item>
          <el-form-item label="First Name" required>
            <el-input v-model="form.first_name"></el-input>
          </el-form-item>
          <el-form-item label="Middle Name">
            <el-input v-model="form.middle_name"></el-input>
          </el-form-item>
          <el-form-item label="Last Name" required>
            <el-input v-model="form.last_name"></el-input>
          </el-form-item>
          <el-form-item label="Country/Region" required>
            <el-select v-model="form.author_country" placeholder>
              <el-option v-for="item in country" :key="item.id" :value="item.country"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Affiliation" required>
            <el-input v-model="form.author_affiliation"></el-input>
          </el-form-item>
        </el-form>
        <button @click="addAuthor">Save and Continue</button>
        <div class="author-list">Author List</div>
        <el-table
          ref="authorTable"
          :data="author_list"
          tooltip-effect="dark"
          style="width: 100%"
          border
          align="center"
          highlight-current-row
        >
          >
          <el-table-column prop="author_name" label="Name" align="center"></el-table-column>
          <el-table-column prop="author_country" label="Country/Region" align="center"></el-table-column>
          <el-table-column prop="author_affiliation" label="Affiliation" align="center"></el-table-column>
          <el-table-column label="Corresponding" align="center">
            <template slot="header" slot-scope="scope">
              <span>Corresponding</span>
            </template>
            <template scope="scope">
              <el-radio
                v-model="radio"
                :label="scope.row.author_id"
                @change="getRow(scope.$index,scope.row)"
              >Yes</el-radio>
            </template>
          </el-table-column>
          <el-table-column label="Order" align="center">
            <template slot="header" slot-scope="scope">
              <span>Order</span>
            </template>
            <template slot-scope="scope">
              <i class="el-icon-top" @click="topAuthor(author_list, scope.$index)"></i>
              <i class="el-icon-bottom" @click="bottomAuthor(author_list,scope.$index)"></i>
            </template>
          </el-table-column>
          <el-table-column label="Manage" align="center">
            <template slot="header" slot-scope="scope">
              <span>Manage</span>
            </template>
            <template slot-scope="scope">
              <i class="el-icon-delete" @click="deleteAuthor(scope.$index, scope.row)">Delete</i>
            </template>
          </el-table-column>
        </el-table>
        <div class="button-box">
          <button class="return" @click="returnStep2">Return</button>
          <button @click="saveAndContinue3">Save and Continue</button>
        </div>
      </div>
      <div class="body body4" v-show="body4">
        <img src="../assets/img/step4.png" alt>
        <div class="author-list">Author List</div>
        <el-table
          ref="authorTable"
          :data="author_list"
          tooltip-effect="dark"
          style="width: 100%"
          border
          align="center"
        >
          <el-table-column type="index" label="Order" align="center" width="150"></el-table-column>
          <el-table-column prop="author_name" label="Name" align="center"></el-table-column>
          <el-table-column prop="author_affiliation" label="Affiliation" align="center"></el-table-column>
          <el-table-column prop="author_country" label="Country/Region" align="center"></el-table-column>
        </el-table>
        <div class="abstract-info">Abstract Information</div>
        <table class="table2" border="1">
          <tr>
            <td>Abstract Title</td>
            <td>{{form.paper_title}}</td>
          </tr>
          <tr>
            <td>Topic</td>
            <td>{{form.topic}}</td>
          </tr>
          <tr>
            <td>Remarks</td>
            <td>{{form.remarks}}</td>
          </tr>
          <tr>
            <td>Abstract File</td>
            <td>
              <a :download="form.file" :href="form.file" class="download el-icon-download">Download</a>
            </td>
          </tr>
        </table>
        <div class="note">
          Before you submit your abstract:
          <br>(1) Please carefully check your abstract and your personal information;
          <br>(2) Cannot be modified after submission;
          <br>(3) If you want to modify the body of abstract, please click "Return" button.
          <br>
        </div>
        <div class="button-box">
          <button class="return" @click="returnStep3">Return</button>
          <button @click="submit">Submit</button>
        </div>
      </div>
      <div class="body body5" v-show="body5">
        <h1>
          The abstract was submitted successfully, ID as:
          <span>{{abstract_id}}</span>
        </h1>
        <p>
          A confirmation email with important information concerning your full-paper has been sent to your email address as following:
          <br>If you do not receive a confirmation email within the next few hours, please:
          <br>• Make sure the email address listed above are correct and valid
          <br>• Check your junk mail or spam folder to make sure it did not end up there by accident
          <br>If you have questions, please contact the conference group isrerm2020@bjut.edu.cn
          <br>Thank you.
        </p>
        <button @click="backToUserCenter">Back to User Center</button>
      </div>
    </div>
  </div>
</template>
<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      head: this.$route.matched[this.$route.matched.length - 1].meta.title,
      filed: "/gaojian/index.php",
      act: this.params({
        act: "upload_file"
      }),
      form: {
        paper_title: "",
        topic: "",
        abstract: "",
        remarks: "",
        file: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        author_country: "",
        author_affiliation: ""
      },
      author_list: [],
      topic: [],
      body1: true,
      body2: false,
      body3: false,
      body4: false,
      body5: false,
      fileList: [],
      abstract_id: "",
      country: [],
      my_infomation: "1",
      corresponding_author: 0,
      radio: ""
    };
  },
  methods: {
    //返回个人中心
    backToUserCenter() {
      this.$router.push({
        path: this.$route.matched[this.$route.matched.length - 2].name
      });
    },
    //保存步骤1并继续
    saveAndContinue() {
      if (this.form.paper_title) {
        if (this.form.topic) {
          if (this.form.abstract) {
            this.body1 = false;
            this.body2 = true;
            this.body3 = false;
            this.body4 = false;
            this.body5 = false;
          } else {
            this.$message.warning("abstract必填！");
            return false;
          }
        } else {
          this.$message.warning("topic必选！");
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
      this.body4 = false;
      this.body5 = false;
    },
    //步骤2保存并跳转到步骤3
    saveAndContinue2() {
      if (this.form.file) {
        this.body1 = false;
        this.body2 = false;
        this.body3 = true;
        this.body4 = false;
        this.body5 = false;
      } else {
        this.$message.warning("文件必传！");
        return false;
      }
    },
    //步骤3返回步骤2
    returnStep2() {
      this.body1 = false;
      this.body2 = true;
      this.body3 = false;
      this.body4 = false;
      this.body5 = false;
    },
    //使用用户信息
    useMyInfomation() {
      if (this.my_infomation) {
        this.axios({
          url: "/gaojian/index.php",
          method: "post",
          params: this.params({
            act: "personnel_info",
            p_id: sessionStorage.userId
          })
        })
          .then(res => {
            this.form.first_name = res.data.result.p_first_name;
            this.form.middle_name = res.data.result.p_middle_name;
            this.form.last_name = res.data.result.p_last_name;
            this.form.author_country = res.data.result.p_country;
            this.form.author_affiliation = res.data.result.p_affiliation;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.form.first_name = "";
        this.form.middle_name = "";
        this.form.last_name = "";
        this.form.author_country = "";
        this.form.author_affiliation = "";
      }
    },
    //添加作者
    addAuthor() {
      this.form.author_name =
        this.form.first_name + this.form.middle_name + this.form.last_name;
      let choose = 0;
      if (this.corresponding_author == true) {
        choose = 1;
      } else {
        choose = 0;
      }
      if (this.form.author_name) {
        if (this.form.author_country) {
          if (this.form.author_affiliation) {
            this.axios({
              url: "/gaojian/index.php",
              method: "post",
              params: this.params({
                act: "author_uploud",
                author_name: this.form.author_name,
                author_country: this.form.author_country,
                author_affiliation: this.form.author_affiliation,
                p_id: sessionStorage.userId,
                choose: choose
              })
            })
              .then(res => {
                if (res.data.code === 200) {
                  this.$message.success(res.data.message);
                  let author_info = res.data.result.info;
                  this.author_list.push({
                    author_name:
                      author_info.first_name +
                      author_info.middle_name +
                      author_info.last_name,
                    ...author_info
                  });
                  this.author_list.forEach(item => {
                    if (item.choose == true) {
                      this.radio = item.author_id;
                    }
                  });
                  this.corresponding_author = 0;
                  this.form.first_name = "";
                  this.form.middle_name = "";
                  this.form.last_name = "";
                  this.form.author_country = "";
                  this.form.author_affiliation = "";
                } else {
                  this.$message.warning(res.data.message);
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.$message.warning("请输入affliation");
            return false;
          }
        } else {
          this.$message.warning("请输入country");
          return false;
        }
      } else {
        this.$message.warning("请输入name");
        return false;
      }
    },
    //选中作者的回调函数
    getRow(index, row) {
      this.author_list.forEach(item => {
        item.choose = false;
      });
      this.author_list[index].choose = true;
    },
    //该作者向前排序
    topAuthor(author_list, index) {
      if (index != 0) {
        author_list[index] = author_list.splice(
          index - 1,
          1,
          author_list[index]
        )[0];
      } else {
        author_list.push(author_list.shift());
      }
    },
    //该作者向后排序
    bottomAuthor(author_list, index) {
      if (index != author_list.length - 1) {
        author_list[index] = author_list.splice(
          index + 1,
          1,
          author_list[index]
        )[0];
      } else {
        author_list.unshift(author_list.splice(index, 1)[0]);
      }
    },
    //删除该作者
    deleteAuthor(index, row) {
      this.$confirm("此操作将永久删除该作者, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            url: "/gaojian/index.php",
            method: "post",
            params: this.params({
              act: "del_author",
              id: row.author_id
            })
          })
            .then(res => {
              if (res.data.code === 200) {
                this.$message.success(res.data.message);
                this.axios({
                  url: "/gaojian/index.php",
                  method: "post",
                  params: this.params({
                    act: "author_list",
                    p_id: sessionStorage.userId
                  })
                })
                  .then(res => {
                    this.author_list = res.data.result;
                    this.$message.success("删除成功！");
                  })
                  .catch(err => {
                    console.log(err);
                  });
              } else {
                this.$message.warning(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //步骤3保存并跳转到步骤4
    saveAndContinue3() {
      if (this.author_list.length == 0) {
        this.$message.warning("请至少添加一位作者！");
      } else {
        this.author_list.forEach(item => {
          if (item.choose == true) {
            this.body1 = false;
            this.body2 = false;
            this.body3 = false;
            this.body4 = true;
            this.body5 = false;
          } else {
            this.$message.warning("请选择一位联系作者！");
          }
        });
      }
    },
    //步骤4返回步骤3
    returnStep3() {
      this.body1 = false;
      this.body2 = false;
      this.body3 = true;
      this.body4 = false;
      this.body5 = false;
    },
    // 下载文件
    downloadFile() {
      location.href = this.form.file;
    },
    //提交数据
    submit() {
      this.$loading();
      let a_id = [];
      this.author_list.forEach(item => {
        a_id.push(item.author_id);
      });
      this.author_list.forEach(item => {
        if (item.choose == true) {
          a_id.unshift(item.author_id);
          a_id.splice(item, 1);
        }
      });
      this.axios({
        url: "/gaojian/index.php",
        method: "post",
        params: this.params({
          act: "file_uploud",
          p_id: sessionStorage.userId,
          paper_title: this.form.paper_title,
          topic: this.form.topic,
          abstract: this.form.abstract,
          remarks: this.form.remarks,
          a_id: a_id.join(","),
          type: "2",
          file: this.form.file
        })
      })
        .then(res => {
          if (res.data.code === 200) {
            this.$loading().close();
            this.abstract_id = res.data.result.info.number;
            this.body1 = false;
            this.body2 = false;
            this.body3 = false;
            this.body4 = false;
            this.body5 = true;
          } else {
            this.$message.warning("提交失败！");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //上传文件成功的钩子函数
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
  },
  created() {
    this.axios({
      url: "/gaojian/index.php",
      method: "post",
      params: this.params({
        act: "tags"
      })
    })
      .then(res => {
        this.topic = res.data.result;
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
      justify-content: space-between;
      align-items: center;
      font-family: ArialMT;
      font-size: 20px;
      color: #2aace8;
      padding: 18px 0;
      box-sizing: border-box;
      border-bottom: 2px solid #2aace8;
      .el-checkbox {
        font-family: ArialMT;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 0px;
        color: #2aace8;
      }
    }
    .author-list {
      width: 100%;
      padding: 10px 18px;
      box-sizing: border-box;
      background: #e9f7fd;
      color: #2793c5;
      margin-top: 40px;
    }
  }
  .body2 {
    /deep/ .upload-demo {
      margin-top: 20px;
    }
    /deep/ .el-upload {
      display: flex;
      justify-content: flex-start;
    }
    button {
      display: flex;
      padding: 15px 40px;
      box-sizing: border-box;
      background: #2aace8;
      color: #fefefe;
      border: 0;
      margin: 0;
      margin-left: 20px;
    }
  }
  .body3 {
    .note {
      background: #f7eae9;
      color: #b22f29;
    }
    .el-table {
      width: 100%;
      border: 1px solid #eaeaea;
      margin-top: 20px;
      i {
        color: #2aace8;
        font-size: 16px;
        cursor: pointer;
      }
    }
  }
  .body4 {
    .el-table {
      width: 100%;
      border: 1px solid #eaeaea;
      margin-top: 20px;
    }
    .author-list {
      font-family: ArialMT;
      font-size: 20px;
      background: none;
      color: #444;
      font-weight: 400;
      border-bottom: 1px solid #e3e3e3;
      margin-top: 20px;
      padding: 20px;
      box-sizing: border-box;
    }
    table {
      width: 100%;
      margin-top: 20px;
      tr td {
        height: 64px;
        text-align: center;
        color: #444;
        font-size: 16px;
        border: 1px solid #eaeaea;
      }
      tr:first-child {
        font-weight: 700;
      }
    }
    .abstract-info {
      margin-top: 20px;
      color: #2aace8;
      border-bottom: 2px solid #2aace8;
      padding-bottom: 20px;
      box-sizing: border-box;
    }
    .table2 {
      tr td:first-child {
        width: 30%;
        font-weight: 700;
      }
      tr td a.download {
        width: 260px;
        height: 46px;
        color: #fff;
        background: #b22f29;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 20px;
      }
    }
    .note {
      line-height: 32px;
    }
  }
  .body5 {
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


