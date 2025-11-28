<script setup>
import Header from '@/components/Header.vue';
import BookList from '@/components/BookList.vue';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const route = useRoute()
const author = ref({name: ""})

async function getAuthor() {
  const authorId = route.params.id;

  if(!authorId) return;

  try {
    const response = await axios.get(`http://localhost:8080/author/${authorId}`)
    author.value = response.data;
  } 
  catch(error) {
    alert('Ошибка')
    console.log(error)
  }
}

onMounted(() => {
  getAuthor()
})
</script>

<template>
  <Header></Header>
  <BookList>{{ author.name }}'s books</BookList>
  <main>
    
  </main>
</template>

<style scoped>
main {
  margin: 50px;
}
</style>
