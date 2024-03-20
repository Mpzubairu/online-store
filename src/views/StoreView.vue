<template>
  <section id="page-header">
      <h2>#stayhome</h2>
      <p>Save more with coupons & up to 70% off! </p>
   </section>
  <section id="product1" class="section-p1">
    <div class="pro-container">
      <ProductView v-for="items in salad"
        :key="items.id"
        :productID="items.id"
        :productName="items.name"
        :imageName="items.file"
        :price="items.Price"/>
    </div>
  </section>
  <footerview/>
</template>
<script>
// import product from '../product.json'
import { mapGetters } from 'vuex'
import ProductView from '@/components/ProductView.vue'
import footerview from '@/components/FooterView.vue'
export default {
  name: 'StoreView',
  components: {
    ProductView,
    footerview
  },
  data () {
    return {
      // inventory: product.product
    }
  },
  computed: {
    ...mapGetters(['salad'])
  },
  created () {
    // console.log(this.inventory)
  }
}
</script>
