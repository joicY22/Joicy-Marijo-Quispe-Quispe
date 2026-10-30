import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Plus, RotateCcw, Send, MessageCircle, ArrowRight, Check } from 'lucide-react';
import { BalloonItem, WishNote, INITIAL_BALLOONS, INITIAL_WISHES } from '../data/birthdayData';
import { soundManager } from '../utils/audio';

interface WishesAndGamesSectionProps {
  friendName: string;
  senderName: string;
  onNavigate: (tab: string) => void;
}

export const WishesAndGamesSection: React.FC<WishesAndGamesSectionProps> = ({
  friendName,
  senderName,
  onNavigate
}) => {
  const [balloons, setBalloons] = useState<BalloonItem[]>(INITIAL_BALLOONS);
  const [revealedMessage, setRevealedMessage] = useState<string | null>(null);
  
  const [wishes, setWishes] = useState<WishNote[]>(INITIAL_WISHES);
  const [newAuthor, setNewAuthor] = useState('');
  const [newWishText, setNewWishText] = useState('');
  const [noteColor, setNoteColor] = useState<string>('cyan');

  const poppedCount = balloons.filter(b => b.popped).length;

  const handlePopBalloon = (id: number, message: string) => {
    soundManager.playPop();
    setBalloons(balloons.map(b => b.id === id ? { ...b, popped: true } : b));
    setRevealedMessage(message);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#0ea5e9', '#3b82f6', '#f59e0b', '#10b981']
    });
  };

  const handleResetBalloons = () => {
    soundManager.playChime();
    setBalloons(INITIAL_BALLOONS);
    setRevealedMessage(null);
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWishText.trim()) return;

    soundManager.playPop();
    const colorClasses: Record<string, string> = {
      cyan: 'bg-slate-900 text-cyan-300 border-cyan-500/50 shadow-cyan-950/40',
      blue: 'bg-slate-900 text-blue-300 border-blue-500/50 shadow-blue-950/40',
      amber: 'bg-slate-900 text-amber-300 border-amber-500/50 shadow-amber-950/40',
      emerald: 'bg-slate-900 text-emerald-300 border-emerald-500/50 shadow-emerald-950/40'
    };

    const rotations = ['-rotate-2', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-3'];
    const rot = rotations[Math.floor(Math.random() * rotations.length)];

    const note: WishNote = {
      id: `w-${Date.now()}`,
      author: newAuthor.trim() || 'Un gran hermano',
      text: newWishText.trim(),
      color: colorClasses[noteColor] || colorClasses.cyan,
      rotation: rot,
      date: 'Ahora mismo'
    };

    setWishes([note, ...wishes]);
    setNewAuthor('');
    setNewWishText('');
  };

  return (
    <div className="space-y-16 pb-16">
      
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">Minijuego</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
              Revienta los Globos de los Buenos Deseos
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              Cada globo contiene un mensaje especial y una bendición para tu nuevo ciclo de vida, {friendName}.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {poppedCount} de {balloons.length} reventados
            </span>
            {poppedCount > 0 && (
              <button
                onClick={handleResetBalloons}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Inflar Nuevos</span>
              </button>
            )}
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 sm:p-12 shadow-inner">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
            {balloons.map((b) => (
              <div key={b.id} className="flex flex-col items-center">
                {!b.popped ? (
                  <button
                    onClick={() => handlePopBalloon(b.id, b.message)}
                    className="group relative cursor-pointer focus:outline-none transition-transform transform hover:scale-110 active:scale-90"
                    title="Toca para reventar"
                  >
                    <div className={`w-18 h-24 sm:w-22 sm:h-28 rounded-full ${b.color} shadow-lg relative flex items-center justify-center animate-float border border-white/20`}>
                      <div className="absolute top-3 left-3 w-4 h-6 bg-white/40 rounded-full blur-[1px]" />
                      <span className="text-white font-black text-sm opacity-90">
                        ⚡
                      </span>
                    </div>
                    <div className="w-0.5 h-12 bg-slate-600 mx-auto" />
                    <span className="text-[10px] text-slate-400 font-semibold block text-center mt-1">
                      ¡Revienta!
                    </span>
                  </button>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 text-center animate-fade-in">
                    <span className="text-3xl mb-1">💥</span>
                    <span className="text-xs font-bold text-cyan-400">¡Descubierto!</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {revealedMessage && (
            <div className="mt-8 max-w-lg mx-auto bg-slate-950 border border-cyan-500/50 rounded-2xl p-6 text-center shadow-2xl animate-fade-in space-y-2">
              <span className="text-2xl">⚡💬</span>
              <h4 className="font-display font-bold text-lg text-white">Mensaje para el Cumpleañero:</h4>
              <p className="text-cyan-300 text-base font-medium italic leading-relaxed">
                "{revealedMessage}"
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">Muro de Amigos</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Tablero de Dedicatorias & Mensajes
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Deja una dedicatoria o felicitación para {friendName} en este muro de honor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-white font-bold font-display text-lg">
              <MessageCircle className="w-5 h-5 text-cyan-400" />
              <span>Publicar Mensaje</span>
            </div>

            <form onSubmit={handleAddWish} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Tu Nombre o Apodo
                </label>
                <input
                  type="text"
                  placeholder="Ej: Carlos, Alex, La banda..."
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Tu Mensaje de Felicitación
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Escribe lo que le deseas hoy..."
                  value={newWishText}
                  onChange={(e) => setNewWishText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Tono del Mensaje
                </label>
                <div className="flex gap-2">
                  {[
                    { id: 'cyan', bg: 'bg-cyan-500' },
                    { id: 'blue', bg: 'bg-blue-600' },
                    { id: 'amber', bg: 'bg-amber-500' },
                    { id: 'emerald', bg: 'bg-emerald-500' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setNoteColor(c.id)}
                      className={`w-7 h-7 rounded-full ${c.bg} border-2 flex items-center justify-center transition-transform ${
                        noteColor === c.id ? 'scale-110 border-white' : 'border-transparent'
                      }`}
                    >
                      {noteColor === c.id && <Check className="w-3.5 h-3.5 text-slate-950 font-bold" />}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Pegar en el Tablero</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-slate-800 relative min-h-[400px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className={`p-5 rounded-2xl shadow-xl border relative transition-transform hover:scale-105 duration-200 ${w.color} ${w.rotation}`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm mx-auto -mt-6 mb-3 border border-cyan-200" />
                  <p className="text-sm sm:text-base leading-relaxed mb-4 font-medium">
                    "{w.text}"
                  </p>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-semibold">
                    <span>— {w.author}</span>
                    <span className="opacity-60 text-[10px]">{w.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800">
        <button
          onClick={() => onNavigate('fiesta')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 text-sm font-semibold"
        >
          <span>Volver al Pastel de Cumpleaños</span>
        </button>

        <button
          onClick={() => onNavigate('carta')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md transition-transform hover:translate-x-1"
        >
          <span>Ir a la Carta al Bro</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
