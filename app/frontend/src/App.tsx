/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

import Header from './shared/components/Header';
import BottomNav from './shared/components/BottomNav';
import Footer from './shared/components/Footer';
import HomePage from './features/store/home-page/components/HomePage';
import { LoginPage } from './features/auth/login/pages/LoginPage';
import { RegisterPage } from './features/auth/register/pages/RegisterPage';
import { StoreListPage } from './features/store/store-list/pages/StoreListPage';
import { localStores } from './features/store/store-list/data/localStores';
import { StorePreconfigurationPage } from './features/store/store-preconfiguration/pages/StorePreconfigurationPage';
import { MarketCartPage } from './features/orders/market-cart/pages/MarketCartPage';
import { useToast } from './features/billing/stripe-status/hooks/useToast';
import { useBillingRetry } from './features/billing/stripe-status/hooks/useBillingRetry';
import { useBillingStatus } from './features/billing/stripe-status/hooks/useBillingStatus';
import RetryOverlay from './features/billing/stripe-status/components/RetryOverlay';
import ToastContainer from './features/billing/stripe-status/components/ToastContainer';
import SuccessPage from './features/billing/stripe-status/pages/SuccessPage';
import FailedPage from './features/billing/stripe-status/pages/FailedPage';
import type { AppRoute } from './app/routes/types';

const getRouteFromLocation = (): AppRoute => {
  const path = window.location.pathname;

  if (
    path === '/login' ||
    path === '/register' ||
    path === '/stores' ||
    path === '/store-preconfiguration' ||
    path === '/market-cart' ||
    path === '/billing/success' ||
    path === '/billing/failed'
  ) {
    return path;
  }

  return '/';
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<AppRoute>(getRouteFromLocation);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [, setSelectedPlanId] = useState<number | null>(() => {
    const saved = localStorage.getItem('selectedPlanId');
    return saved ? parseInt(saved, 10) : null;
  });

  const { status: billingStatus, setStatus: setBillingStatus } = useBillingStatus();
  const { toasts: billingToasts, addToast: addBillingToast, removeToast: removeBillingToast } = useToast();
  const { isProcessingRetry, handleRetry } = useBillingRetry({
    setStatus: setBillingStatus,
    onProcessing: () =>
      addBillingToast('info', 'Processando pagamento', 'Verificando saldo e tentando novamente via Stripe...'),
    onSuccess: () =>
      addBillingToast('success', 'Pagamento concluido!', 'Sua assinatura basica do PedeAqui foi ativada.'),
  });

  useEffect(() => {
    const handlePopState = () => setCurrentPath(getRouteFromLocation());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const navigateTo = (route: AppRoute) => {
    setCurrentPath(route);
    window.history.pushState(null, '', route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (route: AppRoute, planId?: number) => {
    if (route === '/register') {
      const activePlanId = planId || 1;
      setSelectedPlanId(activePlanId);
      localStorage.setItem('selectedPlanId', activePlanId.toString());
    }

    navigateTo(route);
  };

  const handleCartClick = () => {
    navigateTo('/market-cart');
  };

  const renderPage = () => {
    if (currentPath === '/login') {
      return <LoginPage onNavigate={handleNavigate} />;
    }

    if (currentPath === '/register') {
      return <RegisterPage onNavigate={handleNavigate} />;
    }

    if (currentPath === '/stores') {
      return (
        <StoreListPage
          state={{ status: 'success', stores: localStores }}
          onSearchChange={() => undefined}
          onSelectStore={() => {
            triggerToast('Vitrine da loja: essa tela sera conectada em uma proxima etapa.');
          }}
          onRetry={() => undefined}
        />
      );
    }

    if (currentPath === '/store-preconfiguration') {
      return (
        <StorePreconfigurationPage
          onBackToRegister={() => handleNavigate('/register')}
          onSuccess={() => {
            triggerToast('Pre-registro concluido. A proxima etapa sera conectada em seguida.');
          }}
        />
      );
    }

    if (currentPath === '/market-cart') {
      return (
        <MarketCartPage
          addToast={(_type, title, message) => triggerToast(`${title}: ${message}`)}
        />
      );
    }

    if (currentPath === '/billing/success') {
      return (
        <div className="relative">
          <RetryOverlay isVisible={isProcessingRetry} />
          <SuccessPage
            onConfigureStore={() =>
              addBillingToast(
                'success',
                'Configuracao de Loja',
                'Redirecionando para a area de integracao e configuracao...',
              )
            }
            onGoToDashboard={() =>
              addBillingToast('info', 'Carregando Painel', 'Redirecionando para o dashboard central do PedeAqui...')
            }
          />
          <ToastContainer toasts={billingToasts} onRemove={removeBillingToast} />
        </div>
      );
    }

    if (currentPath === '/billing/failed') {
      return (
        <div className="relative">
          <RetryOverlay isVisible={isProcessingRetry} />
          <FailedPage
            onTryAgain={handleRetry}
            onBackToPlans={() =>
              addBillingToast(
                'info',
                'Voltando aos planos',
                'Redirecionando para a selecao de planos de assinatura...',
              )
            }
          />
          <ToastContainer toasts={billingToasts} onRemove={removeBillingToast} />
        </div>
      );
    }

    return <HomePage onNavigate={handleNavigate} />;
  };

  const isHome = currentPath === '/';
  const isMarketCart = currentPath === '/market-cart';
  const isBillingPage = currentPath === '/billing/success' || currentPath === '/billing/failed';
  const showHeader = isHome || isMarketCart || isBillingPage;

  return (
    <div className={`min-h-screen bg-background text-on-surface flex flex-col font-sans selection:bg-primary/20 selection:text-primary-dark ${showHeader ? 'pt-[56px]' : ''}`}>

      {showHeader && (
        <Header
          currentPath={currentPath}
          onNavigate={handleNavigate}
          onCartClick={handleCartClick}
          minimal={isBillingPage}
        />
      )}

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPath}-${billingStatus}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {isHome && <Footer />}

      {(isHome || isMarketCart) && (
        <BottomNav
          currentPath={currentPath}
          onNavigate={handleNavigate}
          onCartClick={handleCartClick}
        />
      )}

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
