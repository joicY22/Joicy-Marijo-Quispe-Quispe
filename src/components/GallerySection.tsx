import React, { useState } from 'react';
import { Camera, Plus, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { MemoryItem, INITIAL_MEMORIES } from '../data/birthdayData';
import { soundManager } from '../utils/audio';

interface GallerySectionProps {
  friendName: string;
  onNavigate: (tab: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  friendName,
  onNavigate
}) => {
  const [memories, setMemories] = useState<MemoryItem[]>(INITIAL_MEMORIES);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCategory, setNewCategory] = useState<'Hermandad' | 'Risas' | 'Aventuras' | 'Elegancia'>('Hermandad');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('');

  const filtered = activeCategory === 'Todos'
    ? memories
    : memories.filter(m => m.category === activeCategory);

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    soundManager.playPop();
    const item: MemoryItem = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      date: newDate || 'Fecha inolvidable',
      category: newCategory,
      description: newDesc || 'Un momento grabado con el mejor amigo.',
      image: newImage || '/assets/aistudio/WhatsApp_Image_2026-10-29_at_22.32.32_9bc0f408.jpeg',
      tag: 'Hermandad'
    };

    setMemories([item, ...memories]);
    setShowAddModal(false);
    setNewTitle('');
    setNewDate('');
    setNewDesc('');
    setNewImage('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">Nuestra Historia en Fotos</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Álbum de Recuerdos & Hermandad
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Cada foto representa momentos reales: desde el 2021, días de traje de gala, risas épicas y lealtad verdadera con {friendName}.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-bold transition-all shadow-md self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Añadir Otra Foto</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl max-w-lg">
        {['Todos', 'Hermandad', 'Elegancia', 'Risas', 'Aventuras'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`py-1.5 px-3.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              soundManager.playPop();
              setSelectedPhoto(item);
            }}
            className="group cursor-pointer bg-slate-900 p-3.5 rounded-2xl shadow-lg border border-slate-800 hover:border-cyan-500/70 hover:shadow-cyan-950/50 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-950 mb-3 border border-slate-800">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md text-cyan-300 text-[10px] px-2.5 py-1 rounded-full font-bold border border-cyan-500/30">
                {item.category}
              </div>
            </div>

            <div className="space-y-1.5 flex-1 flex flex-col justify-between px-1">
              <div>
                <h3 className="font-display font-bold text-white text-base group-hover:text-cyan-400 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs line-clamp-2 mt-1">
                  {item.description}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span>{item.date}</span>
                <span className="text-cyan-400 font-semibold group-hover:underline">Ampliar foto</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-800 relative animate-fade-in flex flex-col md:flex-row">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-950/80 text-white flex items-center justify-center hover:bg-slate-800 transition-colors border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:w-1/2 max-h-[70vh] bg-slate-950 flex items-center justify-center p-2">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-h-[68vh] w-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-cyan-400 uppercase tracking-wider">{selectedPhoto.category}</span>
                  <span>{selectedPhoto.date}</span>
                </div>
                <h3 className="text-2xl font-display font-extrabold text-white">
                  {selectedPhoto.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {selectedPhoto.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-2 text-cyan-400 text-sm font-semibold">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Hermandad real con {friendName}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-5 text-white">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xl text-white">Añadir Nueva Foto</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMemory} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Título del Recuerdo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Salida épica, El concierto..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Fecha o Año
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: 2024, Graduación"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Categoría
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Hermandad">Hermandad</option>
                    <option value="Elegancia">Elegancia</option>
                    <option value="Risas">Risas</option>
                    <option value="Aventuras">Aventuras</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Subir Foto desde tu Dispositivo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Anécdota o Mensaje
                </label>
                <textarea
                  rows={3}
                  placeholder="Cuenta qué pasó ese día..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-semibold text-slate-400 hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md"
                >
                  Guardar en el Álbum
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <button
          onClick={() => onNavigate('regalos')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md transition-transform hover:translate-x-1"
        >
          <span>Siguiente: Abrir Caja de Vales & Regalos</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
