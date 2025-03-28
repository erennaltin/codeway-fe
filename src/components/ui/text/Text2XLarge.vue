<template>
    <p :class="cn('text-2xl dark text-[#C8C7CB]',props.class)">
        <slot />
    </p>
</template>

<script lang="ts" setup>
import {cn} from '@/lib/utils';


const props=defineProps({
    class: {
        type: String,
        default: ''
    }
})

</script>
