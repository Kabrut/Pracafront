import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)



export default new Vuex.Store({
    state: {
        status: '',
        token: sessionStorage.getItem('token') || '',
        user : {}
    },
    mutations: {

            auth_request(state){
                state.status = 'loading'
            },
            auth_success(state, {token,user}){
                state.status = 'success',
                state.token = token,
                state.user = user
            },
            auth_error(state){
                state.status = 'error'
            },
            logout(state){
                state.status = ''
                state.token = ''
                state.user= ''
            },


    },
    actions: {
        login({commit}, params){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: 'http://localhost:3309/login', data: params, method: 'POST' })
                    .then(resp => {
                        const token = resp.data.token
                        const user = resp.data.user

                        sessionStorage.setItem('token', token)
                        sessionStorage.setItem('login', user.mail)
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success',{token,user})
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        sessionStorage.removeItem('token')
                        reject(err)
                    })
            })
        },


    register({commit}, user){
        return new Promise((resolve, reject) => {
            commit('auth_request')
            axios({url: 'http://localhost:3309/register', data: user, method: 'POST' })
                .then(resp => {
                    const token = resp.data.token
                    const user = resp.data.user
                    sessionStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = token
                    commit('auth_success', token, user)
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error', err)
                    sessionStorage.removeItem('token')
                    reject(err)
                })
        })
    },
    logout({commit}){
        return new Promise((resolve, reject) => {
            commit('logout')
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('login')
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    },
    },
    getters : {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    },

})