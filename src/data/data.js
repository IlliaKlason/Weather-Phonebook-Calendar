let months = [];
const monthTranslation = lang => {
  if (lang === 'uk') {
    return (months = [
      'Січеня',
      'Лютого',
      'Березеня',
      'Квітня',
      'Травня',
      'Червня',
      'Липня',
      'Серпня',
      'Вересня',
      'Жовтня',
      'Листопада',
      'Грудня',
    ]);
  }
  return (months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'Jule',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]);
};
export { months, monthTranslation };
