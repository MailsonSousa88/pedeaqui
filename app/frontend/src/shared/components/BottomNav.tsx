/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, Store, ShoppingCart, LayoutGrid } from 'lucide-react';
import type { AppRoute } from '../../app/routes/types';

interface BottomNavProps {
  currentPath: AppRoute;
  onNavigate: (route: AppRoute, planId?: number) => void;
  onCartClick: () => void;
}

export default function BottomNav({ currentPath, onNavigate, onCartClick }: BottomNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 py-2 flex justify-around items-center shadow-lg">
      {/* Início Tab */}
      <button
        onClick={() => {
          if (currentPath === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            onNavigate('/');
          }
        }}
        className="flex flex-col items-center gap-1 focus:outline-none transition-colors w-24"
      >
        <div
          className={`flex items-center justify-center transition-all duration-200 ${
            currentPath === '/'
              ? 'text-primary'
              : 'text-slate-500 hover:text-primary'
          }`}
        >
          <Home size={20} />
        </div>
        <span
          className={`text-[10px] font-sans font-bold tracking-tight ${
            currentPath === '/' ? 'text-primary' : 'text-slate-500'
          }`}
        >
          Início
        </span>
      </button>

      {/* Lojas Tab */}
      <button
        onClick={() => {
          // Does nothing as requested: "Não tem nada, caso clique não acontece nada"
        }}
        className="flex flex-col items-center gap-1 focus:outline-none cursor-default w-24"
      >
        <div className="flex items-center justify-center text-slate-400">
          <Store size={20} />
        </div>
        <span className="text-[10px] font-sans font-bold tracking-tight text-slate-400">
          Lojas
        </span>
      </button>

      {/* Carrinho Tab */}
      <button
        onClick={onCartClick}
        className="flex flex-col items-center gap-1 focus:outline-none transition-colors w-24"
      >
        <div className="flex items-center justify-center text-slate-500 hover:text-primary transition-all duration-200">
          <ShoppingCart size={20} />
        </div>
        <span className="text-[10px] font-sans font-bold tracking-tight text-slate-500">
          Carrinho
        </span>
      </button>

      {/* Vitrine Tab */}
      <button
        onClick={() => {
          // Does nothing as requested: "Não tem nada, caso clique não acontece nada"
        }}
        className="flex flex-col items-center gap-1 focus:outline-none cursor-default w-24"
      >
        <div className="flex items-center justify-center text-slate-400">
          <LayoutGrid size={20} />
        </div>
        <span className="text-[10px] font-sans font-bold tracking-tight text-slate-400">
          Vitrine
        </span>
      </button>
    </nav>
  );
}
