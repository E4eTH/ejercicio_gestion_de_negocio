import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  getPlates, addPlate, updatePlate, deletePlate,
  getCategories, addCategory, deleteCategory,
  getConfig, updateConfig,
} from '../../firebase/firestore';
import { uploadImage } from '../../firebase/cloudinary';

const EMPTY_PLATE = { name: '', description: '', price: '', category: '', available: true, imageUrl: '' };
const EMPTY_CONFIG = { name: '', subtitle: '', hours: '', address: '' };

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [plates, setPlates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [config, setConfig] = useState(EMPTY_CONFIG);

  const [plateForm, setPlateForm] = useState(EMPTY_PLATE);
  const [editingPlate, setEditingPlate] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [configForm, setConfigForm] = useState(EMPTY_CONFIG);
  const [configSaved, setConfigSaved] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const unsubPlates = getPlates(setPlates);
    const unsubCats = getCategories(setCategories);
    const unsubConfig = getConfig((data) => {
      if (data) { setConfig(data); setConfigForm(data); }
    });
    return () => { unsubPlates(); unsubCats(); unsubConfig(); };
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file)); // Preview local instantáneo
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // ── Platos ──────────────────────────────────────────
  const handlePlateSubmit = async (e) => {
    e.preventDefault();
    setUploadingImage(true);

    try {
      let imageUrl = plateForm.imageUrl; // Mantiene la imagen si no cambió al editar

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const price = Number(plateForm.price);
      if (price < 0) {
        alert("El precio no puede ser negativo");
        setUploadingImage(false);
        return;
      }

      const data = {
        ...plateForm,
        price,
        imageUrl,
      };

      if (editingPlate) {
        await updatePlate(editingPlate.id, data);
        setEditingPlate(null);
      } else {
        await addPlate(data);
      }

      setPlateForm(EMPTY_PLATE);
      setImageFile(null);
      setImagePreview('');
    } catch (err) {
      console.error(err);
      alert("Error al guardar plato: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEdit = (plate) => {
    setEditingPlate(plate);
    setPlateForm({ ...plate, price: String(plate.price) });
    setImagePreview(plate.imageUrl || '');
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar este plato?')) await deletePlate(id);
  };

  const handleToggle = (plate) =>
    updatePlate(plate.id, { available: !plate.available });

  // ── Categorías ───────────────────────────────────────
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      await addCategory({ name: newCategory.trim() });
      setNewCategory('');
    } catch (err) {
      console.error(err);
      alert("Error al añadir categoría: " + err.message);
    }
  };

  // ── Config ───────────────────────────────────────────
  const handleConfigSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateConfig(configForm);
      setConfigSaved(true);
      setTimeout(() => setConfigSaved(false), 2500);
    } catch (err) {
      console.error(err);
      alert("Error al guardar configuración: " + err.message);
    }
  };

  // ── Estilos reutilizables ─────────────────────────────
  const input = "w-full bg-[#1a1714] border border-amber-900/30 rounded-xl px-4 py-2.5 text-sm text-[#fdfaf6] placeholder:text-stone-600 focus:outline-none focus:border-amber-700 transition-colors";
  const label = "text-xs uppercase tracking-widest text-stone-400 mb-1 block";
  const btn = "px-4 py-2 rounded-xl text-xs uppercase tracking-widest transition-colors duration-200";

  return (
    <div className="min-h-screen bg-[#1a1714] text-[#fdfaf6] px-4 py-10 selection:bg-amber-100 selection:text-amber-900">
      <div className="max-w-4xl mx-auto space-y-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-0">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-amber-700 mb-1">Panel de gestión</p>
            <h1 className="font-display italic text-4xl text-[#fdfaf6]">La Terraza</h1>
            <p className="text-stone-500 text-sm mt-1">{user?.email}</p>
          </div>
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <button onClick={() => navigate('/')} className={`${btn} border border-amber-900/40 text-stone-400 hover:text-amber-500 hover:border-amber-700 flex-1 sm:flex-none text-center`}>
              Ver carta
            </button>
            <button onClick={handleLogout} className={`${btn} bg-amber-800 hover:bg-amber-700 text-amber-50 flex-1 sm:flex-none text-center`}>
              Cerrar sesión
            </button>
          </div>
        </div>

        <div className="w-full h-px bg-amber-900/30" />

        {/* ── Sección: Platos ── */}
        <section className="space-y-6">
          <h2 className="font-display italic text-2xl text-amber-100">
            {editingPlate ? 'Editando plato' : 'Añadir plato'}
          </h2>

          <form onSubmit={handlePlateSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={label}>Nombre</label>
              <input className={input} placeholder="Ej: Dorada a la sal" required
                value={plateForm.name} onChange={e => setPlateForm({ ...plateForm, name: e.target.value })} />
            </div>
            <div>
              <label className={label}>Categoría</label>
              <select className={input} required
                value={plateForm.category} onChange={e => setPlateForm({ ...plateForm, category: e.target.value })}>
                <option value="">Seleccionar...</option>
                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={label}>Descripción</label>
              <textarea className={`${input} resize-none`} rows={2} placeholder="Descripción breve del plato..."
                value={plateForm.description} onChange={e => setPlateForm({ ...plateForm, description: e.target.value })} />
            </div>

            <div className="sm:col-span-2">
              <label className={label}>Foto del plato</label>
              <div className="flex gap-4 items-start">

                {/* Preview */}
                <div className="w-28 h-28 rounded-xl bg-[#1a1714] border border-amber-900/30 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {imagePreview
                    ? <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                    : <span className="text-stone-700 text-xs text-center px-2">Sin imagen</span>
                  }
                </div>

                {/* Input */}
                <div className="flex-1 flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-sm text-stone-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:uppercase file:tracking-widest file:bg-amber-800 file:text-amber-50 hover:file:bg-amber-700 file:cursor-pointer file:transition-colors"
                  />
                  <p className="text-xs text-stone-600">JPG, PNG o WebP. Se sube al guardar.</p>
                </div>

              </div>
            </div>
            <div>
              <label className={label}>Precio ($ UY)</label>
              <input className={input} type="number" placeholder="0" required min="0"
                value={plateForm.price} onChange={e => setPlateForm({ ...plateForm, price: e.target.value })} />
            </div>
            <div className="flex items-end gap-3">
              <button type="submit" disabled={uploadingImage}
                className={`${btn} bg-amber-800 hover:bg-amber-700 text-amber-50 flex-1 disabled:opacity-50`}>
                {uploadingImage ? 'Subiendo imagen...' : editingPlate ? 'Guardar cambios' : 'Añadir plato'}
              </button>
              {editingPlate && (
                <button type="button" onClick={() => { setEditingPlate(null); setPlateForm(EMPTY_PLATE); }}
                  className={`${btn} border border-amber-900/40 text-stone-400 hover:text-amber-500`}>
                  Cancelar
                </button>
              )}
            </div>
          </form>

          {/* Tabla de platos */}
          <div className="rounded-2xl border border-amber-900/20 overflow-x-auto">
            {plates.length === 0 ? (
              <p className="text-stone-600 text-sm p-6">No hay platos aún.</p>
            ) : (
              <table className="w-full text-sm min-w-[600px] sm:min-w-0">
                <thead className="bg-[#2a2420] text-stone-500 text-xs uppercase tracking-widest">
                  <tr>
                    <th className="text-left px-5 py-3">Plato</th>
                    <th className="text-left px-5 py-3 hidden md:table-cell">Categoría</th>
                    <th className="text-left px-5 py-3">Precio</th>
                    <th className="text-left px-5 py-3">Estado</th>
                    <th className="text-left px-5 py-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {plates.map((plate, i) => (
                    <tr key={plate.id} className={`border-t border-amber-900/10 ${i % 2 === 0 ? 'bg-[#1e1b18]' : 'bg-[#1a1714]'}`}>
                      <td className="px-5 py-3">
                        <div className="font-display italic text-[#fdfaf6]">{plate.name}</div>
                        <div className="text-[10px] text-stone-600 uppercase tracking-widest md:hidden">{plate.category}</div>
                      </td>
                      <td className="px-5 py-3 text-stone-500 hidden md:table-cell">{plate.category}</td>
                      <td className="px-5 py-3 text-amber-700 font-medium">$ {plate.price?.toLocaleString('es-UY')}</td>
                      <td className="px-5 py-3">
                        <button onClick={() => handleToggle(plate)}
                          className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border transition-colors ${plate.available
                            ? 'border-green-800/50 text-green-600 hover:bg-green-900/20'
                            : 'border-amber-800/50 text-amber-700 bg-amber-900/20'}`}>
                          {plate.available ? 'Activo' : 'Pausado'}
                        </button>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex gap-3 justify-end">
                          <button onClick={() => handleEdit(plate)}
                            className="text-xs text-stone-400 hover:text-amber-500 transition-colors uppercase tracking-tighter">Editar</button>
                          <button onClick={() => handleDelete(plate.id)}
                            className="text-xs text-stone-400 hover:text-red-500 transition-colors uppercase tracking-tighter">Borrar</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        <div className="w-full h-px bg-amber-900/30" />

        {/* ── Sección: Categorías ── */}
        <section className="space-y-6">
          <h2 className="font-display italic text-2xl text-amber-100">Categorías</h2>

          <form onSubmit={handleAddCategory} className="flex gap-3">
            <input className={`${input} flex-1`} placeholder="Nueva categoría..."
              value={newCategory} onChange={e => setNewCategory(e.target.value)} />
            <button type="submit" className={`${btn} bg-amber-800 hover:bg-amber-700 text-amber-50`}>
              Añadir
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <div key={cat.id} className="flex items-center gap-2 px-4 py-2 rounded-full border border-amber-900/30 text-sm text-stone-300">
                {cat.name}
                <button onClick={() => deleteCategory(cat.id)}
                  className="text-stone-600 hover:text-red-500 transition-colors text-xs ml-1">✕</button>
              </div>
            ))}
            {categories.length === 0 && <p className="text-stone-600 text-sm">No hay categorías aún.</p>}
          </div>
        </section>

        <div className="w-full h-px bg-amber-900/30" />

        {/* ── Sección: Config del restaurante ── */}
        <section className="space-y-6 pb-16">
          <h2 className="font-display italic text-2xl text-amber-100">Información del restaurante</h2>

          <form onSubmit={handleConfigSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={label}>Nombre</label>
              <input className={input} placeholder="La Terraza"
                value={configForm.name || ''} onChange={e => setConfigForm({ ...configForm, name: e.target.value })} />
            </div>
            <div>
              <label className={label}>Subtítulo</label>
              <input className={input} placeholder="Cocina Mediterránea"
                value={configForm.subtitle || ''} onChange={e => setConfigForm({ ...configForm, subtitle: e.target.value })} />
            </div>
            <div>
              <label className={label}>Dirección</label>
              <input className={input} placeholder="Calle del Mar 14"
                value={configForm.address || ''} onChange={e => setConfigForm({ ...configForm, address: e.target.value })} />
            </div>
            <div>
              <label className={label}>Horario</label>
              <input className={input} placeholder="13:00 – 23:30"
                value={configForm.hours || ''} onChange={e => setConfigForm({ ...configForm, hours: e.target.value })} />
            </div>
            <div className="sm:col-span-2 flex items-center gap-4">
              <button type="submit" className={`${btn} bg-amber-800 hover:bg-amber-700 text-amber-50`}>
                Guardar cambios
              </button>
              {configSaved && <span className="text-xs text-green-500 uppercase tracking-widest">¡Guardado!</span>}
            </div>
          </form>
        </section>

      </div>
    </div>
  );
};

export default DashboardPage;