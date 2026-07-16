/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppRoute } from '../../../../app/routes/types';
import type { Slide, Feature, Plan } from '../types';

export const SLIDES: Slide[] = [
  {
    id: 1,
    subtitle: 'GESTÃO COMPLETA',
    title: 'Receba pedidos em um só lugar',
    description: 'Receba pedidos através da plataforma e finalize diretamente no seu WhatsApp, acompanhe-os e mantenha sua operação mais simples.',
    illustrationType: 'orders',
  },
  {
    id: 2,
    subtitle: 'BENEFÍCIOS EXCLUSIVOS',
    title: 'Aumente suas vendas com inteligência',
    description: 'Tenha acesso a ferramentas de marketing, cupons de desconto e visibilidade prioritária para atrair mais clientes todos os dias.',
    illustrationType: 'benefits',
  },
  {
    id: 3,
    subtitle: 'PLATAFORMA INTUITIVA',
    title: 'Simplicidade que impulsiona seu negócio',
    description: 'Cadastre seus produtos em minutos e comece a vender imediatamente. Nossa interface foi desenhada para que você foque no que importa: seu produto.',
    illustrationType: 'setup',
  },
];

export const FEATURES: Feature[] = [
  {
    id: 1,
    title: 'Configure em minutos',
    description: 'Sua loja pronta para receber pedidos sem precisar de dev ou configuração técnica complexa.',
    icon: 'Smartphone',
  },
  {
    id: 2,
    title: 'Gestão de pedidos fácil',
    description: 'Receba, organize e acompanhe cada pedido em tempo real. Com finalização direta via WhatsApp.',
    icon: 'TrendingUp',
  },
  {
    id: 3,
    title: 'Preço que cabe no bolso',
    description: 'Comece com 1 mês gratuito para teste da plataforma e depois por apenas R$ 29,99/mês sem taxa de setup.',
    icon: 'Tag',
  },
  {
    id: 4,
    title: 'Prático e Rápido',
    description: 'Gerencie sua operação de forma intuitiva, sem complicações ou necessidade de treinamento.',
    icon: 'BarChart3',
  },
];

export const PLANS: Plan[] = [
  {
    id: 1,
    name: 'Básico',
    price: 'R$ 29,99',
    period: '/mês',
    description: 'Tudo que você precisa para começar a vender e organizar sua loja no PedeAqui.',
    features: [
      'Criar loja no PedeAqui',
      'Configurar informações da loja',
      'Cadastrar produtos e fotos',
      'Organizar produtos por categorias',
      'Receber pedidos de clientes via web',
      'Gerenciar pedidos recebidos em painel'
    ],
    status: 'active',
    buttonText: 'Continuar com Básico',
    tag: 'Mais popular',
  },
  {
    id: 2,
    name: 'Premium',
    price: 'Em breve',
    period: '',
    description: 'Para negócios em crescimento que precisam de mais ferramentas e automatização.',
    features: [
      'Tudo do plano Básico',
      'Integração avançada com WhatsApp API',
      'Múltiplos atendentes simultâneos',
      'Relatórios de vendas e clientes',
      'Cupons de desconto integrados',
      'Domínio próprio personalizado'
    ],
    status: 'inactive',
    buttonText: 'Em breve',
  },
  {
    id: 3,
    name: 'Exclusivo',
    price: 'Em breve',
    period: '',
    description: 'Soluções personalizadas para grandes operações e franquias complexas.',
    features: [
      'Tudo do plano Premium',
      'Gerente de conta exclusivo',
      'Recursos customizados sob demanda',
      'SLA de atendimento prioritário',
      'Integrações personalizadas ERP',
      'Multi-lojas com painel unificado'
    ],
    status: 'inactive',
    buttonText: 'Em breve',
  },
];

export const FOOTER_LINKS: Array<{ label: string; href: string; route?: AppRoute }> = [
  { label: 'Sobre Nós', href: '/sobre-nos', route: '/sobre-nos' },
  { label: 'Privacidade', href: '/politica-de-privacidade', route: '/politica-de-privacidade' },
  { label: 'Termos', href: '/termos-de-uso', route: '/termos-de-uso' },
  { label: 'Ajuda', href: '#' },
];
