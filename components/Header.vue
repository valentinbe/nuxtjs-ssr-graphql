<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link tag="a" class="navbar-brand" to="/" exact>Deliveroo clone</router-link>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <li v-if="username">
            <a href="#" class="nav-link">Hello {{ username }}</a>
          </li>
          <li v-if="username">
            <a href="#" class="nav-link" @click="logout">Logout</a>
          </li>
          <li v-if="!username">
            <router-link v-if="!username" tag="a" class="nav-link" to="/signin" exact>Signin</router-link>
          </li>
          <li v-if="!username">
            <router-link v-if="!username" tag="a" class="nav-link" to="/signup" exact>Signup</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { mapMutations } from "vuex";
import { Action, Mutation, Getter } from "vuex-class";

@Component({})
export default class Header extends Vue {
  @Mutation("logout", { namespace: "auth" }) logout;
  @Getter("username", { namespace: "auth" }) username;
}
</script>
