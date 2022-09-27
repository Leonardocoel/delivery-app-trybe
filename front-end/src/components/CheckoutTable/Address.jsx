import React from 'react';

export default function Address() {
  return (
    <div>
      <h1>Detalhes e Endereço da Entrega</h1>
      <div>
        <label htmlFor="vendedor">
          P. Vendedora Responsável
          <input type="text" name="vendedor" id="vendedor" />
        </label>
        <label htmlFor="endereco">
          Endereço
          <input
            placeholder="Rua exemplo, Bairro exemplo"
            type="text"
            name="endereço"
            id="endereco"
          />
        </label>
        <label htmlFor="numero">
          Número
          <input placeholder="xxx" type="text" name="número" id="numero" />
        </label>
        <button type="submit">FINALIZAR PEDIDO</button>
      </div>
    </div>
  );
}
