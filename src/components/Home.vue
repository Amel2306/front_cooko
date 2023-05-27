<template>
  <div class="a" v-if="user">
    <h3 class="hello">Salut {{ user.nom }} {{ user.prenom }}</h3>
  </div>
  <div class="a" v-else>
    <h3 class="hello">Vous n'êtes pas connecté</h3>
  </div>
  <div class="recettes">
    <RecetteComponent />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RecetteComponent from "@/components/Recettes.vue";
export default {
  name: "HomePage",
  components: { RecetteComponent },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style>
body {
  width: 1400px;
  justify-content: center;
  padding-top: 100px;
  //padding-left: 220px;
}
.a {
  margin-top: 40px;
}
.hello {
  text-align: left;
  border: transparent;
}
</style>
