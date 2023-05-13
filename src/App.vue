<script setup lang="ts">
import CheckIn from "./components/CheckIn.vue";
</script>

<template>
  <Suspense>
    <CheckIn></CheckIn>

    <template #fallback>
      <div class="loading">正在努力获取数据中...</div>
    </template>
  </Suspense>
</template>

<style lang="scss" scoped>
.loading {
  color: red;
  height: 150px;
  width: 100%;
  text-align: center;
  line-height: 150px;
}
</style>
