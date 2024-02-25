<template>
  <h1>Sign up</h1>
  <form>
    <input type="text" placeholder="Brugernavn" />
    <input type="password" placeholder="Password" />
    <input type="password" placeholder="Gentag password" />
    <button type="submit">Sign up</button>
  </form>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    margin-bottom: 1rem;
  }

  input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    font-size: 1rem;
  }

  button {
    padding: 0.5rem;
    font-size: 1rem;
  }
}
</style>
