/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FOOTER_LINKS } from '../../features/store/home-page/services/storeService';
import type { AppRoute } from '../../app/routes/types';

interface FooterProps {
  onNavigate?: (route: AppRoute, planId?: number) => void;
}

const footerLinkClassName =
  'inline-flex items-center font-sans text-[10px] md:text-xs font-normal leading-none text-slate-400 hover:text-white transition-all duration-200 hover:-translate-y-0.5';
const footerButtonClassName = `${footerLinkClassName} w-20 justify-center appearance-none border-0 bg-transparent p-0`;

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pb-16 md:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="flex flex-col items-center justify-center gap-3 md:gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-lg md:text-xl tracking-tight text-white">
              Pede<span className="text-primary">Aqui</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-1.5">
            {FOOTER_LINKS.map((link, index) =>
              link.label === 'Sobre Nós' && link.route && onNavigate ? (
                <a
                  key={index}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(link.route!);
                  }}
                  className={footerLinkClassName}
                >
                  {link.label}
                </a>
              ) : 
              link.route && onNavigate ? (
                <button
                  key={index}
                  type="button"
                  onClick={() => onNavigate(link.route!)}
                  className={footerButtonClassName}
                >
                  {link.label}
                </button>
              ) : (
                <a
                  key={index}
                  href={link.href}
                  className={footerLinkClassName}
                >
                  {link.label}
                </a>
              ),
            )}
          </div>

          {/* Divider */}
          <div className="w-full max-w-xs md:max-w-sm h-px bg-slate-800/60" />

          {/* Copyright info */}
          <div className="flex flex-col items-center gap-0.5 text-center">
            <p className="font-sans text-[8px] md:text-[10px] text-slate-500 px-4">
              © 2026 PedeAqui. Desenvolvido para máxima performance e conversão de vendas.
            </p>
            <p className="font-sans text-[7px] md:text-[9px] text-slate-600 font-mono">
              PedeAqui Wireframe System - Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
