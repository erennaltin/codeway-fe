<script lang="ts" setup>

const props=defineProps({
    class: {
        type: String,
        default: ''
    }
})

</script>

<template>
    <p :class="'text-lg text-[#C8C7CB] dark '+props.class">
        <slot />
    </p>
</template>