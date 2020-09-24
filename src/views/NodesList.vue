<template>
  <ul>
    <li v-for="node in allNodes" :key="node.id">
      <router-link :to="'/nodes/' + node.id">{{node.attributes.alias}}</router-link>
    </li>
  </ul>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'NodesList',

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
    this.loadAllNodes()
  }
}
</script>
<style>
</style>
