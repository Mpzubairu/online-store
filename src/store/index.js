import { createStore } from 'vuex'
import product from './product.json'
import axios from 'axios'

export default createStore({
  state: {
    inventory: product.product,
    cart: {},
    order: 0,
    Admin: true,
    Order: [],
    AdminOrder: []
  },
  getters: {
    salad: (state) => state.inventory,
    shopping_cart: (state) => state.cart
  },
  mutations: {
    add: (state, id) => {
      if (!state.cart[id]) state.cart[id] = 0
      state.cart[id] += 1
    },
    removeItem: (state, id) => {
      delete (state.cart[id])
    },
    updateCart: (state, change) => {
      state.cart[change.id] = change.quantity
    },
    singleUpdateCart: (state, update) => {
      if (!state.cart[update.id]) state.cart[update.id] = 0
      state.cart[update.id] = update.quantity
    },
    removeOrder: (state, id) => {
      state.Order = state.Order.filter(orders => orders.id !== id)
    },
    editStatus: (state, Data) => {
      state.Order.filter(orders => {
        if (orders.id === Data.id) {
          orders.Status = Data.status
        }
        return true
      })
    },
    async fatchdata (state, id) {
      // url: http://localhost:300 0r  https://store-server-c1m1.onrender.com
      await axios.get(`https://store-server-c1m1.onrender.com/order/${id}`)
        .then((res) => {
          state.Order.push(res.data)
          // console.log(this.order)
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  actions: {
    addToCart ({ commit }, id) {
      commit('add', id)
    },
    removeItem ({ commit }, id) {
      commit('removeItem', id)
    },
    fetchOrder ({ commit }) {
      const looping = JSON.parse(localStorage.getItem('fruitBar'))
      if (looping) {
        looping.forEach((id) => {
          commit('fatchdata', id)
        })
      }
    }
  },
  modules: {
  }
})
