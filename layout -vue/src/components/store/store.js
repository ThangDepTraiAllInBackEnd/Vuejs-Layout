import { createStore } from 'vuex'

// Create a new store instance.
export const store = createStore({
    state() {
        return {
            isShowForm: false
        }
    },
    mutations: {
        increment(state) {
            state.isShowForm = true;
        }
    }
})