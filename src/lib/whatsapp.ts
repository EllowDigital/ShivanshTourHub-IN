const WHATSAPP_NUMBER = "918865038345";

const normalizePhone = (phone: string) => phone.replace(/\D/g, "");

export const buildWhatsAppUrl = (phone: string, message: string) =>
  `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_CHAT_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const WHATSAPP_HANDOFF_EVENT = "shivansh:whatsapp-handoff";
export type WhatsAppHandoff = {
  phone: string;
  message: string;
  popupBlocked: boolean;
};

/** Launch is not a delivery receipt. Always retain a user-controlled recovery path. */
export const openWhatsAppMessage = (
  phone: string,
  message: string,
): boolean => {
  if (!normalizePhone(phone) || !message.trim()) return false;
  // Only the official wa.me chat link is used. Always a new tab: WhatsApp refuses to load inside frames.
  const popup = window.open(
    buildWhatsAppUrl(phone, message),
    "_blank",
    "noopener,noreferrer",
  );
  // With "noopener" some browsers return null even on success, so recovery stays visible either way.
  const popupBlocked = popup === null && !document.hasFocus();
  window.dispatchEvent(
    new CustomEvent<WhatsAppHandoff>(WHATSAPP_HANDOFF_EVENT, {
      detail: { phone: normalizePhone(phone), message, popupBlocked },
    }),
  );
  return true;
};

export const copyWhatsAppMessage = async (
  message: string,
): Promise<boolean> => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(message);
      return true;
    }
  } catch {
    /* Try legacy clipboard support before asking for manual selection. */
  }
  const area = document.createElement("textarea");
  area.value = message;
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    area.remove();
  }
};

export { WHATSAPP_NUMBER };
