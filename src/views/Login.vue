<template>
  <div>
    <h1>Login</h1>
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      const { username, password } = this;
    }
  }
}

</script>
