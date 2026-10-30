import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Flame, Wind, ArrowRight, Gift, Camera, Mail, ShieldCheck } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HomeSectionProps {
  friendName: string;
  onNavigate: (tab: string) => void;
  onOpenEdit: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  friendName,
  onNavigate,
  onOpenEdit
}) => {
  const [candles, setCandles] = useState<boolean[]>([true, true, true, true, true]);
  const [wished, setWished] = useState(false);

  const litCount = candles.filter(c => c).length;

  const handleBlowCandle = (index: number) => {
    if (!candles[index]) return;
    soundManager.playBlowCandle();
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);

    if (newCandles.filter(c => c).length === 0) {
      handleAllBlown();
    }
  };

  const handleBlowAll = () => {
    soundManager.playBlowCandle();
    setCandles([false, false, false, false, false]);
    handleAllBlown();
  };

  const handleAllBlown = () => {
    setWished(true);
    soundManager.playChime();
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#0ea5e9', '#3b82f6', '#f59e0b', '#10b981']
    });
  };

  const handleRelight = () => {
    setCandles([true, true, true, true, true]);
    setWished(false);
  };

  return (
    <div className="space-y-16 pb-16">
      
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800">
        <div className="absolute inset-0">
          <img
            src="/assets/aistudio/WhatsApp_Image_2026-10-29_at_22.32.32__3__ce5b1653.jpeg"
            alt="Foto con mi mejor amigo"
            className="w-full h-full object-cover object-top opacity-30 scale-105 transform hover:scale-100 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 py-16 sm:py-24 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>Festejando a un Hermano de Vida</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white font-display tracking-tight leading-tight">
            ¡Feliz Cumpleaños, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              {friendName}
            </span>!
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Hoy se celebra a lo grande por otro año de vida de un crack. Gracias por la lealtad, por las risas incontables desde el colegio y por ser ese amigo firme que siempre está ahí.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('album')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Camera className="w-5 h-5" />
              <span>Ver Fotos & Recuerdos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('carta')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 shadow-md transition-all"
            >
              <Mail className="w-5 h-5 text-cyan-400" />
              <span>Leer Carta de Amistad</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden p-8 sm:p-12">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">Momento de Deseo</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Pide un Deseo y Sopla las Velas
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Toca cada vela individualmente o pulsa el botón para soplarlas todas juntas con toda la energía.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="relative w-80 sm:w-96 flex flex-col items-center">
            
            <div className="flex justify-center items-end gap-6 mb-1 z-10">
              {candles.map((isLit, idx) => (
                <button
                  key={idx}
                  onClick={() => handleBlowCandle(idx)}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none transition-transform hover:scale-110"
                  title={isLit ? 'Toca para apagar' : 'Vela apagada'}
                >
                  <div className="h-9 flex items-center justify-center">
                    {isLit ? (
                      <div className="w-4 h-7 rounded-full bg-gradient-to-t from-blue-500 via-cyan-400 to-yellow-200 animate-candle-flame shadow-md" />
                    ) : (
                      <div className="w-1 h-3 bg-slate-600 rounded-t-sm" />
                    )}
                  </div>
                  <div className={`w-3.5 h-12 rounded-t-sm border border-slate-700 shadow-inner ${
                    idx % 2 === 0 ? 'bg-gradient-to-b from-sky-400 to-blue-600' : 'bg-gradient-to-b from-cyan-400 to-teal-600'
                  }`} />
                </button>
              ))}
            </div>

            <div className="w-full flex flex-col items-center">
              <div className="w-64 h-20 bg-gradient-to-b from-slate-800 to-slate-850 rounded-t-3xl border-t-4 border-cyan-400 relative shadow-md flex items-center justify-center">
                <div className="absolute top-2 w-56 h-1.5 bg-cyan-500/40 rounded-full" />
                <span className="font-display text-cyan-300 font-extrabold text-lg tracking-wide uppercase">
                  {friendName}
                </span>
              </div>
              <div className="w-80 h-28 bg-gradient-to-b from-slate-850 to-slate-900 rounded-t-2xl border-t-4 border-blue-500 relative shadow-lg flex items-center justify-center overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />
                <div className="flex gap-4 text-2xl">
                  <span>🎂</span>
                  <span>⚡</span>
                  <span>🔥</span>
                  <span>🎉</span>
                </div>
              </div>
              <div className="w-96 h-5 bg-slate-800 rounded-full shadow-lg border-t border-slate-700" />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {litCount > 0 ? (
              <button
                onClick={handleBlowAll}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
              >
                <Wind className="w-5 h-5" />
                <span>Soplar Todas las Velas ({litCount} activas)</span>
              </button>
            ) : (
              <button
                onClick={handleRelight}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold border border-slate-700 shadow-md transition-all active:scale-95"
              >
                <Flame className="w-5 h-5 text-amber-400" />
                <span>Volver a Encender las Velas</span>
              </button>
            )}
          </div>

          {wished && (
            <div className="max-w-md w-full bg-slate-800/90 border border-cyan-500/40 rounded-2xl p-6 text-center space-y-2 shadow-2xl">
              <span className="text-3xl">🔥⚡🏆</span>
              <h3 className="text-xl font-bold text-cyan-300 font-display">¡Deseo de Cumpleaños Concedido!</h3>
              <p className="text-sm text-slate-300">
                Que este nuevo ciclo venga repleto de victorias, metas conquistadas y salud al máximo para ti, {friendName}.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm text-center space-y-1">
          <span className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-display tabular-nums">2021</span>
          <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Amistad Sólida</h4>
          <p className="text-slate-200 text-sm font-bold">Años de lealtad</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm text-center space-y-1">
          <span className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-display tabular-nums">100%</span>
          <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Hermandad</h4>
          <p className="text-slate-200 text-sm font-bold">En las buenas y malas</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm text-center space-y-1">
          <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-display tabular-nums">24/7</span>
          <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Respaldo Total</h4>
          <p className="text-slate-200 text-sm font-bold">Amigo incondicional</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm text-center space-y-1">
          <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-display tabular-nums">#1</span>
          <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Categoría</h4>
          <p className="text-slate-200 text-sm font-bold">Un Hermano Elegido</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white font-display">Secciones del Festejo</h3>
          <span className="text-sm text-slate-400 font-medium">Hecho con mucho aprecio</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            onClick={() => onNavigate('album')}
            className="group cursor-pointer bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/60 shadow-md hover:shadow-cyan-950/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800/50 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white font-display">Álbum de Recuerdos</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Nuestras fotos juntos: graduación de gala, risas espontáneas y anécdotas de verdad.
              </p>
            </div>
            <div className="pt-4 flex items-center text-cyan-400 text-sm font-bold group-hover:translate-x-1 transition-transform">
              <span>Ver fotos</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('carta')}
            className="group cursor-pointer bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-blue-500/60 shadow-md hover:shadow-blue-950/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800/50 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white font-display">Carta al Bro</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Palabras sinceras de agradecimiento por tu lealtad y por ser un hermano de vida.
              </p>
            </div>
            <div className="pt-4 flex items-center text-blue-400 text-sm font-bold group-hover:translate-x-1 transition-transform">
              <span>Leer carta</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('regalos')}
            className="group cursor-pointer bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/60 shadow-md hover:shadow-amber-950/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-800/50 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Gift className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white font-display">Caja de Vales</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Vales canjeables 100% reales: comida épica, noche gamer, comodín dorado y respaldo 24/7.
              </p>
            </div>
            <div className="pt-4 flex items-center text-amber-400 text-sm font-bold group-hover:translate-x-1 transition-transform">
              <span>Abrir vales</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('juegos')}
            className="group cursor-pointer bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/60 shadow-md hover:shadow-emerald-950/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-800/50 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white font-display">Globos & Mensajes</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Revienta globos para mensajes sorpresa y pega tus dedicatorias en el tablero.
              </p>
            </div>
            <div className="pt-4 flex items-center text-emerald-400 text-sm font-bold group-hover:translate-x-1 transition-transform">
              <span>Jugar ahora</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
