const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password123') {
    res.json({ token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VybmFtZSIsImlhdCI6MTY1OTk0NDMyMiwiZXhwIjoxNjU5OTUyODMyfQ.5-6F0o-zV3z0_a_a_0_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a_a' });
  } else {
    res.status(401).json({ error: 'Credenziali errate' });
  }
});

app.get('/', (req, res)=>{
    res.end("Ciao")
})


app.listen(port, () => {
  console.log(`Fake API listening on port ${port}`);
});