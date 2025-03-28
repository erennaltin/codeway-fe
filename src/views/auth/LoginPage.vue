<template>
  <div class="flex flex-col mt-24 items-center">
    <img src="/images/logo.png" alt="logo" class="w-[270px] mb-8" />
    <Text2XLarge class="!text-[#32335c]">Please sign in</Text2XLarge>
    <form @submit="onSubmit" class="mt-4 w-[300px] mb-12">
      <FormField v-slot="{componentField}" name="email">
        <FormItem>
          <FormControl>
            <Input type="email" placeholder="E-mail address" v-bind="componentField" class="rounded-b-none" />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField v-slot="{componentField}" name="password">
        <FormItem>
          <FormControl>
            <Input type="password" placeholder="Password" v-bind="componentField" class="rounded-t-none" />
          </FormControl>
        </FormItem>
      </FormField>
      <Button type="submit"
        class="bg-gradient-to-tr !from-[#374dbb] !to-[#5f7afb] text-white w-full py-6 rounded-md mt-2">
        Sign in
      </Button>
    </form>
    <TextSmall class="!text-[#6c757d]">Codeway © 2021</TextSmall>
  </div>
</template>


<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/zod'
import {useForm} from 'vee-validate';
import * as z from 'zod'

import {Text2XLarge} from '@/components/ui/text';
import TextSmall from '@/components/ui/text/TextSmall.vue';
import {FormField,FormItem,FormLabel,FormControl,FormDescription,FormMessage} from '@/components/ui/form';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {AuthService} from '@/services/authService';

const formSchema=toTypedSchema(z.object({
  email: z.string(),
  password: z.string(),
}))

const form=useForm({
  validationSchema: formSchema,
})

const onSubmit=form.handleSubmit((values) => {
  console.log('Form submitted:',values);
  AuthService.loginUser(values)
    .then((response) => {
      console.log('Login successful:',response);
      // Handle successful login (e.g., redirect to dashboard)
    })
    .catch((error) => {
      console.error('Login failed:',error);
      // Handle login error (e.g., show error message)
    });
})
</script>
