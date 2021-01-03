<template>
  <div class="home">

    <el-container style="min-width:1040px;">
      <el-header>
        <el-menu class="el-menu-demo" mode="horizontal" background-color="#16181d" text-color="#fff"
          active-text-color="#fff" menu-trigger="click" unique-opened="true" collapse-transition="false">
          <el-menu-item index="0">
            <img height="38" src="https://sfa-cn.lorealchina.com/sites/site_login/dist/images/logo.png"
              alt="element-logo" class="nav-logo">
          </el-menu-item>


          <el-menu-item v-for="(cm,index) in curMenu" :key="index" :index="index"></i>
            <router-link :to="cm.defaultUrl">{{cm.name}}</router-link>
          </el-menu-item>
          <!-- <el-menu-item index="2"><i class="el-icon-s-grid"></i>主数据管理</el-menu-item>
          <el-menu-item index="3"><i class="el-icon-s-shop"></i>业务管理</el-menu-item>
          <el-menu-item index="4"><i class="el-icon-s-comment"></i>报表管理</el-menu-item>
          <el-menu-item index="5"><i class="el-icon-setting"></i>配置中心</el-menu-item> -->


        </el-menu>

        <div user-info>
          <span>
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-message"></i> 13
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-badge :value="12" class="item">
                    <el-button type="text" size="small">系统消息</el-button>
                  </el-badge>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-badge :value="1" class="item">
                    <el-button type="text" size="small">审核消息</el-button>
                  </el-badge>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
          <span> <i class="el-icon-s-custom"></i>
            <el-dropdown>
              <span class="el-dropdown-link">
                管理员<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>

      </el-header>
      <el-main>

        <div sub-menu v-if="curPageMenus!=null">
          <div @click.stop.prevent="showsList">
            <div sub-menu-tilte v-for="m in curPageMenus.subs" :class="{activeSub:m.isCur}">{{m.name}} <i class="el-icon-caret-right"></i></div>
            <!-- <div sub-menu-tilte-list v-if="showSubList==true"> -->
            <!-- <div sub-menu-tilte><i class="el-icon-menu"></i> 门店管理</div>
              <div sub-menu-tilte><i class="el-icon-menu"></i> 产品管理</div>
              <div sub-menu-tilte><i class="el-icon-menu"></i> 销售区域管理</div> -->
            <!-- </div> -->
          </div>


          <div sub-menu-list>
            <div sub-menu-item v-for="m in curPageMenus.thirds" :class="{active:m.isCur}" @click="clickThird(m)">{{m.name}}</div>
            <!-- <div sub-menu-item>DP管理</div>
            <div sub-menu-item>DA管理</div>
            <div sub-menu-item>J人员管理</div> -->
          </div>
        </div>



        <router-view />
      </el-main>
      <!-- <el-footer>
        Copyright © 2020~2010 · Atom-Template
      </el-footer> -->
    </el-container>



  </div>
</template>

<script>

  import HelloWorld from '@/components/HelloWorld.vue'
  import store from "../utils/storage";


  export default {
    name: 'Home',
    components: {
      HelloWorld
    },
    data() {
      return {
        showSubList: false,
        curMenu: store.getCurMenu(),
        curPageCode: '',
        curPageMenus: {},
      };
    },
    mounted() {
      this.curPageCode = this.$router.history.current.meta.code;
      this.curPageMenus = store.getCurMenusInfo(this.curPageCode);
      console.info("curBreads", this.curPageMenus);
    },
    methods: {
      logout() {
        console.log('login');
        this.$router.push('login');
      },
      showsList() {
        this.showSubList = !this.showSubList;
      },
      clickThird(m){
        this.$router.push(m.path);
      },
    },
    watch: {
      $route(to, from) {
        this.curPageCode = this.$router.history.current.meta.code;
        this.curPageMenus = store.getCurMenusInfo(this.curPageCode);
        console.info("curBreads", this.curPageMenus);
      }
    }
  }
</script>

<style scoped>
  .el-header {
    padding: 0;
    position: relative;
  }

  [user-info] {
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    color: #fff;
    line-height: 60px;
    overflow: hidden;
  }

  [user-info]>span:first-child {
    display: inline-block;
    padding: 0 10px;
    border-right: 1px solid #333;
    margin-right: 10px;
    cursor: pointer;
    color: #fff;
  }

  [user-info] .el-dropdown {
    cursor: pointer;
    color: #fff;
    margin-left: 5px;
  }

  footer {
    height: 40px !important;
    background: #eee;
    line-height: 40px;
    text-align: center;
    font-size: 12px;
    /* position: fixed;
    bottom: 0;
    right: 0;
    left: 0; */
  }

  .el-main {
    padding: 0 0 20px 0;
  }

  .el-submenu>>>.el-submenu__title {
    padding: 0 10px;
  }

  .el-menu>>>.el-menu-item a {
    text-decoration: none;
  }

  [sub-menu] {
    background: #f9f9ff;
    font-size: 12px;
    display: flex;
    position: relative;
  }

  [sub-menu-tilte] {
    padding: 10px;
    background: #8468ca;
    color: #fff;
    display: inline-block;
    font-weight: bold;
    cursor: pointer;
  }

  [sub-menu-tilte-list] {
    display: inline-block;
  }

  [sub-menu-list] {
    display: flex;
    padding: 6px;
  }

  [sub-menu-item] {
    padding: 4px 10px;
    /* background: #7777bd;
    color:#fff; */
    margin-left: 10px;
    border-radius: 3px;
    cursor: pointer;
    color: #aaa;
  }

  .active{
    color:#409EFF;
    font-weight: bold;
  }

  .activeSub{
    background: #44288c;
  }
</style>