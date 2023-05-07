<script lang="ts" setup>
import Search from "@/components/Search.vue";
import {onMounted, ref} from "vue";

const props = defineProps({
  isHome: {
    type: [Boolean, String],
    default: true
  },
})
const emits = defineEmits(['search'])

// 背景颜色初始值
const deg = ref(153)

onMounted(() => {
  gradientTime()
})
// 动态渲染背景颜色
const gradientTime = () => {
  setInterval(() => {
    deg.value += 1

    if (deg.value >= 360) {
      deg.value = 0
    }
  }, 50)
}
// 搜索
const search = (value: string) => {
  emits('search', value)
}

</script>

<template>
  <div id="banner" :class="{'home-banner':isHome}">
    <div class="banner-img" :style="{backgroundImage:`linear-gradient(${deg}deg, #6284FF, #9599E2, #4d87fd, #FFBBEC)`}">
      <div class="title">
        <div class="main">语料库在线查询</div>
        <div class="sub">一个中英双语语料库在线查询系统</div>
      </div>
      <div class="search">
        <Search @search="search"/>
      </div>
    </div>
    <div class="gradient"></div>
  </div>
</template>


<style scoped lang="less">

#banner {
  position: relative;
  width: 100%;
  height: 380px;
  margin-top: 80px;

  .banner-img {
    width: inherit;
    height: inherit;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    transition: all 0.2s linear;
    overflow: hidden;

    &:hover {
      transform: scale(1.1, 1.1);
      filter: contrast(130%);
    }

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 35px;
      color: #ffffff;
      height: 200px;
      font-weight: bold;
      flex-wrap: wrap;
      text-align: center;
      box-sizing: border-box;
      padding: 30px 0;
      margin-top: 20px;

      .main {
        width: 100%;
      }

      .sub {
        width: 100%;
        font-size: 18px;
        font-weight: 500;
      }
    }

    .search {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100px;
    }
  }

  &.home-banner {
    height: 380px;

    .banner-img {
      background-position: center center;
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: cover;
      z-index: -1;
      transition: unset;

      &:hover {
        transform: unset;
        filter: unset;
      }
    }
  }

  .gradient {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 15px;
    background: linear-gradient(to top, #f7f7f7, transparent);
  }
}
</style>
