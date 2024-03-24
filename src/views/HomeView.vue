<template>
  <section id="hero">
        <div class="hero_details">
            <h4>Trade-in-offer</h4>
            <h2>Super value deals</h2>
            <h1>On all products</h1>
            <!-- <p>Save more with coupons & up to 70% off! </p> -->
            <router-link to="/shop">Shop Now</router-link>
        </div>
    </section>

    <section id="feature" class="section-p1">
        <div class="fe-box">
            <img src="../assets/image/features/f2.png" alt="">
            <h6>Online Order</h6>
        </div>
        <div class="fe-box">
            <img src="../assets/image/features/f3.png" alt="">
            <h6>Save Money</h6>
        </div>
        <div class="fe-box">
            <img src="../assets/image/features/f4.png" alt="">
            <h6>Promotions</h6>
        </div>
        <div class="fe-box">
            <img src="../assets/image/features/f5.png" alt="">
            <h6>Happy Sell</h6>
        </div>
        <div class="fe-box">
            <img src="../assets/image/features/f6.png" alt="">
            <h6>F24/7 Support</h6>
        </div>
    </section>

    <section id="product1" class="section-p1">
        <h2>Featured products</h2>
        <p>Summer Collection New Morden Design</p>
        <div class="pro-container">
           <!-- products loop -->
           <ProductView v-for="items in product.slice(0,8)"
            :key="items.id"
            :productID="items.id"
            :productName="items.name"
            :imageName="items.file"
            :price="items.Price"/>
        </div>
    </section>

    <section id="banner" class="section-m1">
        <h4>Repair Services</h4>
        <h2>Up to <span>70% Off</span> - All t-shirts & Accessories</h2>
        <button class="normal">Explore More</button>
    </section>

    <section id="product1" class="section-p1">
        <h2>New Arrivals</h2>
        <p>Summer Collection New Morden Design</p>
        <div class="pro-container">
           <ProductView v-for="items in product.slice(15, 23)"
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
import footerview from '@/components/FooterView.vue'
import { mapGetters } from 'vuex'
import ProductView from '@/components/ProductView.vue'
export default {
  name: 'HomeView',
  components: {
    ProductView,
    footerview
  },
  data () {
    return {
    //   inventory: product.product
    }
  },
  computed: {
    ...mapGetters(['product'])
  },
  created () {
    // console.log(this.inventory)
  }
}
</script>
