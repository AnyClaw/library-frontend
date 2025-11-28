<script setup>
import Header from '@/components/Header.vue';
import BookList from '@/components/BookList.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute()
const author = ref('')

// async function getAuthor() {
//     const authorId = route.params.id;

//     try {

//     } 
//     catch(error) {
//         alert('Ошибка')
//         console.log(error)
//     }
// }
</script>

<template>
  <Header></Header>
  <BookList>{{ route.params.id }}'s books</BookList>
  <main>
    
  </main>
</template>

<style scoped>
main {
  margin: 50px;
}
</style>
