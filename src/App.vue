<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script>

  import store from './utils/storage'

  export default {
    data() {
      return {}
    },
    mounted() {
      window.onresize = () => {
        var width = document.body.clientWidth;
        if (width < 992) {
          store.setStore('setting.mode', 'mobile');
          document.body.setAttribute('setting-mode', 'mobile')

        } else {
          store.setStore('setting.mode', 'pc');
          document.body.setAttribute('setting-mode', 'pc')
        }
      }
      window.onresize();
    },
  }
</script>


<style>
  * {
    margin: 0;
    padding: 0;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    -webkit-text-fill-color: #333;
  }
</style>