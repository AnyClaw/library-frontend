<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

function goToMainPage() {
    router.push({name: "Books"})
}

function goToProfile() {
    router.push({name: "Profile"})
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
    margin-top: 20px;
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