import { Handler } from '@netlify/functions'
import fetch from 'node-fetch';
const cheerio = require('cheerio');

export const handler: Handler = async (event, context) => {
	// Fetch the page content then use cheerio to get og:image
	const response2 = await fetch(`https://www.wikihow.com/Special:Randomizer`)
	const html = await response2.text();

	const $ = cheerio.load(html);
	const imageURL = $('meta[property="og:image"]').attr('content');

	// Return a response
	return {
		statusCode: 200,
		body: JSON.stringify({
			// id: id,
			// title: article.title,
			imageURL: imageURL,
			// url: `https://www.wikihow.com/${article.title}`
		}),
	}
}
