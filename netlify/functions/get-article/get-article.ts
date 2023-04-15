import { Handler } from '@netlify/functions'
import fetch from 'node-fetch';


export const handler: Handler = async (event, context) => {
  // Get a random article from wikihow that isnt under review
  const response = await fetch("https://www.wikihow.com/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json");
  const data = await response.json();
  const article = data.query.random[0];

  // Get the article's title
  const title = article.title;

  // Return a response
  return {
    statusCode: 200,
    body: JSON.stringify({
      title: title,
    }),
  }
}


