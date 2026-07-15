import { useEffect, useState } from 'react';
import type { AppRoute } from '../../../../app/routes/types';

type LoginHeaderProps = {
  onNavigate: (route: AppRoute, planId?: number) => void;
};

export function LoginHeader({ onNavigate }: LoginHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    onNavigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`w-full transition-all duration-300 shadow-sm ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md py-3'
          : 'bg-white py-4'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <img
            src="/logo-pedeaqui-traced.png"
            alt="PedeAqui Logo"
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-xs sm:text-sm font-sans font-medium text-slate-600">
            Não tem uma conta?
          </span>
          <button
            onClick={() => onNavigate('/register', 1)}
            className="bg-primary hover:bg-primary-dark text-white font-sans font-semibold text-xs sm:text-sm px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-lg transition-colors shadow-md hover:shadow-lg shadow-primary/10"
          >
            Começar Agora
          </button>
        </div>
      </div>
    </header>
  );
}
