/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { FEATURES } from '../services/storeService';

// Dynamic icon helper
const FeatureIcon = ({ name, className }: { name: string; className?: string }) => {
  const iconMap = Icons as unknown as Record<string, LucideIcon>;
  const IconComponent = iconMap[name];
  if (!IconComponent) return <Icons.HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

export default function Features() {
  return (
    <section className="bg-slate-50 py-24 sm:py-32 border-b border-slate-100" id="por-que-pedeaqui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-sans font-extrabold text-xs tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full">
            POR QUE ESCOLHER
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight mt-4">
            Por que o PedeAqui?
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Sem promessas genéricas ou futilidades. Veja o que o produto entrega de concreto para a sua operação.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Icon wrapper */}
                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-6 shadow-sm">
                  <FeatureIcon name={feature.icon} className="w-5 h-5" />
                </div>
                
                <h3 className="font-sans font-bold text-lg text-slate-800 tracking-tight group-hover:text-primary transition-colors duration-200">
                  {feature.title}
                </h3>
                
                <p className="font-sans text-sm text-slate-500 mt-3.5 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Decorative indicator line */}
              <div className="w-8 h-1 bg-slate-100 group-hover:w-16 group-hover:bg-primary transition-all duration-300 mt-6 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
