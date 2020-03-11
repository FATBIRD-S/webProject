import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import api from '../assets/config/api.js'
import axios from 'axios'

export default new Vuex.Store({
    state: {
        cartTotal: {
            goodsCount: 0,
            goodsAmount: 0,
            checkedGoodsCount: 0,
            checkedGoodsAmount: 0
        },
        cartList: [],
        cateGoryIndex: 0
    },
    mutations: {
        setCartList: function(state, cartList) {
            state.cartList = cartList
        },
        setCartTotal:function(state, cartTotal) {
            state.cartTotal = cartTotal
        },
        setCateGoryIndex: function(state, index) {
            state.cateGoryIndex = index
            // console.log(state.cateGoryIndex)
        }
    },
    actions: {
        AjaxCart:async function(content){
              let cartRes = await axios.get(api.CartList)
              // console.log(cartRes.data)
              content.commit('setCartList',cartRes.data.data.cartList)
              content.commit('setCartTotal',cartRes.data.data.cartTotal)
        }
    },
    modules: {}
})
