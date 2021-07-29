import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body 
  {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.15s linear;
  }
  
  header{
    background: ${({ theme }) => theme.header};
    color: ${({ theme }) => theme.text};
  }
  
  button,a, a:visited, a:hover, a:active
  {
    color: ${({ theme }) => theme.text}
  }
  
  input,input::placeholder,select,.card,.card a,button, .countryblb
  {
    background: ${({ theme }) => theme.element};
    color: ${({ theme }) => theme.text};
  }
  option{
    background: ${({ theme }) => theme.element};
  }
  
  .country-border-state-label {
    background: ${({ theme }) => theme.element};
    color: ${({ theme }) => theme.text};
   }
  `;