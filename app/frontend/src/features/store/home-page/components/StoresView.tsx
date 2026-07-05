/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Store, Search, Star, Sparkles } from 'lucide-react';
import { AppRoute } from '../../../../app/routes/types';

interface StoresViewProps {
  onBack: () => void;
  onNavigate: (route: AppRoute, planId?: number) => void;
}

const MOCK_STORES = [
  {
    id: 1,
    name: 'Burgers & Fries S/A',
    category: 'Hambúrgueres',
    rating: 4.9,
    deliveryTime: '20-30 min',
    deliveryFee: 'Grátis',
    image: '🍔',
    bgColor: 'bg-amber-100',
  },
  {
    id: 2,
    name: 'Bella Italia Pizzeria',
    category: 'Pizzaria',
    rating: 4.8,
    deliveryTime: '30-45 min',
    deliveryFee: 'R$ 4,99',
    image: '🍕',
    bgColor: 'bg-red-100',
  },
  {
    id: 3,
    name: 'Doce Sonho Confeitaria',
    category: 'Sobremesas e Doces',
    rating: 4.7,
    deliveryTime: '15-25 min',
    deliveryFee: 'Grátis',
    image: '🍰',
    bgColor: 'bg-pink-100',
  },
  {
    id: 4,
    name: 'Sushi Real Gourmet',
    category: 'Comida Japonesa',
    rating: 4.9,
    deliveryTime: '35-50 min',
    deliveryFee: 'R$ 6,00',
    image: '🍣',
    bgColor: 'bg-slate-100',
  },
  {
    id: 5,
    name: 'Hortifruti da Terra',
    category: 'Mercearia e Orgânicos',
    rating: 4.6,
    deliveryTime: '40-60 min',
    deliveryFee: 'R$ 3,50',
    image: '🥦',
    bgColor: 'bg-emerald-100',
  },
  {
    id: 6,
    name: 'Café do Bosque',
    category: 'Cafeteria',
    rating: 4.8,
    deliveryTime: '10-20 min',
    deliveryFee: 'Grátis',
    image: '☕',
    bgColor: 'bg-amber-50',
  },
];

export default function StoresView({ onBack, onNavigate }: StoresViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');

  const categories = ['Todas', 'Hambúrgueres', 'Pizzaria', 'Sobremesas e Doces', 'Comida Japonesa', 'Mercearia e Orgânicos', 'Cafeteria'];

  const filteredStores = MOCK_STORES.filter((store) => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Todas' || store.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto my-8 px-4 sm:px-6 lg:px-8"
    >
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm mb-2"
          >
            <ArrowLeft size={16} />
            Voltar para Home
          </button>
          <h2 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight flex items-center gap-2">
            Lojas Parceiras <Sparkles className="text-primary w-5 h-5 animate-pulse" />
          </h2>
          <p className="text-sm text-slate-500">Conheça as lojas ativas que já utilizam a rede PedeAqui.</p>
        </div>

        <button
          onClick={() => onNavigate('/register', 1)}
          className="bg-primary hover:bg-primary-dark text-white font-sans font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-primary/10 self-stretch sm:self-auto text-center"
        >
          Cadastrar minha Loja
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 shadow-sm mb-8 space-y-4">
        {/* Search bar */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Buscar lojas por nome ou especialidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-primary bg-slate-50/50"
          />
        </div>

        {/* Categories slider */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none scroll-smooth">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-sm shadow-primary/10'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Stores */}
      {filteredStores.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-500">
          <Store className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h4 className="font-sans font-bold text-slate-700">Nenhuma loja encontrada</h4>
          <p className="text-sm mt-1">Experimente mudar o termo de busca ou selecionar outra categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all p-5 flex gap-4 group cursor-pointer"
            >
              {/* Logo placeholder */}
              <div className={`w-16 h-16 rounded-xl ${store.bgColor} flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform duration-300 shrink-0`}>
                {store.image}
              </div>

              {/* Information */}
              <div className="flex flex-col justify-between w-full min-w-0">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-sans font-bold text-slate-800 truncate text-base group-hover:text-primary transition-colors">
                      {store.name}
                    </h4>
                    <span className="flex items-center gap-0.5 text-amber-500 shrink-0 text-xs font-bold font-mono">
                      <Star size={12} fill="currentColor" />
                      {store.rating}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{store.category}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mt-3">
                  <div className="flex items-center gap-1">
                    <span>⏱ {store.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-600 font-semibold">{store.deliveryFee}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
