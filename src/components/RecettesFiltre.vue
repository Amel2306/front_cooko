<template>
  <div>
    <h1>{{ this.categorie }}</h1>
    <div class="card-container">
      <div
        v-for="recette in recettes"
        :key="recette.id"
        class="card"
        @click="afficherRecette(recette)"
      >
        <div class="img">
          <img :src="images[recette.id]" :alt="recette.nom" />
        </div>
        <p>{{ recette.nom }}</p>
        <button v-if="user" @click="addCart(recette, $event)" class="plus">
          +
        </button>
        <button v-else @click="redirigeLog($event)" class="plus">+</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "RecetteFiltre",
  data() {
    return {
      recettes: [],
      images: {},
      quantites: {},
      categorie: "",
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  async mounted() {
    try {
      this.categorie = this.$route.params.categorie;
      const response = await axios.get(`typerecettes/${this.categorie}`);
      this.recettes = response.data;
      for (const recette of this.recettes) {
        const imageResponse = await axios.get(`/recettes/${recette.id}/image`);
        const imageName = imageResponse.data[0].filename;
        const domain = "/Images/";
        const imageUrl = domain + imageName;
        this.images[recette.id] = imageUrl;
        this.quantites[recette.id] = 0;
      }
      console.log(this.images);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async addCart(recette, event) {
      event.stopPropagation();
      if (this.user) {
        try {
          const data = {
            recetteId: recette.id,
            quantite: 1,
          };
          const resCard = await axios.post(
            `/users/${this.user.id}/panier`,
            data
          );
          console.log(resCard);
          this.quantites[recette.id] += 1;
        } catch (err) {
          console.log(err);
        }
      } else {
        this.$router.push("/login");
      }
    },
    afficherRecette(recette) {
      this.$router.push(`/recettes/${recette.id}`);
    },
    redirigeLog(event) {
      event.stopPropagation();
      this.$router.push("/login");
    },
  },
};
</script>
