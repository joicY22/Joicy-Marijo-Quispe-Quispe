import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, CheckCircle2, ArrowRight, Utensils, PhoneCall, Gamepad2, RotateCcw } from 'lucide-react';
import { GiftItem, INITIAL_GIFTS } from '../data/birthdayData';
import { soundManager } from '../utils/audio';

interface GiftsSectionProps {
  friendName: string;
  onNavigate: (tab: string) => void;
}

export const GiftsSection: React.FC<GiftsSectionProps> = ({
  friendName,
  onNavigate
}) => {
  const [gifts, setGifts] = useState<GiftItem[]>(INITIAL_GIFTS);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Utensils': return <Utensils className="w-8 h-8 text-cyan-400" />;
      case 'PhoneCall': return <PhoneCall className="w-8 h-8 text-blue-400" />;
      case 'Gamepad2': return <Gamepad2 className="w-8 h-8 text-indigo-400" />;
      default: return <Sparkles className="w-8 h-8 text-amber-400" />;
    }
  };

  const handleRevealGift = (id: string) => {
    soundManager.playChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#0ea5e9', '#3b82f6', '#f59e0b']
    });

    setGifts(gifts.map(g => g.id === id ? { ...g, revealed: true } : g));
  };

  const handleRevealAll = () => {
    soundManager.playChime();
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#38bdf8', '#0ea5e9', '#3b82f6', '#f59e0b', '#10b981']
    });
    setGifts(gifts.map(g => ({ ...g, revealed: true })));
  };

  const handleReset = () => {
    soundManager.playPop();
    setGifts(INITIAL_GIFTS);
  };

  const revealedCount = gifts.filter(g => g.revealed).length;

  return (
    <div className="space-y-12 pb-16">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">Vales Especiales de Hermandad</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Caja de Vales & Regalos
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Toca cada caja para abrirla y desbloquear vales 100% canjeables que puedes cobrarme cuando quieras.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {revealedCount < gifts.length ? (
            <button
              onClick={handleRevealAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Abrir Todos los Vales</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-semibold transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Volver a Envolver</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {gifts.map((gift) => (
          <div
            key={gift.id}
            onClick={() => !gift.revealed && handleRevealGift(gift.id)}
            className={`relative rounded-3xl transition-all duration-500 border ${
              gift.revealed
                ? 'bg-slate-900 border-cyan-500/50 shadow-xl p-8'
                : 'cursor-pointer bg-gradient-to-br from-slate-900 to-slate-850 border-slate-800 shadow-xl p-8 hover:scale-[1.02] hover:border-cyan-500/60'
            }`}
          >
            {!gift.revealed ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 shadow-xl animate-float">
                    <Gift className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                    Abrir
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-display font-bold text-white">
                    Caja Sorpresa de Amistad
                  </h3>
                  <p className="text-xs text-slate-400">
                    Haz clic para abrir el vale exclusivo para {friendName}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-sm">
                      {getIcon(gift.iconName)}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block">
                        {gift.badge}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                        {gift.title}
                      </h3>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  {gift.message}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
                  <span>Otorgado a: <strong className="text-white">{friendName}</strong></span>
                  <span className="text-cyan-400 font-bold">100% Garantizado</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-700 via-cyan-600 to-teal-600 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs uppercase tracking-widest font-extrabold opacity-80">Pacto de Bro</span>
          <h3 className="text-2xl sm:text-3xl font-display font-extrabold">
            Compromiso Firme e Inquebrantable
          </h3>
          <p className="text-sm font-medium opacity-90 max-w-lg">
            Cualquiera de estos vales es válido los 365 días del año. Solo toma captura o manda mensaje y se cumple.
          </p>
        </div>

        <button
          onClick={() => onNavigate('juegos')}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-cyan-300 font-bold text-sm shadow-lg whitespace-nowrap transition-transform hover:scale-105 active:scale-95"
        >
          <span>Ir a Globos & Mensajes</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
