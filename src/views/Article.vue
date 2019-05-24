<template>
  <div>
    <img class="banner" :src="article.img" alt="">
    <div class="article-box">
      <div class="article">
        <h1 class="title">{{article.title}}</h1>
        <div class="content">{{article.content}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      article:{
          img:'',
          title:'',
          content:'',
      },
      id:null
    }
  },
  created() {
    let id = this.$route.query.id
    this.axios({
      method: "post",
      url: "/api",
      params: this.params({
        act: "article",
        id: id
      })
    })
      .then(res => {
        this.article = res.data.result
        console.log(this.article);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="less" scoped>
img.banner{
    width:940px;
    height:420px;
}
.article-box {
  width: 940px;
  padding: 30px 0 0 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .article{
      width:100%;
      padding: 27px 20px;
      box-sizing:border-box;
  background: #fff;
      .title{
          width:100%;
          display:flex;
          justify-content: flex-start;
          align-items:center;
          font-family: Arial-BoldMT;
    font-size: 28px;
    color: #b22f29;
    font-weight: 700;
      }
      .content{
          width: 100%;
          padding-top: 30px;
          box-sizing: border-box;
          border-top: 1px solid #b22f29;
          margin-top: 30px;
      }
  }
}
</style>