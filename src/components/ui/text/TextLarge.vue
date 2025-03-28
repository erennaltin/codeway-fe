<template>
    <p :class="cn('text-lg text-[#C8C7CB] dark ',props.class)">
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
