<template>
  <div class="profilCard">
    <p class="heading">PROFIL</p>

    <div class="infoLine">
      <p class="info">Nom:</p>
      <input
        class="inputP"
        :placeholder="this.user.nom"
        v-model="editedUser.nom"
        type="text"
      />
    </div>

    <div class="infoLine">
      <p class="info">Prenom:</p>
      <input
        class="inputP"
        :placeholder="this.user.prenom"
        v-model="editedUser.prenom"
        type="text"
      />
    </div>

    <div class="infoLine">
      <p class="info">Email:</p>
      <p>{{ this.user.email }}</p>
    </div>

    <button class="btn" @click="saveChanges">Enregistrer</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "ProfilPage",
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      editedUser: {
        nom: this.user ? this.user.nom : "",
        prenom: this.user ? this.user.prenom : "",
      },
    };
  },
  methods: {
    async saveChanges() {
      try {
        if (this.editedUser.nom === "" && this.editedUser.prenom === "") {
          this.cancelChanges();
        } else if (this.editedUser.nom === "") {
          const response = await axios.put(`users/${this.user.id}`, {
            prenom: this.editedUser.prenom,
          });
          console.log(response.data);
          this.user.prenom = this.editedUser.prenom;
        } else if (this.editedUser.prenom === "") {
          const response = await axios.put(`users/${this.user.id}`, {
            nom: this.editedUser.nom,
          });
          console.log(response.data);
          this.user.nom = this.editedUser.nom;
        } else {
          const response = await axios.put(
            `users/${this.user.id}`,
            this.editedUser
          );
          console.log(response.data);
          this.user.nom = this.editedUser.nom;
          this.user.prenom = this.editedUser.prenom;
        }
        // Si la requête réussit, vous pouvez mettre à jour les informations de l'utilisateur dans votre composant

        // Réinitialiser les champs de formulaire après la sauvegarde
        this.editedUser.nom = "";
        this.editedUser.prenom = "";
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour des informations utilisateur :",
          error
        );
      }
    },
  },
};
</script>

<style>
.profilCard {
  ::margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 3em 2.8em 2.1em;
  margin: 50px;
  border: 2px dashed #daa06d;
  border-radius: 15px;
  background-color: #eaddca;
  box-shadow: 0 0 0 4px #eaddca, 2px 2px 4px 2px rgba(0, 0, 0, 0.5);
  transition: 0.4s ease-in-out;
  color: #daa06d;
}

.profilCard .heading {
  padding-left: 0.8em;
  color: #daa06d;
  background-color: transparent;
  letter-spacing: 0.5em;
  text-align: center;
  padding-top: 1em;
  padding-bottom: 20px;
}

.profilCard .info {
  outline: none;
  padding: 2em;
  padding-top: 10px;
  border-bottom: 2px dashed #daa06d;
  border-top: 2px dashed #daa06d;
  color: #daa06d;
  width: 6em;
  height: 2em;
  background-color: #eaddca;
  text-align: left;
  margin-right: 2em;
}

.profilCard .btn {
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
}

.profilCard .btn:hover {
  opacity: 0.8;
}

.profilCard .btn:active {
  transform: translateX(0.1em) translateY(0.1em);
  box-shadow: none;
}

.infoLine {
  display: inline;
  display: flex;
  align-items: center;
}

.profilCard .info {
  margin-top: 5px;
  display: block;
}

.inputP {
  max-width: 190px;
  height: 30px;
  border: 2px solid transparent;
  outline: none;
  border-bottom: 2px solid #e5aa70;
  caret-color: #e5aa70;
  color: #e5aa70;
  background-color: #eaddca;
  padding: 5px;
  transition: 0.5s linear;
  letter-spacing: 1px;
}

.inputP:focus {
  border: 2px solid #e5aa70;
  caret-color: #eaddca;
  color: #e5aa70;
}

.inputP:focus::placeholder {
  color: #e5aa70;
}
</style>
