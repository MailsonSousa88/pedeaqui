/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Home, Store, ShoppingCart, LayoutGrid } from 'lucide-react';
import type { AppRoute } from '../../app/routes/types';

interface HeaderProps {
  currentPath: AppRoute;
  onNavigate: (route: AppRoute, planId?: number) => void;
  onCartClick: () => void;
}

export default function Header({ currentPath, onNavigate, onCartClick }: HeaderProps) {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-slate-200/80 py-3'
          : 'bg-white border-outline-variant py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-2 cursor-pointer group"
          id="header-logo-container"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmnrgwdnt0j_VUBvlRZvBFnqkZCGcFjW7NarZRMLPt6KzpVMxQ-ROzq5cPANLCYHdMXGSkptRPjWKkvtG5dzJiFPjWYEdeOBMRpNswXuwWUdkNHbYTBCl8AaXxloWiXZSuxdPAf7heK144LmHLdHe9KlCWcClZZVrrchmzXpz4MWXBYqdYluv3ezxE8E8IrAh2lYJH21ldxhWl6Z6-DzrjZmCm3UWUf7wnIpnWY4EUzvIg553pkUBTa2rSwdwXV2v_YWDz4NE6nHV3"
            alt="PedeAqui Logo"
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Desktop Navigation */}
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
            Início
          </button>

          <div
            className="flex items-center gap-1.5 font-sans text-sm font-medium text-slate-400 cursor-default select-none"
          >
            <Store size={16} />
            Lojas
          </div>

          <button
            onClick={onCartClick}
            className="flex items-center gap-1.5 font-sans text-sm font-medium text-slate-500 hover:text-primary transition-colors cursor-pointer"
          >
            <ShoppingCart size={16} />
            Carrinho
          </button>

          <div
            className="flex items-center gap-1.5 font-sans text-sm font-medium text-slate-400 cursor-default select-none"
          >
            <LayoutGrid size={16} />
            Vitrine
          </div>
        </nav>

        {/* Desktop Authentication & Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => onNavigate('/login')}
            className="bg-primary hover:bg-primary-dark text-white font-sans font-semibold text-sm px-5 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg shadow-primary/10"
          >
            Entrar
          </button>
          
          <button
            onClick={() => onNavigate('/register', 1)}
            className="bg-primary hover:bg-primary-dark text-white font-sans font-semibold text-sm px-5 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg shadow-primary/10"
          >
            Começar Agora
          </button>
        </div>

        {/* Mobile Authentication Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => onNavigate('/login')}
            className="bg-primary hover:bg-primary-dark text-white font-sans font-semibold text-xs px-3.5 py-1.5 rounded-lg transition-colors shadow-md shadow-primary/10"
          >
            Entrar
          </button>
        </div>
      </div>
    </header>
  );
}
