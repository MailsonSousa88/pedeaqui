import { useEffect, useState } from 'react';
import type { AppRoute } from '../../../../app/routes/types';

type RegisterHeaderProps = {
  onNavigate: (route: AppRoute, planId?: number) => void;
};

export function RegisterHeader({ onNavigate }: RegisterHeaderProps) {
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
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 shadow-sm ${
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
            <button
              onClick={() => onNavigate('/login')}
              className="bg-primary hover:bg-primary-dark text-white font-sans font-semibold text-xs sm:text-sm px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-lg transition-colors shadow-md hover:shadow-lg shadow-primary/10"
            >
              Entrar
            </button>
          </div>
        </div>
      </header>
      <div aria-hidden="true" className="h-[61px] shrink-0 sm:h-[73px] md:h-[81px]" />
    </>
  );
}
