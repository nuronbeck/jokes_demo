import axios from '../../axios_instance' 
let timer_execution_time = 3    // seconds

export default {
    namespaced: true,
    state: {
        current_joke: [],
        favorite_jokes: [],
        is_loading: false,
        timer: null,
        timer_tick: null,
        timer_countdown_started: false,
        timer_countdown: timer_execution_time
    },
    actions: {
        GET_RANDOM_JOKE({ commit }){
            commit('CHANGE_LOADING', true)
            axios.get('/jokes/random').then((response) => {
                commit('CHANGE_JOKE', response.data)
                commit('CHANGE_LOADING', false)
            }).catch(() => {
                commit('CHANGE_JOKE', [])
                commit('CHANGE_LOADING', false)
            })
        },
        START_TIMER({ commit }){
            commit('TIMER_START')
        },
        STOP_TIMER({ commit }){
            commit('TIMER_STOP')
        },
        GET_FAVORITES({ commit }){
            if(localStorage.getItem('favorite_jokes') !== null && localStorage.getItem('favorite_jokes') !== 'undefined'){
                let savedJokes = JSON.parse(localStorage.getItem('favorite_jokes'))
                commit('FAVORITE_JOKES_LOAD', savedJokes)
            }else{
                commit('FAVORITE_JOKES_LOAD', [])
            }
        },
        ADD_TO_FAVORITE({ dispatch, state }){
            if(localStorage.getItem('favorite_jokes') !== null && localStorage.getItem('favorite_jokes') !== 'undefined'){

                let savedJokes = JSON.parse(localStorage.getItem('favorite_jokes'))

                if(savedJokes.length < 10){
                    localStorage.setItem('favorite_jokes', JSON.stringify([ ...savedJokes, state.current_joke ]))
                }else{
                    // cut all jokes item from first element of favorites array, except for [0] elem
                    let removedLast = savedJokes.slice(0, 9)
                    localStorage.setItem('favorite_jokes', JSON.stringify([ state.current_joke, ...removedLast ]))
                }
                
            }else{
                localStorage.setItem('favorite_jokes', JSON.stringify([ state.current_joke ]))
            }
            dispatch('GET_FAVORITES')
        },
        REMOVE_FROM_FAVORITES({ dispatch }, id_joke){
            if(localStorage.getItem('favorite_jokes') !== null && localStorage.getItem('favorite_jokes') !== 'undefined'){
                let savedJokes = JSON.parse(localStorage.getItem('favorite_jokes'))
                localStorage.setItem('favorite_jokes', JSON.stringify(savedJokes.filter(item => item.id != id_joke)))
                dispatch('GET_FAVORITES')
            }
        }
    },
    getters: {
        current_joke: (state) => state.current_joke,
        favorite_jokes: (state) => state.favorite_jokes,
        is_loading: (state) => state.is_loading,
        timer_countdown_started: (state) => state.timer_countdown_started,
        timer_countdown: (state) => state.timer_countdown,
        isJokeFavorite: (state) => {
            let isSet = state.favorite_jokes.map((joke) => {
                return joke.id == state.current_joke.id
            })

            return isSet.includes(true)
        }
    },
    mutations: {
        CHANGE_LOADING(state, loading_bool){
            state.is_loading = loading_bool
        },
        CHANGE_JOKE(state, joke_data){
            state.current_joke = joke_data
        },
        FAVORITE_JOKES_LOAD(state, favoriteJokes_data){
            state.favorite_jokes = favoriteJokes_data
        },
        TIMER_START(state){
            state.timer_countdown_started = true
            state.timer_tick = setInterval(() => {
                state.timer_countdown--
                if(state.timer_countdown == 0){
                    state.timer_countdown = timer_execution_time
                }
            }, 1000)
            
            state.timer = setInterval(() => {
                this.dispatch('jokes/GET_RANDOM_JOKE')
            }, timer_execution_time*1000);
        },
        TIMER_STOP(state){
            clearInterval(state.timer)
            clearInterval(state.timer_tick)
            state.timer,  state.timer_tick = null
            state.timer_countdown_started = false
            state.timer_countdown = timer_execution_time
        }
    }
}