<template>
    <div v-if="isDataPending">
        <Loader2 class="w-4 h-4 mr-2 animate-spin" />

    </div>
    <div v-else>
        <DataTable :columns="columns" :data="formattedData" :isDataPending="isDataPending"
            :onEdit="handleEditButtonClicked" :onDelete="handleDeleteButtonClicked" :is-mobile="isMobile" />
        <!-- INPUT ROW -->
        <form @submit="onSubmit" class="grid grid-cols-5 py-2 gap-2"
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
                <Button type="submit" :disabled="isCreatePending"
                    class="bg-gradient-to-tr !from-[#374dbb] !to-[#5f7afb] text-white rounded-md w-fit">
                    <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isCreatePending" />
                    <span v-if="!isCreatePending">ADD</span>
                    <span v-if="isCreatePending">Creating...</span>
                </Button>
            </div>


        </form>
    </div>
</template>

<script lang="ts" setup>
// #region Dependencies
// Packages
import {useMutation,useQuery,useQueryClient} from '@tanstack/vue-query'
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {router} from '@/router'

// API
import {createConfiguration,deleteConfiguration,getAllConfigurations} from '@/api/configuration'
import type {ConfigurationCreateDTO} from '@/data/dto/Configuration/ConfigurationCreateDTO';
import DataTable from '@/components/DataTable.vue';
import type {DataTableColumn} from '@/data/components/DataTable';
import {computed} from 'vue';
import dayjs from 'dayjs';
import type {ConfigurationDTO} from '@/data/dto/Configuration/ConfigurationDTO';

// Components
import {Button} from '@/components/ui/button'
import {FormField,FormItem,FormControl} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Loader2} from 'lucide-vue-next';


// #endregion

// #region Constants
const columns: DataTableColumn[]=[
    {
        key: 'parameterKey',
        label: 'Parameter Key',
        sortable: false,
        width: '25%',
    },
    {
        key: 'value',
        label: 'Value',
        sortable: false,
        width: '10%',
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
        width: '15%',
    },
    {
        key: 'actions',
        label: '',
        sortable: false,
        width: '20%',
    },
]

// #endregion

defineProps({
    isMobile: {
        type: Boolean,
        default: false,
    },
})

const queryClient=useQueryClient()

// Configuration Data
const {data,isPending: isDataPending}=useQuery<ConfigurationDTO[]>({
    queryKey: ['configurations'],
    queryFn: getAllConfigurations,
})

const formattedData=computed(() => {
    return data.value?.map((item: ConfigurationDTO) => ({
        ...item,
        createDate: dayjs(item.createdAt).format('MM/DD/YYYY HH:mm'),
    }))
})



// Creating a new Configuration
const formSchema=toTypedSchema(
    z.object({
        parameterKey: z.string().nonempty(),
        value: z.string().nonempty(),
        description: z.string().nonempty(),
    })
);

const {mutate: createMutate,isPending: isCreatePending}=useMutation({
    mutationFn: createConfiguration,
    onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({queryKey: ['configurations']})

        // Reset the form
        form.resetForm();
    },
})

const form=useForm({
    validationSchema: formSchema,
});

const onSubmit=form.handleSubmit(async (values: ConfigurationCreateDTO) => {
    createMutate(values)
});

// Updating the Configuration
const handleEditButtonClicked=(row: ConfigurationDTO) => {
    router.push({
        name: 'ConfigurationEdit',
        params: {id: row.id},
    });
}

// Deleting the Configuration
const {mutate: deleteMutate,isPending: isDeletePending}=useMutation({
    mutationFn: deleteConfiguration,
    onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({queryKey: ['configurations']})

        // Reset the form
        form.resetForm();
    },
})
const handleDeleteButtonClicked=(id: string) => {
    // Call the delete API
    deleteMutate(id)
    // After successful deletion, invalidate the query to refetch the data
    queryClient.invalidateQueries({queryKey: ['configurations']})
}

const gridTemplateColumns=columns.map(column => column.width).join(' ')
</script>
