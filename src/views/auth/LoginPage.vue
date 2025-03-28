<script setup lang="ts"></script>

<template>
  <div class="login-container">
    <img src="/images/logo.png" alt="logo" class="logo" />
    <p class="login-text">Please sign in</p>
    <form @submit.prevent="" class="login-form">
      <div class="inputs">
        <input type="text" placeholder="E-mail address" />
        <input type="password" placeholder="Password" />
      </div>

      <button class="primary-button" type="submit">Sign in</button>
    </form>
    <p class="copyright-text">Codeway © 2021</p>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  display: flex;
  flex-direction: column;
  margin-top: 200px;
  align-items: center;

  .logo {
    width: 270px;
    margin-bottom: 32px;
  }

  .login-text {
    color: #32335c;
    font-size: 2rem;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    margin-top: 32px;

    .inputs {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;

      input {
        padding: 0;
        border: none;
        width: 300px;
        border: 2px solid #2b3553;
        border-bottom: 1px solid #2b3553;
        border-top: 1px solid #2b3553;
        padding: 8px;
        background-color: transparent;
        &:focus-visible {
          outline: none;
        }
        &:focus {
          border: 2px solid #df4ec8;
        }
      }

      input:first-of-type {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        border-top-width: 2px;
      }

      input:last-of-type {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;

        border-bottom-width: 2px;
      }
    }
  }
}

.primary-button {
  background: rgb(55, 77, 187);
  background: linear-gradient(45deg, rgba(55, 77, 187, 1) 0%, rgba(95, 122, 251, 1) 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
}

.copyright-text {
  color: #6c757d;
  font-size: 0.8rem;
  margin-top: 48px;
}
</style>
