<template>
  <v-container
    fluid
    class="d-flex align-content-space-between flex-wrap pb-15"
  >
    <v-row class="pb-5">
      <v-card
        class="mx-auto mt-5"
        min-width="344"
        max-width="344"
        outlined
        color="amber lighten-1"
        v-for="(joke_item, ind) in favorite_jokes" :key="ind"
      >
        <v-list-item three-line min-width="344">
          <v-list-item-content>
            <v-list-item-title class="headline mb-2">
              <v-chip color="grey darken-3" class="white--text">{{ '№ ' + (ind+1) }}</v-chip>
            </v-list-item-title>
            <v-list-item-subtitle>{{ joke_item.value }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions class="justify-right">
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="openRemoveConfirm(joke_item.id, joke_item.value)">Delete</v-btn>
          <v-btn min-width="100" color="purple lighten-1" class="white--text" @click="openJokeContent(joke_item)">Read</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>

      <v-row justify="center">

        <v-dialog v-model="dialog" width="600px">
          <v-card>
            <v-card-title>
              <span class="headline"></span>
            </v-card-title>
            <v-card-text>
              {{ dialogContent }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" persistent max-width="400">
          <v-card color="red darken-1">
            <v-card-title class="headline white--text">Do you want to delete this joke?</v-card-title>
            <v-card-text class="yellow--text">{{ dialogContent }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="white--text" text @click="dialogDelete = false">CANCEL</v-btn>
              <v-btn depressed color="red lighten-1" class="white--text" @click="confirmDelete">DELETE</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        
      </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Favorites',
  computed: {
    ...mapGetters({
      favorite_jokes: 'jokes/favorite_jokes'
    })
  },
  data(){
    return {
      dialogDelete: false,
      dialog: false,
      dialogContent: '',
      removing_id: null
    }
  },
  methods: {
    openJokeContent(jokeData){
      this.dialogContent = jokeData.value
      this.dialog = true
    },
    openRemoveConfirm(id_joke, joke_value){
      this.dialogDelete = true
      this.removing_id = id_joke
      this.dialogContent = joke_value
    },
    confirmDelete(){
      this.$store.dispatch('jokes/REMOVE_FROM_FAVORITES', this.removing_id)
      this.dialogDelete = false
    }
  },
  mounted(){
    this.$store.dispatch('jokes/GET_FAVORITES')
  }
}
</script>