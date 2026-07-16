/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  illustrationType: 'orders' | 'benefits' | 'setup';
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Plan {
  id: number;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  status: 'active' | 'inactive';
  buttonText: string;
  tag?: string;
}
