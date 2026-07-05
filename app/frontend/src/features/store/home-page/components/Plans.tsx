/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, Clock, Gem, Star, ShoppingBag, ShieldCheck } from 'lucide-react';
import { PLANS } from '../services/storeService';
import { AppRoute } from '../../../../app/routes/types';

interface PlansProps {
  onNavigate: (route: AppRoute, planId?: number) => void;
}

export default function Plans({ onNavigate }: PlansProps) {
  return (
    <section className="bg-white py-24 sm:py-32" id="planos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-sans font-extrabold text-xs tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full">
            NOSSOS PLANOS
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight mt-4">
            Escolha o plano ideal
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Comece gratuitamente com o plano Básico hoje mesmo. Evolua ou adicione recursos adicionais conforme a sua loja crescer.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {PLANS.map((plan) => {
            const isActive = plan.status === 'active';

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl p-8 transition-all duration-300 ${
                  isActive
                    ? 'bg-white border-2 border-primary shadow-xl scale-105 z-10'
                    : 'bg-slate-50/50 border border-slate-200 opacity-70 hover:opacity-90'
                }`}
              >
                {/* Popularity Badge or Coming Soon Badge */}
                {isActive && plan.tag && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white font-sans font-bold text-xs px-4 py-1.5 rounded-full shadow-md tracking-wider uppercase">
                    {plan.tag}
                  </div>
                )}

                <div>
                  {/* Top line with Icon and Status badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-xl ${isActive ? 'bg-primary/5 text-primary' : 'bg-slate-200 text-slate-500'}`}>
                      {plan.name === 'Básico' && <ShoppingBag size={22} />}
                      {plan.name === 'Premium' && <Gem size={22} />}
                      {plan.name === 'Exclusivo' && <Star size={22} />}
                    </div>
                    
                  <div className="flex items-center gap-1.5">
                      {isActive ? (
                        <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 text-[10px] font-extrabold px-2.5 py-1 rounded-full tracking-wider uppercase">
                          <ShieldCheck size={12} />
                          Disponível
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-primary bg-primary/5 text-[10px] font-extrabold px-2.5 py-1 rounded-full tracking-wider uppercase">
                          <Clock size={12} />
                          Melhorias Futuras
                        </span>
                      )}
                    </div>
                  </div>
 
                   {/* Plan Name & Price */}
                   <div>
                     <h4 className={`font-display font-extrabold text-2xl ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                       {plan.name}
                     </h4>
                     
                     <div className="flex items-baseline gap-2 mt-2 flex-wrap">
                       {plan.id === 1 ? (
                         <>
                           <span className="text-xl font-display font-medium text-slate-400 line-through">
                             {plan.price}
                           </span>
                           <span className="text-3xl font-display font-extrabold text-primary">
                             R$ 0,00
                           </span>
                           <span className="text-xs font-sans font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md ml-1 tracking-wider uppercase flex items-center gap-1 shadow-sm border border-emerald-100">
                             1 Mês Grátis!
                           </span>
                         </>
                       ) : (
                         <>
                           <span className={`text-3xl font-display font-extrabold ${isActive ? 'text-primary' : 'text-slate-500'}`}>
                             {plan.price}
                           </span>
                           {plan.period && (
                             <span className="text-sm font-sans text-slate-500">{plan.period}</span>
                           )}
                         </>
                       )}
                     </div>
 
                     <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                       {plan.description}
                     </p>
                   </div>
 
                   {/* Separation line */}
                   <div className="border-t border-slate-100 my-6" />
 
                   {/* Features List */}
                   <ul className="flex flex-col gap-3.5 mb-8">
                     {plan.features.map((feat, fIdx) => (
                       <li key={fIdx} className={`flex items-start gap-3 text-sm ${isActive ? 'text-slate-600' : 'text-slate-500/80'}`}>
                         <CheckCircle2 size={18} className={`${isActive ? 'text-primary' : 'text-slate-300'} shrink-0 mt-0.5`} />
                         <span>{feat}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
 
                 {/* Call to Action Button */}
                 <div>
                   {isActive ? (
                     <button
                       onClick={() => onNavigate('/register', plan.id)}
                       className="w-full bg-primary hover:bg-primary-dark text-white font-sans font-bold text-base py-4 rounded-xl transition-all shadow-md hover:shadow-lg shadow-primary/15 hover:-translate-y-0.5 cursor-pointer text-center"
                     >
                       {plan.buttonText}
                     </button>
                   ) : (
                     <button
                       disabled
                       className="w-full bg-slate-100 border border-slate-200 text-slate-400 font-sans font-bold text-base py-4 rounded-xl cursor-not-allowed text-center"
                     >
                       Melhorias Futuras
                     </button>
                   )}
                 </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
