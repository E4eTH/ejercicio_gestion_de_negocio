import React, { useState } from 'react';
import { usePlates } from '../../hooks/usePlates';
import { useCategories } from '../../hooks/useCategories';
import { useConfig } from '../../hooks/useConfig';
import AdminHeader from '../../components/admin/AdminHeader';
import PlateForm from '../../components/admin/PlateForm';
import PlatesTable from '../../components/admin/PlatesTable';
import CategoryManager from '../../components/admin/CategoryManager';
import ConfigForm from '../../components/admin/ConfigForm';

const DashboardPage = () => {
  const { plates, createPlate, editPlate, removePlate, toggleAvailability } = usePlates();
  const { categories, createCategory, removeCategory } = useCategories();
  const { config, saveConfig } = useConfig();

  const [editingPlate, setEditingPlate] = useState(null);

  const handleSavePlate = async (plateData, imageFile) => {
    if (editingPlate) {
      await editPlate(editingPlate.id, plateData, imageFile);
      setEditingPlate(null);
    } else {
      await createPlate(plateData, imageFile);
    }
  };

  const handleEditPlate = (plate) => {
    setEditingPlate(plate);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#1a1714] text-[#fdfaf6] px-4 py-10 selection:bg-amber-100 selection:text-amber-900">
      <div className="max-w-4xl mx-auto space-y-16">
        
        <AdminHeader />

        <div className="w-full h-px bg-amber-900/30" />

        <PlateForm 
          categories={categories} 
          onSave={handleSavePlate} 
          editingPlate={editingPlate}
          onCancel={() => setEditingPlate(null)}
        />

        <PlatesTable 
          plates={plates} 
          onEdit={handleEditPlate} 
          onDelete={removePlate} 
          onToggle={toggleAvailability} 
        />

        <div className="w-full h-px bg-amber-900/30" />

        <CategoryManager 
          categories={categories} 
          onCreate={createCategory} 
          onDelete={removeCategory} 
        />

        <div className="w-full h-px bg-amber-900/30" />

        <ConfigForm 
          initialConfig={config} 
          onSave={saveConfig} 
        />

      </div>
    </div>
  );
};

export default DashboardPage;