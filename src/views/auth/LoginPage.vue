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
      <Button type="submit" :disabled="isLoading"
        class="bg-gradient-to-tr !from-[#374dbb] !to-[#5f7afb] text-white w-full py-6 rounded-md mt-2">
        <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />
        <span v-if="!isLoading">Sign in</span>
        <span v-if="isLoading">Signing in...</span>
      </Button>
      <TextRegular v-if="isError" class="text-red-500 mt-2 mx-auto w-fit">Invalid email or
        password
      </TextRegular>
    </form>
    <TextSmall class="!text-[#6c757d] absolute top-[540px]">Codeway © 2021</TextSmall>
  </div>
</template>

<script setup lang="ts">
import {toTypedSchema} from "@vee-validate/zod";
import {useForm} from "vee-validate";
import * as z from "zod";

import {Text2XLarge} from "@/components/ui/text";
import TextSmall from "@/components/ui/text/TextSmall.vue";
import {FormField,FormItem,FormControl} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {AuthService} from "@/services/AuthService";
import {ref} from "vue";
import {Loader2} from "lucide-vue-next";
import {TextRegular} from "@/components/ui/text";
import type {LoginDTO} from "@/data/dto/Login/LoginDTO";

// Login
const isLoading=ref(false);
const isError=ref(false);
const formSchema=toTypedSchema(
  z.object({
    email: z.string(),
    password: z.string(),
  })
);

const form=useForm({
  validationSchema: formSchema,
});

const onSubmit=form.handleSubmit(async (values: LoginDTO) => {
  isLoading.value=true;
  isError.value=false;
  AuthService.loginUser(values).then((response) => {
    if(response) {

    } else {
      isError.value=true;
    }
  }).catch(() => {
    isError.value=true;
  }).finally(() => {
    isLoading.value=false;
  });

});
</script>
