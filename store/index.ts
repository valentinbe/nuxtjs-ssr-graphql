import cookieparser from "cookieparser";

export const actions = {
  //  invoked when the Nuxt server starts
  nuxtServerInit({ commit }, { req }) {
    let user = null;
    let cart = [];
    if (req && req.headers && req.headers.cookie) {
      // To make sure the items stay in the cart across tabs and after page reload, we are also using the cookies
      const parsed = cookieparser.parse(req.headers.cookie);
      user = (parsed.user && JSON.parse(parsed.user)) || null;
      cart = (parsed.cart && JSON.parse(parsed.cart)) || [];
    }

    commit("auth/setUser", user);
    commit("cart/setItems", cart);
  }
};
