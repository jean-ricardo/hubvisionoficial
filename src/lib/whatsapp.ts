/**
 * WhatsApp Helper for Hubvision
 */

export const WHATSAPP_NUMBER = "558196696708";
export const WHATSAPP_MESSAGE = "Olá! Vim do site oficial da Hubvision e tenho interesse em falar com o comercial.";

export const getWhatsAppUrl = (number = WHATSAPP_NUMBER, message = WHATSAPP_MESSAGE) => {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

export const openWhatsApp = (number = WHATSAPP_NUMBER, message = WHATSAPP_MESSAGE) => {
  window.open(getWhatsAppUrl(number, message), '_blank');
};
