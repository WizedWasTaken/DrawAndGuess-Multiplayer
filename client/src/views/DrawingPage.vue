<template>
  <div class="container">
    <div class="user-container">
      <ul class="user-list">
        <li v-for="user in users" :key="user.id">{{ user.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const users = [
  {
    id: 1,
    name: 'John Doe'
  },
  {
    id: 2,
    name: 'Jane Doe'
  },
  {
    id: 3,
    name: 'John Smith'
  },
  {
    id: 4,
    name: 'Jane Smith'
  }
]
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  max-height: 100vh;
}

.user-container {
  display: flex;
  width: 20%;
  height: 100%;
  padding: 20px;

  .user-list {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;

    li {
      margin-bottom: 10px;
      color: white;
      border: 2px solid white;
      width: 100%;
      padding: 10px;
    }
  }
}
</style>
