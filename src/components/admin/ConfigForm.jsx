import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const ConfigForm = ({ initialConfig, onSave }) => {
  const [form, setForm] = useState(initialConfig);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(initialConfig);
  }, [initialConfig]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <section className="space-y-6 pb-16">
      <h2 className="font-display italic text-2xl text-amber-100">Información del restaurante</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input 
          label="Nombre" 
          placeholder="La Terraza"
          value={form.name || ''} 
          onChange={e => setForm({ ...form, name: e.target.value })} 
        />
        <Input 
          label="Subtítulo" 
          placeholder="Cocina Mediterránea"
          value={form.subtitle || ''} 
          onChange={e => setForm({ ...form, subtitle: e.target.value })} 
        />
        <Input 
          label="Dirección" 
          placeholder="Calle del Mar 14"
          value={form.address || ''} 
          onChange={e => setForm({ ...form, address: e.target.value })} 
        />
        <Input 
          label="Horario" 
          placeholder="13:00 – 23:30"
          value={form.hours || ''} 
          onChange={e => setForm({ ...form, hours: e.target.value })} 
        />
        
        <div className="sm:col-span-2 flex items-center gap-4">
          <Button type="submit">Guardar cambios</Button>
          {saved && <span className="text-xs text-green-500 uppercase tracking-widest">¡Guardado!</span>}
        </div>
      </form>
    </section>
  );
};

export default ConfigForm;
