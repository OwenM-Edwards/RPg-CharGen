import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`

   body {
      font-size: 1rem;
      color: ${(props) => props.backgroundLgtColor};
      background-color: ${(props) => props.fontColor};
      line-height: 1.8;
   }


`

export default GlobalStyle;