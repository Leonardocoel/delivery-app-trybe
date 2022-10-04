import styled from 'styled-components';

export const P = styled.p`
background-color:${({ status }) => (
    ((status === 'Pendente') && 'hsl(54, 100%, 40%)')
  || ((status === 'Preparando') && '#66CC00')
  || ((status === 'Em Trânsito') && '#66CC00')
  || ((status === 'Entregue') && '#00CC9B')

  )};
    width: 33%;
    padding: 40px;
    
`;

export default P;
