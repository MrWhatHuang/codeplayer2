<script lang="ts" setup>
import { store } from '@/store';
import { onMounted, ref, watch } from 'vue';

const reference = ref();

const btnOn = ref();
const btnOnCircle = ref();
const btnOnText = ref();

onMounted(() => {
    onOrOff(store.autoSave);
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

function save() {
    // @ts-ignore
    store.files[store.activeFile].code = window.editorInstance.getValue();
    store.rerenderID++;
}
</script>

<template>
    <div v-if="!store.excludeTools.includes('autoSave')" ref="reference" class="toolbar-icon auto-save-container">
        <button v-if="!store.autoSave" class="save-btn" @click="save">保存</button>
        <span class="auto-save-text">自动保存</span>
        <p ref="btnOn" class="btn-on" @click="changeAutoSave">
            <!-- 圆点 -->
            <span ref="btnOnCircle" class="btn-on-circle"></span>
            <!-- 文字 -->
            <span ref="btnOnText" class="btn-on-text">ON</span>
        </p>
    </div>
</template>
<style scoped lang="less">
.save-btn {
    border: none;
    background-color: #12B090;
    color: #fff;
    padding: 3px 8px;
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
}
.auto-save-container {
    display: flex;
    align-items: center;
    margin-left: 10px;
}

.auto-save-text {
    font-size: 12px;
    line-height: 20px;
    margin: 0 8px;
    cursor: pointer;
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
