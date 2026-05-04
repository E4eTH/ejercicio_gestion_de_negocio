import { useState, useEffect } from 'react';
import { getCategories, addCategory, deleteCategory } from '../firebase/firestore';

export const useCategories = (includeAll = false) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = getCategories((data) => {
      if (includeAll) {
        setCategories([{ id: 'all', name: 'Todos' }, ...data]);
      } else {
        setCategories(data);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [includeAll]);

  const createCategory = async (name) => {
    try {
      return await addCategory({ name });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeCategory = async (id) => {
    try {
      return await deleteCategory(id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    categories,
    loading,
    error,
    createCategory,
    removeCategory
  };
};
