<script setup lang="ts">
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const query = route.query;
    if(query.token) {
        window.localStorage.setItem('token', query.token);
    }
    window.close();
   
</script>

<template>
    
</template>