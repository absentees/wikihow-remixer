<script setup lang="ts">
import { defineComponent, ref } from 'vue'

const GenerateRemix = () => {
  // Fetches a random article from wikihow
  fetch('https://en.wikihow.com/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json')
    .then(response => response.json())
    .then(data => {
      // Gets the title of the article
      articleTitle.value = data.query.random[0].title
    })  


  
}

const listItems = ref([]);

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const finalRes = await res.json();
  listItems.value = finalRes;
}


// The title of the article
const articleTitle = ref('')

</script>

<template>
  <div>
    <h1>Wikihow remixer</h1>
    <div>
      <h2>{{ articleTitle }}</h2>
      <ul>
        <li v-for="item in listItems" :key="item.id">
          {{ item.title }}
        </li>
      </ul>
    </div>
    <!-- A button that on clicks runs a method called Generate -->
    <button @click="getData">Generate</button>

  </div>
</template>

<style scoped>

</style>
