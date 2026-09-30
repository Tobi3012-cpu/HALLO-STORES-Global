// Hallo Stores WhatsApp integration utilities

// Your business WhatsApp number (used for the floating button)
export const BUSINESS_WHATSAPP_NUMBER = '2347070345743';

// Format a phone number for WhatsApp (wa.me requires country code, no +, no spaces)
export function formatWhatsAppNumber(phone) {
  if (!phone) return '';
  let cleaned = phone.replace(/\D/g, ''); // remove all non-digits

  // Nigerian local format (08012345678) → 2348012345678
  if (cleaned.startsWith('0')) {
    cleaned = '234' + cleaned.slice(1);
  }
  // If not starting with a country code, assume Nigerian
  else if (!cleaned.startsWith('234') && cleaned.length <= 11) {
    cleaned = '234' + cleaned;
  }

  return cleaned;
}

// Build a WhatsApp message based on order status
export function buildOrderMessage(order) {
  const firstName = order.customer_name?.split(' ')[0] || 'there';
  const orderUrl = `hallo-stores-global.vercel.app/order/${order.order_number}`;
  const total = `₦${order.total.toLocaleString()}`;

  const itemsList = order.items
    .map(item => `• ${item.name} × ${item.quantity}`)
    .join('\n');

  const messages = {
    paid: `Hi ${firstName}! 👋

Thank you for shopping with *Hallo Stores*!

Your order *${order.order_number}* has been confirmed and payment received ✅

*Items:*
${itemsList}

*Total:* ${total}

We're now packing your order and will update you as soon as it ships 📦

Questions? Just reply here or call us on this number.

Thank you! 🛍️`,

    processing: `Hi ${firstName}! 👋

Quick update on your order *${order.order_number}*:

We're currently packing your items 🎁 We'll let you know as soon as it's on the way 📦

*Total:* ${total}

Any questions? Just reply here.

Thank you! 🛍️`,

    shipped: `Hi ${firstName}! 📦

Great news — your order *${order.order_number}* has just been shipped! 🚚

*Delivery to:*
${order.customer_address}

You can track it anytime here:
${orderUrl}

Any questions? Just reply here.

Thank you! 🛍️`,

    delivered: `Hi ${firstName}! 🎉

Your order *${order.order_number}* has been delivered. We hope you love it!

Please let us know if you have any questions or feedback — we'd love to hear from you 🙏

Thank you for shopping with *Hallo Stores*! 🛍️`,

    cancelled: `Hi ${firstName},

We're writing about your order *${order.order_number}*.

Unfortunately, this order has been cancelled. If you have any questions or would like to place a new order, please reply to this message.

Apologies for any inconvenience.

— Hallo Stores`,
  };

  return messages[order.status] || messages.paid;
}

// Open WhatsApp chat with a pre-filled message
export function openWhatsApp(phone, message) {
  const formatted = formatWhatsAppNumber(phone);
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${formatted}?text=${encoded}`;
  window.open(url, '_blank');
}