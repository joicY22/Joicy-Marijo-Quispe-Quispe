import React from 'react';
import { Sparkles, Music, VolumeX, Edit3 } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  friendName: string;
  onOpenEditFriend: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onTriggerConfetti: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  friendName,
  onOpenEditFriend,
  isPlayingMusic,
  onToggleMusic,
  onTriggerConfetti
}) => {
  const navItems = [
    { id: 'fiesta', label: 'Fiesta & Pastel' },
    { id: 'carta', label: 'Carta al Bro' },
    { id: 'album', label: 'Álbum de Recuerdos' },
    { id: 'regalos', label: 'Caja de Vales' },
    { id: 'juegos', label: 'Globos & Mensajes' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCurrentTab('fiesta')}
            className="text-xl sm:text-2xl font-extrabold tracking-tight text-cyan-400 font-display hover:text-cyan-300 transition-colors whitespace-nowrap text-left"
          >
            ¡Feliz Cumpleaños {friendName}!
          </button>
          <button
            onClick={onOpenEditFriend}
            title="Personalizar nombre"
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors border border-slate-800"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                currentTab === item.id
                  ? 'text-cyan-400 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-400'
                  : 'hover:text-cyan-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onToggleMusic}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all border whitespace-nowrap shrink-0 ${
              isPlayingMusic
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/30'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-cyan-300'
            }`}
          >
            {isPlayingMusic ? <Music className="w-4 h-4 animate-spin" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{isPlayingMusic ? 'Música: On' : 'Poner Música'}</span>
          </button>

          <button
            onClick={onTriggerConfetti}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-md shadow-cyan-500/20 transition-all active:scale-95 whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">¡Celebrar!</span>
          </button>
        </div>
      </div>

      <div className="lg:hidden flex overflow-x-auto border-t border-slate-800 px-4 py-2 gap-2 scrollbar-none bg-slate-950">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
              currentTab === item.id
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
