import { createRouter, createWebHistory } from 'vue-router'
import Books from '@/views/Books.vue'
import BookInfo from '@/views/BookInfo.vue'
import Profile from '@/views/Profile.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import AuthorBooks from '@/views/AuthorBooks.vue'

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
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/books/:id',
        name: 'AuthorBooks',
        component: AuthorBooks
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router