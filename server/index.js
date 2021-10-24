const path = require('path');
const fs = require('fs');


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const shopsJson = require('./shops.json')
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use('/addShop', (req, res, next) => {
  const body = req.body
	shopsJson.push(body)
	const jsonShops = JSON.stringify(shopsJson);
	console.log(jsonShops)
	fs.writeFile('server/shops.json', jsonShops, (err) => {
		if (err) throw err;
		console.log('The file has been saved!');
	});


	res.end()
});

app.listen(3000, () => console.log('Listening on 3000'));
