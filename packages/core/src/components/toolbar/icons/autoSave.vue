<script lang="ts" setup>
import { store } from '@/store';
import { onMounted, ref } from 'vue';

const reference = ref();

onMounted(() => {
});

function changeAutoSave() {
    store.autoSave = !store.autoSave;
    if (store.autoSave) {
        store.rerenderID++;
    }
    localStorage.setItem('autoSave', store.autoSave.toString());
}
</script>

<template>
    <div v-if="!store.excludeTools.includes('autoSave')" ref="reference" class="toolbar-icon">
        <div class="auto-save-btn" :class="{ 'save-on': store.autoSave }" @click="changeAutoSave">
            <span class="auto-save-text">自动保存 {{ store.autoSave ? 'ON' : 'OFF' }}</span>
        </div>
    </div>
</template>
<style scoped lang="less">
.auto-save-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 74px;
    height: 22px;
    padding: 0 6px;
    border-radius: 4px;
    background-color: var(--codeplayer-btn-bg);
    cursor: pointer;
    color: var(--codeplayer-btn);
    font-size: 12px;
    line-height: 22px;
    transition: background 0.3s;
    &.save-on {
        background-color: var(--codeplayer-brand);
        color: #fff;
    }
}
</style>

