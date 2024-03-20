<template>
  <div class="pro">
    <router-link :to="`/preview/${productID}`">
      <img :src="require(`@/assets/image/products/${imageName}`)" :alt="`portrait ${productName}`"/>
    </router-link>
    <div class="des">
      <!-- <span>Salad</span> -->
      <h5>{{productName}}</h5>
      <div class="star">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
      </div>
      <h4>N {{price}}</h4>
    </div>
    <button @click="addToCart(productID)"><i class="fa fa-shopping-cart cart"></i></button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'ProductView',
  props: ['productID', 'productName', 'imageName', 'price'],
  data () {
    return {

    }
  },
  methods: {
    ...mapActions(['addToCart'])
  }
}
</script>
