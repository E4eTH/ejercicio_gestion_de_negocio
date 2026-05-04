import React from 'react';
import Button from '../ui/Button';

const PlatesTable = ({ plates, onEdit, onDelete, onToggle }) => {
  if (plates.length === 0) {
    return <p className="text-stone-600 text-sm p-6">No hay platos aún.</p>;
  }

  return (
    <div className="rounded-2xl border border-amber-900/20 overflow-x-auto">
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
                <button onClick={() => onToggle(plate.id, plate.available)}
                  className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border transition-colors ${plate.available
                    ? 'border-green-800/50 text-green-600 hover:bg-green-900/20'
                    : 'border-amber-800/50 text-amber-700 bg-amber-900/20'}`}>
                  {plate.available ? 'Activo' : 'Pausado'}
                </button>
              </td>
              <td className="px-5 py-3 text-right">
                <div className="flex gap-3 justify-end">
                  <button onClick={() => onEdit(plate)}
                    className="text-xs text-stone-400 hover:text-amber-500 transition-colors uppercase tracking-tighter">Editar</button>
                  <button onClick={() => onDelete(plate.id)}
                    className="text-xs text-stone-400 hover:text-red-500 transition-colors uppercase tracking-tighter">Borrar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlatesTable;
