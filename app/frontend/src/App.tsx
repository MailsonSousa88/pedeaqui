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
import { ForgotPasswordPage } from './features/auth/forgot-password/pages/ForgotPasswordPage';
import { RegisterPage } from './features/auth/register/pages/RegisterPage';
import { StoreListPage } from './features/store/store-list/pages/StoreListPage';
import { localStores } from './features/store/store-list/data/localStores';
import { StorefrontPage } from './features/store/storefront/pages/StorefrontPage';
import { StorefrontManagementPage } from './features/store/storefront/pages/StorefrontManagementPage';
import { StorePreconfigurationPage } from './features/store/store-preconfiguration/pages/StorePreconfigurationPage';
import { CheckoutReviewPage } from './features/billing/checkout-review/pages/CheckoutReviewPage';
import { getCreatedStore } from './features/billing/checkout-review/services/checkoutReviewService';
import type { CreatedStore } from './features/billing/checkout-review/types/checkoutReview';
import SuccessPage from './features/billing/stripe-status/pages/SuccessPage';
import FailedPage from './features/billing/stripe-status/pages/FailedPage';
import type { AppRoute } from './app/routes/types';
import { MarketCartPage } from './features/orders/market-cart/pages/MarketCartPage';
import { ProductDetailPage } from './features/orders/product-detail/pages/ProductDetailPage';

const decodeRouteSegment = (segment: string) => {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
};

const getRouteFromLocation = (): AppRoute => {
  const path = window.location.pathname;

  if (path.startsWith('/storefront/')) {
    return path as `/storefront/${string}`;
  }

  if (path.startsWith('/lojas/')) {
    return path as `/lojas/${string}`;
  }

  if (
    path === '/login' ||
    path === '/forgot-password' ||
    path === '/forgot-password/reset' ||
    path === '/register' ||
    path === '/stores' ||
    path === '/storefront' ||
    path === '/store-preconfiguration' ||
    path === '/market-cart' ||
    path === '/billing/checkout' ||
    path === '/billing/success' ||
    path === '/billing/failed'
  ) {
    return path;
  }

  return '/';
};

const getStorefrontSlug = (route: AppRoute) => {
  if (/^\/storefront\/[^/]+\/manage\/?$/.test(route)) {
    return undefined;
  }

  if (route.startsWith('/storefront/')) {
    return decodeRouteSegment(route.slice('/storefront/'.length));
  }

  const publicStoreMatch = route.match(/^\/lojas\/([^/]+)\/?$/);
  return publicStoreMatch ? decodeRouteSegment(publicStoreMatch[1]) : undefined;
};

const getStorefrontManagementSlug = (route: AppRoute) => {
  const managementMatch = route.match(/^\/storefront\/([^/]+)\/manage\/?$/);
  return managementMatch ? decodeRouteSegment(managementMatch[1]) : undefined;
};

const getProductDetailParams = (route: AppRoute) => {
  const productDetailMatch = route.match(/^\/lojas\/([^/]+)\/produtos\/([^/]+)\/?$/);

  if (!productDetailMatch) {
    return null;
  }

  return {
    productId: decodeRouteSegment(productDetailMatch[2]),
    storeSlug: decodeRouteSegment(productDetailMatch[1]),
  };
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<AppRoute>(getRouteFromLocation);
  const [cartKey, setCartKey] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [createdStore, setCreatedStore] = useState<CreatedStore | null>(getCreatedStore);
  const [activationError, setActivationError] = useState<string | null>(null);
  const [, setSelectedPlanId] = useState<number | null>(() => {
    const saved = localStorage.getItem('selectedPlanId');
    return saved ? parseInt(saved, 10) : null;
  });

  useEffect(() => {
    const handlePopState = () => setCurrentPath(getRouteFromLocation());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (currentPath === '/' && sessionStorage.getItem('scrollToPlanos') === 'true') {
      sessionStorage.removeItem('scrollToPlanos');
      setTimeout(() => {
        document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [currentPath]);

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
    if (currentPath === '/market-cart') {
      setCartKey((prev) => prev + 1);
    } else {
      navigateTo('/market-cart');
    }
  };

  const renderPage = () => {
    const productDetailParams = getProductDetailParams(currentPath);

    if (currentPath === '/login') {
      return <LoginPage onNavigate={handleNavigate} />;
    }

    if (currentPath === '/forgot-password' || currentPath === '/forgot-password/reset') {
      return <ForgotPasswordPage onNavigate={handleNavigate} />;
    }

    if (currentPath === '/register') {
      return <RegisterPage onNavigate={handleNavigate} />;
    }

    if (currentPath === '/stores') {
      return (
        <StoreListPage
          state={{ status: 'success', stores: localStores }}
          onSearchChange={() => undefined}
          onSelectStore={(storeId) => {
            handleNavigate(`/storefront/${encodeURIComponent(storeId)}`);
          }}
          onRetry={() => undefined}
        />
      );
    }

    if (productDetailParams) {
      return (
        <ProductDetailPage
          onBackToStore={() =>
            handleNavigate(`/lojas/${encodeURIComponent(productDetailParams.storeSlug)}`)
          }
          productId={productDetailParams.productId}
          storeSlug={productDetailParams.storeSlug}
        />
      );
    }

    const managementSlug = getStorefrontManagementSlug(currentPath);

    if (managementSlug) {
      return (
        <StorefrontManagementPage
          onBackToPublic={() =>
            handleNavigate(`/storefront/${encodeURIComponent(managementSlug)}`)
          }
          onLogin={() => handleNavigate('/login')}
          onOpenCart={handleCartClick}
          onSelectProduct={(productId) =>
            navigateTo(
              `/lojas/${encodeURIComponent(managementSlug)}/produtos/${encodeURIComponent(productId)}`,
            )
          }
          slug={managementSlug}
        />
      );
    }

    if (
      currentPath === '/storefront' ||
      currentPath.startsWith('/storefront/') ||
      currentPath.startsWith('/lojas/')
    ) {
      const storeSlug = getStorefrontSlug(currentPath);

      return (
        <StorefrontPage
          onBackToStores={() => handleNavigate('/stores')}
          onOpenCart={handleCartClick}
          onSelectProduct={(productId) => {
            if (!storeSlug) {
              return;
            }

            navigateTo(
              `/lojas/${encodeURIComponent(storeSlug)}/produtos/${encodeURIComponent(productId)}`,
            );
          }}
          slug={storeSlug}
        />
      );
    }

    if (currentPath === '/store-preconfiguration') {
      return (
        <StorePreconfigurationPage
          onBackToRegister={() => handleNavigate('/register')}
          onSuccess={() => handleNavigate('/billing/checkout')}
        />
      );
    }

    if (currentPath === '/billing/checkout') {
      return (
        <CheckoutReviewPage
          onError={(message) => {
            setActivationError(message);
            handleNavigate('/billing/failed');
          }}
          onSuccess={(store) => {
            setCreatedStore(store);
            localStorage.setItem('pedeaqui.store-slug', store.slug);
            setActivationError(null);
            handleNavigate('/billing/success');
          }}
        />
      );
    }

    if (currentPath === '/market-cart') {
      return (
        <MarketCartPage
          key={`cart-${cartKey}`}
          addToast={(_type, title, message) => triggerToast(`${title}: ${message}`)}
        />
      );
    }

    if (currentPath === '/billing/success') {
      return (
        <SuccessPage
          onConfigureStore={() =>
            handleNavigate(
              createdStore?.slug
                ? `/storefront/${encodeURIComponent(createdStore.slug)}/manage`
                : '/storefront',
            )
          }
        />
      );
    }

    if (currentPath === '/billing/failed') {
      return (
        <FailedPage
          errorMessage={activationError ?? undefined}
          onTryAgain={() => handleNavigate('/billing/checkout')}
          onBackToPlans={() => handleNavigate('/store-preconfiguration')}
        />
      );
    }

    return <HomePage onNavigate={handleNavigate} />;
  };

  const isHome = currentPath === '/';
  const isMarketCart = currentPath === '/market-cart';
  const isBillingPage = currentPath === '/billing/success' || currentPath === '/billing/failed';
  const isStorefront = currentPath.startsWith('/storefront') || currentPath.startsWith('/lojas');
  const showHeader = isHome || isMarketCart || isBillingPage || currentPath === '/stores' || isStorefront;

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
            key={currentPath}
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

      {(isHome || isMarketCart || currentPath === '/stores') && (
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
