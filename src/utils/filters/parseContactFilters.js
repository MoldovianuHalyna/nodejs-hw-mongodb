// const parseNumber = (number) => {
//   if (typeof number !== 'string') return;

//   const value = parseInt(number);
//   if (Number.isNaN(value)) return;

//   return value;
// };

const parseString = (str) => {
  if (typeof str !== 'string') return;

  return str;
};

export const parseContactFilters = ({ type }) => {
  const parsedType = parseString(type);

  return {
    type: parsedType,
  };
};
