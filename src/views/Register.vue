<script setup>
import Header from '@/components/Header.vue'
import Form from '@/components/Form.vue'

import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const name = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const router = useRouter()

async function register() {
    if (!name.value || !password.value) {
        errorMessage.value = 'Заполните все поля'
        return
    }

    if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Пароли не совпадают'
        return
    }

    isLoading.value = true

    try {
        const response = await axios.post(
            `http://localhost:8080/register?username=${name.value}&password=${password.value}`
        )

        errorMessage.value = ''

        isLoading.value = false

        alert('Успешная регистрация!')

        router.push({name: 'Books'})
    } catch(error) {
        alert("Ошибка")
        console.log(error)
        errorMessage.value = error.response.data
        isLoading.value = false
    }
}
</script>

<template>
    <Header/>
    <Form>
        <div class="center">Регистрация</div>
        <input v-model="name" placeholder="Введите имя">
        <input v-model="password" type="password" placeholder="Введите пароль">
        <input v-model="confirmPassword" type="password" placeholder="Подтвердите пароль">
        <div v-show="errorMessage.length > 0" class="center" style="margin-bottom: 10px;">
            {{ errorMessage }}
        </div>
        <div class="center">
            <button :disabled="isLoading" @click="register">
                Зарегестрироваться
            </button>
        </div>
    </Form>
    <div class="center">Есть аккаунт?&emsp;<a href="/login">Войти</a></div>
</template>

<style scoped>
</style>