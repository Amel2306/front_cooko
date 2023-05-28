<template>
  <div id="app">
    <Nav />
    <div class="auth-wrapper">
      <div class="auth-inner">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import axios from "axios";
export default {
  name: "App",
  components: {
    Nav,
  },
  async created() {
    if (this.$store.getters.user !== null) {
      // Récupérez le token depuis le stockage local
      const token = localStorage.getItem("token");

      // Utilisez la méthode split pour séparer les trois parties du token (en-tête, payload, signature)
      const tokenParts = token.split(".");

      // Utilisez la méthode atob pour décoder la partie payload du token qui est en Base64
      const decodedPayload = atob(tokenParts[1]);

      // Transformez la chaîne de caractères JSON décodée en un objet JavaScript
      const tokenPayload = JSON.parse(decodedPayload);

      // Vérifiez si les informations de nom d'utilisateur sont stockées dans le token
      if (tokenPayload && tokenPayload.id) {
        const userId = tokenPayload.id;
        const response = await axios.get(`users/${userId}`);
        //console.log(response.data);
        this.$store.dispatch("user", response.data);
      }
    }
  },
};
</script>

<style>
* {
  justify-content: center;
}
body {
  justify-content: center;
  background-color: antiquewhite;
}

#app {
  background-color: antiquewhite;
}

.navbar-light {
  background-color: antiquewhite;
}

.forgot-password,
.forgot-password a {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #eaddca;
  margin: 0;
}

.forgot-password a {
  color: #daa06d;
}

.auth-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

.auth-inner {
  padding-top: 300px;
  //width: 1000px;
  margin: auto;
  background-color: white;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  border-radius: 15px;
  transition: all 0.3s;
}

.auth-wrapper .form-control:focus {
  margin-top: 20px;
  border-color: #daa06d;
  box-shadow: none;
}

.auth-wrapper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}
</style>
