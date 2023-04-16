import { createGlobalStyle} from 'styled-components'


export const GlobalStyle = createGlobalStyle`

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
};

body {
    background-color: ${props => props.theme['gray-800']};
    color: ${props => props.theme['gray-300']};
    -webkit-font-smoothing: antialiased;

    

};

body, input, textarea {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
}




`