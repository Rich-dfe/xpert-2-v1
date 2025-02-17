<template v-if="customerStore.customers">
    <v-select
      v-model="customerStore.selected"
      label="Customers"
      color="success"
      density="compact"
      :items=customerStore.customers
      item-title="company_name"
      item-value="id"
      return-object
    />
    <!-- {{ customerStore.selected }} -->
  </template>
  
  <script setup>
    import { onBeforeMount } from 'vue'
    import { useCustomerStore } from '@/stores/customers';
    const customerStore = useCustomerStore();
  
    onBeforeMount(async () => {
    customerStore.fetchCustomers()
    })
    
  </script>