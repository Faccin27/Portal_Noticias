const { format, parseISO } = require('date-fns');
const { ptBR } = require('date-fns/locale');

function formatDate(dateInput) {
  const date = ensureDate(dateInput);
  return format(date, "dd/MM/yyyy HH:mm", { locale: ptBR });
}

function formatDateWithoutTime(dateInput) {
  const date = ensureDate(dateInput);
  return format(date, "dd/MM/yyyy", { locale: ptBR });
}

function formatarData(dateInput) {
  const date = ensureDate(dateInput);
  return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
}

function ensureDate(dateInput) {
  if (dateInput instanceof Date) {
    return dateInput;
  }
  if (typeof dateInput === 'string') {
    return new Date(dateInput);
  }
  if (typeof dateInput === 'number') {
    return new Date(dateInput);
  }
  console.warn('Invalid date input:', dateInput);
  return new Date(); // Fallback to current date
}

module.exports = {
  formatDate,
  formatDateWithoutTime,
  formatarData
};