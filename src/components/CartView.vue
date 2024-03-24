<template>
  <tr>
    <td><button @click="removeItem(productId)"><i class="fa fa-times"></i></button></td>
    <td><img :src="getImage(productId)" alt=""/></td>
    <td>{{ getName(productId) }}</td>
    <td>N {{ getPrice(productId) }}</td>
    <td><input  type="number" min="0" v-model.number="quantity" @change.prevent="update()"/></td>
    <td>N {{ getAmount() }}</td>
  </tr>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'CartView',
  props: ['productId', 'howMany'],
  data () {
    return {
      quantity: 0
    }
  },
  methods: {
    ...mapActions(['removeItem']),
    ...mapMutations(['updateCart']),
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
    getAmount () {
      return this.getPrice(this.productId) * this.howMany
    },
    update () {
      const change = {
        id: this.productId,
        quantity: this.quantity
      }
      this.updateCart(change)
    }
  },
  computed: {
    ...mapGetters(['product', 'shopping_cart'])
  },
  created () {
    this.quantity = this.howMany
  }
}
</script>
