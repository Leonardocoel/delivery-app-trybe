const convertValue = (value) => {
  const brlValue = Number(value).toLocaleString('pt-BR', {
    style: 'currency', currency: 'BRL' });

  return brlValue;
};

export default convertValue;
