<template>
    <!-- HEADER ROW -->
    <div class="grid grid-cols-4" :style="`grid-template-columns: ${gridTemplateColumns}`">
        <div v-for="(column,index) in columns" :key="column.key">
            <Text2XLarge class="!text-[#778BA4] ">
                {{column.label}}
            </Text2XLarge>
        </div>
    </div>
    <!-- DATA ROWS -->
    <div v-for="(row,index) in data" :key="index" class="grid grid-cols-4 py-2"
        :style="`grid-template-columns: ${gridTemplateColumns}`">

        <TextRegular>
            {{row.parameterKey}}
        </TextRegular>
        <TextRegular>
            {{row.value}}
        </TextRegular>
        <TextRegular>
            {{row.description}}
        </TextRegular>
        <TextRegular>
            {{row.createDate}}
        </TextRegular>
        <div class="flex gap-4">
            <Button class="edit-button">Edit</Button>
            <Button class="delete-button">Delete</Button>
        </div>

    </div>
</template>

<script lang="ts" setup>
import {Text2XLarge,TextRegular} from '@/components/ui/text'
import {Button} from '@/components/ui/button'

const columns=[
    {
        key: 'parameterKey',
        label: 'Parameter Key',
        sortable: false,
        width: '20%',
    },
    {
        key: 'value',
        label: 'Value',
        sortable: false,
        width: '20%',
    },
    {
        key: 'description',
        label: 'Description',
        sortable: false,
        width: '30%',
    },
    {
        key: 'createDate',
        label: 'Create Date',
        sortable: true,
        width: '20%',
    },
    {
        key: 'actions',
        label: '',
        sortable: false,
        width: '10%',
    },
]

const data=[{
    parameterKey: 'exampleKey',
    value: 'exampleValue',
    description: 'exampleDescription',
    createDate: '2023-10-01',
},
{
    parameterKey: 'exampleKey2',
    value: 'exampleValue2',
    description: 'exampleDescription2',
    createDate: '2023-10-02',
},{
    parameterKey: 'exampleKey3',
    value: 'exampleValue3',
    description: 'exampleDescription3',
    createDate: '2023-10-03',
}
]

const gridTemplateColumns=columns.map(column => column.width).join(' ')
</script>

<style lang="scss" scoped>
.edit-button {
    background: rgb(51, 94, 245);
    background: linear-gradient(45deg, rgba(51, 94, 245, 1) 0%, rgba(30, 137, 248, 1) 100%);
}

.delete-button {
    background: rgb(238, 43, 32);
    background: linear-gradient(45deg, rgba(238, 43, 32, 1) 0%, rgba(251, 88, 139, 1) 100%);
}
</style>