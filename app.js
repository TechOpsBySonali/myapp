const express = require('express');
const app = express();
const port = process.env.PORT || 80;

app.get('/', (req, res) => {
  res.send('🚀 Hello from Jenkins + AKS CI/CD Pipeline on Azure!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
