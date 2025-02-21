<template v-if="usersStore.users">
    <v-select
      v-model="usersStore.selected"
      label="User"
      color="success"
      density="compact"
      :items=usersStore.users
      item-title="name"
      item-value="id"
      return-object
    />
    <!-- {{ groupStore.selected }} -->
  </template>
  
  <script setup>
    import { onMounted } from 'vue'
    import { useUsersStore } from '@/stores/users';
    const usersStore = useUsersStore();
  
    // onMounted(() => {
    //   customerStore.fetchCustomers()
    // })
  </script>