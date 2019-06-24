<template>
  <div>
    <img class="banner" :src="article.img" alt>
    <div class="article-box">
      <div class="article">
        <h1 class="title">{{article.title}}</h1>
        <div class="content">
          <div v-html="article.content" v-show="isArticle"></div>
          <button v-show="registration" class="registration">Online Registration</button>
          <div class="submission" v-show="submission">
            <div v-html="article.content"></div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a
              href="../template/Abstract Template.doc"
              download
              class="el-icon-download"
            >Abstract Template.doc</a>
            <button @click="toAbstractSubmission">Submit an Abstract</button>
            <div v-html="article.contents"></div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a
              href="../template/Full-paper Template.doc"
              download
              class="el-icon-download"
            >Full-paper Template.doc</a>
            <button @click="toFullPaper">Submit an Full-Paper</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      article: {
        img: "",
        title: "",
        content: "",
        contents: ""
      },
      id: null,
      submission: false,
      isArticle: true,
      committeeList: [],
      registration: false
    };
  },
  methods: {
    toAbstractSubmission() {
      if (sessionStorage.userId && sessionStorage.userEmail) {
        this.axios({
          url: "/gaojian/index.php",
          method: "post",
          params: this.params({
            act: "personnel_info",
            p_id: sessionStorage.userId
          })
        })
          .then(res => {
            if (res.data.result.p_first_name) {
              this.$router.push({ path: "/abstractSubmission" });
            } else {
              this.$alert(
                "You haven't improved your personal information yet. Please improve your personal information first! Click OK to go to the Personal Information page!",
                "Tips"
              ).then(() => {
                this.$router.push({ path: "/userInfo" });
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    toFullPaper() {
      if (sessionStorage.userId && sessionStorage.userEmail) {
        this.axios({
          url: "/gaojian/index.php",
          method: "post",
          params: this.params({
            act: "list_full",
            p_id: sessionStorage.userId
          })
        })
          .then(res => {
            if (res.data.result.Ab_LIST.length != 0) {
              this.$router.push({ path: "/fullpaper" });
            } else {
              this.$alert(
                "You haven't uploaded the abstract yet, please upload the abstract first! Click OK to upload the summary page!",
                "Tips"
              ).then(() => {
                this.$router.push({ path: "/abstractSubmission" });
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$router.push({ path: "/login" });
      }
    }
  },
  created() {
    let id = this.$route.query.id;
    if (id == 9) {
      this.isArticle = false;
      this.submission = true;
    }
    if (id == 8) {
      this.registration = true;
    }
    this.axios({
      method: "post",
      url: "/gaojian/index.php",
      params: this.params({
        act: "article",
        id: id
      })
    })
      .then(res => {
        this.article = res.data.result;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="less" scoped>
img.banner {
  width: 940px;
  height: 420px;
}
.article-box {
  width: 940px;
  padding: 30px 0 0 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .article {
    width: 100%;
    padding: 27px 20px;
    box-sizing: border-box;
    background: #fff;
    .title {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-family: Arial-BoldMT;
      font-size: 28px;
      color: #b22f29;
      font-weight: 700;
    }
    .content {
      width: 100%;
      padding-top: 30px;
      box-sizing: border-box;
      border-top: 1px solid #b22f29;
      margin-top: 30px;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      align-items: flex-start;
      a{
        font-size: 18px;
      }
      .registration {
        padding: 20px 70px;
        box-sizing: border-box;
        background: #b8b8b8;
        box-shadow: 0px 6px 12px 0px rgba(184, 184, 184, 0.25);
        border: 0;
        margin: 0 auto;
        font-family: ArialMT;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #ffffff;
      }
      .submission {
        width: 100%;
        h1,
        h2 {
          font-family: Arial-BoldMT;
          font-size: 26px;
          font-weight: 700;
          color: #333;
        }
        p {
          font-family: ArialMT;
          font-size: 18px;
          color: #444;
          line-height: 32px;
        }
        button {
          padding: 20px 30px;
          box-sizing: border-box;
          background: #4b7bd5;
          box-shadow: 0px 6px 12px 0px rgba(75, 123, 213, 0.25);
          color: #fff;
          border: 0;
          margin: 23px auto;
          display: flex;
        }
      }
      .committee {
        width: 100%;
        h1 {
          font-family: Arial-BoldMT;
          font-size: 26px;
          color: #333;
          font-weight: 700;
        }
        table {
          width: 100%;
          border: none;
          margin-top: 20px;
          tr td {
            min-height: 40px;
            vertical-align: text-top;
            p {
              width: 100%;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              span {
                padding: 10px 20px;
                box-sizing: border-box;
              }
            }
          }
          tr:first-child td {
            background: #f3e5e5;
          }
          tr:nth-child(2) td {
            background: #e2e7ef;
          }
          tr:nth-child(3) td {
            background: #f8f8e1;
          }
          tr td p span:first-child {
            width: 40%;
          }
          tr td:first-child {
            width: 30%;
            span {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: flex-start;
              align-items: flex-start;
              padding-left: 20px;
              box-sizing: border-box;
            }
          }
          tr td:last-child {
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
          }
        }
      }
    }
  }
}
</style>