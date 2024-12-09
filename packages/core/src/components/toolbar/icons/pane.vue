<script lang="ts" setup>
import { store } from '@/store';
import { onMounted, ref, watch } from 'vue';
import tippy from 'tippy.js';
import type { Instance, Props } from 'tippy.js';
import { TooltipText } from '@/constant';

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
        content: TooltipText.Pane,
        placement: 'bottom',
        arrow: false,
        theme: store.theme === 'dark' ? '' : 'light',
      }) as unknown as Instance<Props>;
    },
    { immediate: true }
  );
});
</script>

<template>
    <div ref="reference" class="pane-icon">
        <svg :class="{'active': !store.showPreview && store.showCode}" @click="store.showCode = true; store.showPreview = false" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" stroke-width="1.2"/>
            <line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" stroke-width="1.2"/>
            <rect id="pane-icon-code" x="2" y="3" width="6" height="10" fill="currentColor"/>
        </svg>
        <svg :class="{'active': store.showPreview && !store.showCode}" @click="store.showPreview = true; store.showCode = false" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" stroke-width="1.2"/>
            <line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" stroke-width="1.2"/>
            <rect id="pane-icon-code" x="8" y="3" width="6" height="10" fill="currentColor"/>
        </svg>
        <svg :class="{'active': store.showPreview && store.showCode}" @click="store.showPreview = true; store.showCode = true" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect id="pane-icon-code" x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" stroke-width="1.2"/>
            <line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" stroke-width="1.2"/>
            <rect id="pane-icon-code" x="2" y="3" width="12" height="10" fill="currentColor"/>
        </svg>
    </div>
</template>
<style scoped lang="less">
.pane-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        width: 18px;
        height: 18px;
        margin: 0 4px;
        cursor: pointer;
        &.active {
            #pane-icon-code {
                fill: var(--codeplayer-brand);
            }
        }
    }
}
</style>

