<script lang="ts" setup>
import { store } from '@/store';
import { onMounted, ref, watch } from 'vue';
import tippy from 'tippy.js';
import type { Instance, Props } from 'tippy.js';
import { TooltipText } from '@/constant';

const reference = ref();
let tippyDOM: Instance<Props> | undefined;

const btnOn = ref();
const btnOnCircle = ref();
const btnOnText = ref();

onMounted(() => {
    onOrOff(store.autoSave);
    watch(
        () => store.theme,
        () => {
            if (tippyDOM) {
                tippyDOM.destroy();
            }
            tippyDOM = tippy(reference.value, {
                content: TooltipText.AutoSave,
                placement: 'bottom',
                arrow: false,
                theme: store.theme === 'dark' ? '' : 'light',
            }) as unknown as Instance<Props>;
        },
        { immediate: true }
    );
});

function changeAutoSave() {
    store.autoSave = !store.autoSave;
    if (store.autoSave) {
        store.rerenderID++;
    }
    onOrOff(store.autoSave);
    localStorage.setItem('autoSave', store.autoSave.toString());
}

function onOrOff(type: boolean) {
    const btn = btnOn.value;
    const circle = btnOnCircle.value;
    const text = btnOnText.value;

    if (!type) {
        btn.style = "background-color: #ccc;"
        circle.style = "left: 27px;background-color: #888;box-shadow: 0 0 10px #888;";
        text.style = "right: 22px;color: #888;";
        text.innerText = "OFF";
    } else {
        btn.style = ""
        circle.style = "";
        text.style = "";
        text.innerText = "ON";
    }
}
</script>

<template>
    <div v-if="!store.excludeTools.includes('autoSave')" ref="reference" @click="changeAutoSave" class="toolbar-icon auto-save-container">
        <span class="auto-save-text">自动保存</span>
        <p ref="btnOn" class="btn-on">
            <!-- 圆点 -->
            <span ref="btnOnCircle" class="btn-on-circle"></span>
            <!-- 文字 -->
            <span ref="btnOnText" class="btn-on-text">ON</span>
        </p>
    </div>
</template>
<style scoped lang="less">
.auto-save-container {
    display: flex;
    align-items: center;
    margin-left: 10px;
}

.auto-save-text {
    font-size: 12px;
    line-height: 20px;
    margin-right: 5px;
}

.btn-on {
    width: 45px;
    height: 20px;
    margin: 0 3px;
    border-radius: 20px;
    font-size: 12px;
    display: inline-block;
}

.btn-on {
    cursor: pointer;
    position: relative;
    background-color: #12B090;
}

.btn-on-circle {
    position: absolute;
    width: 15px;
    height: 15px;
    top: 3px;
    left: 3px;
    background-color: rgb(255, 255, 255);
    border-radius: 50%;
    box-shadow: 0 0 10px white;
    transition: all .5s;
}

.btn-on-text {
    position: absolute;
    right: 4px;
    line-height: 20px;
    color: white;
    transition: all .5s;
}
</style>
