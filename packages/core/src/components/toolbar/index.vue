<script setup lang="ts">
import { computed } from 'vue';
import { store } from '@/store';
import RefreshIcon from './icons/refresh.vue';
import ShareIcon from './icons/share.vue';
import GithubIcon from './icons/git.vue';
import AutoSaveIcon from './icons/autoSave.vue';
import LightDarkIcon from './icons/lightDark.vue';
import PaneIcon from './icons/pane.vue';
const showDidiver = computed(() => {
  if (
    store.excludeTools.includes('docs') &&
    store.excludeTools.includes('github')
  ) {
    return false;
  }
  if (
    store.excludeTools.includes('refresh') &&
    store.excludeTools.includes('share')
  ) {
    return false;
  }
  return true;
});
</script>

<template>
  <div class="codeplayer-toolbar" :class="`codeplayer-toolbar-top`">
    <div class="toolbar-left">
      <h3 style="margin-left: 10px;">Playground(演练场)</h3>
    </div>
    <div class="toolbar-right">
      <AutoSaveIcon />
      <div class="vertical-divider" v-if="showDidiver"></div>
      <PaneIcon />
      <LightDarkIcon />
      <GithubIcon v-if="store.github" />
      <RefreshIcon />
      <ShareIcon />
    </div>
  </div>
</template>

<style scoped lang="less">
.codeplayer-toolbar {
  height: 50px;
  min-height: 50px;
  box-sizing: border-box;
  padding: 0 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  order: 1;
  border-bottom: 1px solid var(--codeplayer-border-color);
  background-color: var(--codeplayer-toolbar-bgc);
  .toolbar-left {
    display: flex;
    align-items: center;
  }
  .toolbar-right {
    display: flex;
    align-items: center;
    gap: @gap-1;
    .vertical-divider {
      width: 0;
      height: 15px;
      margin: 0 6px;
      border-right: 1px solid var(--codeplayer-tertiary-color);
    }
  }
}
</style>
