import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductForm.css'; 

const ProductForm = ({ product, onSubmit }) => {
  const [name, setName] = useState(product ? product.name : '');
  const [price, setPrice] = useState(product ? product.price : '');
  const [description, setDescription] = useState(product ? product.description : '');
  const [image, setImage] = useState(product ? product.image : '');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setImage(product.image);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    
    if (!name || !price || !description || !image) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    onSubmit({ name, price, description, image });
  };

  return (
    <div className="product-form">
      <h2>{product ? 'Editar Produto' : 'Criar Novo Produto'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Preço:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>URL da Imagem:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit">{product ? 'Atualizar Produto' : 'Criar Produto'}</button>
      </form>
    </div>
  );
};

export default ProductForm;
