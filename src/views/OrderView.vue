<template>
  <section id="order-header" class="about-header">
    <img src="../assets/image/b4.jpg" alt=""/>
    <div class="blend-mode">
      <h2>My Order View</h2>
    </div>
  </section>
  <section id="cart" class="section-p1">
    <myorderview v-for="(items, i) in $store.state.Order"
    :key="i"
    :loopOrder="items"/>
    <div class="empty" v-if="$store.state.order === 0">
      <h3>You Have No Order Currently</h3>
        <router-link to="/shop">Go To Shop</router-link>
    </div>
  </section>
  <footerview/>
</template>
<script>
// import axios from 'axios'
// import { mapActions } from 'vuex'
import footerview from '@/components/FooterView.vue'
import myorderview from '@/components/MyOrder.vue'
export default {
  name: 'OrderView',
  components: {
    myorderview,
    footerview
  }
}
</script>
<style scoped>
  .empty{
    text-align:center;
    padding: 10px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .empty a{
    margin-top:10px;
    display: block;
    padding: 10px 40px;
    text-decoration: none;
    border-radius: none;
    border-radius: 5px;
    background-color: #088178;
    color:#fff;
  }
</style>
