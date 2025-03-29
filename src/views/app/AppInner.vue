<template>
  <AppHeader />
  <div class="px-8 mt-8">
    <RouterView v-slot="{Component}">
      <component :is="Component" :is-mobile="isMobile" />
    </RouterView>
  </div>

</template>


<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import {useWindowSize} from '@vueuse/core';
import {computed} from 'vue';
import {RouterView} from 'vue-router';

const {width}=useWindowSize()
const isMobile=computed(() => {
  return width.value<768
})


</script>
