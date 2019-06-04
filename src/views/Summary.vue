<template>
  <div>
    <div class="info-box">
      <div class="head">Personal information</div>
      <div class="body">
        <div class="note">
          Thank you for your registration to the meeting of the The 7th International Conference on Wind Engineering (ISRERM), Jun 5-8, 2020, Beijing, China. A payment notice will be sent to your registered email address shortly. Please complete the payment as soon as possible. If you do not receive the mail normally, please check if it is in the spam mailbox.
          For any query regarding your registration, please contact with
          <a
            href="isrerm2020@bjut.edu.cn"
          >isrerm2020@bjut.edu.cn</a>
        </div>
        <table border="1" class="table1">
          <thead>
            <tr>
              <td colspan="2">Registration Information</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Payment Status:</td>
              <td class="blue">Unpaid</td>
            </tr>
            <tr>
              <td>Registration No.:</td>
              <td class="red">ISRERM2020-0743</td>
            </tr>
            <tr>
              <td>Registration Email:</td>
              <td class="red">120413746@qq.com</td>
            </tr>
            <tr>
              <td>Registration Category:</td>
              <td class="red">Delegate</td>
            </tr>
            <tr>
              <td>Registration Fee:</td>
              <td class="red">RMB 4500</td>
            </tr>
            <tr>
              <td>GalaDinner:</td>
              <td class="red"></td>
            </tr>
            <tr>
              <td>Total Amount:</td>
              <td class="blue">RMB 4500</td>
            </tr>
            <tr>
              <td>Technical Visit:</td>
              <td class="red">No</td>
            </tr>
            <tr>
              <td>Special Food Arrangement:</td>
              <td class="red"></td>
            </tr>
          </tbody>
        </table>
        <div class="bank-title">Method Payment: Bank Transfer</div>
        <table class="table2">
          <tr>
            <td>收款人</td>
            <td>Payee name</td>
          </tr>
          <tr>
            <td>亚太建设科技信息研究院有限公司</td>
            <td></td>
          </tr>
          <tr>
            <td>银行名字</td>
            <td></td>
          </tr>
          <tr>
            <td>招商银行北京东三环支行</td>
            <td></td>
          </tr>
          <tr>
            <td>银行地址</td>
            <td></td>
          </tr>
          <tr>
            <td>北京市朝阳东区三环北路1号</td>
            <td></td>
          </tr>
          <tr>
            <td>银行账号</td>
            <td></td>
          </tr>
          <tr>
            <td>110908001310606</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>Swift</td>
          </tr>
          <tr>
            <td></td>
            <td>CMBSSNBS</td>
          </tr>
        </table>
        <div class="note-bottom">* Please transfer the fee to the above account within 5 working days.</div>
        <h1>
        If you want to modify your Registration Information, please click
        <span>here</span>
      </h1>
      <button @click="backToUserCenter">Back to User Center</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      head: this.$route.matched[this.$route.matched.length - 1].meta.title
    };
  },
  methods: {
    //点击跳转个人中心
    backToUserCenter(){
      this.$router.push({path:'/userCenter'})
    }
  },
  created() {
    this.axios({
      method: "post",
      url: "/gaojian/index.php",
      params: this.params({
        act: "",
      })
    })
      .then(res => {
        console.log(res);
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
    .note {
      width: 100%;
      padding: 20px 18px;
      box-sizing: border-box;
      background: #f7eae9;
      font-family: ArialMT;
      font-size: 16px;
      color: #b22f29;
      line-height: 32px;
      a {
        font-family: ArialMT;
        font-size: 16px;
        color: #2aace8;
      }
    }
    .table1 {
      width: 100%;
      border-color: #eaeaea;
      margin-top: 20px;
      border: 1px solid #eaeaea;
      tr td {
        height: 55px;
        padding: 20px 40px;
        box-sizing: border-box;
        color: #444;
        font-weight: 700;
      }
      tr td:first-child {
        width: 284px;
        text-align: right;
      }
      tr td:last-child {
        width: 545px;
      }
      tr td.blue {
        color: #2aace8;
      }
      tr td.red {
        color: #b22f29;
      }
      thead tr td {
        text-align: center;
      }
    }
    .bank-title {
      width: 100%;
      color: #2793c5;
      font-size: 16px;
      padding: 10px 20px;
      background: #e9f7fd;
      box-sizing: border-box;
      margin-top: 20px;
    }
    .table2 {
      width: 100%;
      margin-top: 28px;
      tr td {
        text-align: left;
        padding: 5px 0 5px 40px;
        box-sizing: border-box;
        font-size: 16px;
      }
      tr:nth-child(2n) td {
        border-bottom: 1px solid #eaeaea;
        line-height: 30px;
      }
      tr td:first-child {
        width: 270px;
      }
      tr td:last-child {
        width: 470px;
      }
      tr:last-child td {
        border: 0;
      }
    }
    .note-bottom {
      width: 100%;
      background: #f7eae9;
      font-family: ArialMT;
      font-size: 16px;
      color: #b22f29;
      margin-top: 30px;
      padding: 10px 18px;
      box-sizing: border-box;
    }
    h1 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 96px;
      font-family: ArialMT;
      font-size: 16px;
      color: #444444;
      border-bottom: 1px solid #e3e3e3;
      span {
        color: #b22f29;
      }
    }
    button{
      padding: 18px 58px;
      box-sizing: border-box;
      color:#fff;
      background: #2aace8;
      margin-top: 30px;
    }
  }
}
</style>


