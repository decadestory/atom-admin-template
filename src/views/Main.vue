<template>
  <div class="home">

    <el-container style="min-width:900px;">
      <el-header>
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          background-color="#16181d" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="0">
            <img height="38" src="https://sfa-cn.lorealchina.com/sites/site_login/dist/images/logo.png"
              alt="element-logo" class="nav-logo">
          </el-menu-item>

          <el-menu-item index="1"><i class="el-icon-s-home"></i>首页</el-menu-item>
          <el-menu-item index="3"><i class="el-icon-s-grid"></i>主数据管理</el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-s-shop"></i>业务管理</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="4"> <i class="el-icon-s-comment"></i>消息中心</el-menu-item>
          <el-menu-item index="5"> <i class="el-icon-setting"></i>配置中心</el-menu-item>
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
                <el-dropdown-item>退出系统</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>

      </el-header>
      <el-main><router-view /></el-main>
      <el-footer>
        Copyright © 2020~2010 · Atom-Template
      </el-footer>
    </el-container>



  </div>
</template>

<script>

  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'Home',
    components: {
      HelloWorld
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
    right: 0;
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

  footer{
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

</style>