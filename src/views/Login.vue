<template>
  <div class="about">
    <swiper :options="bgSwiperOption" class="swiper-no-swiping bg-banner">
      <swiper-slide class="item item1"></swiper-slide>
      <swiper-slide class="item item2"></swiper-slide>
      <swiper-slide class="item item3"></swiper-slide>
    </swiper>

    <div id="login-box">
      <div class="flex-container">
        <swiper :options="swiperOption" class="banner">
          <swiper-slide v-for="(item, index) in banner" :key="index">
            <img class="item" :src="item">
          </swiper-slide>
        </swiper>
      </div>
      <el-form ref="loginModel" :model="loginModel" :rules="rules" class="flex-container login-form" auto-complete="on"
        label-position="left">
        <div class="title-container">
          <h3 class="title">{{ title }}管理后台</h3>
        </div>
        <div>
          <el-form-item prop="Account">
            <el-input ref="name" v-model="loginModel.Account" placeholder="用户名" type="text" tabindex="1"
              auto-complete="on" prefix-icon="el-icon-user-solid">
            </el-input>
          </el-form-item>
          <el-form-item prop="Password">
            <el-input ref="Password" v-model="loginModel.Password" :type="passwordType" placeholder="密码" tabindex="2"
              auto-complete="on" @keyup.enter.native="handleLogin" prefix-icon="el-icon-lock">
            </el-input>
          </el-form-item>
        </div>
        <el-checkbox v-model="loginModel.remember">记住我</el-checkbox>
        <el-button :loading="loading" type="primary" style="width: 100%;" @click.native.prevent="login">登录
        </el-button>
        <div style="margin-top: 20px; color: #999; font-size: 14px; text-align: center;">
          忘记密码？请联系管理员
        </div>
      </el-form>
    </div>

  </div>
</template>


<script>
  import Vue from 'vue'
  import { Swiper as SwiperClass, Pagination, Mousewheel, Autoplay, EffectFade } from 'swiper/core'
  import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
  SwiperClass.use([Pagination, Mousewheel, Autoplay, EffectFade])
  Vue.use(getAwesomeSwiper(SwiperClass))
  const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)
  import 'swiper/swiper-bundle.css'

  import { requestLogin } from "../api/api";
  import store from '../utils/storage';

  import NProgress from "nprogress";
  import "nprogress/nprogress.css";


  export default {
    name: 'Login',
    components: { Swiper, SwiperSlide },
    data() {
      return {
        title: process.env.VUE_APP_TITLE,
        bgSwiperOption: {
          init: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          loop: true,
          effect: 'fade'
        },
        swiperOption: {
          init: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          loop: true
        },
        banner: [
          'https://i.loli.net/2020/04/21/B2ThI5N6UZlxMwr.png',
          'https://i.loli.net/2020/04/21/A1cvYsQeXfTDoJx.png',
          'https://i.loli.net/2020/04/21/5URp2Ge6YVEcfS1.png'
        ],
        loginModel: {
          Account: localStorage.login_account || '',
          Password: '',
          remember: !!localStorage.login_account
        },
        rules: {
          Account: [
            { required: true, trigger: 'blur', message: '请输入用户名' }
          ],
          Password: [
            { required: true, trigger: 'blur', message: '请输入密码' },
            { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' }
          ]
        },
        loading: false,
        passwordType: 'password'
      }
    },
    methods: {
      login() {
        NProgress.start();
        this.loading =true;
        // var params = { UserName: this.loginModel.Account, Password: this.loginModel.Password };
        requestLogin(this.loginModel).then(res => {
          NProgress.done();
        this.loading =false;
          if (res.data.Code !== 1) return this.$message.error(res.data.Msg);

          store.setStore("jwt-token", res.headers["jwt-token"]);
          store.setStore("cur-user-info", JSON.stringify(res.data.Data));
          store.setStore("cur-user-account", this.loginModel.Account);

          var ms = store.getMenus();
          store.setStore("cur-user-menu", JSON.stringify(ms));
          console.info(this.$router);
          this.$router.addRoutes(ms);
          this.$router.push({ path: "/" });
        });
      },
    },
  }
</script>

<style scoped>
  [setting-mode=mobile] #login-box {
    max-width: 80%;
  }

  [setting-mode=mobile] #login-box .flex-container:first-child {
    display: none;
  }

  .bg-banner {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
  }

  .bg-banner .item {
    background-size: cover;
  }

  .bg-banner .item1 {
    background-image: url(../assets/images/login/bg1.jpg);
  }

  .bg-banner .item2 {
    background-image: url(../assets/images/login/bg2.jpg);
  }

  .bg-banner .item3 {
    background-image: url(../assets/images/login/bg3.jpg);
  }


  #login-box {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: rgba(255, 255, 255, 0.8);
    height: 400px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 5px #999;
  }

  #login-box .flex-container {
    width: 400px;
  }



  .login-form {
    width: 450px;
    padding: 50px 35px 0;
    overflow: hidden;
  }


  .login-form .title-container {
    position: relative;

  }

  .login-form .title-container .title {
    font-size: 22px;
    color: #666;
    margin: 0 auto 30px;
    text-align: center;
    font-weight: bold;
  }

.el-input {
    display: inline-block;
    height: 48px;
    width: 100%;
  }

  .login-form>>>.el-input input {
    height: 48px;
  }

  .el-checkbox{
    margin-bottom: 10px;
  }
</style>