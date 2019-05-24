<template>
  <div class="nav">
    <div class="logo" @click="toHome(0)">
      <img src="../assets/img/logo.png" alt>
    </div>
    <p class="desc">A SAFER FUTURE</p>
    <ul>
      <li v-for="item in nav" :key="item.id" :class="{'active':item.id===isActive}">
        <router-link :to="item.url_s">
          <i class="icon"></i>
          <span>{{item.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["nav"],
  data() {
    return {
      isActive: 0
    };
  },
  methods: {
    toHome(index) {
      this.isActive = 0;
      this.$router.push({ path: "/" });
    }
  },
  created() {
    if (this.$route.query.id) {
      this.isActive = this.$route.query.id;
    }
  }
};
</script>
<style lang="less" scoped>
.nav {
  width: 260px;
  height: 100%;
  background: url("../assets/img/nav.png") no-repeat center / cover;
  overflow: auto;
  .logo {
    width: 100%;
    padding-top: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
      width: 190px;
      height: 88px;
    }
  }
  p.desc {
    color: #fff;
    font-size: 14px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 23px;
    margin-bottom: 0;
  }
  ul {
    width: 100%;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    li {
      width: 100%;
      height: 64px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      border-bottom: 1px solid #a72923;
      a {
        width: 100%;
        span {
          width: 100%;
          font-size: 18px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    li.active {
      background: #7d221d;
      border-left: 5px solid #efe5e4;
      box-sizing: border-box;
      a {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        i.icon {
          width: 27px;
          height: 24px;
          margin-left: 38px;
          background: url("../assets/img/dragon.png") no-repeat center / cover;
        }
        span {
          width: 140px;
        }
      }
    }
  }
}
</style>

