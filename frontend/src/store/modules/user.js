import axios from 'axios';

let apiPort = "3000";
let apiUrl = "http://localhost:" + apiPort + "/api/";

let instance = axios.create({
    baseURL: apiUrl,
});

let user = localStorage.getItem('user');
if (!user) {
    user = {
        userId: "",
        token: "",
    };
} else {
    try {
        user = JSON.parse(user);
        instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
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
        status: '',
        token: localStorage.getItem('token') || '',
        user: JSON.parse(localStorage.getItem('user')) || {
            userId: '',
            nom: '',
            prenom: '',
            isAdmin: ''
        }
    },
    actions: {
        logout({ commit }) {
            commit('LOGOUT')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('status')
            delete axios.defaults.headers.common['Authorization']
        }
    },
    mutations: {
        AUTH_REQUEST(state) {
            state.status = 'loading'
        },
        AUTH_SUCCESS(state, payload) {
            state.status = 'success'
            state.token = payload.token
            state.user = payload.user
        },
        AUTH_ERROR(state) {
            state.status = 'error'
        },
        LOGOUT(state) {
            state.status = ''
            state.token = ''
        },
    },
    getters: {
        isUserConnected: state => !!state.token,
        authStatus: state => state.status,
    }
}

export default userStore