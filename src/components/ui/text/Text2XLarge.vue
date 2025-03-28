<script lang="ts" setup>

const props=defineProps({
    class: {
        type: String,
        default: ''
    }
})

</script>

<template>
    <p :class="`text-2xl dark text-[#C8C7CB] ${props.class} `">
        <slot />
    </p>
</template>