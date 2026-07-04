/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

import Header from './shared/components/Header';
import BottomNav from './shared/components/BottomNav';
import Footer from './shared/components/Footer';
import HomePage from './features/store/home-page/components/HomePage';
import type { AppRoute } from './app/routes/types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<AppRoute>('/');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(() => {
    const saved = localStorage.getItem('selectedPlanId');
    return saved ? parseInt(saved, 10) : null;
  });

  // Sync virtual routing with browser navigation address to make it feel extremely native
  useEffect(() => {
    // Keep user on the functional Home screen (Início)
    setCurrentPath('/');
    if (window.location.pathname !== '/') {
      window.history.replaceState(null, '', '/');
    }
  }, []);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleNavigate = (route: AppRoute, planId?: number) => {
    if (route === '/login') {
      triggerToast('🔐 Área de Login: A plataforma administrativa para lojistas estará disponível em breve no lançamento oficial!');
      return;
    }
    if (route === '/register') {
      const activePlanId = planId || 1; // Default to basic plan (ID 1) since it's currently the only active plan
      setSelectedPlanId(activePlanId);
      localStorage.setItem('selectedPlanId', activePlanId.toString());

      triggerToast('🚀 Cadastro de Lojas: O assistente de configuração e criação de novas vitrines estará disponível em breve no lançamento oficial!');
      return;
    }
    if (route === '/stores') {
      triggerToast('🛍️ Lojas Parceiras: O catálogo integrado de parceiros estará disponível em breve no lançamento oficial!');
      return;
    }

    setCurrentPath('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCartClick = () => {
    triggerToast('🛒 Carrinho: Esta é uma simulação de vitrine. Os pedidos são finalizados diretamente no WhatsApp da loja parceira!');
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans selection:bg-primary/20 selection:text-primary-dark pt-[72px]">

      {/* Header */}
      <Header currentPath={currentPath} onNavigate={handleNavigate} />

      {/* Main content container with smooth page Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HomePage onNavigate={handleNavigate} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Mobile Bottom Navigation */}
      <BottomNav
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onCartClick={handleCartClick}
      />

      {/* Elegant Toast Notifications using motion */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="fixed bottom-20 md:bottom-8 left-4 right-4 md:left-auto md:right-8 md:max-w-md bg-slate-900 text-white p-4 rounded-xl shadow-2xl z-50 flex items-start gap-3 border border-slate-800"
          >
            <div className="bg-primary/25 text-primary p-1.5 rounded-lg shrink-0 mt-0.5">
              <Sparkles size={16} />
            </div>
            <div className="flex-grow text-xs leading-relaxed text-slate-200">
              {toastMessage}
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
