

<template>
  <div>
    <!-- 侧边分类栏 -->
    <Nav></Nav>
    <!-- Banner -->
    <Banner></Banner>
    <!-- 导航 -->
    <Content></Content>
    <!-- 右侧工具栏 -->
    <Tool></Tool>
    <!-- 弹出框 -->
    <!-- <Popover></Popover> -->
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import Banner from "@/components/Banner";
import Content from "@/components/Content";
import Tool from "@/components/Tool";
import Search from "@/components/Search";
import Popover from "@/components/Popover";

export default {
  components: { Nav, Banner, Tool, Search, Popover },
};
</script>

<style>
</style>