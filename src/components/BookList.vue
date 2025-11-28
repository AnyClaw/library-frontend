<script setup>
import BookCard from '@/components/BookCard.vue';
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const books = ref([])
const page = ref(0)
const isLoading = ref(false)

const showPrevButton = computed(() => page.value > 0 && !isLoading.value)
const showNextButton = computed(() => books.value.length === 9 && !isLoading.value)

async function getBooks() {
  isLoading.value = true

  try {
    const authorId = route.params.id    
    const response = authorId 
        ? await axios.get(`http://localhost:8080/books?authorId=${authorId}&amount=9&page=${page.value}`)
        : await axios.get(`http://localhost:8080/books?amount=9&page=${page.value}`)

    books.value = response.data
  } catch (error) {
    console.log(error.response)
  }

  isLoading.value = false
}

function goToBookInfo(bookId) {
    router.push({name: 'BookInfo', params: {id: bookId}})
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}

function prevPage() {
  page.value--
  getBooks()
  scrollToTop()
}

function nextPage() {
  page.value++
  getBooks()
  scrollToTop()
}

onMounted((() => {
  getBooks()
}))
</script>

<template>
    <div class="title">
      <slot></slot>
    </div>

    <ul class="catalog">
      <li></li>
      <li>
        <div class="cards">
          <BookCard v-for="book in books" :key="book.id" @click="goToBookInfo(book.id)">
            <img src="/example.png"></img>
            <h1>{{ book.name }}</h1>
            <div>{{ book.authorName }}</div>
          </BookCard>
        </div>
        <div class="cards">
          <button @click="prevPage" v-show="showPrevButton">Предыдущая страница</button>
          <button @click="nextPage" v-show="showNextButton">Следующая страница</button>
        </div>
      </li>
      <li></li>
    </ul>
</template>

<style scoped>
.title {
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 50px;
}

.catalog {
  display: grid;
  grid-template-columns: 15% 70% 15%;
}
</style>
