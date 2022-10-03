import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: 100px;

    img {
      margin: 0px;
      border-radius: 50%;
      max-width: 70%;
    }

    h1 {
      padding: 0px;
      margin-top: 25px;
    }
`;

export default Container;
