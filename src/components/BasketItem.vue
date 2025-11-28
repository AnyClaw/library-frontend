<script setup>
import axios from 'axios';
import OrderAmount from './OrderAmount.vue';
import { computed, ref } from 'vue';

const orderAmountRef = ref()
const startAmount = ref(0)

const props = defineProps({
    book: {
        type: Object,
        required: true
    }
})

function getAmount() {
    return orderAmountRef.value?.amount
}

function setAmount(value) {
    orderAmountRef.value.setAmount(value)
    startAmount.value = value
}

async function updateOrder() {
    try {
        const userId = JSON.parse(localStorage.getItem('user')).id
        const bookId = props.book.id
        await axios.post( 
            `http://localhost:8080/basket/add?userId=${userId}&bookId=${bookId}&amount=${orderAmountRef.value.amount}`
        )
        location.reload()
    }
    catch(error) {
        alert(error.response.data)
        console.log(error.response.data)
    }
}

const hasAmountChanged = computed(() => {
    return orderAmountRef.value?.amount === startAmount.value
})

defineExpose({
    getAmount,
    setAmount,
    updateOrder
})
</script>

<template>
    <div class="content">
        <img src="/example.png" style="width: 40%">
        <slot></slot>
        <div class="amount-section">
            <OrderAmount ref="orderAmountRef"></OrderAmount>
            <button v-if="orderAmountRef" :disabled="hasAmountChanged" @click="updateOrder">
                Применить
            </button>
        </div>
    </div>
</template>

<style scoped>
.content {
    display: grid;
    grid-template-columns: 20% 50% 30%;
    border-bottom: 2px solid silver;
    margin: auto;
    align-items: center;
    place-items: center;
    height: min-content;
    padding: 20px;
}
.amount-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>