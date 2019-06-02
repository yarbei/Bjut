<template>
  <div>
    <div class="info-box">
      <div class="head">Personal information</div>
      <div class="body">
        <p>Prof. Tong</p>
        <p>Affiliation:{{userInfo.p_affiliation}}</p>
        <p>Tel:18600996687</p>
        <p>Email:{{userInfo.p_email}}</p>
        <p>Add: {{userInfo.p_address}}</p>
        <button @click="modifyUserInfo">Modify</button>
      </div>
    </div>
    <div class="info-box">
      <div class="head">Abstract List</div>
      <div class="body">
        <table class="table1" border="1">
          <tr>
            <td>ID</td>
            <td>Abstract Title</td>
            <td></td>
          </tr>
          <tr>
            <td>A0038</td>
            <td>You haven’t submitted an abstract yet.</td>
            <td>Download</td>
          </tr>
        </table>
        <button @click="toAbstractSubmission">Submit a new Abstract</button>
      </div>
    </div>
    <div class="info-box">
      <div class="head">Full-Paper List</div>
      <div class="body">
        <table class="table2" border="1">
          <tr>
            <td>ID</td>
            <td>Paper Title</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="3">You haven’t submitted a full-paper yet.</td>
          </tr>
        </table>
        <button>Submit a new Full-Paper</button>
      </div>
    </div>
    <div class="info-box">
      <div class="head">Participation</div>
      <div class="body">
        <table class="table3" border="1">
          <tr>
            <td>Registration fee</td>
            <td>RMB 4500</td>
          </tr>
          <tr>
            <td>Hotel reservation</td>
            <td>1/Jun/2020 – 3/Jun/2020</td>
          </tr>
          <tr>
            <td>Participate tour visit</td>
            <td>Yes/No</td>
          </tr>
          </table>
        <button>Registration now</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      head: this.$route.matched[this.$route.matched.length - 1].meta.title,
      userInfo:{}
    };
  },
  methods: {
    //点击跳转修改个人信息页面
  modifyUserInfo(){
    this.$router.push({path:'/userInfo?id=8'})
  },
  //点击按钮跳转AbstractSubmission
  toAbstractSubmission(){
    this.$router.push({path:'/abstractSubmission?id=8'})
  }
  },
  created() {
    this.axios({
      method: "post",
      url: "/api",
      params: this.params({
        act: "personnel_info",
        p_id: sessionStorage.userId
      })
    })
      .then(res => {
        console.log(res);
        this.userInfo=res.data.result
      })
      .catch(err => {
        console.log(err);
      });
  },
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
      line-height: 32px;
    }
    table{
      border: 1px solid #eaeaea;
      margin-top: 20px;
      width: 100%;
      tr td{
        height: 66px;
        text-align:center;
      }
      tr td:nth-child(1),tr td:nth-child(3){
        width: 198px;
      }
    }
    .table1,.table2{
      tr:first-child td{
        font-weight: 700;
      }
    }
  }
}
</style>


