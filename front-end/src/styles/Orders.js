import styled from 'styled-components';

export const Orders = styled.div`
 display: grid;
 grid-template-columns: 1fr 1fr;
 gap: 1rem;
 margin: 20px;
 margin-block: 10vh ;
 
 a {
   color: black;
  }
  
  a:link {
  text-decoration: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--secondary);
  text-align: center;
  flex-wrap: wrap;
  flex-basis: 0%;

  div {
    p{
      font-size: 1.1rem;
      margin-block: 8px;
    }
  }

  #adress {
    font-size: 1.1rem;
    flex-basis: 100%;
    background-color: lightgray;
  }

 }

`;

export default Orders;
