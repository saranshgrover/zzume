import Header from './components/Header';
import { HydrationProvider } from '@/components/HydrationProvider';

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#f8f9fa] min-h-screen flex flex-col">
      <HydrationProvider>
        {/* Header */}
        <Header />
        {/* Main content */}
        <main className="flex-1 w-full">{children}</main>
        {/* Footer */}
        <footer className="w-full border-t bg-white/80 py-4 mt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Rezzume. No login. No tracking. Just resumes.
        </footer>
      </HydrationProvider>
    </div>
  );
}
