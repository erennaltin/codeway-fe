<template>
  <div class="px-8 py-4 flex justify-between">
    <img src="/images/logo.png" alt="logo" class="h-8" />
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div class="flex items-center ">
          <LucideUser class="text-white" />
          <LucideChevronDown class="text-white" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>


<script setup lang="ts">
import {LucideChevronDown,LucideUser} from 'lucide-vue-next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu';


</script>
