<template>
  <div>
    <div class="info-box" v-show="registration">
      <div class="head">Registration</div>
      <div class="body">
        <table class="table" border="1">
          <tr>
            <td>Registration Category</td>
            <td>
              1 Registration
              <br />(Before June 30,2019)
            </td>
            <td>
              2 Registration
              <br />(July 1,2019-August 31,2019)
            </td>
          </tr>
          <tr>
            <td>Delegate</td>
            <td>
              <el-radio v-model="order_money" label="4500">RMB 4500</el-radio>
            </td>
            <td>
              <el-radio v-model="order_money" label="5000">RMB 5000</el-radio>
            </td>
          </tr>
          <tr>
            <td>Student</td>
            <td>
              <el-radio v-model="order_money" label="2800">RMB 2800</el-radio>
            </td>
            <td>
              <el-radio v-model="order_money" label="3100">RMB 3100</el-radio>
            </td>
          </tr>
          <tr>
            <td>Technical Visit</td>
            <td colspan="2">
              <el-checkbox v-model="order_jishu" label="200">RMB 200</el-checkbox>
            </td>
          </tr>
        </table>
        <p class="word">
          * Please note that all cut-off dates are based on Beijing Time (GMT 8).
          <br />* If you do not reserve a dinner in advance, the site may not be purchased separately due to the number restrictions.
        </p>
        <div class="note">Registration Policy:</div>
        <p class="word">
          1. A refund of 70% can be requested for payment on or before June 30th; a refund will be processed after the meeting on September 6th.
          <br />2. The payment of the payment after June 30 is non-refundable.
        </p>
        <div class="note">Miscellaneous：</div>
        <div class="miscellaneous">
          <p>
            *Whether to participate in technical free visit?
            <el-radio v-model="order_free" label="1">Yes</el-radio>
            <el-radio v-model="order_free" label="2">No</el-radio>
            <br />Introduction to the tour route:Date：2019/9/4
            <br />Visiting Route: Great Wall- Qinglongqiao Railway Station- Zhan Tianyou Memorial Hall.
          </p>
        </div>
        <div class="miscellaneous">
          <p>If you will require special food arrangement, please specify:</p>
          <el-input type="textarea" v-model="order_remark"></el-input>
        </div>
        <div class="button-box">
          <button class="return" @click="back">Back</button>
          <button @click="toSummary">Continue</button>
        </div>
      </div>
    </div>
    <div class="info-box summary" v-show="summary">
      <div class="head">Personal information</div>
      <div class="body">
        <div class="note">
          Thank you for your registration to the meeting of the The 7th International Symposium on Reliability Engineering and Rish Manageneat (ISRERM), Jun 5-7, 2020, Beijing, China. A payment notice will be sent to your registered email address shortly. Please complete the payment as soon as possible. If you do not receive the mail normally, please check if it is in the spam mailbox.
          <br />For any query regarding your registration, please contact with
          <a
            href="isrerm2020@bjut.edu.cn"
          >isrerm2020@bjut.edu.cn</a>
        </div>
        <table border="1" class="table1">
          <thead>
            <tr class="thead">
              <td colspan="2">Registration Information</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Registration No:</td>
              <td class="red">{{number}}</td>
            </tr>
            <tr>
              <td>Registration Email:</td>
              <td class="red">{{userEmail}}</td>
            </tr>
            <tr>
              <td>Registration Category:</td>
              <td class="red">{{category}}</td>
            </tr>
            <tr>
              <td>Registration Fee:</td>
              <td class="red">RMB {{order_money}}</td>
            </tr>
            <tr>
              <td>Technical Visit:</td>
              <td class="red">{{technicalVisit}}</td>
            </tr>
            <tr>
              <td>Total Amount:</td>
              <td class="blue">RMB {{total}}</td>
            </tr>
          </tbody>
        </table>
        <!-- <div class="bank-title">Method Payment: Bank Transfer</div>
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
        <div class="note-bottom">* Please transfer the fee to the above account within 5 working days.</div>-->
        <h1>If you have any problem or question in payment ,place content the secretariat via isrerm2020@bjut.edu.cn</h1>
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
      order_money: "4500",
      order_jishu: "",
      order_free: "",
      order_remark: "",
      registration: true,
      summary: false,
      category: "",
      technicalVisit: "",
      total: "",
      number:'',
      userEmail: sessionStorage.userEmail
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    toSummary() {
      this.registration = false;
      this.summary = true;
      if (this.checked) {
        this.technicalVisit = "RMB 200";
        this.total = this.radio * 1 + 200;
      }
      var jishu = "";
      if (this.order_jishu == true) {
        jishu = "1";
      } else {
        jishu = "2";
      }
      this.axios({
        url: "/gaojian/index.php",
        method: "post",
        params: this.params({
          act: "order_insert",
          p_id: sessionStorage.userId,
          order_money: this.order_money,
          order_jishu: jishu,
          order_free: this.order_free,
          order_remark: this.order_remark
        })
      })
        .then(res => {
          console.log(res);
          this.number=res.data.result.info.number
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击跳转个人中心
    backToUserCenter() {
      this.$router.push({ path: "/userCenter" });
    },
    categoryChange() {
      if (this.order_money == 4500 || this.order_money == 2800) {
        this.category = "Before June 30,2019";
      } else if (this.order_money == 5000 || this.order_money == 3100) {
        this.category = "July 1,2019-August 31,2019";
      }
    }
  },
  created() {
    this.categoryChange();
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
    table {
      border: 1px solid #eaeaea;
      margin-top: 20px;
      width: 100%;
      tr td {
        width: 33%;
        height: 66px;
        text-align: center;
        border: 1px solid #eaeaea;
        a {
          color: #2aace8;
        }
      }
    }
    .note {
      padding: 10px 20px;
      box-sizing: border-box;
      width: 100%;
      background: #f7eae9;
      color: #b22f29;
      font-size: 16px;
      font-family: ArialMT;
      margin-top: 30px;
    }
    p.word {
      margin-top: 20px;
      padding: 2px 20px;
      box-sizing: border-box;
      font-family: Arial-ItalicMT;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 32px;
      letter-spacing: 0px;
      color: #444444;
      border-left: 4px solid #b8b8b8;
    }
    .miscellaneous {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      border: 1px solid #eaeaea;
      border-top: 4px solid #b8b8b8;
      margin-top: 20px;
    }
    .miscellaneous p {
      font-family: ArialMT;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 32px;
      letter-spacing: 0px;
      color: #444;
    }
  }
}
.summary {
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
        text-align: left;
      }
      tr.thead td {
        text-align: center;
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
    button {
      padding: 18px 58px;
      box-sizing: border-box;
      color: #fff;
      background: #2aace8;
      margin-top: 30px;
    }
  }
}
</style>


