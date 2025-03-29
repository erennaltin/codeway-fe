<template>
    <!-- HEADER ROW -->
    <div class="grid grid-cols-4 gap-2" :style="`grid-template-columns: ${gridTemplateColumns}`">
        <div v-for="(column,index) in columns" :key="column.key">
            <Text2XLarge class="!text-[#778BA4] ">
                {{column.label}}
            </Text2XLarge>
        </div>
    </div>
    <!-- DATA ROWS -->
    <div v-for="(row,index) in data" :key="index" class="grid grid-cols-4 py-2 gap-2"
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
            {{dayjs(row.createdAt).format('DD/MM/YYYY HH:mm')}}

        </TextRegular>
        <div class="flex gap-4">
            <Button class="bg-gradient-to-tr !from-[#335ef5] !to-[#1e89f8] text-white rounded-md w-fit">Edit</Button>
            <Button class="bg-gradient-to-tr !from-[#ee2b20] !to-[#fb588b] text-white rounded-md w-fit">Delete</Button>
        </div>
    </div>
    <!-- INPUT ROW -->
    <form @submit="onSubmit" class="grid grid-cols-4 py-2 gap-2"
        :style="`grid-template-columns: ${gridTemplateColumns}`">
        <FormField v-slot="{componentField}" name="parameterKey">
            <FormItem>
                <FormControl>
                    <Input type="text" placeholder="New parameter" v-bind="componentField" />
                </FormControl>
            </FormItem>
        </FormField>
        <FormField v-slot="{componentField}" name="value">
            <FormItem>
                <FormControl>
                    <Input type="text" placeholder="Value" v-bind="componentField" />
                </FormControl>
            </FormItem>
        </FormField>
        <FormField v-slot="{componentField}" name="description">
            <FormItem class="col-start-3 col-end-5">
                <FormControl>
                    <Input type="text" placeholder="Description" v-bind="componentField" />
                </FormControl>
            </FormItem>
        </FormField>
        <div>
            <Button type="submit" :disabled="isPending"
                class="bg-gradient-to-tr !from-[#374dbb] !to-[#5f7afb] text-white rounded-md w-fit">
                <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isPending" />
                <span v-if="!isPending">ADD</span>
                <span v-if="isPending">Creating...</span>
            </Button>
        </div>


    </form>
</template>

<script lang="ts" setup>
// #region Dependencies
// Packages
import {useMutation,useQuery,useQueryClient} from '@tanstack/vue-query'
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import dayjs from 'dayjs';

// API
import {createConfiguration,getAllConfigurations} from '@/api/configuration'
import type {ConfigurationCreateDTO} from '@/data/dto/Configuration/ConfigurationCreateDTO';

// Components
import {Text2XLarge,TextRegular} from '@/components/ui/text'
import {Button} from '@/components/ui/button'
import {FormField,FormItem,FormControl} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Loader2} from 'lucide-vue-next';
// #endregion

// #region Constants
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

// #endregion

const queryClient=useQueryClient()

// Configuration Data
const {data}=useQuery({
    queryKey: ['configurations'],
    queryFn: getAllConfigurations,
})

const gridTemplateColumns=columns.map(column => column.width).join(' ')


// Creating a new Configuration
const formSchema=toTypedSchema(
    z.object({
        parameterKey: z.string().nonempty(),
        value: z.string().nonempty(),
        description: z.string().nonempty(),
    })
);

const {mutate,isPending}=useMutation({
    mutationFn: createConfiguration,
    onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({queryKey: ['configurations']})
    },
})

const form=useForm({
    validationSchema: formSchema,
});

const onSubmit=form.handleSubmit(async (values: ConfigurationCreateDTO) => {
    mutate(values)
});
</script>
