<template>
  <section id="page-header" class="about-header">
  <div class="blend-mode">
    <h2>Shopping Cart</h2>
  </div>
  </section>
  <section id="status" class="section-p1">
    <div class="status">
      <h3>Status: Pending</h3>
    </div>
  </section>
  <section id="cart" class="section-p1">
    <table width="100%">
      <thead>
        <tr>
          <td>Remove</td>
          <td>Image</td>
          <td>Product</td>
          <td>Price</td>
          <td>Quantity</td>
          <td>Subtotal</td>
        </tr>
      </thead>
      <tbody>
        <cartview v-for="(value, key, index) in shopping_cart"
        :key="index"
        :productId="key"
        :howMany="value"/>
      </tbody>
    </table>
  </section>
  <section id="cart-add" class="section-p1">
    <div id="subtotal">
      <h3>Cart Totals</h3>
        <table>
          <tr>
            <td>Cart Subtotal</td>
            <td>N {{ getTotal() }}</td>
          </tr>
          <tr>
            <td>Delivery</td>
            <td>No Delivery</td>
          </tr>
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>N {{ getTotal() }}</strong></td>
          </tr>
        </table>
      <button class="normal" @click="handleform()">Proceed to Booking</button>
    </div>
  </section>
  <section id="form" v-if="formShow">
    <div class="body">
      <div class="form">
        <h1>Place an Order</h1>
        <form action="post" autocomplete="off" @submit.prevent="placeOrder()">
          <div class="txt_field">
            <input type="text" name="name"  v-model="name" required>
            <span></span>
            <label for="username">Name</label>
          </div>
          <div class="txt_field">
            <input type="tel" name="phone"  v-model.number="phone" required>
            <span></span>
            <label for="phone-no">Phone</label>
          </div>
          <!-- <a class="forget" href="#">Forget Password</a> -->
          <input type="submit" value="Submit">
          <div class="signup_link">
            Not Interested? <router-link to="#" @click="handleform()">Cancel</router-link>
          </div>
        </form>
      </div>
    </div>
  </section>
  <footerview/>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import footerview from '@/components/FooterView.vue'
import cartview from '@/components/CartView.vue'
export default {
  name: 'ShoppingCart',
  components: {
    cartview,
    footerview
  },
  data () {
    return {
      formShow: false,
      name: '',
      phone: ''
    }
  },
  methods: {
    // ...mapMutations(['modifyCart'])
    getPrice (id) {
      const product = this.salad.find((pro) => {
        return pro.id === parseInt(id)
      })
      return product.Price
    },
    getTotal () {
      const total = Object.entries(this.shopping_cart).reduce((acc, acct) => {
        return acc + (acct[1] * this.getPrice(acct[0]))
      }, 0)
      return total
    },
    handleform () {
      this.formShow = !this.formShow
    },
    async handleOrder (data) {
      // url: http://localhost:300 0r  https://store-server-c1m1.onrender.com
      await axios.post('https://store-server-c1m1.onrender.com/order', data)
        .then((res) => {
          if (res.status === 201) {
            this.$store.state.order += 1
            this.formShow = !this.formShow
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    placeOrder () {
      const uniqueId = Math.random().toString(36).substring(2)
      // console.log(uniqueId)
      const Data = {
        id: uniqueId,
        Name: this.name,
        Phone: this.phone,
        Status: 'Pending',
        Amount: this.getTotal(),
        Date: new Date(),
        cart: this.shopping_cart
      }
      const localStore = [uniqueId]
      if (Object.values(this.shopping_cart).length <= 0) {
        alert('Your Shopping Cart is Empty')
      } else {
        this.handleOrder(Data)
        this.$store.state.Order.push(Data)
        if (localStorage.getItem('fruitBar')) {
          const fetchStore = JSON.parse(localStorage.getItem('fruitBar'))
          fetchStore.push(uniqueId)
          const newStore = JSON.stringify(fetchStore)
          localStorage.setItem('fruitBar', newStore)
          // push to database
          // this.handleOrder(Data)
          // this.$store.state.Order.push(Data)
        } else {
        // New order
          const deploy = JSON.stringify(localStore)
          localStorage.setItem('fruitBar', deploy)
        // push to database
        // this.handleOrder(Data)
        // this.$store.state.Order.push(Data)
        }
      }
    }
  },
  computed: {
    ...mapGetters(['salad', 'shopping_cart'])
  }
}
</script>
