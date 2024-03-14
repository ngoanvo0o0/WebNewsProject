<script setup lang="ts">
    import { definePageMeta } from '~/.nuxt/imports';

    definePageMeta({
        middleware: ['auth'],
    });
</script>

<template>
    <h1>Dashboard!</h1>
</template>