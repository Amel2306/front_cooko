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
  z-index: 1;
  width: 140px;
  padding: 10px 0;
  background-color: #f3d9b1;
  border-radius: 5px;
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

/*@media (max-width: 700px) {
  .menu {
    display: none;
    position: absolute;
    background-color: antiquewhite;
    right: 50px;
    top: 100%;
    text-align: center;
    padding: 16px 0;
    width: 100%;
  }

  .menu li:hover {
    display: inline-block;
    background-color: antiquewhite;
    transition: 0.3s ease;
  }

  .menu li + li {
    margin-top: 12px;
  }

  input[type="checkbox"]:checked ~ .menu {
    display: block;
  }

  .hamburger {
    display: flex;
  }

  .dropdown {
    left: 50%;
    top: 30px;
    transform: translateX(15%);
  }

  .dropdown li:hover {
    background-color: antiquewhite;
  }
  .services:hover .dropdown {
    display: block;
    position: static;
  }
}
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

.services {
  padding-right: 800px;
}

/*.navbar-brand {
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
}*/
.iconCook {
  width: 35%;
  height: 35%;
  margin-top: -60px;
}
</style>
