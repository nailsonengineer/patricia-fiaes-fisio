/**
 * Utilitário para geração de links e formatação do WhatsApp
 */

export const buildWhatsAppUrl = (phone, serviceName, userName = '', userMessage = '') => {
  const cleanPhone = phone.replace(/\D/g, '');
  let text = `Olá, Dra. Patrícia!`;
  
  if (userName) {
    text += ` Meu nome é ${userName}.`;
  }
  
  if (serviceName && serviceName !== 'Outro' && serviceName !== 'Consulta Geral') {
    text += ` Tenho interesse no serviço de *${serviceName}*.`;
  } else {
    text += ` Gostaria de solicitar informações sobre atendimento fisioterapêutico.`;
  }

  if (userMessage) {
    text += `\n\nMensagem: "${userMessage}"`;
  } else {
    text += `\n\nGostaria de verificar os horários disponíveis para avaliação.`;
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
};

export const formatPhoneNumber = (phone) => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  return phone;
};