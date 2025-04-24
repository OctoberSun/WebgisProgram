<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
import ComCesium from './components/ComCesium/ComCesium.vue'
import ComHeader from './components/ComHeader/ComHeader.vue'
import ComSidebar from './components/ComSidebar/ComSidebar.vue'
</script>

<template>
  <com-header ></com-header>

 <com-cesium  style="width: 80%;height:90vh;position:absolute;left: 20%;top:auto" ></com-cesium>
 
 <com-sidebar ></com-sidebar>
</template>

<style scoped>
/* 隐藏滚动条 */
*{
  overflow: auto; /* 确保滚动条存在 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

*::-webkit-scrollbar {
  width: 0; /* Chrome, Safari, Edge */
  height: 0;
}
</style>
