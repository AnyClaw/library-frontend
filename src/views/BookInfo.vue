<script setup>
import { useRoute, useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';

import BookCard from '@/components/BookCard.vue';

const route = useRoute()
const router = useRouter()

const currentBook = ref(null)
const authorBooks = ref([])
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
        const response = await axios.get(`http://localhost:8080/books/author/${currentBook.value.author.id}`)
        authorBooks.value = response.data
    } catch (error) {
        console.log(error)
    }

    isLoading.value = false
}

function goToBookInfo(bookId) {
    router.push({name: 'BookInfo', params: {id: bookId}})
}

async function read() {
    isLoading.value = true

    try {
        await axios.put(`http://localhost:8080/books/read`, currentBook.value)
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
                    <div><button @click="read">Читать</button></div>
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
                    <button>Все книги автора</button>
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
    height: 500px;
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