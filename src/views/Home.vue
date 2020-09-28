<template>
  <b-container>
    <b-jumbotron class="clair-jumbotron" bg-variant="primary" text-variant="white">
      <template v-slot:header>
        <div class="clearfix">
          <img class="float-right mx-4" src="@/assets/clair-logo-white.svg" width="150px"/>
          Clair Berlin e.V.
        </div>
      </template>
      <template v-slot:lead>
        Die&nbsp;Luft&nbsp;ist&nbsp;rein, hier&nbsp;geh&nbsp;ich&nbsp;rein.
      </template>
      <hr class="my-4">
      <p>
        Clair ist eine gemeinnützige Initiative zur Messung der Luftqualität in
        öffentlichen Räumen. Die Messdaten aller teilnehmenden Betriebe sind
        jederzeit öffentlich einsehbar. Erfahren Sie bald mehr...
      </p>
    </b-jumbotron>
    <b-card class="my-5">
      <b-row aligh-v="center">
        <b-col cols="12" md="9">
          <p class="text-secondary">
            Für <b>Besucher*innen</b> von öffentlichen Räumen
          </p>
          <p>
            Vertrauen Sie dem Clair-Label und planen Sie Ihren Besuch in dem
            Restaurant, in dem Café oder in der Tagungsräumlichkeit, wo
            nachgewiesenermaßen ein und Lüftungskonzept umgesetzt wird.
          </p>
          <p>
            Bald mehr...
          </p>
        </b-col>
        <b-col cold="12" md="3" class="my-auto">
          <div class="h1 text-center">
            <GlassCocktailIcon/>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <b-card class="my-5">
      <b-row aligh-v="center">
        <b-col cols="12" md="9">
          <p class="text-secondary">
            Für <b>Betreiber*innen</b> von Gewerben und
            <b>Veranstalter*innen</b>
          </p>
          <p>
            Folgen Sie den Empfehlungen der Clair-Initiative, installieren Sie
            einen Clair-Sensor und dokumentieren und bewerben Sie öffentlich,
            dass Sie ein Lüftungskonzept umsetzen.
          </p>
          <p>
            Bald mehr...
          </p>
        </b-col>
        <b-col cold="12" md="3" class="my-auto">
          <img class="d-block mx-auto" src="@/assets/clair-logo-black.svg" width="50px"/>
        </b-col>
      </b-row>
    </b-card>
    <b-card class="my-5">
      <b-row aligh-v="center">
        <b-col cols="12" md="9">
          <p class="text-secondary">
            Für <b>Entscheidungsträger*innen</b> in Verwaltung und Politik
            sowie Wissenschaftler
          </p>
          <p>
            Nutzen Sie die Open-Data-Basis der Clair-Initiative, um die
            geltenden Regeln den aktuellen Erkenntnissen anzupassen und sie zu
            optimieren.
          </p>
          <p>
            Bald mehr...
          </p>
        </b-col>
        <b-col cold="12" md="3" class="my-auto">
          <div class="h1 text-center">
            <b-icon-clipboard-data></b-icon-clipboard-data>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>
<script>
import 'vue-material-design-icons/styles.css'
import GlassCocktailIcon from 'vue-material-design-icons/GlassCocktail.vue'
export default {
  components: {
    GlassCocktailIcon
  }
}
</script>
<style>
.clair-logo {
  font-family: 'Cormorant Garamond', serif;
  font-size: 32pt;
}
</style>
