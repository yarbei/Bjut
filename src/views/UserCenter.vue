<template>
  <div>
    <div class="user-info-menu" v-show="userInfo">
      <div>
        <img src="../assets/img/user.png" alt>
        <span>{{userEmail}}</span>
      </div>
      <div>
        <img src="../assets/img/pass.png" alt>
        <span>Modify Password</span>
      </div>
      <div>
        <img src="../assets/img/loginout.png" alt>
        <span>Log out</span>
      </div>
    </div>
    <img class="banner" src="../assets/img/banner.png" alt>
    <div class="user-center-box">
      <crumbs></crumbs>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import crumbs from "@/components/Crumbs.vue";
export default {
  data() {
    return {
      userInfo: false, //控制页面上方蓝色菜单是否显示
      userEmail: "", //用户邮箱
    };
  },
  created() {
    if(sessionStorage.userEmail){
      this.userEmail=sessionStorage.userEmail;
      this.userInfo=true;
    }
  },
  components: {
    crumbs
  }
};
</script>
<style lang="less" scoped>
.user-info-menu {
  width: 910px;
  height: 50px;
  margin-left: 30px;
  background: #2aace8;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  div{
    cursor: pointer;
  }
  img {
    margin-right: 10px;
  }
  span {
    font-family: ArialMT;
    font-size: 18px;
    color: #fff;
    margin-right: 20px;
  }
}
img.banner {
  width: 910px;
  height: 260px;
  margin-left: 30px;
}
.user-center-box {
  width: 910px;
  margin: 30px 0 0 30px;
  padding: 30px 20px;
  box-sizing: border-box;
  background: #fafafa;
  border-radius: 4px;
}
</style>


