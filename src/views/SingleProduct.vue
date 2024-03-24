<template>
  <section id="prodetails" class="section-p1">
    <div class="single-pro-image">
      <img :src="require(`@/assets/image/products/${Product.file}`)" width="100%" id="MainImg" alt=""/>
      <div class="small-img-group">
        <div class="small-img-col">
          <img :src="require(`@/assets/image/products/${Product.file}`)" width="100%" class="small-img" alt=""/>
        </div>
        <div class="small-img-col">
          <img :src="require(`@/assets/image/products/${Product.file}`)" width="100%" class="small-img" alt=""/>
        </div>
        <div class="small-img-col">
          <img :src="require(`@/assets/image/products/${Product.file}`)" width="100%" class="small-img" alt=""/>
        </div>
        <div class="small-img-col">
          <img :src="require(`@/assets/image/products/${Product.file}`)" width="100%" class="small-img" alt=""/>
        </div>
      </div>
    </div>
    <div class="single-pro-details">
      <h6>Home / {{ Product.name }}</h6>
      <h4>{{Product.name }}</h4>
      <h2>N {{Product.Price}}</h2>
      <select>
        <option>Select Size</option>
        <option>XL</option>
        <option>XXL</option>
        <option>Small</option>
        <option>Large</option>
      </select>
      <input type="number" v-model="quantity" @change="update()"/>
      <button class="normal" @click="addToCart(Product.id)">Add To Cart</button>
      <h3>Product Details</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Impedit voluptate assumenda animi facere qui consequuntur dignissimos
        rem dolorum voluptates maxime excepturi alias asperiores quos repellendus et reru
        accusantium ex ipsum placeat ipsam earum magni, mollitia eligendi. Nulla, ea modi fugiat
        itaque id quia aliquam ab qui aspernatur culpa placeat cupiditate cum laboriosam impedit
        magnam sed corrupti dolorem.
      </p>
    </div>
  </section>
  <section id="product1" class="section-p1">
    <h2>More Products</h2>
    <p>Summer Collection New Morden Design</p>
    <div class="pro-container">
      <ProductView v-for="items in product.slice(0,4)"
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
import { mapGetters, mapActions, mapMutations } from 'vuex'
import footerview from '@/components/FooterView.vue'
import ProductView from '@/components/ProductView.vue'
export default {
  components: {
    ProductView,
    footerview
  },
  data () {
    return {
      quantity: 0,
      Product: {}
    }
  },
  methods: {
    ...mapActions(['addToCart']),
    ...mapMutations(['singleUpdateCart']),
    update () {
      const change = {
        id: this.Product.id,
        quantity: this.quantity
      }
      this.singleUpdateCart(change)
    }
  },
  computed: {
    ...mapGetters(['product'])
  },
  created () {
    const val = this.$route.params.id
    const fillter = this.product.find((element) => {
      return element.id === parseInt(val)
    })
    this.Product = fillter
  }
}
</script>
