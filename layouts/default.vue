<template>
  <div>
    <Header/>
    <nuxt/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Header from "~/components/Header.vue";
@Component({
  components: {
    Header
  }
})
export default class Default extends Vue {}
</script>
