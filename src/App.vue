<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: jiangzhikun
 * @Date: 2023-03-17 11:28:28
 * @LastEditors: jiangzhikun
 * @LastEditTime: 2023-03-24 14:17:43
-->
<template>
  <div id="nav">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
#nav {
  width: 100%;
  height: 100%;
}

// 3D面板
.three_3d_panel {
  width: 70px;
  height: 60px;
  background-color: rgba(0,0,0,.7);
  color: #fff;
  font-size: 5px;
  box-sizing: border-box;
  padding: 2px;

  .title_panel {
    width: 100%;
    height: 10px;
    font-size: 6px;
    font-weight: 600;
    border-bottom: 0.5px solid #5f5f5f;
    margin-bottom: 5px;
  }

  .item_panel {
    width: 100%;
    margin-bottom: 3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
