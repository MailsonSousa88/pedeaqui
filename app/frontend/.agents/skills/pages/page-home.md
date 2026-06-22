---
name: page-home
description: >
  Estrutura obrigatória da landing page do PedeAqui.
  Define cada seção, seus espaçamentos, tipografia e comportamento visual.
  Usar sempre junto com frontend-design.md.
---

# Página: Home / Landing Page

Objetivo único: converter visitantes em assinantes do plano Básico.
Cada seção reforça esse objetivo. Seguir tokens e regras do `frontend-design.md`.

---

## Estrutura de seções

```
[1] Navbar
[2] Hero — Banner Rotativo
[3] Planos
[4] Por que o PedeAqui?
[5] Footer
```

---

## [1] Navbar

Seguir padrão definido em `frontend-design.md` — seção Navbar.

Links: Planos · Recursos · Entrar
CTA: "Começar grátis" — botão pill vermelho

---

## [2] Hero — Banner Rotativo

### Container e dimensões
```tsx
<section className="min-h-[600px] md:min-h-[680px] bg-gradient-to-br from-white to-[#f5f5f5]
                    flex items-center relative overflow-hidden">
  <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
    {/* conteúdo centralizado */}
  </div>
</section>
```

### Layout
- Mobile: coluna única, alinhamento centralizado (`text-center`)
- Desktop: duas colunas — texto à esquerda (60%), visual decorativo à direita (40%)
- Elemento visual direito: mockup do produto ou shape geométrico vermelho com `opacity-10`

### Tipografia do slide
```tsx
<p className="text-xs font-bold uppercase tracking-widest text-[#e30507] mb-4">
  ✦ Gestão completa
</p>
<h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight text-[#111111]">
  Receba pedidos,{" "}
  <span className="text-[#e30507]">gerencie tudo</span>{" "}
  em um lugar
</h1>
<p className="text-lg md:text-xl text-gray-500 font-normal max-w-md mt-6 leading-relaxed">
  Do recebimento à entrega, controle cada pedido com clareza e agilidade.
</p>
```

### CTAs
```tsx
<div className="flex flex-wrap gap-4 mt-10 justify-start">
  {/* Primário */}
  <motion.button
    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
    className="bg-[#e30507] text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-[#b80406]"
  >
    Começar agora
  </motion.button>
  {/* Secundário */}
  <motion.button
    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
    className="border-2 border-[#111111] text-[#111111] px-8 py-4 rounded-xl font-semibold text-base hover:bg-[#111111] hover:text-white"
  >
    Ver demonstração
  </motion.button>
</div>
```

### Carrossel
- `AnimatePresence` + `motion.div` com Framer Motion
- Transição: `initial={{ opacity: 0, x: 40 }}` → `animate={{ opacity: 1, x: 0 }}` → `exit={{ opacity: 0, x: -40 }}`
- Auto-play: 5 segundos por slide
- Dots: `w-2 h-2 rounded-full bg-gray-300` → ativo: `w-6 h-2 rounded-full bg-[#e30507]`
- Setas: visíveis apenas no desktop (`hidden md:flex`), `border border-gray-200 rounded-full p-2`

### 3 slides sugeridos
1. "Receba pedidos, **gerencie tudo** em um lugar"
2. "Sua loja online **pronta em minutos**"
3. "Comece por **R$ 29,99/mês** sem taxa de setup"

---

## [3] Seção de Planos

### Container da seção
```tsx
<section id="planos" className="bg-white py-24 md:py-32">
  <div className="max-w-6xl mx-auto px-6 md:px-10">

    {/* Cabeçalho */}
    <div className="text-center mb-14">
      <p className="text-xs font-bold uppercase tracking-widest text-[#e30507] mb-3">Planos</p>
      <h2 className="text-4xl md:text-5xl font-black text-[#111111]">Escolha o plano ideal</h2>
      <p className="text-lg text-gray-500 mt-4 max-w-xl mx-auto leading-relaxed">
        Comece gratuitamente com o Básico. Evolua quando precisar.
      </p>
    </div>

    {/* Grid de cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
      {/* card básico + card premium + card exclusivo */}
    </div>

    {/* Rodapé */}
    <p className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-10">
      <Shield size={14} /> Você pode alterar de plano quando quiser.
    </p>

  </div>
</section>
```

### Card Básico (destaque)
```tsx
<div className="relative bg-white border-2 border-[#e30507] rounded-2xl p-8 shadow-xl shadow-red-100">
  {/* Badge topo */}
  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
    <span className="bg-[#e30507] text-white text-xs font-bold px-5 py-1.5 rounded-full whitespace-nowrap">
      Mais popular
    </span>
  </div>

  {/* Ícone + status */}
  <div className="flex items-center justify-between mt-2 mb-6">
    <div className="bg-[#fff0f0] w-12 h-12 rounded-xl flex items-center justify-center text-[#e30507]">
      <ShoppingBag size={22} />
    </div>
    <span className="flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
      <CheckCircle size={12} /> Disponível agora
    </span>
  </div>

  <h3 className="text-2xl font-black text-[#111111]">Básico</h3>
  <div className="flex items-baseline gap-1 mt-2 mb-2">
    <span className="text-4xl font-black text-[#e30507]">R$ 29,99</span>
    <span className="text-base text-gray-400 font-normal">/mês</span>
  </div>
  <p className="text-sm text-gray-500 mb-6 leading-relaxed">
    Tudo que você precisa para começar a vender no{" "}
    <span className="text-[#e30507] font-semibold">PedeAqui</span>.
  </p>

  <div className="border-t border-gray-100 my-6" />

  <ul className="flex flex-col gap-3 mb-8">
    {["Criar loja no PedeAqui", "Configurar informações da loja", "Cadastrar produtos",
      "Organizar produtos por categorias", "Receber pedidos dos clientes",
      "Gerenciar pedidos recebidos"].map(item => (
      <li key={item} className="flex items-center gap-2.5 text-sm text-[#111111] font-medium">
        <CheckCircle size={16} className="text-[#e30507] shrink-0" /> {item}
      </li>
    ))}
  </ul>

  <motion.button
    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
    className="w-full bg-[#e30507] text-white py-4 rounded-xl font-bold text-base hover:bg-[#b80406] transition-colors"
  >
    Continuar com Básico
  </motion.button>
</div>
```

### Cards inativos (Premium / Exclusivo)
```tsx
<div className="bg-white border border-gray-200 rounded-2xl p-8 opacity-60">
  <div className="flex items-center justify-between mb-6">
    <div className="bg-gray-100 w-12 h-12 rounded-xl flex items-center justify-center text-gray-400">
      <Diamond size={22} />  {/* ou Crown para Exclusivo */}
    </div>
    <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
      <Clock size={12} /> Em breve
    </span>
  </div>

  <h3 className="text-2xl font-black text-gray-400">Premium</h3>
  <p className="text-xl font-semibold text-gray-300 mt-2 mb-2">Em breve</p>
  <p className="text-sm text-gray-400 mb-6 leading-relaxed">
    Para negócios em crescimento que precisam de mais.
  </p>

  <div className="border-t border-gray-100 my-6" />

  <ul className="flex flex-col gap-3 mb-8">
    {["Tudo do Básico", "Múltiplos atendentes", "Relatórios avançados",
      "Integrações com delivery", "Suporte prioritário"].map(item => (
      <li key={item} className="flex items-center gap-2.5 text-sm text-gray-400">
        <CheckCircle size={16} className="text-gray-300 shrink-0" /> {item}
      </li>
    ))}
  </ul>

  <button disabled className="w-full bg-gray-100 text-gray-400 py-4 rounded-xl font-bold cursor-not-allowed">
    Em breve
  </button>
</div>
```

---

## [4] Seção "Por que o PedeAqui?"

```tsx
<section id="diferenciais" className="bg-[#f5f5f5] py-24 md:py-32">
  <div className="max-w-6xl mx-auto px-6 md:px-10">

    {/* Cabeçalho */}
    <div className="text-center mb-14">
      <p className="text-xs font-bold uppercase tracking-widest text-[#e30507] mb-3">Por que escolher</p>
      <h2 className="text-4xl md:text-5xl font-black text-[#111111]">Por que o PedeAqui?</h2>
      <p className="text-lg text-gray-500 mt-4 max-w-xl mx-auto leading-relaxed">
        Sem promessas genéricas. Veja o que o produto entrega de concreto.
      </p>
    </div>

    {/* Grid */}
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {diferenciais.map((item, i) => (
        <motion.div
          key={i}
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
          className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="bg-[#fff0f0] w-14 h-14 rounded-xl flex items-center justify-center text-[#e30507] mb-6">
            {item.icon}
          </div>
          <h3 className="text-lg font-black text-[#111111] mb-3">{item.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
        </motion.div>
      ))}
    </motion.div>

  </div>
</section>
```

### 4 diferenciais
1. 🏪 **Configure em minutos** — Sua loja pronta para receber pedidos sem precisar de dev ou configuração técnica.
2. 📦 **Gestão de pedidos fácil** — Receba, organize e acompanhe cada pedido em tempo real em um só lugar.
3. 💳 **Preço que cabe no bolso** — Comece por R$ 29,99/mês sem taxa de setup, sem fidelidade, sem surpresa.
4. 📊 **Relatórios que fazem sentido** — Veja o desempenho da loja com clareza, sem precisar de planilha.

---

## [5] Footer

Seguir padrão definido em `frontend-design.md` — seção Footer.
Logo: `/logoPedeAqui.jpeg` com `brightness-0 invert` para versão branca sobre fundo escuro.

---

## Checklist antes de entregar

- [ ] Navbar sticky com logo real (`/logoPedeAqui.jpeg`)
- [ ] Todas as seções com `max-w-6xl mx-auto` e padding correto
- [ ] Hero com `min-h-[600px]` e título `text-5xl` mínimo
- [ ] Card Básico com borda vermelha e badge "Mais popular"
- [ ] Cards inativos em `opacity-60` sem borda vermelha
- [ ] Seção de diferenciais com fundo `#f5f5f5` e animação stagger
- [ ] Footer escuro com logo invertida
- [ ] Responsivo: mobile coluna única, tablet 2 colunas, desktop 3–4 colunas
