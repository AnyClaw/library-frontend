<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

function goToMainPage() {
    router.push({name: "Books"})
}

function goToProfile() {
    const user = localStorage.getItem('user')
    console.log(user)
    
    if (user && user !== 'undefined' && user !== 'null') router.push({name: "Profile"})
    else router.push({name: 'Login'})
}
</script>

<template>
    <header>
        <div class="header-links">
            <img src="/library-header-Photoroom.png" @click="goToMainPage"></img>
        </div>
        <div class="header-links">
            <div>HOME PAGE</div>
            <div>HOME PAGE</div>
            <div>HOME PAGE</div>
            <div>HOME PAGE</div>
        </div>
        <div class="header-links">
            <button @click="goToProfile">PROFILE</button>
        </div>
    </header>
</template>

<style scoped>
header {
    display: grid;
    grid-template-columns: 20% 60% 20%;
    margin: 20px 0;
}

img {
    width: 50%;
}

.header-links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.header-links * {
    cursor: pointer;
}

.header-links div {
    margin: 0 10px;
}
</style>