<script setup>
import { ref } from 'vue';

const amount = ref(1)

function minus() {
    amount.value--
}

function plus() {
    amount.value++
}

function setAmount(a) {
    amount.value = a
}

defineExpose({
    amount,
    setAmount
})
</script>

<template>
    <div class="content">
        <div class="button" @click="minus">-</div>
        <div>{{ amount }}</div>
        <div class="button" @click="plus">+</div>
    </div>
</template>

<style scoped>
.content {
    background-color: var(--secondary-color);
    border-radius: 10px;
    display: grid;
    grid-template-columns: 30% 40% 30%;
    width: min-content;
    user-select: none;
}

.content div {
    margin: 10px;
    text-align: center;
    padding: 8px 12px;
    border-radius: 6px;
    transition: background-color 0.2s ease;
}

.button {
    cursor: pointer;
}

.button:hover {
    background-color: var(--main-color);;
}
</style>