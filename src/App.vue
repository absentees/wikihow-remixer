<script setup lang="ts">
import { ref } from 'vue'

async function getData() {
  loading.value = true;

  // Remove the title and image
  articleTitle.value = '';
  articleImage.value = '';

  // get response from local netlify function get-article
  const response = await fetch('/.netlify/functions/get-article');
  const data = await response.json();


  //get response from local netlify function get-image
  const response2 = await fetch('/.netlify/functions/get-image');
  const data2 = await response2.json();

  // Wait till both responses are ready and then set the title and image
  articleTitle.value = data.title;
  articleImage.value = data2;

  loading.value = false;

}

// The title of the article
const articleTitle = ref('');
// articleImage object
const articleImage = ref('');
const loading = ref(false);

</script>

<template>
  <div>
    <h1>Wikihow remixer</h1>
    <div class="content">
      <!-- Show articleTitle or placeholder loading text -->
      <h2 v-if="loading">Loading...</h2>
      <h2 v-else>{{ articleTitle }}</h2>

      <!-- Show image if it exists else show a grey rectangle -->
      <img v-if="articleImage.imageURL" :src="articleImage.imageURL" alt="">
      <div v-else style="width: 400px; height: 300px; background-color: #ccc;"></div>


      <!-- A button that on clicks runs a method called Generate, replace button text with a spinner -->
      <button @click="getData">
        <span v-if="loading">Loading...</span>
        <span v-else>Generate</span>
      </button>
    </div>





  </div>
</template>

<style scoped>
h1 {
  font-size: 1rem;
  margin-bottom: 20px;
}

h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

img {
  width: 400px;
  height: auto;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 20px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: black;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

button:hover {
  background-color: #333;
}

</style>
