/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SLIDES, FEATURES, PLANS, FOOTER_LINKS } from '../services/storeService';

export function useStore() {
  return {
    slides: SLIDES,
    features: FEATURES,
    plans: PLANS,
    footerLinks: FOOTER_LINKS,
  };
}
