<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import tippy from 'tippy.js';
import type { Instance, Props } from 'tippy.js';
import { TooltipText } from '@/constant';
import { store } from '@/store';
import { message, dialog } from '@/utils';

const props = defineProps<{ filename: string }>();

// 删除文件
const deleteFile = (e: Event) => {
  if (props.filename === store.entry) {
    message('不能删除入口文件', { type: 'danger' });
  }
  e.stopPropagation();
  dialog({
    title: '提示',
    content: `确定要删除 ${props.filename} 吗?`,
    confirm: () => {
      if (store.activeFile === props.filename) {
        store.activeFile = store.entry;
      }
      const tempFiles = { ...store.files };
      delete tempFiles[props.filename];
      store.files = tempFiles;
    },
  });
};

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
        content: TooltipText.DeleteFile,
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
  <div
    class="operate-btn delete-operate"
    :class="{ 'hide-file-operate': store.entry === props.filename }"
    @click="deleteFile"
    ref="reference"
  >
    <div class="delete-file-icon">x</div>
  </div>
</template>

<style scoped lang="less">
.delete-operate {
  padding: 0 10px 0 0;
}
.delete-file-icon {
  font-size: 16px;
  cursor: pointer;
}
</style>
