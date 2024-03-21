<template>
  <div class="body" v-if="$store.state.Admin">
    <div class="form">
      <h1>Admin</h1>
      <form autocomplete="off" @submit.prevent="handleForm()">
        <div class="txt_field">
          <input type="text" name="username"  v-model="username" required>
          <span></span>
          <label for="username">Username</label>
        </div>
        <div class="txt_field">
          <input type="password" name="password"  v-model="password" required>
          <span></span>
          <label for="password">Password</label>
        </div>
        <!-- <a class="forget" href="#">Forget Password</a> -->
        <input type="submit" value="Login">
        <div class="signup_link">
          Not an Admin? <router-link to="/">Back</router-link>
        </div>
      </form>
    </div>
  </div>
  <router-view v-else></router-view>
</template>
<script>
export default {
  data () {
    return {
      showForm: true,
      username: 'john',
      password: 'dou'
    }
  },
  methods: {
    handleForm () {
      if (this.username === 'john' && this.password === 'dou') {
        this.showForm = !this.showForm
        this.$store.state.Admin = false
      }
    }
  }
}
</script>
