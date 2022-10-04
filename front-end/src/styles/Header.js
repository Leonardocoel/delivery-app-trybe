import styled from 'styled-components';

export const Navbar = styled.header`
  display: flex;
  background-color: whine;

  button {
    padding: 20px;
    border: none;
    
    &:hover {
    border: 2px solid purple;
  }
    
  }

  .user {
    margin-left: auto;
    background-color: var(--button_user);
    color: white;
  }
  button:last-of-type {
    padding-inline: 40px;
  }

  
  
`;

export default Navbar;
