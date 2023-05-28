<template>
  <h3 class="titre">Mes recettes</h3>
  <div class="card-containerPan">
    <div
      v-for="recette in panier"
      :key="recette.recetteId"
      class="cardPanier"
      @click="afficherRecette(recette.recetteId)"
    >
      <h5 class="recName">{{ this.recetteNoms[recette.recetteId] }}</h5>
      <div class="infoRecPan">
        <img
          class="imgPan"
          :src="images[recette.recetteId]"
          :alt="recette.nom"
        />
        <h3 class="qte">{{ recette.quantite }}</h3>
        <button @click="addCart(recette, $event)" class="bouton">+</button>
        <button @click="suppCard(recette, $event)" class="bouton">-</button>
      </div>
    </div>
  </div>
  <hr class="separator" />
  <div v-if="afficherIngr" class="IngAfficher">
    <h3 class="MesIngredients">Mes ingredients pour faire ces recettes :</h3>
    <div v-for="cat in mesIngredients" class="ingredients" :key="cat">
      <hr class="separator" />
      <h5 class="NomCat">{{ cat[0].categorie }}</h5>
      <ul v-for="ing in cat" class="IngParCat" :key="ing">
        <li>
          {{ ing.nom }} : {{ ing.quantite }}
          {{ ing.uniteQte }}
        </li>
      </ul>
    </div>
  </div>
  <button
    v-if="user"
    class="btn"
    @click="afficherIngr ? (afficherIngr = false) : (afficherIngr = true)"
  >
    Mes ingrédients
  </button>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "PanierRecette",
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      panier: JSON.parse(localStorage.getItem("panier")),
      recetteNoms: {},
      images: {},
      mesIngredients: {},
      nomCatégorie: {},
      afficherIngr: false,
    };
  },
  async mounted() {
    if (this.user) {
      try {
        const response = await axios.get(`users/${this.user.id}/panier`);
        this.panier = response.data.panier;

        for (const rec of this.panier) {
          const infRecResponse = await axios.get(`recettes/${rec.recetteId}`);
          this.recetteNoms[rec.recetteId] = infRecResponse.data.nom;
          const imgRecResponse = await axios.get(
            `recettes/${rec.recetteId}/image`
          );
          const imageName = imgRecResponse.data[0].filename;
          const domain = "/Images/";
          const imageUrl = domain + imageName;
          this.images[rec.recetteId] = imageUrl;
        }
        const ingredientsRes = await axios.get(
          `users/${this.user.id}/panier/ingredients`
        );
        console.log(ingredientsRes.data);
        this.mesIngredients = ingredientsRes.data;
      } catch (err) {
        console.log(err);
      }
    }
  },
  methods: {
    afficherRecette(recette) {
      this.$router.push(`/recettes/${recette}`);
    },
    async addCart(recette, event) {
      event.stopPropagation();
      if (this.user) {
        try {
          const data = {
            recetteId: recette.recetteId,
            quantite: 1,
          };
          const resCard = await axios.post(
            `/users/${this.user.id}/panier`,
            data
          );
          console.log(resCard);
          // Mettre à jour le panier dans le stockage local
          localStorage.setItem("panier", JSON.stringify(this.panier));
        } catch (err) {
          console.log(err);
        }
      } else {
        this.$router.push("/login");
      }
    },
    suppCard: async function (recette, event) {
      event.stopPropagation();
      try {
        const data = {
          recetteId: recette.recetteId,
        };
        const resCard = await axios.put(`/users/${this.user.id}/panier`, data);
        console.log(resCard);
        localStorage.setItem("panier", JSON.stringify(this.panier));
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
body {
  padding-bottom: 20px;
}
.imgPan {
  width: 300px;
  height: 300px;
  margin-right: 200px;
  padding-bottom: 15px;
  cursor: pointer;
}
.infoRecPan {
  display: flex;
}
.infoRecPan .bouton {
  max-width: 50px;
  max-height: 50px;
  margin: 20px;
  margin-top: 80px;
}
.titre {
  text-align: left;
}
.recName {
  padding-top: 20px;
  padding-bottom: 10px;
  text-align: left;
}
.bouton {
  align-self: center;
  margin-top: 2em;
  border-radius: 10px;
  outline: none;
  border: none;
  color: white;
  background-color: #e5aa70;
  font-weight: bold;
  letter-spacing: 0.1em;
  transition: 0.4s ease-in-out opacity, 0.1s ease-in-out active;
  padding: 1em;
  box-shadow: 0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
  margin: 40px;
}

.bouton:hover {
  opacity: 0.8;
  color: white;
}

.bouton:active {
  transform: translateX(0.1em) translateY(0.1em);
  box-shadow: none;
  color: white;
}
.qte {
  margin-right: 200px;
  padding-top: 165px;
}
</style>
