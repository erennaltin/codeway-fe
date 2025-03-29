<template>
    <div v-if="isDataPending" class="w-full flex items-center justify-center h-[600px]">
        <Loader2 class="text-white animate-spin" />
    </div>
    <div v-if="!isMobile&&!isDataPending">
        <!-- HEADER ROW -->
        <div class="grid grid-cols-5 gap-2" :style="`grid-template-columns: ${gridTemplateColumns}`">
            <div v-for="(column,_) in renderColumns" :key="column.key">
                <Text2XLarge class="!text-[#778BA4] ">
                    {{column.label}}
                </Text2XLarge>
            </div>
        </div>
        <!-- DATA ROWS -->
        <div v-for="(row,index) in data" :key="index" class="grid grid-cols-5 py-2 gap-2"
            :style="`grid-template-columns: ${gridTemplateColumns}`">

            <TextRegular v-for="(column,_) in renderColumns" :key="column.key">
                {{row[column.key]}}
            </TextRegular>

            <div class="flex gap-4">
                <Button class="bg-gradient-to-tr !from-[#335ef5] !to-[#1e89f8] text-white rounded-md w-fit"
                    @click="() => onEdit(row)">Edit</Button>
                <Button class="bg-gradient-to-tr !from-[#ee2b20] !to-[#fb588b] text-white rounded-md w-fit"
                    @click="() => onDelete(row)">Delete</Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// #region Dependencies

// API
import type {DataTableColumn} from '@/data/components/DataTable';
// Components
import {Text2XLarge,TextRegular} from '@/components/ui/text'
import {Button} from '@/components/ui/button'
import {Loader2} from 'lucide-vue-next';
import {computed,type PropType} from 'vue';
// #endregion

const props=defineProps({
    isMobile: {
        type: Boolean,
        required: true
    },
    columns: {
        type: Array as PropType<DataTableColumn[]>,
        required: true,
    },
    isDataPending: {
        type: Boolean,
        default: false
    },

    data: {
        type: Object
    },
    onEdit: {
        type: Function as PropType<(row: any) => void>,
        required: true
    },
    onDelete: {
        type: Function as PropType<(row: any) => void>,
        required: true
    },

})

const gridTemplateColumns=props.columns.map(column => column.width).join(' ')

const renderColumns=computed(() => {
    return props.columns.filter(column => column.key!=='actions')
})

</script>
