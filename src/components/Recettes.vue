<template>
  <div>
    <h1>Liste des recettes</h1>
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
        <button @click="addCart(recette, $event)" class="plus">+</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "RecetteComponent",
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
    suppCard: async function (recette, event) {
      event.stopPropagation();
      if (this.user) {
        try {
          const data = {
            recetteId: recette.id,
          };
          const resCard = await axios.put(
            `/users/${this.user.id}/panier`,
            data
          );
          console.log(resCard);
          this.quantites[recette.id] -= 1;
        } catch (err) {
          console.log(err);
        }
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

<style>
@media (max-width: 700px) {
  .card-container {
    flex-wrap: nowrap;
    flex-direction: column;
  }
}
.card .moins {
  flex-direction: row;
  position: absolute;
  bottom: 10px;
  left: 50px;
  color: #daa06d;
  font-size: 0.8em;
  font-weight: 700;
  transition: ease-out 0.5s;
  cursor: pointer;
  border: 2px solid #daa06d;
  border-radius: 10px;
  background-color: transparent;
  width: 40px;
}

.card .plus {
  flex-direction: row;
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: #daa06d;
  font-size: 0.8em;
  font-weight: 700;
  transition: ease-out 0.5s;
  cursor: pointer;
  border: 2px solid #daa06d;
  border-radius: 10px;
  background-color: transparent;
  width: 40px;
}

.card p {
  position: absolute;
  bottom: -5px;
  left: 65px;
  color: #daa06d;
  font-size: 16px;
  font-weight: 700;
  margin-left: 40px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
}

.card {
  width: 300px;
  height: 300px;
  box-shadow: 0 10px 10px #eaddca;
  background: #eaddca;
  ::display: flex;
  border-radius: 20px;
  justify-content: center;
  ::position: relative;
  transition: all 0.4s;
  border: transparent;
  margin: 30px;
  margin-top: 50px;
}

img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.card div {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.212);
  cursor: pointer;
  z-index: 10;
  transition: all 0.4s;
  background-color: #eaddca;
}

.card:hover div {
  transform: translateY(-60px);
  color: #eaddca;
}

.plus:hover {
  color: antiquewhite;
  box-shadow: inset 0 -100px 0 0 #daa06d;
}

.plus:active {
  color: #daa06d;
  transform: scale(0.9);
}
</style>
