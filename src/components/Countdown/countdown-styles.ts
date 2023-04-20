import styled from "styled-components";


export const CountdownContainer = styled.div`

font-family: 'Roboto Mono', monospace;
font-size: 10rem;
line-height: 8rem;
color: ${props => props.theme["gray-300"]};

display: flex;
gap: 1rem;


span {
  
  padding: 0.5rem;
  background-color: ${props => props.theme["gray-600"]};
  padding: 2rem 1rem;
  border-radius: 8px;

}

`;

export const SeparatorContainer = styled.div`

color: ${props => props.theme["green-500"]};
width: 4rem;

display: flex;
justify-content: center;
align-items: center;
overflow: hidden;


`
