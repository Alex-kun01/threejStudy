<!--
 * @Description: 场景
 * @Version: 1.0
 * @Autor: jiangzhikun
 * @Date: 2023-03-17 13:50:34
 * @LastEditors: jiangzhikun
 * @LastEditTime: 2023-03-24 11:08:24
-->
<template>
    <div class="scene-container">
        <!-- 场景容器 -->
        <div id="three3d"></div>
    </div>
</template>

<script lang='ts'>
import { reactive, toRefs, nextTick } from 'vue';
import LoadScene from '../utils/scene';

export default {
 setup() {
    const state = reactive({
        
    });

    nextTick(() => {
        // 初始化场景
        new LoadScene('three3d', () => {
            console.log('jzk 场景加载完成');
        });
    });

   return {
    ...toRefs(state),
   }
 },
}
</script>
<style lang="scss" scoped>
.scene-container {
    width: 100%;
    height: 100%;
    position: relative;

    #three3d {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 4;
    }
}
</style>