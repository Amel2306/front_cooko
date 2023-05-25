<template>
  <form class="form" @submit.prevent="handleSubmit">
    <p class="heading">Ingredient :</p>
    <input placeholder="Nom" class="input" v-model="nom" type="text" />
    <select name="categorie" class="input" v-model="categorie">
      <option value="">--Choisir une catégorie--</option>
      <option value="legume">Légume</option>
      <option value="fruit">Fruit</option>
      <option value="viande">Viande ou Poisson</option>
      <option value="boulangerie">Boulangerie</option>
      <option value="pate">Pâte</option>
      <option value="laitier">Produit laitier</option>
      <option value="farine">Farine ou Semoule</option>
      <option value="autre">Autre</option>
    </select>
    <input
      placeholder="Quantité"
      class="input"
      v-model="quantite"
      type="text"
    />
    <select name="unité" class="input">
      <option value="">--unité--</option>
      <option value="piece">Piece</option>
      <option value="g">gramme</option>
      <option value="kg">kilo gramme</option>
      <option value="ml">millilitre</option>
      <option value="l">litre</option>
      <option value="autre">Autre</option>
    </select>
    <button class="btn">+</button>
  </form>
  <button class="btn" t>Valider</button>
</template>

<script>
export default {
  name: "addIngredient",
  data() {
    return {
      nom:"",
      categorie: "",
      quantite: "",
    }
  },
  methods {
    async handleSubmit (){
      const dataCatIngredient = {
        nom: this.categorie,
      }
      let resCat = await axios.get(`/typeingredients/${dataCatIngredient.nom}`);
      if (!resCat){
        resCat = await axios.post('/typeingredients', dataCatIngredient);
        };
      const dataIngredient = {
        nom: this.nom,
        tingredient: resCat.id,
      }
      let resIng = await axios.get(`/ingredients/${dataIngredient.nom}`)
      if (!resIng){
        resIng = await axios.post(`/ingredients`, dataIngredient)
      }
    }
  }
}
</script>

<style></style>
