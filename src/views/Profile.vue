<script setup>
import axios from 'axios';
import Header from '@/components/Header.vue';
import BasketItem from '@/components/BasketItem.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const user = JSON.parse(localStorage.getItem('user'))
const orders = ref([])
const basketItemsRef = ref([])
const isLoading = ref(false)
const router = useRouter()

async function getReadingBooks() {
    isLoading.value = true

    try {
        const response = await axios.get(`http://localhost:8080/basket/get/${user.id}`)
        orders.value = response.data
        
        setTimeout(() => {
            setAmountsFromOrders()
        }, 100)
    } catch (error) {
        alert(error.response.data)
    }

    isLoading.value = false
}

function setAmountsFromOrders() {
    orders.value.forEach((order, index) => {
        if (basketItemsRef.value[index] && order.amount) {
            basketItemsRef.value[index].setAmount(order.amount)
        }
    })
}

function getAllAmounts() {
    return basketItemsRef.value.map(item => item?.getAmount())
}

function exit() {
    localStorage.clear()
    router.push({name: "Books"})
}

onMounted(async () => {
    await getReadingBooks()
})
</script>

<template>
    <Header></Header>
    <div v-if="orders.length === 0">Ваш список книг пуст</div>
    <div v-else class="content">
        <h1>{{ user.username }}, ваша корзина</h1>
        <BasketItem 
            v-for="(order, index) in orders" 
            :key="order.id" 
            style="margin-bottom: 20px;"
            :ref="el => basketItemsRef[index] = el"
            :book="order.book"
        >
            <div class="item">
                <h3>{{ order.book.name }}</h3>
                <span>{{ order.book.authorName }}</span>
            </div>
        </BasketItem>
        <div class="buttons-section">
            <button @click="exit">Выйти</button>
            <button>Оформить заказ</button>
        </div>
    </div>
</template>

<style scoped>
.content {
    width: 80%;
    margin: auto;
}

h1 {
    text-align: center;
}

.buttons-section {
    display: flex;
    justify-content: space-around;
}

.item {
    display: flex;
    flex-direction: column;
}
</style>