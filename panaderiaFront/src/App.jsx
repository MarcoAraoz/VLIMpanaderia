// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:5000/products');
    setProducts(response.data);
  };

  const addProduct = async () => {
    const response = await axios.post('http://localhost:5000/products', { name, price, description });
    setProducts([...products, response.data]);
    setName('');
    setPrice('');
    setDescription('');
  };

  const updateProduct = async () => {
    await axios.put(`http://localhost:5000/products/${editProduct.id}`, { name, price, description });
    fetchProducts();
    setEditProduct(null);
    setName('');
    setPrice('');
    setDescription('');
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    fetchProducts();
  };

  const edit = (product) => {
    setEditProduct(product);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
  };

  return (
    <div>
      <h1>Gestor de Panadería</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      {editProduct ? (
        <button onClick={updateProduct}>Update Product</button>
      ) : (
        <button onClick={addProduct}>Add Product</button>
      )}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} (${product.price}) - {product.description} 
            <button onClick={() => edit(product)}>Edit</button>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
