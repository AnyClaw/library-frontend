import { createRouter, createWebHistory } from 'vue-router'
import Books from '@/views/Books.vue'
import BookInfo from '@/views/BookInfo.vue'
import Profile from '@/views/Profile.vue'

const routes = [
    {
        path: '/books',
        name: 'Books',
        component: Books
    },
    {
        path: '/book/:id',
        name: 'BookInfo',
        component: BookInfo
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router