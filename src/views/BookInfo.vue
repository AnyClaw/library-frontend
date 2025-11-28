<script setup>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';

import BookCard from '@/components/BookCard.vue';
import Header from '@/components/Header.vue';
import OrderAmount from '@/components/OrderAmount.vue';

const route = useRoute()
const router = useRouter()

const currentBook = ref(null)
const authorBooks = ref([])
const amount = ref()
const isLoading = ref(false)

async function getBookById() {
    isLoading.value = true

    try {
        const response = await axios.get(`http://localhost:8080/books/${route.params.id}`)
        currentBook.value = response.data
    } catch (error) {
        alert(error.response.data)
    }

    isLoading.value = false
}

async function getBooksByAuthor() {
    isLoading.value = true

    try {
        const response = await axios.get(`http://localhost:8080/books?authorId=${currentBook.value.author.id}&amount=3&page=0`)
        authorBooks.value = response.data
    } catch (error) {
        console.log(error)
    }

    isLoading.value = false
}

function goToBookInfo(bookId) {
    router.push({name: 'BookInfo', params: {id: bookId}})
}

function goToAuthorBooks() {
    router.push({name: 'AuthorBooks', params: {id: currentBook.value.author.id}})
}

async function read() {
    isLoading.value = true

    try {
        const userId = JSON.parse(localStorage.getItem('user')).id
        await axios.post(
            `http://localhost:8080/basket/add?userId=${userId}&bookId=${currentBook.value.id}&amount=${amount.value.amount}`
        )
        alert('Книга добавлена')
    } catch (error) {
        console.log(error)
        alert("Произошла ошибка")
    }

    isLoading.value = false
}

watch(
  () => route.params.id,
  async (newId, oldId) => {
    if (newId && newId !== oldId) {
      await getBookById()
      await getBooksByAuthor()
    }
  }
)

onMounted(async () => {
    await getBookById()
    await getBooksByAuthor()
})
</script>

<template>
    <Header></Header>
    <main>
        <div v-if="isLoading || !currentBook">Загрузка</div>
        <div v-else>
            <ul class="book-title">
                <li>
                    <div class="name" style="margin-bottom: 0;">{{ currentBook.author.name }}</div>
                    <div class="name">{{ "\"" + currentBook.name + "\"" }}</div>
                    <div>{{ currentBook.description }}</div>
                    <div><button @click="read">Добавить в корзину</button></div>
                    <div><OrderAmount ref="amount"></OrderAmount></div>
                </li>
                <li>
                    <img src="/example.png"></img>
                </li>
            </ul>
            <div class="author-title">
                <h1>Другие книги автора {{ currentBook.author.name }}</h1>
                <div v-if="isLoading || authorBooks.length === 0">Загрузка</div>
                <div v-else class="other">
                    <div class="cards">
                        <BookCard v-for="book in authorBooks" :key="book.id" @click="goToBookInfo(book.id)">
                            <img src="/example.png"></img>
                            <h1>{{ book.name }}</h1>
                            <div>{{ book.authorName }}</div>
                        </BookCard>
                    </div>
                    <button @click="goToAuthorBooks">Все книги автора</button>
                </div>
            </div>
        </div>
        
    </main>
</template>

<style scoped>
main {
    margin: 20px;
}

.book-title {
    min-height: 500px;
    height: auto;
    padding: 50px;
    display: grid;
    grid-template-columns: 50% 50%;
    background-color: var(--main-color);
    color: white;
    border: 5px solid var(--secondary-color);
    border-radius: 10px;
    margin-bottom: 20px;
}

.book-title li {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.book-title img {
    height: 100%;
    border-radius: 10px;
}

.book-title div {
    width: 70%;
    color: white;
    margin-bottom: 20px;
}

.name {
    font-size: 50px;
}

.book-title button {
    background-color: var(--secondary-color);
    font-size: 20px;
}

.author-title h1 {
    text-align: center;
}

.other {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
</style>