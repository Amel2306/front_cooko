<template>
  <form class="form" @submit.prevent="handleSubmit">
    <p class="heading">CONNEXION</p>
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <input placeholder="Email" class="input" v-model="email" type="text" />
    <input
      placeholder="Mot de passe"
      class="input"
      v-model="password"
      type="password"
    />
    <button class="btn">Valider</button>
    <p class="forgot-password text-right">
      <router-link to="forgot">Mot de passe oublié ?</router-link>
    </p>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const data = {
          email: this.email,
          password: this.password,
        };
        const response = await axios.post("authentification/login", data);
        //console.log(response.data);
        localStorage.setItem("token", response.data.token);
        this.$store.dispatch("user", response.data.existingUser);
        this.$router.push("/");
      } catch (err) {
        this.error = "Email ou mot de passe incorrect";
      }
    },
  },
};
</script>

<style>
.form {
  //display: block;
  flex-direction: column;
  gap: 10px;
  padding-top: 3em;
  padding-left: 2.8em;
  padding-right: 2.8em;
  padding-bottom: 2.1em;
  border: 2px dashed #daa06d;
  border-radius: 15px;
  background-color: #eaddca;
  box-shadow: 0 0 0 4px #eaddca, 2px 2px 4px 2px rgba(0, 0, 0, 0.5);
  transition: 0.4s ease-in-out;
  width: 350px;
  margin: 40px;
}

::placeholder {
  color: #daa06d;
  text-align: center;
}

.form .heading {
  padding-left: 0.8em;
  color: #daa06d;
  background-color: transparent;
  letter-spacing: 0.5em;
  text-align: center;
  padding-top: 1em;
  padding-bottom: 20px;
}

.form .input {
  outline: none;
  padding: 0.5em;
  border: 1px solid #daa06d;
  color: #daa06d;
  width: 14em;
  height: 3em;
  border-radius: 10px;
  background-color: #eaddca;
  text-align: center;
}

.form .btn {
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

.form .btn:hover {
  opacity: 0.8;
}

.form .btn:active {
  transform: translateX(0.1em) translateY(0.1em);
  box-shadow: none;
}
</style>
