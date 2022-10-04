import styled from 'styled-components';

export const OrderDetails = styled.div`
  width: 80%;
  margin-top: 10vh;
  margin-inline: auto;
  background-color: whitesmoke;

  h3 {
    text-align: center;
    width: 300px;
    margin-left: auto;
  }

  section {
    display: flex;
    align-items: center;
    margin-block: 20px;
    border: 1px solid black;
    text-align: center;

    button:disabled {
    background-color: grey;
    color: white;
    border: none;
  }

    span {
      font-size: 1.1rem;
      width: 20%;
      padding: 12px 0;
      border-right: 1px solid black;
    }
  
    P {
      padding: 12px 0;
      width: 20%;
      font-size: 1.1rem;
    }

    button {
      margin-inline: 4px;
      width: 20%;
      padding: 12px 0;
      font-size: 1.1rem;
    }
  }

  table {
    width: 100%;
    text-align: center;
    border-spacing: 30px;

    td {
      border: 1px solid black;
      margin-top: 10px;
      padding: 20px;      
      background-color: white;
  }

 
}
`;

export default OrderDetails;
