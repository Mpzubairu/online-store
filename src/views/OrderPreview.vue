<template>
  <section id="admin-header" class="about-header">
    <img src="../assets/image/b3.jpg" alt=""/>
    <div class="blend-mode">
      <h2>Admin Order View</h2>
    </div>
  </section>
  <section id="status" class="section-p1">
    <div class="status">
      <h4>Status: {{ selected }}</h4>
      <div class="dropdown">
        <div class="select" @click="handleDropdown()">
          <div class="caret"></div>
          <span class="selected">{{ selected }}</span>
        </div>
        <ul class="menu" :class="dropdown === true?'menu-open':''">
          <li @click="select('Comfirmed')">Comfirmed</li>
          <li @click="select('Processing')">Processing</li>
          <li @click="select('Completed')">Completed</li>
          <li @click="select('Delivered')">Delivered</li>
        </ul>
      </div>
    </div>
  </section>
  <section id="cart" class="section-p1">
    <table width="100%">
      <thead>
        <tr>
          <td>Image</td>
          <td>Product</td>
          <td>Price</td>
          <td>Quantity</td>
          <td>Subtotal</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key, i) in preview" :key="i">
          <td><img :src="getImage(key)" alt=""/></td>
          <td>{{ getName(key) }}</td>
          <td>N {{ getPrice(key) }}</td>
          <td>{{value}}</td>
          <td>N {{ getPrice(key) * value }}</td>
      </tr>
      </tbody>
    </table>
  </section>
  <section id="cart-add" class="section-p1">
      <div id="subtotal">
        <h3>Cart Totals</h3>
          <table>
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>N {{ getTotal() }}</strong></td>
            </tr>
          </table>
          <button class="normal" @click="back()">Back</button>
      </div>
  </section>
</template>
<script>
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'PreviewCart',
  data () {
    return {
      dropdown: false,
      selected: 'Pending',
      preview: {}
    }
  },
  methods: {
    ...mapMutations(['editStatus']),
    getImage (id) {
      const fileImg = this.salad.find((pro) => {
        return pro.id === parseInt(id)
      })
      return fileImg ? require('@/assets/image/products/' + fileImg.file) : ''
    },
    getName (id) {
      const fileImg = this.salad.find((pro) => {
        return pro.id === parseInt(id)
      })
      return fileImg.name
    },
    getPrice (id) {
      const product = this.salad.find((pro) => {
        return pro.id === parseInt(id)
      })
      return product.Price
    },
    getTotal () {
      const total = Object.entries(this.preview).reduce((acc, acct) => {
        return acc + (acct[1] * this.getPrice(acct[0]))
      }, 0)
      return total
    },
    back () {
      this.$router.push('/admin')
    },
    handleDropdown () {
      this.dropdown = !this.dropdown
    },
    select (option) {
      const val = this.$route.params.id
      this.selected = option
      this.dropdown = !this.dropdown
      const Data = {
        id: val,
        status: option
      }
      this.editStatus(Data)
      // url: http://localhost:300 0r  https://store-server-c1m1.onrender.com
      axios.patch(`https://store-server-c1m1.onrender.com/order/${val}`, { Status: option })
        .then(() => {
          return true
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapGetters(['salad'])
  },
  created () {
    const val = this.$route.params.id
    // console.log(val)
    const collect = this.$store.state.AdminOrder.find((element) => {
      return element.id === val
    })
    if (collect) {
      this.preview = collect.cart
      this.selected = collect.Status
    }
  }
}
</script>
