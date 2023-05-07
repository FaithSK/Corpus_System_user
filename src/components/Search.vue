<script lang="ts" setup>
import {ref} from "vue"
const emits = defineEmits(['search'])
let keyword = ref('')
// 搜索
const onSearch = () => {
  emits('search', keyword.value)
}
</script>

<template>
  <div class="search">
    <input type="text" placeholder="请输入需要查询的单词" v-model="keyword" @keydown.enter="onSearch" />
  </div>
</template>

<style lang="less" scoped>

.search {
  padding: 0 20px;
  display: flex;
  align-items: center;
  width: 800px;
  height: 30px;
  transition: all 0.3s;
  z-index: 1000;
  input {
    width: 100%;
    height: 45px;
    padding-left: 20px;
    border-radius: 50px;
    border: none;
    box-sizing: border-box;
    color: #666;
    outline: none;
  }
  span {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 60px;
    height: 40px;
    line-height: 40px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: #fff;
    text-align: center;
    transition: all 0.3s;
    cursor: pointer;
    &:hover{
      background-color: #e7f3ff;
    }
  }
}
</style>
