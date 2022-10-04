import styled from 'styled-components';

export const ButtonCart = styled.button`
  bottom: 0;
  right: 0;
  position: fixed;
  z-index: 50;
  padding: 10px;
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
    height: 700px;
    width: 25%;

    img {
      width: auto;
      height: auto;
      flex-grow: 2;
      margin-inline: auto;
      height: auto;   
    }

    input {
      border: solid;
      width: 15%;
      text-align: center;
      border-radius: 25%;
    }
    button {
      border: solid;
      width: 15%;
      margin-inline: 4px;
      text-align: center;
      border-radius: 25%;
    }
    div {
      margin-block: 8px;
    }
  }
`;
