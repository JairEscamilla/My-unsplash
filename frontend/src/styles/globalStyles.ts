import { createGlobalStyle } from 'styled-components';

interface GlobalStylesProps {
  theme: 'dark' | 'light';
}

export const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&display=swap');
  body {
    background: ${props => (props.theme === 'dark'? '#1a1a1a' : 'white')};
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans', sans-serif;b 
  }

`;