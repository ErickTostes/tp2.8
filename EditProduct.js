import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from './ProductForm'; 

const EditProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError('Erro ao buscar produto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await axios.put(`https://dummyjson.com/products/update/${id}`, updatedProduct);
      navigate('/'); 
    } catch (error) {
      setError('Erro ao atualizar produto. Tente novamente.');
    }
  };

  if (loading) return <p>Carregando produto...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ProductForm product={product} onSubmit={handleUpdateProduct} />
  );
};

export default EditProduct;
