<script setup lang="ts">
import {RouterView, useRouter} from 'vue-router';
import {onBeforeMount} from "vue";

const router = useRouter()

onBeforeMount(() => {
  if (!localStorage.getItem('token')) {
    router.push('/login')
  }
})
</script>

<template>
  <router-view>

  </router-view>
</template>

<style scoped>
</style>
