/**
 * Display the number with 2 digits
 * @param {string | number} number 
 */
export const Rp = (number) => (new Intl.NumberFormat('id-ID', { currency: 'IDR', style: 'currency'}).format(number))