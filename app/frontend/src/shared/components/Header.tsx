/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Home, LayoutGrid, ShoppingCart, Store, LayoutDashboard, LogOut } from 'lucide-react';
import type { AppRoute } from '../../app/routes/types';
import { getAuthSession, clearAuthSession } from '../../shared/services/authSession';

interface HeaderProps {
  currentPath: AppRoute;
  onNavigate: (route: AppRoute, planId?: number) => void;
  onCartClick?: () => void;
  minimal?: boolean;
  rightAction?: React.ReactNode;
}

export default function Header({
  currentPath,
  onNavigate,
  onCartClick,
  minimal = false,
  rightAction,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [session, setSession] = useState(() => getAuthSession());
  const storeSlug = localStorage.getItem('pedeaqui.store-slug');

  useEffect(() => {
    // Keep session state in sync with actual sessionStorage
    setSession(getAuthSession());
  }, [currentPath]);

  const handleLogout = () => {
    clearAuthSession();
    localStorage.removeItem('pedeaqui.store-slug');
    setSession(null);
    onNavigate('/');
  };

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-sm ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md py-3'
          : 'bg-white py-4'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-2 cursor-pointer group"
          id="header-logo-container"
        >
          <img
            src="/logo-pedeaqui-traced.png"
            alt="PedeAqui Logo"
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </div>

        {minimal && rightAction && (
          <div className="flex items-center gap-2 sm:gap-4">{rightAction}</div>
        )}

        {!minimal && (
          <>
            <nav className="hidden md:flex items-center gap-8 ml-auto mr-8">
              <button
                onClick={() => {
                  if (currentPath === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    onNavigate('/');
                  }
                }}
                className={`flex items-center gap-1.5 font-sans text-sm font-medium transition-colors ${
                  currentPath === '/'
                    ? 'text-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                <Home size={16} />
                Inicio
              </button>

              <button
                onClick={() => onNavigate('/stores')}
                className={`flex items-center gap-1.5 font-sans text-sm font-medium transition-colors ${
                  currentPath === '/stores'
                    ? 'text-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                <Store size={16} />
                Lojas
              </button>

              <button
                onClick={onCartClick}
                className={`flex items-center gap-1.5 font-sans text-sm font-medium transition-colors cursor-pointer ${
                  currentPath === '/market-cart'
                    ? 'text-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                <ShoppingCart size={16} />
                Carrinho
              </button>

              <div className="flex items-center gap-1.5 font-sans text-sm font-medium text-slate-400 cursor-default select-none">
                <LayoutGrid size={16} />
                Vitrine
              </div>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              {session ? (
                <>
                  <button
                    onClick={() => onNavigate(`/storefront/${encodeURIComponent(storeSlug || 'store')}/manage` as any)}
                    className="bg-primary hover:bg-primary-dark text-white font-sans font-semibold text-sm px-5 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg shadow-primary/10 flex items-center gap-1.5"
                  >
                    <LayoutDashboard size={16} />
                    Painel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-semibold text-sm px-5 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <LogOut size={16} />
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onNavigate('/login')}
                    className="bg-primary hover:bg-primary-dark text-white font-sans font-semibold text-sm px-5 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg shadow-primary/10"
                  >
                    Entrar
                  </button>

                  <button
                    onClick={() => {
                      if (currentPath === '/') {
                        document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        sessionStorage.setItem('scrollToPlanos', 'true');
                        onNavigate('/');
                      }
                    }}
                    className="bg-primary hover:bg-primary-dark text-white font-sans font-semibold text-sm px-5 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg shadow-primary/10"
                  >
                    Começar Agora
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 md:hidden">
              {session ? (
                <>
                  <button
                    onClick={() => onNavigate(`/storefront/${encodeURIComponent(storeSlug || 'store')}/manage` as any)}
                    className="bg-primary hover:bg-primary-dark text-white font-sans font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors shadow-md shadow-primary/10"
                  >
                    Painel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onNavigate('/login')}
                  className="bg-primary hover:bg-primary-dark text-white font-sans font-semibold text-xs px-3.5 py-1.5 rounded-lg transition-colors shadow-md shadow-primary/10"
                >
                  Entrar
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
