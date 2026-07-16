import type { CompletedOrder } from "../types/cart";

/**
 * Mapa de labels amigáveis para os métodos de pagamento.
 */
const PAYMENT_METHOD_LABELS: Record<string, string> = {
  pix: "Pix",
  cartao: "Cartão de Crédito/Débito",
  dinheiro: "Dinheiro",
};

/**
 * Normaliza um número de telefone para o formato aceito pela API wa.me.
 *
 * Remove todos os caracteres não numéricos e garante o prefixo "55" (Brasil).
 * Retorna `null` se o número resultante for inválido (menos de 10 dígitos sem DDI).
 */
export function normalizePhoneNumber(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");

  if (digits.length === 0) {
    return null;
  }

  // Já possui DDI brasileiro
  if (digits.startsWith("55") && digits.length >= 12) {
    return digits;
  }

  // Número nacional (DDD + número)
  if (digits.length >= 10 && digits.length <= 11) {
    return `55${digits}`;
  }

  // Número já completo com outro DDI ou formato inesperado — retornar como está
  if (digits.length >= 12) {
    return digits;
  }

  return null;
}

/**
 * Formata o valor monetário no padrão brasileiro (R$ 0,00).
 */
function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Monta a mensagem de texto formatada para envio via WhatsApp.
 *
 * A mensagem segue a estrutura:
 * - Saudação com nome da loja
 * - Lista de itens (quantidade × nome — preço)
 * - Total do pedido
 * - Forma de pagamento
 * - Endereço de entrega
 * - Observações (se houver)
 * - Assinatura do consumidor
 */
export function buildOrderMessage(order: CompletedOrder): string {
  const lines: string[] = [];

  lines.push(`🛒 *Novo pedido via PedeAqui*`);
  lines.push(`📍 *${order.storeName}*`);
  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━");
  lines.push("📋 *Itens do pedido:*");
  lines.push("");

  for (const item of order.items) {
    const itemTotal = item.price * item.quantity;
    lines.push(`  • ${item.quantity}x ${item.name} — R$ ${formatCurrency(itemTotal)}`);
  }

  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━");
  lines.push(`💰 *Total: R$ ${formatCurrency(order.total)}*`);
  lines.push("");
  lines.push(`💳 *Pagamento:* ${PAYMENT_METHOD_LABELS[order.paymentMethod] ?? order.paymentMethod}`);
  lines.push("");
  lines.push(`🏠 *Endereço:* ${order.address}`);

  if (order.observation && order.observation.trim()) {
    lines.push("");
    lines.push(`📝 *Obs:* ${order.observation.trim()}`);
  }

  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━");
  lines.push(`👤 *Cliente:* ${order.fullName}`);
  lines.push("");
  lines.push("_Pedido gerado pelo PedeAqui_");

  return lines.join("\n");
}

/**
 * Constrói a URL completa de redirecionamento para o WhatsApp.
 *
 * Retorna `null` se o telefone da loja for inválido ou ausente.
 */
export function buildWhatsAppUrl(order: CompletedOrder): string | null {
  const phone = normalizePhoneNumber(order.storePhone);

  if (!phone) {
    return null;
  }

  const message = buildOrderMessage(order);
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phone}?text=${encodedMessage}`;
}
