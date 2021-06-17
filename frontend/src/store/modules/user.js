import axios from 'axios';

let apiUrl = `http://localhost:3000/api/`

let instance = axios.create({
    baseURL: apiUrl,
});

let user = localStorage.getItem('user');
let token = localStorage.getItem('token') // Sauvegarde du token pour l'utilisation sur le site
if (!user) {
    user = { // Si aucun user n'est connecté alors on laisse l'userId enregistré et le token vide pour éviter les erreurs
        userId: "",
        token: "",
    };
} else {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
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
        logout({ commit }) { // Déconnexion de l'utilisateur
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
        isUserConnected: state => !!state.token, // L'utilisateur est considéré comme connecté si son token n'est pas nul
    }
}

export default userStore