type ParseCurrency = {
  value: string;
  precision?: number;
};

export const currencyOptions = {
  prefix: 'R$',
  decimalSeparator: ',',
  groupSeparator: '.',
  precision: 2,
};

export const parseCurrency = ({ value, precision = 2 }: ParseCurrency) => {
  const numberVal = Number(value);

  if (!precision || !numberVal) {
    return value;
  }

  const cutoffIndex = value.length - precision;
  const initialSubstring = value.substring(0, cutoffIndex);
  const endingSubstring = value.substring(cutoffIndex, value.length);

  return `${initialSubstring || 0}.${
    endingSubstring.length < 2 ? '0' + endingSubstring : endingSubstring
  }`;
};
