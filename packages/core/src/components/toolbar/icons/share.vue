<script lang="ts" setup>
import { store } from '@/store';
import { watch, ref, onMounted } from 'vue';
import tippy from 'tippy.js';
import type { Instance, Props } from 'tippy.js';
import { TooltipText } from '@/constant';
import { message } from '@/utils';

const reference = ref();
let tippyDOM: Instance<Props> | undefined;

onMounted(() => {
  watch(
    () => store.theme,
    () => {
      if (tippyDOM) {
        tippyDOM.destroy();
      }
      tippyDOM = tippy(reference.value, {
        content: TooltipText.Share,
        placement: 'bottom',
        arrow: false,
        theme: store.theme === 'dark' ? '' : 'light',
      }) as unknown as Instance<Props>;
    },
    { immediate: true }
  );
});

function share() {
  navigator.clipboard.writeText(location.href);
  message('已将链接复制至剪切板', { type: 'success' });
}
</script>

<template>
  <div
    v-if="!store.excludeTools.includes('share')"
    ref="reference"
    @click="share"
    class="toolbar-icon"
  >
  <svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="M8.59 13.51l6.83 3.98"></path><path d="M15.41 6.51l-6.82 3.98"></path></g></svg>
  </div>
</template>
<style scoped lang="less">
@import './icon.less';

svg {
  width: 18px;
  height: 18px;
}
</style>
