const WHATSAPP_NUMBER = "918865038345";

const normalizePhone = (phone: string) => phone.replace(/\D/g, "");

export const buildWhatsAppUrl = (phone: string, message: string) =>
  `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(message)}`;

export const buildWhatsAppDeepLink = (phone: string, message: string) =>
  `whatsapp://send?phone=${normalizePhone(phone)}&text=${encodeURIComponent(message)}`;

export const WHATSAPP_HANDOFF_EVENT = "shivansh:whatsapp-handoff";
export type WhatsAppHandoff = { phone: string; message: string; popupBlocked: boolean };

/** Launch is not a delivery receipt. Always retain a user-controlled recovery path. */
export const openWhatsAppMessage = (
  phone: string,
  message: string,
): boolean => {
  if (!normalizePhone(phone) || !message.trim()) return false;
  const waMe = buildWhatsAppUrl(phone, message);
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  let popupBlocked = false;
  if (isMobile) {
    let appOpened = false;
    const onHidden = () => {
      if (document.hidden) appOpened = true;
    };
    const onPageHide = () => { appOpened = true; };
    document.addEventListener("visibilitychange", onHidden);
    window.addEventListener("pagehide", onPageHide);
    try { window.location.assign(buildWhatsAppDeepLink(phone, message)); } catch { /* Recovery remains available. */ }
    window.setTimeout(() => {
      document.removeEventListener("visibilitychange", onHidden);
      window.removeEventListener("pagehide", onPageHide);
      // Same-tab fallback avoids a delayed popup that browsers usually block.
      if (!appOpened && !document.hidden) window.location.assign(waMe);
    }, 1800);
  } else {
    const popup = window.open(waMe, "_blank");
    popupBlocked = !popup;
    if (popup) popup.opener = null;
  }
  window.dispatchEvent(new CustomEvent<WhatsAppHandoff>(WHATSAPP_HANDOFF_EVENT, {
    detail: { phone: normalizePhone(phone), message, popupBlocked },
  }));
  return true;
};

export const copyWhatsAppMessage = async (message: string): Promise<boolean> => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(message);
      return true;
    }
  } catch { /* Try legacy clipboard support before asking for manual selection. */ }
  const area = document.createElement("textarea");
  area.value = message;
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  try { return document.execCommand("copy"); } catch { return false; }
  finally { area.remove(); }
};

export { WHATSAPP_NUMBER };
