import React, { useContext } from 'react';
import Address from '../components/Table/Address';
import Table from '../components/Table/Table';
import CostumerContext from '../context/CostumerContext';

export default function Checkout() {
  const { cartState } = useContext(CostumerContext);
  console.log(cartState);
  return (
    <div>
      <Table cart={ cartState } />
      <Address />
    </div>
  );
}
