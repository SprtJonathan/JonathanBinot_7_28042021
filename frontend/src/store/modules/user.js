import { createStore } from 'vuex'
import axios from "axios";

let apiPort = "3000";
let apiUrl = "http://localhost:" + apiPort + "/api/";

let instance = axios.create({ baseURL: apiUrl });

let user = localStorage.getItem('user');
if (!user) {
    user = {
        userId: -1,
        token: '',
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

const userStore = createStore({
    state: {
        user: user,
        userProfile: {},
    },

    mutations: {
        USER_PROFILE: function (state, userProfile) {
            state.userProfile = userProfile;
        }
    },


    actions: {
        getUserProfile: ({ commit }, userProfile) => {
            instance.get(`users/${userProfile.userProfile}`)
                .then(function (response) {
                    commit('USER_PROFILE', response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
})

export default userStore;