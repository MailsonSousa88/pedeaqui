/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, CheckCircle2, MessageCircle, ShoppingBag, Store, Users } from 'lucide-react';

import type { AppRoute } from '../../../../app/routes/types';
import { SecondaryButton } from '../../../../shared/components/SecondaryButton';

const benefits = [
  'Vitrine pública organizada para apresentar produtos em um único endereço.',
  'Catálogo simples de manter, com produtos, imagens, preços e informações da loja.',
  'Experiência de compra sem cadastro obrigatório para o consumidor.',
  'Contato estruturado pelo WhatsApp, preservando o atendimento direto do lojista.',
];

const steps = [
  {
    title: 'O lojista organiza sua loja',
    description:
      'O empreendedor cria uma presença digital, configura a vitrine e mantém o catálogo com as informações principais dos produtos.',
    icon: Store,
  },
  {
    title: 'O consumidor consulta os produtos',
    description:
      'A pessoa acessa lojas públicas, visualiza produtos e prepara os itens de interesse com mais clareza antes de chamar o vendedor.',
    icon: ShoppingBag,
  },
  {
    title: 'O atendimento continua no WhatsApp',
    description:
      'Depois da organização do pedido, o PedeAqui abre o WhatsApp do lojista com uma mensagem preparada para iniciar a conversa.',
    icon: MessageCircle,
  },
];

type AboutUsPageProps = {
  onNavigate: (route: AppRoute, planId?: number) => void;
};

export function AboutUsPage({ onNavigate }: AboutUsPageProps) {
  return (
    <section className="bg-white">
      <div className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50/60">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center gap-6">
            <div className="flex flex-col gap-4">
              <span className="w-fit rounded-full bg-primary/10 px-3 py-1 font-sans text-xs font-extrabold uppercase tracking-widest text-primary">
                Sobre Nós
              </span>
              <SecondaryButton className="w-fit" onClick={() => onNavigate('/')}>
                <ArrowLeft size={16} />
                Voltar ao início
              </SecondaryButton>
            </div>
            <div className="flex flex-col gap-5">
              <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Uma vitrine digital simples para negócios que vendem pelo WhatsApp
              </h1>
              <p className="max-w-2xl font-sans text-base leading-relaxed text-slate-600 sm:text-lg">
                O PedeAqui é uma plataforma de vitrines digitais para pequenos e médios
                empreendedores. Ele ajuda lojistas a criar uma presença online, organizar
                produtos e compartilhar uma loja pública sem a complexidade de operar um
                e-commerce completo.
              </p>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Users size={24} />
                </div>
                <div>
                  <p className="font-sans text-xs font-bold uppercase tracking-widest text-primary">
                    Conexão direta
                  </p>
                  <h2 className="font-display text-xl font-extrabold text-slate-900">
                    Lojistas e consumidores no mesmo fluxo
                  </h2>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-sm leading-relaxed text-slate-600">
                    Para o lojista, o produto centraliza a apresentação dos itens e reduz
                    a repetição de informações no primeiro atendimento.
                  </p>
                </div>
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <p className="text-sm leading-relaxed text-slate-700">
                    Para o consumidor, a vitrine facilita consultar produtos, conferir
                    informações e iniciar uma conversa mais objetiva pelo WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-sans text-xs font-extrabold uppercase tracking-widest text-primary">
            O problema
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Vender por mensagens não precisa significar catálogo desorganizado
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Muitos pequenos negócios dependem de redes sociais e conversas espalhadas
            para divulgar produtos. Isso torna difícil manter preços atualizados,
            apresentar tudo em um só lugar e oferecer uma experiência clara para quem
            quer comprar.
          </p>
        </div>
      </div>

      <div className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <span className="rounded-full bg-primary/10 px-3 py-1 font-sans text-xs font-extrabold uppercase tracking-widest text-primary">
              Como funciona
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Uma jornada simples entre vitrine, carrinho e conversa
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-sans text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <span className="rounded-full bg-primary/10 px-3 py-1 font-sans text-xs font-extrabold uppercase tracking-widest text-primary">
              Benefícios
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Presença digital com menos barreiras para vender
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              O PedeAqui ocupa o espaço entre listas manuais em redes sociais e
              plataformas completas de e-commerce: organiza a vitrine, melhora a
              apresentação do negócio e mantém o WhatsApp como continuidade natural do
              atendimento.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-slate-600">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
