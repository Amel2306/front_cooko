<template>
  <form class="form">
    <p class="heading">Mot de passe oublié</p>
    <input placeholder="Email" class="input" type="email" />
    <button class="btn">Envoyer</button>
  </form>
</template>

<script>
export default {
  name: "ForgotComponent",
  date() {
    return {
      email: "",
    };
  },
  methods: {},
};
</script>

<style>
.form {
  margin-top: 20px;
  display: flex;
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
}

::placeholder {
  color: #daa06d;
  text-align: center;
}

.form .heading {
  padding-left: 0.8em;
  color: #daa06d;
  background-color: transparent;
  text-align: center;
  padding-top: 1em;
  padding-bottom: 3em;
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
