import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductList.css'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (error) {
        setError('Erro ao buscar produtos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-list">
      <h2>Catálogo de Produtos</h2>
      <Link to="/create" className="create-button">Criar Novo Produto</Link> 
      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Preço: ${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
