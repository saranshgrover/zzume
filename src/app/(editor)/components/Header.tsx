'use client'
import SettingsDialog from './SettingsDialog';

export default function Header() {
  return (
    <header className="w-full border-b bg-white/80 backdrop-blur sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold tracking-tight text-gray-900">Resume Builder</span>
        <SettingsDialog />
      </div>
    </header>
  );
} 