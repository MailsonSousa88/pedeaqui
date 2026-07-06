/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import HeroCarousel from './HeroCarousel';
import Features from './Features';
import Plans from './Plans';
import { AppRoute } from '../../../../app/routes/types';

interface HomePageProps {
  onNavigate: (route: AppRoute, planId?: number) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel onNavigate={onNavigate} />

      {/* Features section ("Por que o PedeAqui") */}
      <Features />

      {/* Plans section */}
      <Plans onNavigate={onNavigate} />
    </>
  );
}
