<template>
  <div class="info" v-if="recette">
    <button class="fav" @click="addCart(recette)">
      <font-awesome-icon icon="fa-solid fa-bookmark" size="lg" />
    </button>
    <h2 class="name">{{ recette.nom }}</h2>
    <img class="image" :src="imageUrl" alt="{{ recette.nom }}" />
    <div class="meta">
      <font-awesome-icon icon="fa-clock" size="lg" class="icon" />
      {{ recette.temps_prep }} min
      <font-awesome-icon icon="fa-signal" class="icon" />
      {{ recette.difficulte }}
    </div>
    <hr class="separator" />
    <h4><font-awesome-icon icon="fa-carrot" class="icon" />Ingredients :</h4>
    <ul class="ingredients" v-for="ing in ingredients" v-bind:key="ing">
      <li>
        {{ this.nomIngredients[ing.ingredientId] }} : {{ ing.quantite }}
        {{ ing.uniteQte }}
      </li>
    </ul>
    <hr class="separator" />
    <h4><font-awesome-icon icon="fa-list" class="icon" />Description :</h4>
    <ul class="description" v-for="desc in description" v-bind:key="desc">
      <li>{{ desc }}</li>
    </ul>
    <hr class="separator" />
    <h4><font-awesome-icon icon="fa-solid fa-comments" />Commentaires :</h4>
  </div>
  <div class="containCom">
    <div class="commentaire" v-for="com in commentaires" :key="com">
      <div class="affiche">
        <div class="utilisateur">
          <p class="nom">{{ com.nomUser }}</p>
          <p class="prenom">{{ com.prenomUser }}</p>
        </div>
        <p class="contenuu">{{ com.contenu }}</p>
        <p class="note">
          {{ com.note }}
          <font-awesome-icon icon="fa-solid fa-star" size="lg" class="etoile" />
        </p>
      </div>
      <div class="modif">
        <div
          v-if="
            user
              ? com.userId === this.user.id ||
                this.user.email === 'ameladdou213@gmail.com'
              : false
          "
          class="actions"
        >
          <button class="btn" @click="supprimerCommentaire(com)">
            <font-awesome-icon icon="fa-solid fa-trash-can" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="user && afficherFormulaire" class="ajoutCom">
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <form @submit="soumettreCommentaire">
      <div class="rating">
        Note:
        <label>
          <input
            class="radio"
            type="radio"
            name="rate"
            value="1"
            v-model="note"
          />
          1
        </label>
        <label>
          <input
            class="radio"
            type="radio"
            name="rate"
            value="2"
            v-model="note"
          />
          2
        </label>
        <label>
          <input
            class="radio"
            type="radio"
            name="rate"
            value="3"
            v-model="note"
          />
          3
        </label>
        <label>
          <input
            class="radio"
            type="radio"
            name="rate"
            value="4"
            v-model="note"
          />
          4
        </label>
        <label>
          <input
            class="radio"
            type="radio"
            name="rate"
            value="5"
            v-model="note"
          />
          5
        </label>
      </div>

      <div>
        <label for="contenu"></label>
        <textarea
          placeholder="contenu"
          id="AjoutContenu"
          name="contenu"
          rows="4"
          cols="50"
          v-model="contenu"
          class="fixed-size"
        ></textarea>
      </div>

      <button class="btn" type="submit">Soumettre</button>
    </form>
  </div>
  <button
    v-if="user"
    class="btn"
    @click="
      afficherFormulaire
        ? (afficherFormulaire = false)
        : (afficherFormulaire = true)
    "
  >
    Ajouter un commentaire
  </button>
  <button v-if="!user" class="btn">
    <router-link to="/login" class="nav-link"
      >Ajouter un commentaire</router-link
    >
  </button>
</template>

<script>
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { mapGetters } from "vuex";

export default {
  name: "RecetteDetails",
  components: { FontAwesomeIcon },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      recette: null,
      imageUrl: null,
      description: [],
      ingredients: [],
      nomIngredients: {},
      commentaires: [],
      users_nom: {},
      afficherFormulaire: false,
      contenu: null,
      note: null,
      error: null,
    };
  },
  async mounted() {
    try {
      const recetteId = this.$route.params.id;
      const response = await axios.get(`recettes/${recetteId}`);
      this.recette = response.data;
      this.description = response.data.description.split(",");

      const imageResponse = await axios.get(`recettes/${recetteId}/image`);
      const imageName = imageResponse.data[0].filename;
      const domain = "/Images/";
      this.imageUrl = domain + imageName;

      const res_ingredients = await axios.get(
        `recettes/${recetteId}/ingredients/`
      );
      this.ingredients = res_ingredients.data.ingredients;
      for (const ing of this.ingredients) {
        const nameIngredientResponse = await axios.get(
          `ingredients/${ing.ingredientId}`
        ); // récupérer le nom de l'ingrédient par son id
        this.nomIngredients[ing.ingredientId] = nameIngredientResponse.data.nom; // extraire le nom de la réponse
      }

      const res_comm = await axios.get(`recettes/${recetteId}/commentaire`);
      this.commentaires = res_comm.data;
      console.log(this.commentaires);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async soumettreCommentaire() {
      try {
        if (this.user) {
          await axios.post(`recettes/${this.recette.id}/commentaire`, {
            note: this.note,
            contenu: this.contenu,
            userId: this.user.id,
          });
        }

        this.note = "";
        this.contenu = "";
        console.log("Le commentaire a été soumis avec succès !");
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la soumission du commentaire :",
          error
        );
        this.error =
          "Attention tous les champs doivent être rempli : la note et le contenu ";
      }
    },
    async supprimerCommentaire(com) {
      try {
        const supp_com = await axios.delete(`recettes/${com.id}/commentaire`);
        console.log(supp_com);
        location.reload();
      } catch (err) {
        console.log(err);
      }
    },
    async addCart(recette) {
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
        } catch (err) {
          console.log(err);
        }
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style>
.icon {
  padding-left: 15px;
  padding-right: 5px;
}

.image {
  width: 900px;
  height: 700px;
  padding: 100px;
  padding-bottom: 30px;
  padding-top: 30px;
  border-radius: 20px;
}
.ingredients {
  text-align: left;
}
.description {
  text-align: left;
}
.btn {
  align-self: center;
  margin-top: 2em;
  border-radius: 10px;
  outline: none;
  border: none;
  color: antiquewhite;
  background-color: #e5aa70;
  font-weight: bold;
  letter-spacing: 0.1em;
  transition: 0.4s ease-in-out opacity, 0.1s ease-in-out active;
  padding: 1em;
  box-shadow: 0.5px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
  margin: 40px;
}

.btn:hover {
  opacity: 0.8;
  color: #eaddca;
  background-color: #e5b48b;
}

.btn:active {
  transform: translateX(0.1em) translateY(0.1em);
  box-shadow: none;
}
.modif {
  background-color: antiquewhite;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-top: -15px;
}
.affiche {
  background-color: antiquewhite;
  border-radius: 20px;
  margin-top: 40px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.utilisateur {
  font-size: 30px;
  margin-left: 20px;
}

/*.contenuu {
  //background-color: white;
  border-radius: 40px;
  width: 600px;
  height: 100px;
  text-align: center;
  position: absolute;
  margin-top: 30px;
  margin-left: 150px;
  padding-top: 10px;
  border: solid #e5aa70 5px;
}*/

.note {
  margin-right: 30px;
  font-size: 20px;
  margin-top: 30px;
}

.fav {
  background-color: transparent;
  border: white;
  font-size: 50px;
  margin-left: 600px;
  color: #e5aa70;
  margin-top: -25px;
}
.fav:hover {
  background-color: transparent;
  color: #ecbe9f;
}
.fav:active {
  background-color: transparent;
  color: #ecbe9f;
}
.radio {
  margin-left: 20px;
}
textarea.fixed-size {
  resize: none;
}
#AjoutContenu {
  border-radius: 30px;
  margin-top: 15px;
  border: solid #e5aa70 5px;
  color: #e5aa70;
  font-size: 20px;
}
.rating {
  margin-top: 20px;
}
.etoile {
  color: #e5aa70;
}
</style>
