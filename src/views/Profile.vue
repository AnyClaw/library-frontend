<script setup>
import axios from 'axios';
import Header from '@/components/Header.vue';
import { ref } from 'vue';

const books = ref([])
const isLoading = ref(false)

async function getReadingBooks() {
    isLoading.value = true

    try {
        const response = await axios.get(`http://localhost:8080/books/profile`)
        books.value = response.data
    } catch (error) {
        alert(error.response.data)
    }

    isLoading.value = false
}
</script>

<template>
    <Header></Header>
    <div v-if="books.length === 0">Ваш список книг пуст</div>
    <div v-else>{{ books }}</div>
</template>

<style scoped>

</style>