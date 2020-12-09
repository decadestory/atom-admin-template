<template>
  <div class="home">

    <el-container style="min-width:900px;">
      <el-header>
        <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#16181d"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="0">
          <img  height="38" src="https://sfa-cn.lorealchina.com/sites/site_login/dist/images/logo.png" alt="element-logo" class="nav-logo">
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
        <el-menu-item index="4" > <i class="el-icon-s-comment"></i>消息中心</el-menu-item>
        <el-menu-item index="5"> <i class="el-icon-setting"></i>配置中心</el-menu-item>
      </el-menu>

      <div user-info>
        <span><i class="el-icon-message"></i></span>
        <span> <i class="el-icon-s-custom"></i> 管理员</span>
      </div>
     
    </el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
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

.el-header{
  padding:0;
  position: relative;
}

[user-info]{
  position: absolute; right: 0; top:0;bottom: 0; color:#fff;    line-height: 60px; 
}

[user-info] span{
  display: inline-block;
  padding:0 10px;
  border-left: 1px solid #333;
}


</style>
