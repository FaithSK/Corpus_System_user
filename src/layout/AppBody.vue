<script setup lang="ts">
import AppHeader from "@/layout/AppHeader.vue";
import AppFooter from "@/layout/AppFooter.vue";
</script>

<template>
  <AppHeader />
  <div id="layout-body">
    <slot></slot>
    <el-backtop :bottom="100">
      <div
          style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      "
      >
        UP
      </div>
    </el-backtop>
  </div>
  <AppFooter />
</template>

<style scoped>
#layout-body{
  /* header = 80px */
  margin-top: 80px;
  min-height: -moz-calc(100vh - 80px);
  min-height: -webkit-calc(100vh - 80px);
  min-height: calc(100vh - 80px);
  background-color: #F7F8FA;
  /*margin-bottom: 100px;*/
}
</style>
