<script lang="ts" setup>
import { store } from '@/store';
import { onMounted, ref, watch, computed } from 'vue';
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

const activePane = computed(() => {
    if (store.showPreview && store.showCode) {
        return 'both';
    } else if (store.showPreview) {
        return 'preview';
    } else if (store.showCode) {
        return 'code';
    }
});
</script>

<template>
    <div ref="reference" class="pane-icon">
        <svg :class="{'active': activePane === 'code'}" @click="store.showCode = true; store.showPreview = false" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="3" width="12" height="10" rx="1" stroke="var(--codeplayer-text-secondary)" stroke-width="1.2"/>
            <line x1="8" y1="3" x2="8" y2="13" stroke="var(--codeplayer-text-secondary)" stroke-width="1.2"/>
            <rect id="pane-icon-code" x="2" y="3" width="6" height="10" fill="var(--codeplayer-text-secondary)"/>
        </svg>
        <svg :class="{'active': activePane === 'preview'}" @click="store.showPreview = true; store.showCode = false" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="3" width="12" height="10" rx="1" stroke="var(--codeplayer-text-secondary)" stroke-width="1.2"/>
            <line x1="8" y1="3" x2="8" y2="13" stroke="var(--codeplayer-text-secondary)" stroke-width="1.2"/>
            <rect id="pane-icon-code" x="8" y="3" width="6" height="10" fill="var(--codeplayer-text-secondary)"/>
        </svg>
        <svg :class="{'active': activePane === 'both'}" @click="store.showPreview = true; store.showCode = true" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect id="pane-icon-code" x="2" y="3" width="12" height="10" rx="1" stroke="var(--codeplayer-text-secondary)" stroke-width="1.2"/>
            <line x1="8" y1="3" x2="8" y2="13" stroke="var(--codeplayer-text-secondary)" stroke-width="1.2"/>
            <rect id="pane-icon-code" x="2" y="3" width="12" height="10" fill="var(--codeplayer-text-secondary)"/>
        </svg>
        <div class="pane-icon-active" :class="activePane"></div>
    </div>
</template>
<style scoped lang="less">
.pane-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    svg {
        width: 18px;
        height: 18px;
        margin: 0 4px;
        cursor: pointer;
    }
    .pane-icon-active {
        position: absolute;
        bottom: -7px;
        left: 0;
        width: 8px;
        height: 3px;
        background-color: var(--codeplayer-text-secondary);
        border-radius: 4px;
        transition: all 0.3s ease;
        &.code {
            left: 8px;
        }
        &.preview {
            left: 35px;
        }
        &.both {
            left: 61px;
        }
    }
}
</style>

