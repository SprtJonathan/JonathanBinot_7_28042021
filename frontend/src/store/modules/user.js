import axios from 'axios';

let apiPort = "3000";
let apiUrl = "http://localhost:" + apiPort + "/api/";

let instance = axios.create({
    baseURL: apiUrl,
});

let user = localStorage.getItem('user');
let token = localStorage.getItem('token')
if (!user) {
    user = {
        userId: "",
        token: "",
    };
} else {
    try {
        user = JSON.parse(user);
        instance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
    } catch (ex) {
        user = {
            userId: -1,
            token: '',
        };
    }
}

const userStore = {
    namespaced: true,
    state: {
        token: localStorage.getItem('token') || '',
        user: JSON.parse(localStorage.getItem("user")) || {
            userId: '',
            username: '',
            fname: '',
            lname: '',
            email: '',
            profilePictureUrl: '',
            roleId: '',
            createdOn: '',
            lastUpdated: ''
        }
    },
    actions: {
        logout({ commit }) {
            commit('LOGOUT')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            delete axios.defaults.headers.common['Authorization']
        }
    },
    mutations: {
        LOGOUT(state) {
            state.token = ''
        },
    },
    getters: {
        isUserConnected: state => !!state.token,
    }
}

export default userStore