<template>
  <div>
    <div class="info-box">
      <div class="head">Personal information</div>
      <div class="body">
        <p>Prof. Tong</p>
        <p>Affiliation:Shidaichuangxin</p>
        <p>Tel:18600996687</p>
        <p>Email:123456097@163.com</p>
        <p>Add: Pingleyuan No. 199 Chaoyang , Beijing, China</p>
        <button @click="modifyUserInfo">Modify</button>
      </div>
    </div>
    <div class="info-box">
      <div class="head">Abstract List</div>
      <div class="body">
        <button>Submit a new Abstract</button>
      </div>
    </div>
    <div class="info-box">
      <div class="head">Full-Paper List</div>
      <div class="body">
        <button>Submit a new Full-Paper</button>
      </div>
    </div>
    <div class="info-box">
      <div class="head">Participation</div>
      <div class="body">
        <button>Registration now</button>
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
    //点击跳转修改个人信息页面
  modifyUserInfo(){
    this.$router.push({path:'/userInfo?id=8'})
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
    }
  }
}
</style>


