<template>
  <div class="home-page">
    <h1 class="title">Draw and Guess Game</h1>
    <h3 class="subtitle">Let's have fun drawing and guessing!</h3>
    <router-link to="/connect-room" class="start-button">Start Game</router-link>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: $color-foreground;
}

.title {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, $color-primary, $color-secondary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: $font-weight-xlbold;
}

.subtitle {
  font-size: 1.5rem;
  color: $color-secondary;
  margin-bottom: 2rem;
}

.start-button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: $color-primary;
  color: $color-background;
  border: none;
  text-decoration: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darken($color-primary, 10%);
  }
}

.start-button:visited {
  color: $color-background;
}
</style>
