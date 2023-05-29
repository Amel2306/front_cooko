<template>
  <nav class="navbar">
    <div class="container">
      <div class="logo">
        <router-link to="/" class="nav-link">
          <img class="iconCook" src="/favicon.ico" alt="Cookolisto" />
        </router-link>
      </div>
      <div class="navbar-items">
        <ul class="navbar-nav" v-if="!user">
          <input type="checkbox" id="checkbox_toggle" />
          <label for="checkbox_toggle" class="hamburger">&#9776;</label>
          <div class="menu">
            <li class="services">
              <a href="/">Type de plat</a>
              <!-- DROPDOWN MENU -->
              <ul class="dropdown">
                <li @click="filtrerParCategorie('Entrée')"><a>Entrée</a></li>
                <li @click="filtrerParCategorie('Plat')"><a>Plat</a></li>
                <li @click="filtrerParCategorie('Dessert')"><a>Dessert</a></li>
              </ul>
            </li>
            <li class="services">
              <a href="/">Type ingredient </a>
              <!-- DROPDOWN MENU -->
              <ul class="dropdown">
                <li @click="filtrerParIngredient('Légume')"><a>Légume</a></li>
                <li @click="filtrerParIngredient('Fruit')"><a>Fruit</a></li>
                <li @click="filtrerParIngredient('Boulangerie')">
                  <a>Boulangerie</a>
                </li>
                <li @click="filtrerParIngredient('Pâte')"><a>Pâte</a></li>
                <li @click="filtrerParIngredient('Produit Laitier')">
                  <a>Produit Laitier</a>
                </li>
                <li @click="filtrerParIngredient('Viande')"><a>Viande</a></li>
                <li @click="filtrerParIngredient('Farine Semoule')">
                  <a>Farine Semoule</a>
                </li>
                <li @click="filtrerParIngredient('Matière grasse')">
                  <a>Matière grasse</a>
                </li>
                <li @click="filtrerParIngredient('Épices')"><a>Épices</a></li>
                <li @click="filtrerParIngredient('Autre')"><a>Autre</a></li>
              </ul>
            </li>
            <li>
              <router-link to="/login" class="nav-link"
                >Se connecter</router-link
              >
            </li>
            <li>
              <router-link to="/signup" class="nav-link"
                >S'inscrire</router-link
              >
            </li>
          </div>
        </ul>
        <ul class="nav-links" v-if="user">
          <input type="checkbox" id="checkbox_toggle" />
          <label for="checkbox_toggle" class="hamburger">&#9776;</label>
          <div class="menu">
            <li class="services">
              <a href="/">Type de plat</a>

              <!-- DROPDOWN MENU -->
              <ul class="dropdown">
                <li @click="filtrerParCategorie('Entrée')"><a>Entrée</a></li>
                <li @click="filtrerParCategorie('Plat')"><a>Plat</a></li>
                <li @click="filtrerParCategorie('Dessert')"><a>Dessert</a></li>
              </ul>
            </li>
            <li class="services">
              <a href="/">Type ingredient </a>
              <!-- DROPDOWN MENU -->
              <ul class="dropdown">
                <li @click="filtrerParIngredient('Légume')"><a>Légume</a></li>
                <li @click="filtrerParIngredient('Fruit')"><a>Fruit</a></li>
                <li @click="filtrerParIngredient('Boulangerie')">
                  <a>Boulangerie</a>
                </li>
                <li @click="filtrerParIngredient('Pâte')"><a>Pâte</a></li>
                <li @click="filtrerParIngredient('Produit Laitier')">
                  <a>Produit Laitier</a>
                </li>
                <li @click="filtrerParIngredient('Viande')"><a>Viande</a></li>
                <li @click="filtrerParIngredient('Farine Semoule')">
                  <a>Farine Semoule</a>
                </li>
                <li @click="filtrerParIngredient('Matière grasse')">
                  <a>Matière grasse</a>
                </li>
                <li @click="filtrerParIngredient('Épices')"><a>Épices</a></li>
                <li @click="filtrerParIngredient('Autre')"><a>Autre</a></li>
              </ul>
            </li>
            <li>
              <router-link to="/login" class="nav-link" @click="handleClick">
                <font-awesome-icon
                  icon="fa-solid fa-right-from-bracket"
                  size="lg"
                />
              </router-link>
            </li>
            <li>
              <router-link to="/panier" class="nav-link">
                <font-awesome-icon icon="fa-solid fa-bookmark" size="lg" />
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/profil" class="nav-link">
                <font-awesome-icon icon="fa-solid fa-user-check" size="lg" />
              </router-link>
            </li>
            <li v-if="this.user.email === 'ameladdou213@gmail.com'">
              <router-link to="/parametres" class="nav-link">
                <font-awesome-icon icon="fa-solid fa-sliders" size="lg" />
              </router-link>
            </li>
          </div>
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
    filtrerParCategorie(categorie) {
      this.$router.push(`/recettesfiltre/${categorie}`);
    },
    filtrerParIngredient(typeIngredients) {
      this.$router.push(`/recettesfiltreingr/${typeIngredients}`);
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: #e5aa70;
}

li {
  list-style: none;
}

.services:hover .dropdown {
  display: block;
  position: absolute;
  top: 100%;
  left: 2px;
  //z-index: 1;
  width: 140px;
  padding: 10px 0;
  background-color: #f3d9b1;
  border-radius: 5px;
  z-index: 9999;
}

.dropdown li {
  padding: 8px 20px;
}

.dropdown li:hover {
  background-color: #e5b48b;
}

/* NAVBAR STYLING STARTS */
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: antiquewhite;
  color: #e5aa70;
  margin-bottom: 50px;
  margin-top: -50px;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: 40px;
}

.nav-links a {
  color: #e5aa70;
}

.nav-links {
  color: #e5aa70;
}

/* LOGO */
.logo {
  font-size: 32px;
}

/* NAVBAR MENU */
.menu {
  display: flex;
  gap: 1em;
  font-size: 18px;
  flex-wrap: wrap;
}

.menu li:hover {
  background-color: antiquewhite;
  border-radius: 5px;
  transition: 0.3s ease;
}

.menu li {
  padding: 5px 14px;
}

/* DROPDOWN MENU */
.services {
  position: relative;
}

.dropdown {
  background-color: #f3d9b1;
  padding: 1em 0;
  position: absolute; /*WITH RESPECT TO PARENT*/
  display: none;
  border-radius: 8px;
  top: 300px;
}

.dropdown li + li {
  margin-top: 10px;
}

.dropdown li {
  padding: 0.5em 1em;
  width: 8em;
  text-align: center;
}

.dropdown li:hover {
  background-color: antiquewhite;
}

.services:hover .dropdown {
  display: block;
}

input[type="checkbox"] {
  display: none;
}

/* HAMBURGER MENU */
.hamburger {
  display: none;
  font-size: 24px;
  user-select: none;
}
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

.services {
  padding-right: 800px;
}
.iconCook {
  width: 35%;
  height: 35%;
  margin-top: -60px;
}
</style>
