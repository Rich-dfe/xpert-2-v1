<template>
    <v-select
      v-model="groupStore.selected"
      label="Logger Group"
      color="success"
      density="compact"
      :items=groupStore.groups
      item-title="group_name"
      item-value="id"
      return-object
    />
    <!-- {{ groupStore.selected }} -->
  </template>
  
  <script setup>
    import { onMounted } from 'vue'
    import { useGroupStore } from '@/stores/groups';
    const groupStore = useGroupStore();
  
    // onMounted(() => {
    //   groupStore.fetchGroups(32)
    // })
  </script>