<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <Text2XLargeStrong class="text-4xl font-bold">404 - Not Found</Text2XLargeStrong>
        <TextLarge class="mt-4 text-lg">The page you are looking for does not exist.</TextLarge>
        <router-link to="/" class="mt-8 text-blue-500 hover:underline">
            Go back to Home
        </router-link>
    </div>
</template>

<script lang="ts" setup>
import {Text2XLargeStrong,TextLarge} from '@/components/ui/text';
</script>
