/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, TrendingUp, DollarSign, Smartphone, Plus, BarChart3, Clock, CheckCircle2, ShoppingBag, Truck } from 'lucide-react';
import { SLIDES } from '../services/storeService';
import { AppRoute } from '../../../../app/routes/types';

interface HeroCarouselProps {
  onNavigate: (route: AppRoute, planId?: number) => void;
}

export default function HeroCarousel({ onNavigate }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto play
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Render mock visual based on slide type
  const renderIllustration = (type: 'orders' | 'benefits' | 'setup') => {
    switch (type) {
      case 'orders':
        return (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full max-w-md mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-2xl p-6 relative overflow-hidden"
          >
            {/* Header Dots */}
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 bg-red-400 rounded-full" />
              <div className="w-3 h-3 bg-yellow-400 rounded-full" />
              <div className="w-3 h-3 bg-green-400 rounded-full" />
              <div className="text-xs text-slate-400 font-mono ml-auto">Painel de Pedidos</div>
            </div>

            {/* List of orders */}
            <div className="flex flex-col gap-3.5">
              {/* Order 1: Active */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="flex justify-between items-center p-4 border border-primary/20 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                  </span>
                  <div>
                    <h5 className="font-sans font-bold text-sm text-slate-800">Novo pedido #302</h5>
                    <p className="text-[11px] text-slate-500 font-mono">1x Burger Gourmet, 1x Coca Cola</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs font-semibold text-primary font-mono bg-primary/10 px-2 py-0.5 rounded-full">3 min</span>
                </div>
              </motion.div>

              {/* Order 2: In Preparation */}
              <div className="flex justify-between items-center p-4 border border-slate-100 rounded-xl bg-slate-50 opacity-85">
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-yellow-500 shrink-0" />
                  <div>
                    <h5 className="font-sans font-medium text-sm text-slate-700">Em preparo #299</h5>
                    <p className="text-[11px] text-slate-500 font-mono">2x Pizza Calabresa</p>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-mono">12 min</span>
              </div>

              {/* Order 3: Shipped */}
              <div className="flex justify-between items-center p-4 border border-slate-100 rounded-xl bg-slate-50 opacity-60">
                <div className="flex items-center gap-3">
                  <Truck size={16} className="text-blue-500 shrink-0" />
                  <div>
                    <h5 className="font-sans font-medium text-sm text-slate-700">Saiu para entrega #298</h5>
                    <p className="text-[11px] text-slate-400 font-mono">1x Hot Dog Especial</p>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-mono">25 min</span>
              </div>

              {/* Order 4: Completed */}
              <div className="flex justify-between items-center p-4 border border-slate-100 rounded-xl bg-slate-50 opacity-45">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <div>
                    <h5 className="font-sans font-medium text-sm text-slate-600">Finalizado #295</h5>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-mono">Hoje</span>
              </div>
            </div>
          </motion.div>
        );

      case 'benefits':
        return (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full max-w-md mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-2xl p-6 relative"
          >
            {/* Header Dots */}
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 bg-blue-400 rounded-full" />
              <div className="w-3 h-3 bg-purple-400 rounded-full" />
              <div className="w-3 h-3 bg-pink-400 rounded-full" />
              <div className="text-xs text-slate-400 font-mono ml-auto">Painel de Crescimento</div>
            </div>

            {/* Benefit Widgets */}
            <div className="grid grid-cols-2 gap-4">
              {/* Highlight box */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="col-span-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-4 text-white shadow-md relative overflow-hidden"
              >
                <div className="absolute right-2 bottom-2 text-white/10">
                  <TrendingUp size={80} />
                </div>
                <p className="text-xs text-emerald-100 font-semibold tracking-wider">Crescimento Mensal</p>
                <h4 className="text-3xl font-display font-extrabold mt-1">+45%</h4>
                <p className="text-[11px] text-emerald-50/80 mt-2">Maior alcance orgânico no Google e redes sociais.</p>
              </motion.div>

              {/* Small widgets */}
              <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl flex flex-col gap-1.5 shadow-sm">
                <div className="p-1.5 bg-amber-500/10 text-amber-600 rounded-lg w-fit">
                  <DollarSign size={16} />
                </div>
                <span className="text-xs font-semibold text-slate-800">Sem setup</span>
                <span className="text-[10px] text-slate-500">Taxa R$ 0 para iniciar</span>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl flex flex-col gap-1.5 shadow-sm">
                <div className="p-1.5 bg-blue-500/10 text-blue-600 rounded-lg w-fit">
                  <Clock size={16} />
                </div>
                <span className="text-xs font-semibold text-slate-800">Suporte VIP</span>
                <span className="text-[10px] text-slate-500">Atendimento humanizado</span>
              </div>
            </div>
          </motion.div>
        );

      case 'setup':
        return (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full max-w-md mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-2xl p-6 relative"
          >
            {/* Header Dots */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-slate-300 rounded-full" />
                <div className="w-3 h-3 bg-slate-300 rounded-full" />
              </div>
              <span className="text-xs text-slate-400 font-mono">Passo a Passo</span>
            </div>

            {/* Stepper Card */}
            <div className="flex flex-col gap-4">
              <div className="p-4 border-2 border-primary/20 rounded-xl bg-primary/5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-sm text-slate-800">Passo 1: Adicionar Produto</h5>
                    <p className="text-[10px] text-slate-500">Cadastre o nome, preço e foto do produto.</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mt-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '33%' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>

              {/* Upload box mock */}
              <div className="flex flex-col gap-2 p-4 border border-dashed border-slate-300 hover:border-primary/50 rounded-xl bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors duration-200">
                <div className="flex flex-col items-center justify-center py-4 text-slate-400 hover:text-primary transition-colors">
                  <Plus size={24} className="mb-1" />
                  <span className="text-xs font-sans font-medium">Carregar foto do produto</span>
                  <span className="text-[9px] font-mono text-slate-400 mt-0.5">JPG ou PNG (Max. 5MB)</span>
                </div>
              </div>

              {/* Buttons mock */}
              <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
                <button className="px-4 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 bg-slate-100 rounded-lg">
                  Pular
                </button>
                <button className="px-4 py-1.5 text-xs font-bold text-white bg-primary hover:bg-primary-dark rounded-lg shadow-sm">
                  Próximo
                </button>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-white to-slate-50/40 pt-10 pb-20 md:pt-14 md:pb-28 overflow-hidden border-b border-slate-100" id="inicio">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative min-h-[500px] md:min-h-[420px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center w-full"
            >
              {/* Text Area */}
              <div className="flex flex-col gap-6 text-left">
                <span className="text-primary font-sans font-extrabold text-xs tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full w-fit">
                  {SLIDES[currentIndex].subtitle}
                </span>
                
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.1]">
                  {SLIDES[currentIndex].title.split('em ').map((part, index) => {
                    if (index === 1) {
                      return (
                        <React.Fragment key={index}>
                          em <span className="text-primary">{part}</span>
                        </React.Fragment>
                      );
                    }
                    if (part.includes('com ')) {
                      const splitCom = part.split('com ');
                      return (
                        <React.Fragment key={index}>
                          {splitCom[0]} com <span className="text-secondary">{splitCom[1]}</span>
                        </React.Fragment>
                      );
                    }
                    if (part.includes('que ')) {
                      const splitQue = part.split('que ');
                      return (
                        <React.Fragment key={index}>
                          {splitQue[0]} que <span className="text-primary">{splitQue[1]}</span>
                        </React.Fragment>
                      );
                    }
                    return part;
                  })}
                </h1>

                <p className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  {SLIDES[currentIndex].description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3.5 pt-4">
                  <button
                    onClick={() => onNavigate('/register', 1)}
                    className="bg-primary hover:bg-primary-dark text-white font-sans font-bold text-base px-8 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl shadow-primary/25 hover:-translate-y-0.5 text-center"
                  >
                    Começar Grátis
                  </button>
                  <a
                    href="#planos"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-sans font-semibold text-base px-8 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md text-center"
                  >
                    Ver Planos
                  </a>
                </div>
              </div>

              {/* Graphic/Illustration Area */}
              <div className="flex items-center justify-center relative min-h-[300px] md:min-h-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-3xl -rotate-1 scale-95" />
                <div className="absolute inset-0 bg-gradient-to-bl from-slate-100 to-white/10 rounded-3xl rotate-1 scale-98" />
                
                {/* Visual content */}
                <div className="relative z-10 w-full">
                  {renderIllustration(SLIDES[currentIndex].illustrationType)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators & Manual Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mt-16 pt-8 border-t border-slate-200/50">
          {/* Dot Indicators */}
          <div className="flex items-center gap-2.5">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 rounded-full h-2.5 ${
                  currentIndex === index ? 'w-9 bg-primary' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={prevSlide}
              className="p-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-primary rounded-xl transition-all shadow-sm hover:shadow hover:scale-105"
              aria-label="Slide anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-primary rounded-xl transition-all shadow-sm hover:shadow hover:scale-105"
              aria-label="Próximo slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
