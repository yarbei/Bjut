<template>
  <div id="app" :key="appKey">
    <div class="container">
      <Navigation :nav="navList"/>
      <div class="content">
        <router-view/>
        <p class="copyright">{{copyright}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Navigation from "@/components/Navigation.vue";
export default {
  data() {
    return {
      navList: [{ id: 0, title: "Home", url_s: "/" }],
      copyright: "",
      appKey:0
    };
  },
  components: {
    Navigation
  },
  created() {
    // this.$router.push({ path: "/" });
    this.axios({
      method: "get",
      url: "/gaojian/index.php",
      params: this.params({
        act: "left_navigation"
      })
    })
      .then(res => {
        this.navList.push(...res.data.result);
        this.copyright = res.data.result[0].beian;
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    '$route':function(newUrl,oldUrl){
      this.appKey=new Date().getTime();
  }
  }
};
</script>
<style lang="less">
#app {
  width: 100%;
  height: 100%;
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .content {
      min-height: 50vh;
      p.copyright {
        width: 910px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: ArialMT;
        font-size: 14px;
        color: #fff;
        background: #b8b8b8;
        margin: 30px 0 0 30px;
      }
    }
  }
}
</style>
