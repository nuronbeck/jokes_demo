<template>
  <v-container
    fluid
    class="text-center"
  >
    <v-row no-gutters class="pt-3 jokes__content" :style="{ height: '90vh' }">
      <v-col
        col="12" lg="12" md="12" sm="12" xs="12"
        :style="{ height: '40vh' }"
      >
        <v-card
          class="mx-auto"
          color="amber"
          
          max-width="400"
        >
          <v-card-title>
            <v-icon
              large
              left
            >
              mdi-comment-quote
            </v-icon>
            <span class="title font-weight-light">Chuck's random joke</span>
            <v-spacer>
            </v-spacer>
            <span class="font-weight-light">{{ timer_countdown_started !== false ? timer_countdown : '' }}</span>
          </v-card-title>

          <v-card-text class="font-weight-bold">
            {{ current_joke.hasOwnProperty('value') ? current_joke.value : 'A door to door salesman interrupted Chuck Norris during his steak dinner. Chuck punched him in the brain.'}}
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3" rounded="0">
                <v-img
                  class="elevation-6"
                  :src="current_joke.hasOwnProperty('icon_url') ? current_joke.icon_url : 'https://assets.chucknorris.host/img/avatar/chuck-norris.png'"
                ></v-img>
              </v-list-item-avatar>

              <v-btn :href="current_joke ? current_joke.url : '/jokes'" icon color="light-blue">
                <v-icon medium>mdi-link-variant</v-icon>
              </v-btn>
                
              <v-row
                align="center"
                justify="end"
              >
                <v-btn icon :color="isJokeFavorite ? 'red' : 'white'"
                  @click="addMyFavorite"
                >
                   <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col col="12" lg="12" md="12" sm="12" xs="12" class="text-center btn_actions">
          <div class="pt-5">
            <v-btn
            outlined
            min-width="300"
            max-width="350"
            class="mt-1"
            :loading="is_loading"
            :disabled="timer_countdown_started"
            color="purple"
            dark
            @click="getJoke"
          >
            <v-icon left>mdi-message-text</v-icon> Get a joke
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>cached</v-icon>
              </span>
            </template>
          </v-btn>
          </div>
          <div>
            <v-btn
            min-width="300"
            max-width="350"
            class="mt-1"
            :loading="is_loading && timer_countdown_started"
            :color="!timer_countdown_started ? 'purple' : 'red'"
            dark
            @click="getJokeAuto"
          >
            <v-icon left>mdi-message-text-clock</v-icon> {{ timer_countdown_started ? 'Stop interval' : 'Jokes with interval'}}
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>cached</v-icon>
              </span>
            </template>
          </v-btn>
          </div>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Jokes',
  computed: {
    ...mapGetters({
      is_loading: 'jokes/is_loading',
      timer_countdown_started: 'jokes/timer_countdown_started',
      timer_countdown: 'jokes/timer_countdown',
      current_joke: 'jokes/current_joke',
      isJokeFavorite: 'jokes/isJokeFavorite'
    })
  },
  data(){
    return {
    }
  },
  methods: {
    getJoke(){
      this.$store.dispatch('jokes/GET_RANDOM_JOKE')
    },
    getJokeAuto(){
      if(!this.timer_countdown_started){
        this.$store.dispatch('jokes/START_TIMER')
      }else{
        this.$store.dispatch('jokes/STOP_TIMER')
      }
    },
    addMyFavorite(){
      if(!this.isJokeFavorite){
        this.$store.dispatch('jokes/ADD_TO_FAVORITE')
      }else{
        this.$store.dispatch('jokes/REMOVE_FROM_FAVORITES', this.current_joke.id)
      }
    }
  }
}
</script>

<style scoped>
.jokes__content .btn_actions{
  padding-top: 13vh;
}
@media screen and (min-width: 492px) and (max-width: 599px) {
  .jokes__content{
    flex-direction: column;
  }
  .jokes__content .btn_actions{
    padding-top: 25vh;
  }
}

.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
