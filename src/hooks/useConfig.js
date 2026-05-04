import { useState, useEffect } from 'react';
import { getConfig, updateConfig } from '../firebase/firestore';

export const useConfig = () => {
  const [config, setConfig] = useState({ name: 'La Terraza', subtitle: 'Cocina Mediterránea' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = getConfig((data) => {
      if (data) setConfig(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const saveConfig = async (newConfig) => {
    try {
      await updateConfig(newConfig);
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    config,
    loading,
    error,
    saveConfig
  };
};
