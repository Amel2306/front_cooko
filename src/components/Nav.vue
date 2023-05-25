<template>
  <nav class="navbar fixed-top">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="nav-link">
          <img class="iconCook" src="/favicon.ico" alt="Cookolisto" />
        </router-link>
      </div>
      <div class="navbar-items">
        <ul class="navbar-nav" v-if="!user">
          <!-- Éléments du menu si l'utilisateur n'est pas connecté -->
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Se connecter</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link">S'inscrire</router-link>
          </li>
        </ul>
        <ul class="navbar-nav" v-if="user">
          <!-- Éléments du menu si l'utilisateur est connecté -->
          <li class="nav-item">
            <router-link to="/login" class="nav-link" @click="handleClick">
              <font-awesome-icon
                icon="fa-solid fa-right-from-bracket"
                size="lg"
              />
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/panier" class="nav-link">
              <font-awesome-icon icon="fa-solid fa-bookmark" size="lg" />
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profil" class="nav-link">
              <font-awesome-icon icon="fa-solid fa-user-check" size="lg" />
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="this.user.email === 'ameladdou213@gmail.com'"
          >
            <router-link to="/parametres" class="nav-link">
              <font-awesome-icon icon="fa-solid fa-sliders" size="lg" />
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NavMenu",
  methods: {
    handleClick() {
      localStorage.removeItem("token");
      localStorage.removeItem("panier");
      this.$store.dispatch("user", null);
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style>
/* Ajoute une marge droite à la marque de navigation pour la déplacer légèrement vers la gauche */
body {
  color: #e5aa70;
  background-color: antiquewhite;
}

.navbar {
  background-color: antiquewhite;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  height: 85px;
}

.navbar-brand {
  margin: 0;
  padding: 0 15px;
  font-size: 18px;
  line-height: 80px;
}

.navbar-nav {
  display: inline-flex;
  align-items: center;
}

.navbar-items {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-self: center;
}

.nav-item {
  margin-left: 1px;
}

.nav-link {
  text-decoration: none;
  color: #e5aa70;
}

.nav-link:hover {
  color: #e5b48b;
}
.iconCook {
  width: 35%;
  height: 35%;
  margin-top: -50px;
}
</style>
