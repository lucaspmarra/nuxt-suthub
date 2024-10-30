<script setup lang="ts">


import AppTopBar from "~/layouts/components/AppTopBar.vue";
</script>

<template>
  <div>
    <AppTopBar/>
    <div class="mt-1">
      <slot/>
    </div>
  </div>
</template>

<style scoped>

</style>