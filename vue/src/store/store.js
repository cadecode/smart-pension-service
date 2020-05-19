import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
    state: {
        type: '',
        email: '',
        name: '',
        avatar: '',
        token: '',
        flag: false
    }
})

export default store