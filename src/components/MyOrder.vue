<template>
  <table>
    <thead>
      <tr class="total">
        <td><strong>Status:</strong></td>
        <td>{{ loopOrder.Status }}</td>
        <td>{{ getDate(loopOrder.Date) }} Ago</td>
        <td><strong>Total: N{{ getTotal() }}</strong></td>
        <td><button class="delete" v-if="loopOrder.Status === 'Delivered'" @click="Delete(loopOrder.id)">Delete</button></td>
      </tr>
    <tr>
      <th>Image</th>
      <th>Product</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Subtotal</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="(value, key, i) in loopOrder.cart" :key="i">
        <td><img :src="getImage(key)" alt=""/></td>
        <td>{{ getName(key) }}</td>
        <td>N {{ getPrice(key) }}</td>
        <td>{{value}}</td>
        <td>N {{ getPrice(key) * value }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'MyOrder',
  props: ['loopOrder'],
  data () {
    return {
      // remove: true,
      Order: [],
      seconds: '',
      interval: ''
    }
  },
  computed: {
    ...mapGetters(['product'])
  },
  methods: {
    // ...mapActions(['removeItem']),
    ...mapMutations(['updateCart', 'removeOrder']),
    getImage (id) {
      const fileImg = this.product.find((pro) => {
        return pro.id === parseInt(id)
      })
      return fileImg ? require('@/assets/image/products/' + fileImg.file) : ''
    },
    getName (id) {
      const fileImg = this.product.find((pro) => {
        return pro.id === parseInt(id)
      })
      return fileImg.name
    },
    getPrice (id) {
      const fileImg = this.product.find((pro) => {
        return pro.id === parseInt(id)
      })
      return fileImg.Price
    },
    getTotal () {
      const total = Object.entries(this.loopOrder.cart).reduce((acc, acct) => {
        return acc + (acct[1] * this.getPrice(acct[0]))
      }, 0)
      return total
    },
    getDate (time) {
      this.seconds = Math.floor((new Date() - new Date(time)) / 1000)
      this.interval = this.seconds / 31536000
      if (this.interval > 1) {
        return Math.floor(this.interval) + ' years'
      }
      this.interval = this.seconds / 2592000
      if (this.interval > 1) {
        return Math.floor(this.interval) + ' months'
      }
      this.interval = this.seconds / 86400
      if (this.interval > 1) {
        return Math.floor(this.interval) + ' days'
      }
      this.interval = this.seconds / 3600
      if (this.interval > 1) {
        return Math.floor(this.interval) + ' hours'
      }
      this.interval = this.seconds / 60
      if (this.interval > 1) {
        return Math.floor(this.interval) + ' minutes'
      }
      return Math.floor(this.seconds) + ' seconds'
    },
    Delete (id) {
      this.$store.state.order -= 1
      this.removeOrder(id)
    }
  }
}
</script>
<style scoped>
  table{
    width:100%;
    margin-bottom:10px;
    border-radius:10px;
    box-shadow: 0 0 128px 0 rgba(0,0,0,0.1),
              0 32px 64px -48px rgba(0,0,0,0.5);
    overflow:hidden;
  }
  .total td{
    padding-top: 0px;
    /* padding-block: 5px; */
    text-align: center;
    color: #fff;
    background-color: #088178;
  }
  .delete{
    padding: 5px 10px;
    border-radius: 3px;
    font-weight:600;
    border:none;
    outline: none;
  }
</style>
