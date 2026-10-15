const express = require('express');
const app = express();
const PORT = 3005;

app.get('/', (req, res) => {
  res.json({ msg: 'hello world!' });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});