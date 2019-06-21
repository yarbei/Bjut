<template>
  <div>
    <div class="info-box">
      <div class="head">{{head}}</div>
      <div class="body">
        <el-form ref="form" :model="form" label-width="170px">
          <el-form-item label="Old Password:">
            <el-input v-model="form.old_pwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="New Password:">
            <el-input v-model="form.new_pwd1" show-password></el-input>
          </el-form-item>
          <el-form-item label="Confirm Password:">
            <el-input v-model="form.new_pwd2" show-password></el-input>
          </el-form-item>
        </el-form>
        <div class="button-box">
          <button class="return" @click="backToUserCenter">Return</button>
          <button @click="save">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      head: this.$route.matched[this.$route.matched.length - 1].meta.title,
      form: {
        old_pwd: "",
        new_pwd1: "",
        new_pwd2: "",
      },
    };
  },
  methods: {
    //返回个人中心
    backToUserCenter() {
      this.$router.push({
        path: this.$route.matched[this.$route.matched.length - 2].name
      });
    },
    save(){
        this.axios({
            url:'/gaojian/index.php',
            method:'post',
            params:this.params({
                act:'change_pwd',
                p_id:sessionStorage.userId,
                ...this.form
            })
        }).then(res=>{
            if(res.data.code===200){
                this.$message.success('Modify successfully')
            }else{
                this.$message.error('Modify unsuccessfully')
            }
        }).catch(err=>{
            console.log(err)
        })
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
    .author-list {
      width: 100%;
      padding: 10px 18px;
      box-sizing: border-box;
      background: #e9f7fd;
      color: #2793c5;
      margin-top: 40px;
    }
  }
  .body3 {
    table {
      width: 100%;
      border: 1px solid #eaeaea;
      margin-top: 20px;
      tr td {
        text-align: center;
        height: 60px;
        i {
          color: #2aace8;
        }
      }
      tr td:last-child {
        color: #2aace8;
      }
      tr:first-child td {
        font-family: Arial-BoldMT;
        font-size: 16px;
        color: #444;
        font-weight: 700;
      }
      tr td:nth-child(2n) {
        width: 20%;
      }
    }
  }
  .body4 {
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
      border: 1px solid #eaeaea;
      margin-top: 20px;
      tr td {
        height: 64px;
        text-align: center;
        color: #444;
        font-size: 16px;
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
    }
    .note {
      line-height: 32px;
    }
  }
}
</style>


