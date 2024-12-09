<template>
  <CodePlayer :options="options" class="codeplayer-container"></CodePlayer>
</template>

<script setup lang="ts">
import CodePlayer, { CodePlayerOptions } from '../../core/src/index';

const options: CodePlayerOptions = {
  appType: 'vue3',
  theme: 'dark',
};
</script>

<style scoped lang="less">
.codeplayer-container {
  max-height: 100vh;
  height: 100vh;
}
</style>
