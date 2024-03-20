<template>
  <section id="prodetails" class="section-p1">
    <div class="single-pro-image">
      <img :src="require(`@/assets/image/products/${product.file}`)" width="100%" id="MainImg" alt=""/>
      <div class="small-img-group">
        <div class="small-img-col">
          <img :src="require(`@/assets/image/products/${product.file}`)" width="100%" class="small-img" alt=""/>
        </div>
        <div class="small-img-col">
          <img :src="require(`@/assets/image/products/${product.file}`)" width="100%" class="small-img" alt=""/>
        </div>
        <div class="small-img-col">
          <img :src="require(`@/assets/image/products/${product.file}`)" width="100%" class="small-img" alt=""/>
        </div>
        <div class="small-img-col">
          <img :src="require(`@/assets/image/products/${product.file}`)" width="100%" class="small-img" alt=""/>
        </div>
      </div>
    </div>
    <div class="single-pro-details">
      <h6>Home / {{ product.name }}</h6>
      <h4>{{product.name }}</h4>
      <h2>N {{product.Price}}</h2>
      <select>
        <option>Select Size</option>
        <option>XL</option>
        <option>XXL</option>
        <option>Small</option>
        <option>Large</option>
      </select>
      <input type="number" v-model="quantity" @change="update()"/>
      <button class="normal" @click="addToCart(product.id)">Add To Cart</button>
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
      <ProductView v-for="items in salad.slice(0,4)"
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
      product: {}
    }
  },
  methods: {
    ...mapActions(['addToCart']),
    ...mapMutations(['singleUpdateCart']),
    update () {
      const change = {
        id: this.product.id,
        quantity: this.quantity
      }
      this.singleUpdateCart(change)
    }
  },
  computed: {
    ...mapGetters(['salad'])
  },
  created () {
    const val = this.$route.params.id
    const fillter = this.salad.find((element) => {
      return element.id === parseInt(val)
    })
    this.product = fillter
  },
  watch: {
    id (newid) {
      // const selected = this.salad.filter((element) => {
      //   return element.id === parseInt(newid)
      // })
      // console.log(selected)
      // this.product = selected
      // console.log(this.product)
    }
  }
}
</script>
