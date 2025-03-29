<template>
    <div v-if="!isInitialized" class="w-full flex items-center justify-center h-[600px]">
        <Loader2 class="text-white animate-spin" />
    </div>
    <div v-else>
        <Text2XLarge class=" mb-2">Configuration</Text2XLarge>
        <form @submit="onSubmit" class="flex flex-col gap-4 mb-4">
            <FormField v-slot="{componentField}" name="parameterKey">
                <FormItem>
                    <FormLabel>
                        <TextRegular>Parameter Key</TextRegular>
                    </FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Parameter Key" v-bind="componentField" />
                    </FormControl>
                </FormItem>
            </FormField>
            <FormField v-slot="{componentField}" name="value">
                <FormItem>
                    <FormLabel>
                        <TextRegular>Value</TextRegular>
                    </FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Value" v-bind="componentField" />
                    </FormControl>
                </FormItem>
            </FormField>
            <FormField v-slot="{componentField}" name="description">
                <FormItem class="col-start-3 col-end-5">
                    <FormLabel>
                        <TextRegular>Description</TextRegular>
                    </FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Description" v-bind="componentField" />
                    </FormControl>
                </FormItem>
            </FormField>
            <Button class="bg-gradient-to-tr !from-[#335ef5] !to-[#1e89f8] text-white rounded-md w-fit">Save</Button>
        </form>
        <div>
            <Text2XLarge class="mb-2">Configuration Variants</Text2XLarge>
            <DataTable :columns="columns" :isMobile="props.isMobile" />
        </div>
    </div>
    <AlertDialog v-model:open="isVersionMismatch">
        <AlertDialogContent class="bg-gradient-to-b from-[#1F1E2E] to-[#1E1E24] border-[#2b3553]">
            <AlertDialogHeader>
                <AlertDialogTitle>
                    <TextLarge>There is a version mismatch!</TextLarge>
                </AlertDialogTitle>
                <AlertDialogDescription>
                    <TextRegular class="text-[#778BA4]">The configuration you are trying to edit has been modified by
                        another user. Please refresh the page to get the latest version.</TextRegular>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction
                    class="bg-gradient-to-tr !from-[#374dbb] !to-[#5f7afb] text-white w-full py-6 rounded-md mt-2"
                    @click="handleRefreshButtonClicked">

                    Refresh</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>

<script lang="ts" setup>
// #region Dependencies
import {useQuery,useMutation,useQueryClient} from '@tanstack/vue-query'
import {type ConfigurationDTO} from '@/data/dto/Configuration/ConfigurationDTO';
import {getConfiguration,updateConfiguration} from '@/api/configuration';
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import type {ConfigurationEditDTO} from '@/data/dto/Configuration/ConfigurationEditDTO';

// Components
import {FormField,FormItem,FormControl} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import FormLabel from '@/components/ui/form/FormLabel.vue';
import TextRegular from '@/components/ui/text/TextRegular.vue';
import Text2XLarge from '@/components/ui/text/Text2XLarge.vue';
import DataTable from '@/components/DataTable.vue';
import type {DataTableColumn} from '@/data/components/DataTable';
import {ref,watch} from 'vue';
import {Loader2} from 'lucide-vue-next';
import Button from '@/components/ui/button/Button.vue';
import {AlertDialog,AlertDialogAction,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle} from '@/components/ui/alert-dialog';
import TextLarge from '@/components/ui/text/TextLarge.vue';
import type {AxiosError} from 'axios';


// #endregion

const props=defineProps({
    isMobile: {
        type: Boolean,
        default: false
    },
    id: {
        type: String,
        required: true
    }
})
const isInitialized=ref(false);
const isVersionMismatch=ref(false);
const queryClient=useQueryClient()
const {data}=useQuery<ConfigurationDTO>({
    queryKey: ['configuration',props.id],
    queryFn: () => getConfiguration(props.id),

})

const formSchema=toTypedSchema(
    z.object({
        parameterKey: z.string().nonempty(),
        value: z.string().nonempty(),
        description: z.string().nonempty(),
    })
);

const {mutate: updateMutate,isPending: isUpdatePending}=useMutation({
    mutationFn: updateConfiguration,
    onSuccess: () => {
        // Reset the form
        form.resetForm();
    },
    onError: (error: AxiosError) => {
        console.log('Error:',error.name);

        if(error.status===409) {
            isVersionMismatch.value=true;
        } else {
            console.error('Error updating configuration:',error);
        }
    },
    onSettled: () => {
        queryClient.invalidateQueries({queryKey: ['configurations']})
        queryClient.invalidateQueries({queryKey: ['configuration',props.id]})

    }
})

const form=useForm({
    validationSchema: formSchema,
    initialValues: {
        parameterKey: data.value?.parameterKey||'',
        value: data.value?.value||'',
        description: data.value?.description||'',
    },
});

watch(data,(newValue) => {
    if(newValue) {
        form.setValues({
            parameterKey: newValue.parameterKey,
            value: newValue.value,
            description: newValue.description,
        });
        // Set values could be slow,
        setTimeout(() => {
            isInitialized.value=true;
        },400);
    }
},{immediate: true});



const onSubmit=form.handleSubmit(async (values) => {
    if(!data.value) {
        console.error('No data found for the given ID');
        return;
    }
    const updateObject: ConfigurationEditDTO={
        id: props.id,
        parameterKey: values.parameterKey,
        value: values.value,
        description: values.description,
        _version: data.value._version,
    }
    isInitialized.value=false;
    updateMutate(updateObject)
});

const columns: DataTableColumn[]=[
    {
        key: 'parameterKey',
        label: 'Parameter Key',
        sortable: true,
        width: '20%',
    },
    {
        key: 'value',
        label: 'Value',
        sortable: true,
        width: '20%',
    },
    {
        key: 'description',
        label: 'Description',
        sortable: true,
        width: '20%',
    },
    {
        key: 'createdAt',
        label: 'Created At',
        sortable: true,
        width: '20%',
    },
    {
        key: 'actions',
        label: '',
        sortable: false,
        width: '20%',
    }
]

const handleRefreshButtonClicked=() => {
    window.location.reload();
}
</script>
