<template>
  <section style="height: 10vh; background-color: #18F3EE">
    <n-gradient-text :size="50" type="info">
      <img
        src="../../../public/img/argologo.png"
        style="width: auto; height: 65px"
        alt=""
      />

      Argo数据展示系统
    </n-gradient-text>

    <n-statistic
      label=""
      tabular-nums
      style="position: absolute; top: 35px; right: 230px"
    >
      共计浮标:
      <n-number-animation
        show-separator
        ref="numberAnimationInstRef"
        :from="0"
        :to="totalBuoys"
      />
      <template #suffix> 个 </template>
    </n-statistic>

    <n-statistic
      label=""
      tabular-nums
      style="position: absolute; top: 35px; right: 0"
    >
      活动浮标:
      <n-number-animation
        show-separator
        ref="numberAnimationInstRef"
        :from="0"
        :to="activityBuoy"
      />
      <template #suffix> 个 </template>
    </n-statistic>
  </section>
</template>

<script>
import {ref, onMounted } from 'vue';
import GetData from '../../js/GetData.js';

export default {
  data() {
    return {
      // activityBuoy:2,
    };
  },
  setup() {

    // 使用ref创建一个响应式的状态
    
    const activityBuoy = ref(0);
    const totalBuoys = ref(0);
    // 定义一个方法，用于从后端获取数据
    const fetchActivityBuoy = async () => {
      try {
        const response = await GetData.getAllFeature('http://localhost:8084/geoserver/argoproject/ows', 'argoproject:recent_argometa');
        // 假设 response 是一个对象，并且包含您想要的数值
        activityBuoy.value = response; // 更新响应式状态
       // console.log('activityBuoy:',response);
      } catch (error) {
        console.error('Failed to fetch activityBuoy:', error);
      }
    };

    const fetchTotalBuoys = async () => {
      try {
        const response = await GetData.getAllFeature('http://localhost:8084/geoserver/argoproject/ows', 'argoproject:argometa');
        // 假设 response 是一个对象，并且包含您想要的数值
        totalBuoys.value = response; // 更新响应式状态
      //  console.log('activityBuoy:',response);
      } catch (error) {
        console.error('Failed to fetch activityBuoy:', error);
      }
    };
    // 在组件挂载后，获取数据
    onMounted(async () => {
      try {
        await fetchActivityBuoy();
        await fetchTotalBuoys();
        // 如果需要在两个异步操作都完成后执行某些操作，可以放在这里
      } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
      }
    });

    // 返回需要在模板中使用的响应式状态
    return {
      activityBuoy,totalBuoys
    };
  }
  
};
</script>

<style>
</style>