<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: jiangzhikun
 * @Date: 2023-03-17 11:30:28
 * @LastEditors: jiangzhikun
 * @LastEditTime: 2023-03-17 13:51:46
-->
<template>
    <div class="home">
      <!-- 场景 -->
      <Scene />
    </div>
</template>

<script lang='ts'>
import Scene from './Scene.vue';
import { reactive, toRefs } from 'vue';

export default {
 components: { Scene },
 setup() {
    const state = reactive({
    });
   return {
    ...toRefs(state),
   }
 },
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background-color: #000;
}
</style>