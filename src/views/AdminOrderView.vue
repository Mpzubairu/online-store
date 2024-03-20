<template>
  <section id="admin">
    <div class="admin-content">
      <div class="revenue">
        <div class="dash">
          <div class="top">
            <h2>{{ countOrder }}</h2>
            <h6>Order</h6>
            <i class="fa fa-arrow-up green"></i>
            </div>
          <p>Total Order</p>
        </div>
        <div class="dash">
          <div class="top">
              <h2>{{ countPending }}</h2>
              <h4 class="red">+{{ percentagePending }}%</h4>
              <i class="fa fa-arrow-up red"></i>
          </div>
          <p>Pending Order</p>
        </div>
        <div class="dash">
          <div class="top">
            <h2>{{ countCompleted }}</h2>
            <h4 class="green">+{{ percentageCompleted }}%</h4>
            <i class="fa fa-arrow-up green"></i>
          </div>
          <p>Completed Order</p>
        </div>
        <div class="dash">
          <div class="top">
            <h2>{{ countDelivered}}</h2>
            <h4 class="green">+{{ percentageDelivered }}%</h4>
            <i class="fa fa-arrow-up green"></i>
          </div>
          <p>Delieverd Order</p>
        </div>
      </div>
      <div class="transaction">
        <div class="details">
          <h3> Potential Revenue</h3>
          <span>
            <h1>N {{ Total }}</h1>
            <p>+0%</p>
          </span>
          <p>100% Estimate if Order are delivered</p>
          <i class="fab fa-codepen blue"></i>
        </div>
        <div class="details">
          <h3>Pending Sales</h3>
          <span>
            <h1>N {{ Pending }}</h1>
            <p>+{{ calculatePending }}%</p>
          </span>
          <p>{{ calculatePending }}% Calculated Pending Sales</p>
          <i class="fa fa-wallet red"></i>
        </div>
        <div class="details">
          <h3>Revenue Generated </h3>
          <span>
            <h1>N {{ Delivered }}</h1>
            <p>+{{ calculateDelivered }}%</p>
          </span>
          <p>{{ calculateDelivered }}% Calculted Delivered Order</p>
          <i class="fa fa-desktop green"></i>
        </div>
      </div>
      <div class="warpper">
        <div class="order_header">
          <h4>Orders Processed</h4>
          <form action="#">
            <input type="text" placeholder="Name" id="filter">
            <input type="submit" value="find" class="filter-submit">
          </form>
        </div>
        <div class="order">
          <table>
            <thead>
              <th> Id </th>
              <th> Name </th>
              <th> Phone No </th>
              <th> Order Date </th>
              <th> Status </th>
              <th> Amount </th>
            </thead>
            <tbody>
              <tr v-for="items in $store.state.AdminOrder" :key='items.id' @click="preview(items.id)">
                <td> {{ items.id }}</td>
                <td> {{ items.Name }}</td>
                <td> {{ items.Phone }}</td>
                <td> {{ getDate(items.Date) }} </td>
                <td>
                  <button :class="items.Status">{{ items.Status }}</button>
                </td>
                <td> <strong> N {{ items.Amount }} </strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      seconds: '',
      interval: '',
      Total: 0,
      Pending: 0,
      Delivered: 0
    }
  },
  computed: {
    countOrder () {
      const num = this.$store.state.AdminOrder.length
      return num
    },
    countPending () {
      const num = this.$store.state.AdminOrder.filter(fig => fig.Status !== 'Delivered')
      return num.length
    },
    countCompleted () {
      const num = this.$store.state.AdminOrder.filter(fig => {
        return fig.Status === 'Completed'
      })
      return num.length
    },
    countDelivered () {
      const num = this.$store.state.AdminOrder.filter(fig => fig.Status === 'Delivered')
      return num.length
    },
    percentagePending () {
      const calc = (this.countPending / this.countOrder) * 100
      return this.countPending === 0 ? 0 : calc.toFixed(1)
      // return calc.toFixed(1)
    },
    percentageCompleted () {
      const calc = (this.countCompleted / this.countOrder) * 100
      return this.countCompleted === 0 ? 0 : calc.toFixed(1)
    },
    percentageDelivered () {
      const calc = (this.countDelivered / this.countOrder) * 100
      return this.countDelivered === 0 ? 0 : calc.toFixed(1)
    },
    calculatePending () {
      const calc = (this.Pending / this.Total) * 100
      return this.Pending === 0 ? 0 : calc.toFixed(1)
    },
    calculateDelivered () {
      const calc = (this.Delivered / this.Total) * 100
      return this.Delivered === 0 ? 0 : calc.toFixed(1)
    }
  },
  methods: {
    preview (id) {
      this.$router.push(`/admin/preview/${id}`)
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
    getPrice (id) {
      const product = this.$store.state.inventory.find((pro) => {
        return pro.id === parseInt(id)
      })
      return product.Price
    },
    getAmout (cart) {
      const total = Object.entries(cart).reduce((acc, acct) => {
        return acc + (acct[1] * this.getPrice(acct[0]))
      }, 0)
      this.Total += total
    },
    getPending (cart) {
      const total = Object.entries(cart).reduce((acc, acct) => {
        return acc + (acct[1] * this.getPrice(acct[0]))
      }, 0)
      this.Pending += total
    },
    getDelivered (cart) {
      const total = Object.entries(cart).reduce((acc, acct) => {
        return acc + (acct[1] * this.getPrice(acct[0]))
      }, 0)
      this.Delivered += total
    }
  },
  async beforeCreate () {
    // url: http://localhost:3000 0r  https://store-server-c1m1.onrender.com/order
    await axios.get('https://store-server-c1m1.onrender.com/order')
      .then((res) => {
        this.$store.state.AdminOrder = res.data
      }).catch((err) => {
        console.log(err)
      })
    for (const item of this.$store.state.AdminOrder) {
      this.getAmout(item.cart)
    }
    for (const item of this.$store.state.AdminOrder) {
      if (item.Status !== 'Delivered') {
        this.getPending(item.cart)
      }
    }
    for (const item of this.$store.state.AdminOrder) {
      if (item.Status === 'Delivered') {
        this.getDelivered(item.cart)
      }
    }
  }
}
</script>
