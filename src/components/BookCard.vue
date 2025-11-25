<script setup>

</script>

<template>
    <div class="content">
        <slot></slot>
    </div>
</template>

<style scoped>
.content {
    width: 250px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 20px;
}

.content :slotted(*) {
    margin-bottom: 10px;
}

.content :slotted(img) {
    border-radius: 20px;
    width: 100%;
}

.content :slotted(h1) {
    color: var(--secondary-color);
}

.content :slotted(div) {
    font-style: italic;
}
</style>