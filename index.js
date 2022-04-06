const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
// const cors = require('cors');

const app = express();

// app.use(cors());
// testing
const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'k', 'l', 't'];
console.log(arr.slice(2, 4));
console.log(arr);
// console.log(arr.splice(2, 4));
// console.log(arr);
// console.log(arr.splice(4));
// console.log(arr);
// console.log(arr.splice(3, 0, 9, 9));
// console.log(arr);

const greet = () => {
	const prefix = 'Mr.';
	return (name) => {
		console.log(`Hello ${prefix} ${name}`);
	};
};

// console.log(greet()('Aki'));
console.log(this);

function myFun() {
	console.log(this);
}

const obj = {
	bol: true,
	myFun: myFun,
};

obj.myFun();
myFun();

app.get('/', (req, res) => {
	console.log('path one');
	res.json(
		'/news - get articles, /news/thetimes - get times articles, /news/theguardian - get guardian articles, /news/telegraph - get telegraph articles'
	);
});

const newspapers = [
	{
		name: 'theguardian',
		address: 'https://www.theguardian.com/environment/climate-crisis',
		base: '',
	},
	{
		name: 'thetimes',
		address: 'https://www.thetimes.co.uk/environment',
		base: '',
	},
	{
		name: 'telegraph',
		address: 'https://www.telegraph.co.uk/climate-change',
		base: 'https://www.telegraph.co.uk',
	},
];

const articles = [];

newspapers.forEach((newspaper) => {
	axios
		.get(newspaper.address)
		.then((response) => {
			const html = response.data;
			const $ = cheerio.load(html);
			$('a:contains("climate")', html).each(function () {
				const title = $(this).text();
				const url = $(this).attr('href');
				articles.push({
					title,
					url: newspaper.base + url,
					source: newspaper.name,
				});
			});
		})
		.catch((err) => console.log(err));
});

app.get('/news', (req, res) => {
	// axios
	// 	.get('https://www.theguardian.com/environment/climate-crisis')
	// 	.then((response) => {
	// 		const html = response.data;
	// 		const $ = cheerio.load(html);
	// 		$('a:contains("climate")', html).each(function () {
	// 			const title = $(this).text();
	// 			const url = $(this).attr('href');
	// 			articles.push({ title, url });
	// 		});
	// 		res.json(articles);
	// 	})
	// 	.catch((err) => console.log(err));
	res.json(articles);
});

app.get('/news/:newspaperId', async (req, res) => {
	const newspaperId = req.params.newspaperId;
	const newspaperAddress = newspapers.filter(
		(newspaper) => newspaper.name === newspaperId
	)[0].address;
	const newspaperBase = newspapers.filter(
		(newspaper) => newspaper.name === newspaperId
	)[0].base;

	await axios(newspaperAddress)
		.then((response) => {
			const html = response.data;
			const $ = cheerio.load(html);
			const specificArticles = [];
			$('a:contains("climate")', html).each(function () {
				const title = $(this).text();
				const url = $(this).attr('href');
				specificArticles.push({
					title,
					url: newspaperBase + url,
					source: newspaperId,
				});
			});
			res.json({ length: specificArticles.length, specificArticles });
		})
		.catch((err) => console.log(err));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is listening at port : ${PORT}`);
});
