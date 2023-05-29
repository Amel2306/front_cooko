<template>
  <div>
    <h1>Liste des recettes</h1>
    <div class="card-container">
      <div v-for="recette in recettes" :key="recette.id" class="card">
        <div class="img">
          <img :src="images[recette.id]" :alt="recette.nom" />
        </div>
        <p>{{ recette.nom }}</p>
        <button v-if="user" @click="suppRecette(recette, $event)" class="plus">
          <font-awesome-icon icon="fa-solid fa-trash-can" />
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
  name: "RecettePara",
  data() {
    return {
      recettes: [],
      images: {},
      quantites: {},
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  async mounted() {
    try {
      const response = await axios.get("/recettes");
      this.recettes = response.data;
      console.log(this.recettes);

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
    async suppRecette(recette, event) {
      event.stopPropagation();
      if (this.user) {
        try {
          const resSuppressions = await axios.delete(
            `/recettes/${recette.id}/panier`
          );
          console.log(resSuppressions);
        } catch (err) {
          console.log(err);
        }
      } else {
        this.$router.push("/login");
      }
    },
    redirigeLog(event) {
      event.stopPropagation();
      this.$router.push("/login");
    },
  },
};
</script>
