<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      color="amber"
    >
      <v-icon large>mdi-emoticon-cool-outline</v-icon>
      <span class="title ml-3 mr-5">Chuck's&nbsp;<span class="font-weight-light">Jokes</span></span>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-bottom-navigation
      grow
      fixed
      color="amber"
      dark
      :horizontal="!isMobile"
    >
      <v-btn to='/'>
        <span>Jokes</span>
        <v-icon>mdi-emoticon-tongue</v-icon>
      </v-btn>

      <v-btn to='/favorites'>
        <span>Favorites</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn to="/about">
        <span>About</span>
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    this.$store.dispatch('jokes/GET_RANDOM_JOKE')
    this.$store.dispatch('jokes/GET_FAVORITES')
  },
  computed: {
    isMobile(){
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
      }
      return false
    }
  },
  methods: {

  }
};
</script>
