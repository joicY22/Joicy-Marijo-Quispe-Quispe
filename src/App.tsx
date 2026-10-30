import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { LetterSection } from './components/LetterSection';
import { GallerySection } from './components/GallerySection';
import { GiftsSection } from './components/GiftsSection';
import { WishesAndGamesSection } from './components/WishesAndGamesSection';
import { FriendEditModal } from './components/FriendEditModal';
import { soundManager } from './utils/audio';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('fiesta');
  const [friendName, setFriendName] = useState<string>('Mi Gran Bro');
  const [senderName, setSenderName] = useState<string>('Tu Amigo(a) Incondicional');
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  const handleTriggerConfetti = () => {
    soundManager.playPop();
    confetti({
      particleCount: 120,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#0ea5e9', '#3b82f6', '#f59e0b', '#10b981']
    });
  };

  const handleToggleMusic = () => {
    if (isPlayingMusic) {
      soundManager.stopMelody();
      setIsPlayingMusic(false);
    } else {
      soundManager.playHappyBirthday(() => {
        setIsPlayingMusic(false);
      });
      setIsPlayingMusic(true);
    }
  };

  const handleSaveNames = (friend: string, sender: string) => {
    setFriendName(friend);
    setSenderName(sender);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        friendName={friendName}
        onOpenEditFriend={() => setIsEditModalOpen(true)}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
        onTriggerConfetti={handleTriggerConfetti}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentTab === 'fiesta' && (
          <HomeSection
            friendName={friendName}
            onNavigate={setCurrentTab}
            onOpenEdit={() => setIsEditModalOpen(true)}
          />
        )}

        {currentTab === 'carta' && (
          <LetterSection
            friendName={friendName}
            senderName={senderName}
            onNavigate={setCurrentTab}
          />
        )}

        {currentTab === 'album' && (
          <GallerySection
            friendName={friendName}
            onNavigate={setCurrentTab}
          />
        )}

        {currentTab === 'regalos' && (
          <GiftsSection
            friendName={friendName}
            onNavigate={setCurrentTab}
          />
        )}

        {currentTab === 'juegos' && (
          <WishesAndGamesSection
            friendName={friendName}
            senderName={senderName}
            onNavigate={setCurrentTab}
          />
        )}
      </main>

      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-display font-bold text-white text-sm">
              Festejando a {friendName}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Creado con lealtad y hermandad por</span>
            <strong className="text-cyan-400">{senderName}</strong>
            <ShieldCheck className="w-4 h-4 text-cyan-400 inline" />
          </div>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2"
          >
            Personalizar nombres
          </button>
        </div>
      </footer>

      <FriendEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        friendName={friendName}
        senderName={senderName}
        onSave={handleSaveNames}
      />
    </div>
  );
}
