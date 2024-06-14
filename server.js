// server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Product = require('./models/Product');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/products', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

app.post('/products', async (req, res) => {
  const { name, price, description } = req.body;
  const newProduct = await Product.create({ name, price, description });
  res.json(newProduct);
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  await Product.update({ name, price, description }, { where: { id } });
  res.json({ message: 'Product updated' });
});

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  await Product.destroy({ where: { id } });
  res.json({ message: 'Product deleted' });
});

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
});
