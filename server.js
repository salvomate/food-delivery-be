const express = require('express');
const path = require("path");
const cors = require('cors');
const fs = require("fs");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {
  console.log(req);
  const { username, password } = req.body;
  if (username === 'admin' && password === 'pa123') {
    res.json({ token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VybmFtZSIsImlhdCI6MTY1OTk0NDMyMiwiZXhwIjoxNjU5OTUyODMyfQ.5-6F0o-zV3z0_a_a_0_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a' });
  } else {
    res.status(401).json({ error: 'Credenziali errate' });
  }
});

app.get('/shops', (req, res)=>{
    fs.readFile(process.cwd()+'/data/shops.json', (err, data) => {
      if (err) throw err;
      res.send(JSON.parse(data));
    });
})

app.get('/shops/:id', (req, res) => {
		const shopId = req.params.id;
		fs.readFile(path.join(process.cwd(), 'data', 'shops.json'), (err, data) => {
			if (err) throw err;
			const shops = JSON.parse(data);
			const shop = shops.find(s => +s.id === +shopId);
			if (shop) {
				res.send(shop);
			} else {
				res.status(404).send({ error: 'Shop non trovato' });
			}
		});
});

app.post('/shops', (req, res) => {

  const newShop = req.body;

  fs.readFile(path.join(process.cwd(), 'data', 'shops.json'), (err, data) => {
    if (err) throw err;
    let shops = JSON.parse(data);
  
    const maxId = shops.reduce((max, shop) => Math.max(max, parseInt(shop.id, 10)), 0);
    newShop.id = maxId + 1;
  
    // Aggiungi il nuovo shop alla lista
    shops.push(newShop);
  
    // Scrivi la lista aggiornata nel file JSON
    fs.writeFile(path.join(process.cwd(), 'data', 'shops.json'), JSON.stringify(shops, null, 2), (err) => {
        if (err) throw err;
        res.status(201).send(newShop);
    });

});
  


})





app.listen(port, () => {
  console.log(`Fake API listening on port ${port}`);
});