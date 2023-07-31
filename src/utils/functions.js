import 'intl';
import "intl/locale-data/jsonp/en-US";

function truncateToDecimals(num, dec = 2) {
    const calcDec = Math.pow(10, dec);
    return Math.trunc(num * calcDec) / calcDec;
  }

export function formatMoney(_amount, currency) {
    const amount = truncateToDecimals(parseFloat(_amount));

    if (currency === 'NGN') {
        return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        }).format(amount)?.replace(".00", "");
    }

    if (currency === 'GHS') {
        return new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: 'GHS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        }).format(amount)?.replace(".00", "");
    }

    return amount

}

export const firstLetterUppercase = (value: string) => {
    if(value && value.length > 1){
      return `${value[0].toUpperCase()}${value.slice(1)}`
    }

    return ""

}