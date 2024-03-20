<template>
  <section id="header">
      <a href="#"><img src="./assets/image/logo.png" class="logo" alt=""></a>
      <div>
        <ul id="navbar" :class="openside === true? 'active' : ''">
          <li @click="openSideBar()"><router-link to="/">Home</router-link></li>
          <li @click="openSideBar()"><router-link to="/shop">Shop</router-link></li>
          <li @click="openSideBar()"><router-link to="/order">My Order({{ $store.state.order }})</router-link></li>
          <li @click="openSideBar()"><router-link to="/about">About</router-link></li>
          <li @click="openSideBar()"><router-link to="/contact">Contact</router-link></li>
          <li @click="openSideBar()"><router-link to="/admin">Admin</router-link></li>
          <li id="lg-bag">
              <router-link to="/cart">
                  <i class="fa fa-shopping-bag"></i>
                  <div>{{ shoppingItemsCount }}</div>
              </router-link>
          </li>
          <router-link to="#" id="close" @click="openSideBar()"><i class="fa fa-times"></i></router-link>
        </ul>
      </div>
      <div id="mobile">
        <router-link to="/cart">
          <i class="fa fa-shopping-bag"></i>
          <div>{{ shoppingItemsCount }}</div>
        </router-link>
        <i id="bar" @click="openSideBar()" class="fas fa-outdent"></i>
      </div>
  </section>
  <router-view :key="$route.fullPath"/>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'HomeView',
  data () {
    return {
      openside: false
    }
  },
  methods: {
    ...mapActions(['fetchOrder']),
    openSideBar () {
      this.openside = !this.openside
    }
  },
  computed: {
    ...mapGetters(['shopping_cart']),
    shoppingItemsCount () {
      const count = Object.values(this.shopping_cart).reduce((acc, val) => {
        return acc + val
      }, 0)
      return count
    }
  },
  created () {
    this.fetchOrder()
    // when loading access to data which is stored in sessionStorage
    if (sessionStorage.getItem('storeState')) {
    // replaceState
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('storeState'))))
    }
    // when refresh store vuex data to sessionStorage
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('storeState', JSON.stringify(this.$store.state))
    })
  }
}
</script>
<style>
</style>
