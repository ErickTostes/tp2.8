import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateProduct.css'; 

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    
    if (!name || !price || !description || !image) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const newProduct = {
        name,
        price,
        description,
        image,
      };

      await axios.post('https://dummyjson.com/products/add', newProduct);
      navigate('/'); 
    } catch (error) {
      setError('Erro ao criar produto. Tente novamente.');
    }
  };

  return (
    <div className="create-product">
      <h2>Criar Novo Produto</h2>
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
        <button type="submit">Criar Produto</button>
      </form>
    </div>
  );
};

export default CreateProduct;
