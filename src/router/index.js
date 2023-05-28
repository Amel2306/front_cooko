import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/Home.vue";
import LoginComponent from "../components/Login.vue";
import SignupComponent from "../components/Signup.vue";
import ProfilPage from "../components/Profile.vue";
import ForgotComponent from "../components/Forgot.vue";
import RecetteDetails from "@/components/RecetteDetails.vue";
import PanierRecette from "@/components/Panier.vue";
import Parametres from "@/components/Parametres.vue";
import UsersComponent from "@/components/Users.vue";
import RecettesFiltre from "../components/RecettesFiltre.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginComponent,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupComponent,
  },
  {
    path: "/profil",
    name: "profil",
    component: ProfilPage,
  },
  {
    path: "/forgot",
    name: "forgot",
    component: ForgotComponent,
  },

  {
    path: "/recettes/:id",
    name: "recette-details",
    component: RecetteDetails,
  },
  {
    path: "/recettesfiltre/:categorie",
    name: "recettes-filtre",
    component: RecettesFiltre,
  },
  {
    path: "/panier",
    name: "panier",
    component: PanierRecette,
  },
  {
    path: "/parametres",
    name: "parametres",
    component: Parametres,
  },
  {
    path: "/parametres/users",
    name: "users",
    component: UsersComponent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
