import React, { useState } from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface FriendEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  friendName: string;
  senderName: string;
  onSave: (friend: string, sender: string) => void;
}

export const FriendEditModal: React.FC<FriendEditModalProps> = ({
  isOpen,
  onClose,
  friendName,
  senderName,
  onSave
}) => {
  const [fName, setFName] = useState(friendName);
  const [sName, setSName] = useState(senderName);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fName.trim()) return;
    soundManager.playChime();
    onSave(fName.trim(), sName.trim() || 'Tu hermano de vida');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-6 text-white">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/60 text-cyan-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-white">Personalizar Nombres</h3>
              <p className="text-xs text-slate-400">Adapta el nombre de tu amigo y el tuyo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Nombre de tu Mejor Amigo (Cumpleañero)
            </label>
            <input
              type="text"
              required
              value={fName}
              onChange={(e) => setFName(e.target.value)}
              placeholder="Ej: David, Alex, Mateo..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Tu Nombre (Quien lo Felicita)
            </label>
            <input
              type="text"
              value={sName}
              onChange={(e) => setSName(e.target.value)}
              placeholder="Ej: Joicy, Tu bro incondicional..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-400 hover:bg-slate-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md inline-flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Guardar y Aplicar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
