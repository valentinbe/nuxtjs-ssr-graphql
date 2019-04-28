<template>
  <section class="container">
    <div>
      <h1 class="mt-2">Dishesd</h1>
      <div class="row">
        <div class="col-md-8">
          <div class="cart-columns">
            <div v-for="dish in getDishList" :key="dish.id" class="card">
              <img :src="dish.image.url" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">{{ dish.name }}</h5>
                <p class="card-text">{{ dish.description || 'No description provided.' }}</p>
                <p class="card-text">${{ dish.price }}</p>
                <button class="btn btn-primary" @click="addToCart(dish)">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Card</h5>
              <p class="card-text">{{ getCartNumberOfItems }} items selected:</p>
              <ul>
                <li v-for="dish in getCartItems" :key="dish.id" class="card-text mb-2">
                  Name: {{ dish.name }} (${{ dish.price }}) ({{ dish.quantity }})
                  <button
                    class="btn btn-sm btn-success"
                    @click="addToCart(dish)"
                  >+</button>
                  <button class="btn btn-sm btn-warning ml-2" @click="removeFromCart(dish)">-</button>
                </li>
              </ul>
              <h5 class="card-text">Total: ${{ getCartPrice }}</h5>
              <p v-if="!getCartItems.length">Please select some items.</p>
              <button
                :disabled="!getCartItems.length"
                class="btn btn-primary"
                @click="goToCheckout()"
              >Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
// import axios from "axios";
import { Component, Vue, Prop } from "vue-property-decorator";
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
import { mapMutations, mapActions } from "vuex";
import { Action, Mutation, Getter } from "vuex-class";
const cartNamespace: string = "cart";
const dishNamespace: string = "dishes";

@Component({})
export default class Restaurant extends Vue {
  @Mutation("add", { namespace: cartNamespace }) addToCart: void;
  @Mutation("remove", { namespace: cartNamespace }) removeFromCart: void;
  @Mutation("emptyList", { namespace: cartNamespace }) emptyCart: void;
  @Mutation("add", { namespace: dishNamespace }) addDish;
  @Getter("list", { namespace: dishNamespace }) getDishList;
  @Getter("items", { namespace: cartNamespace }) getCartItems;
  @Getter("price", { namespace: cartNamespace }) getCartPrice;
  @Getter("numberOfItems", { namespace: cartNamespace }) getCartNumberOfItems;

  mounted() {
    // fetching data as soon as the component's mounted
    this.fetch();
  }

  private async fetch() {
    this.emptyCart;
    const response = await strapi.request("post", "/graphql", {
      data: {
        query: `query {
            restaurant(id: "${this.$route.params.id}") {
              id
              name
              dishes {
                id
                name
                description
                price
                image {
                  url
                }
              }
            }
          }
          `
      }
    });
    response.data.restaurant.dishes.forEach(dish => {
      dish.image.url = `${apiUrl}${dish.image.url}`;
      this.addDish({
        id: dish.id,
        ...dish
      });
    });
  }

  get id() {
    return this.$route.params.id;
  }

  goToCheckout() {
    // Redirect to signin page if not logged in.
    const isConnected = this.$store.getters["auth/username"];
    if (!isConnected) {
      this.$router.push("/signin");
      return;
    }
    this.$router.push("/checkout");
  }
}
</script>
