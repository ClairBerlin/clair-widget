<template>
  <div id="app">
    <b-container>
      <b-navbar toggleable="lg" type="light">
        <b-navbar-brand to="/">Clair-Initiative</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav>
            <b-nav-item-dropdown text="Sensoren" right>
              <b-dropdown-item v-for="node in allNodes" :key="node.id" :to="'/nodes/' + node.id">
                {{node.attributes.alias}}
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',

  methods: {
    ...mapActions({
      loadAllNodes: 'nodes/loadAll'
    })
  },

  computed: {
    ...mapGetters({
      allNodes: 'nodes/all'
    })
  },

  mounted () {
    this.loadAllNodes().catch((error) => console.log(error))
  }
}
</script>

<style lang="scss">

</style>
