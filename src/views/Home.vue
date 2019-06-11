<template>
  <div>
    <el-carousel trigger="click" height="600px" arrow="never">
      <el-carousel-item v-for="item in data.Wheel_planting" :key="item.id">
        <img :src="item.img" alt>
      </el-carousel-item>
    </el-carousel>
    <div class="content">
      <div class="left">
        <div class="card important-date">
          <div class="title">
            <i class="icon"></i>
            <span>Important Dates</span>
          </div>
          <ul>
            <li v-for="item in data.Important" :key="item.id">
              <span>{{item.title}}</span>
              <span class="time">{{item.time}}</span>
            </li>
          </ul>
        </div>
        <div class="card news">
          <div class="title">
            <i class="icon"></i>
            <span>News</span>
          </div>
          <ul>
            <li v-for="item in data.News" :key="item.id">
              <router-link :to="'/article?id='+item.id">
                <div class="head">
                  <span>{{item.title}}</span>
                  <span class="time">{{item.time}}</span>
                </div>
                <div class="des">{{item.des}}</div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <div @click="toLoginOrUserCenter" class="login">{{login}}</div>
        <router-link to="/article?id=9" class="abstract">Abstract/Paper Submission</router-link>
        <router-link to="/article?id=8" class="online">Online Registration</router-link>
        <div class="card venue">
          <div class="title">
            <i class="icon"></i>
            <span>Venue</span>
          </div>
          <h1 class="address hidden1">{{data.About_us.gsdz}}</h1>
          <h1 @click="toAddress">
            Transportation to Venue
            <i></i>
          </h1>
          <img :src="data.About_us.add_img" alt>
        </div>
        <div class="card contact">
          <div class="title">
            <i class="icon"></i>
            <span>Contact Us</span>
          </div>
          <div class="content">
            <h1>Email</h1>
            <h2>{{data.About_us.email}}</h2>
            <h1>Secretariat</h1>
            <h2>{{data.About_us.secretarlat}}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      login: "Login",
      data: {
        About_us: {
          gsdz: ""
        },
        Important: "",
        News: "",
        Wheel_planting: ""
      }
    };
  },
  methods: {
    toLoginOrUserCenter() {
      if (sessionStorage.userId && sessionStorage.userEmail) {
        this.$router.push({ path: "/userCenter?id=8" });
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    toAddress(){
      this.$router.push({path:'/article?id=6'})
    }
  },
  created() {
    if (sessionStorage.userId || sessionStorage.userEmail) {
      this.login = sessionStorage.userEmail;
    }
    this.axios({
      method: "post",
      url: "/gaojian/index.php",
      params: this.params({
        act: "index"
      })
    })
      .then(res => {
        this.data = res.data.result;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="less" scoped>
.el-carousel {
  width: 940px;
  img {
    width: 100%;
  }
  /deep/ .el-carousel__indicators--horizontal {
    left: auto;
    right: 0;
    bottom: 26px;
    li {
      margin-right: 25px;
    }
    .el-carousel__button {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
  }
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.content {
  width: 940px;
  padding: 30px 0 0 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .card {
    width: 100%;
    background: #fafafa;
    border-radius: 4px;
    border-top: 4px solid #b22f29;
    padding: 30px 20px;
    box-sizing: border-box;
    overflow: hidden;
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.3);
    .title {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .icon {
        display: flex;
        width: 20px;
        height: 20px;
      }
      span {
        font-size: 26px;
        color: #b22f29;
        margin-left: 10px;
        font-weight: 700;
      }
    }
  }
  ul {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    li {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      span {
        max-width: 350px;
        font-family: ArialMT;
        font-size: 18px;
        color: #000;
      }
      .time {
        font-size: 16px;
        font-family: 黑体;
        color: #727272;
      }
    }
  }
  .left {
    width: 580px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    .important-date {
      height: 340px;
      .icon {
        background: url("../assets/img/date.png") no-repeat center / cover;
      }
    }
    .news {
      height: 400px;
      margin-top: 30px;
      ul li /deep/ a {
        flex-direction: column;
        .head {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .des {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          font-family: ArialMT;
          font-size: 16px;
          color: #333;
          opacity: 0.6;
          line-height: 24px;
          margin-top: 20px;
        }
      }
      .icon {
        background: url("../assets/img/news.png") no-repeat center / cover;
      }
    }
  }
  .right {
    width: 300px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    /deep/ a,
    .login {
      width: 100%;
      height: 58px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: ArialMT;
      font-size: 20px;
      color: #fff;
      box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.3);
    }
    .login {
      background: #2aace8;
      cursor: pointer;
    }
    .abstract,
    .online {
      background: #4b7bd5;
      margin-top: 30px;
    }
    .card {
      margin-top: 30px;
    }
    .venue {
      height: 245px;
      .icon {
        background: url("../assets/img/venue.png") no-repeat center / cover;
      }
      h1 {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-family: ArialMT;
        font-size: 18px;
        color: #b22f29;
        cursor: pointer;
        i {
          display: flex;
          width: 0;
          height: 0;
          margin-left: 5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent transparent #b22f29;
        }
      }
      h1.address {
        color: #444;
        margin-top: 20px;
      }
      img {
        width: 100%;
        height: 70px;
      }
    }
    .contact {
      height: 225px;
      .icon {
        background: url("../assets/img/contact.png") no-repeat center / cover;
      }
      .content {
        margin-top: 20px;
        padding: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        h1 {
          font-family: Arial-BoldMT;
          font-size: 18px;
          color: #333;
          line-height: 32px;
          font-weight: 700;
        }
        h2 {
          font-family: ArialMT;
          font-size: 18px;
          color: #444444;
        }
      }
    }
  }
}
</style>
