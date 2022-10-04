import styled from 'styled-components';

const Table = styled.table`
    width: 100%;
    text-align: center;
    border-spacing: 30px;
    margin-bottom: 10px;

    td {
      border: 1px solid black;
      margin-top: 10px;
      padding: 20px;
      background-color: white;
    }

    p {
      font-size: 46px;
      font-weight: 700;
      background-color: #fff;
      border: 1px solid #000;
      padding: 5px;
    }

    button {
      border: none;
      cursor: pointer;
    }

`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
    
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 2rem;
  }

  label {
    margin: 0 10rem 0 0;
  }

  button {
    padding: 10px;
  }

`;

export default Table;
