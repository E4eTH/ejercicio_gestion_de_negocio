import { useState, useEffect } from 'react';
import { getPlates, addPlate, updatePlate, deletePlate } from '../firebase/firestore';
import { uploadImage } from '../firebase/cloudinary';

export const usePlates = () => {
  const [plates, setPlates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = getPlates((data) => {
      setPlates(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createPlate = async (plateData, imageFile) => {
    try {
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      return await addPlate({ ...plateData, imageUrl });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const editPlate = async (id, plateData, imageFile) => {
    try {
      let imageUrl = plateData.imageUrl;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      return await updatePlate(id, { ...plateData, imageUrl });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removePlate = async (id) => {
    try {
      return await deletePlate(id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const toggleAvailability = async (id, currentStatus) => {
    try {
      return await updatePlate(id, { available: !currentStatus });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    plates,
    loading,
    error,
    createPlate,
    editPlate,
    removePlate,
    toggleAvailability
  };
};
