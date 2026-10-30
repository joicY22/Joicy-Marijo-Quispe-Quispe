import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Check, Edit2, RotateCcw, Trophy, ArrowRight, Copy } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface LetterSectionProps {
  friendName: string;
  senderName: string;
  onNavigate: (tab: string) => void;
}

export const LetterSection: React.FC<LetterSectionProps> = ({
  friendName,
  senderName,
  onNavigate
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [copiedCertificate, setCopiedCertificate] = useState(false);

  const defaultContent = `Hermano ${friendName},

Hoy que cumples otro año de vida, quiero aprovechar este momento para felicitarte y recordarte lo que significa tu amistad. En este mundo es raro encontrar personas con las que puedas reírte hasta que duela el estómago, pero que a la vez estén firmes cuando las cosas se ponen difíciles.

Desde aquellos días del colegio, pasando por cada meta que nos propusimos y cada anécdota que hoy recordamos con orgullo, has demostrado ser un amigo leal, de una sola pieza y un verdadero hermano elegido.

Te deseo el mayor de los éxitos en cada proyecto y meta que te propongas. Que la vida te devuelva multiplicado todo el esfuerzo y la buena vibra que siempre le pones a las cosas. Sabes que no importa a dónde vayamos o qué tan ocupados andemos, mi respeto, apoyo y respaldo siempre estarán contigo.

¡Brindo por ti, por tus victorias y por muchos años más de hermandad!

Tu hermano incondicional,
${senderName}`;

  const [letterText, setLetterText] = useState(defaultContent);

  const handleOpenEnvelope = () => {
    soundManager.playChime();
    setIsOpen(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#38bdf8', '#0ea5e9', '#3b82f6', '#f59e0b']
    });
  };

  const handleCopyCertificate = () => {
    soundManager.playPop();
    const certText = `🏆 DISTINCIÓN DE HONOR: Se proclama a ${friendName} como MEJOR AMIGO Y HERMANO DE VIDA por su inquebrantable lealtad, apoyo y compañerismo en cada batalla. Certificado por: ${senderName}.`;
    navigator.clipboard.writeText(certText);
    setCopiedCertificate(true);
    setTimeout(() => setCopiedCertificate(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">Palabras de Hermano</span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Una Carta al Mejor Amigo
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Porque la verdadera lealtad se valora y se reconoce de frente.
        </p>
      </div>

      {!isOpen ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div
            onClick={handleOpenEnvelope}
            className="group cursor-pointer relative w-80 sm:w-96 h-60 bg-gradient-to-tr from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col justify-between items-center transform hover:scale-105 transition-all duration-300 border border-cyan-500/40"
          >
            <div className="w-16 h-16 rounded-full bg-cyan-950/60 border border-cyan-400 flex items-center justify-center text-cyan-300">
              <Mail className="w-8 h-8" />
            </div>
            
            <div className="text-center space-y-1">
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">Exclusivo Para</span>
              <p className="text-2xl font-bold text-white font-display">{friendName}</p>
            </div>

            <div className="w-12 h-12 rounded-full bg-cyan-500 border-2 border-slate-900 shadow-lg flex items-center justify-center text-slate-950 font-bold">
              ★
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500">Toca el sobre para abrir tu carta</p>
        </div>
      ) : (
        <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-14 shadow-2xl space-y-8">
          
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">Carta de Cumpleaños</h3>
                <span className="text-xs text-slate-400">Para: {friendName} · De: {senderName}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Guardar Cambios' : 'Personalizar Texto'}</span>
              </button>
              {isEditing && (
                <button
                  onClick={() => setLetterText(defaultContent)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-400 text-xs font-medium hover:bg-slate-700 transition-colors"
                  title="Restaurar texto por defecto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar</span>
                </button>
              )}
            </div>
          </div>

          <div className="relative text-slate-200 text-base sm:text-lg leading-relaxed whitespace-pre-line tracking-wide">
            {isEditing ? (
              <textarea
                value={letterText}
                onChange={(e) => setLetterText(e.target.value)}
                rows={12}
                className="w-full bg-slate-950 border border-cyan-500/50 rounded-xl p-4 text-slate-200 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            ) : (
              <p className="selection:bg-cyan-900/60 font-medium">{letterText}</p>
            )}
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs sm:text-sm text-slate-500">
            <span>Fecha: Siempre en el recuerdo</span>
            <span className="font-bold text-slate-300">Firma: {senderName} ✍️</span>
          </div>
        </div>
      )}

      <div className="relative bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border-2 border-cyan-500/40 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500 text-slate-950 shadow-lg mx-auto">
          <Trophy className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">Distinción Oficial de Honor</span>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Título al Mejor Amigo y Hermano de Vida
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
            Por su firmeza, lealtad a prueba de todo y por ser el cómplice número uno en cada aventura.
          </p>
        </div>

        <div className="inline-block px-8 py-3 bg-slate-950 rounded-2xl border border-cyan-500/30 shadow-inner">
          <span className="text-xs uppercase tracking-wider text-slate-500 block">Otorgado con honor a</span>
          <span className="text-2xl sm:text-3xl font-display font-extrabold text-cyan-300">{friendName}</span>
        </div>

        <div className="flex justify-center pt-2">
          <button
            onClick={handleCopyCertificate}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95"
          >
            {copiedCertificate ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedCertificate ? '¡Texto Copiado!' : 'Copiar Reconocimiento'}</span>
          </button>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={() => onNavigate('album')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md transition-transform hover:translate-x-1"
        >
          <span>Siguiente: Ver Álbum de Fotos</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
