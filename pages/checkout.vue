<template>
  <section class="container">
    <div>
      <h1 class="mt-2">Checkout</h1>
      <div class="row">
        <div class="col-md-6 offset-md-3 mt-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Cart</h5>
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
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 offset-md-3 mt-3">
          <form autocomplete="off" @submit.stop.prevent="handleSubmit">
            <div class="form-group">
              <label for="address">Address</label>
              <b-form-input
                id="address"
                v-model="address"
                type="text"
                autofocus="true"
                placeholder="Enter your address"
                required
              />
            </div>
            <div class="form-group">
              <label for="postalCode">Postal Code</label>
              <b-form-input
                id="postalCode"
                v-model="postalCode"
                type="text"
                autofocus="true"
                placeholder="Enter your postal code"
                required
              />
            </div>
            <div class="form-group">
              <label for="city">City</label>
              <b-form-input
                id="city"
                v-model="city"
                type="text"
                autofocus="true"
                placeholder="Enter your city"
                required
              />
            </div>
            <div class="form-group">
              <label for="card">Card</label>
              <card class="form-control" stripe="pk_test_4nobp9tCdjhXC4JPrmgqKnsk"/>
            </div>
            <button :disabled="loading" type="submit" class="btn btn-primary btn-block mt-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Card, createToken } from "vue-stripe-elements-plus";
import { mapMutations } from "vuex";
import Strapi from "strapi-sdk-javascript/build/main";
import { Component, Vue, Prop } from "vue-property-decorator";
import { Mutation, Getter } from "vuex-class";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
const cartNamespace: string = "cart";
const dishNamespace: string = "dishes";

@Component({
  components: {
    Card
  }
})
export default class Checkout extends Vue {
  @Mutation("add", { namespace: cartNamespace }) addToCart: void;
  @Mutation("remove", { namespace: cartNamespace }) removeFromCart: void;
  @Mutation("emptyList", { namespace: cartNamespace }) emptyCart: void;

  @Getter("list", { namespace: dishNamespace }) getDishList;
  @Getter("items", { namespace: cartNamespace }) getCartItems;
  @Getter("price", { namespace: cartNamespace }) getCartPrice;
  @Getter("numberOfItems", { namespace: cartNamespace }) getCartNumberOfItems;

  address = "";
  postalCode = "";
  city = "";
  loading = false;

  mounted() {}

  async handleSubmit() {
    this.loading = true;
    let token;
    try {
      const response = await createToken();
      token = response.token.id;
    } catch (err) {
      alert("An error occurred.");
      this.loading = false;
      return;
    }
    try {
      await strapi.createEntry("orders", {
        amount: this.getCartPrice,
        dishes: this.getCartItems,
        address: this.address,
        postalCode: this.postalCode,
        city: this.city,
        token
      });
      alert("Your order have been successfully submitted.");
      this.emptyCart;
      this.$router.push("/");
    } catch (err) {
      this.loading = false;
      alert("An error occurred.");
    }
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
