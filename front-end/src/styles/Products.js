import styled from 'styled-components';

export const ButtonCart = styled.button`
    bottom: 0;
    right: 0;
    position: fixed;
    z-index: 50;
`;

export const Container = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   align-items: center;
   text-align: center;
   font-size: 0.9rem;
   
   main {
      background-color: white;
      height: 600px;
      width: 25%;
    }
    img {
      width: 55%;
      margin-inline: auto;
      height: 55%;
      margin-top: auto;

   }
   div {
    align-items: baseline;
    justify-content: baseline;
    margin-top: auto;
  }
  input {
    border: solid;
    width: 15%;
    text-align: center;
    border-radius: 25%
  }
  button {
    border: solid;
    width: 15%;
    text-align: center;
    border-radius: 25%
  }
`;
