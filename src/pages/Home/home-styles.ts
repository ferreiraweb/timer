import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;


  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 3.5rem;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme["gray-100"]};
  font-size: 1.3rem;
  font-weight: bold;
`;

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${props => props.theme["gray-500"]};
  font-weight: bold;
  font-size: 1.3rem;
  padding: 0 0.5rem;
  color: ${props => props.theme["gray-100"]};
  cursor: pointer;
  
  &:focus {
    box-shadow: none;
    border: ${props => props.theme["gray-500"]};
    

  }

  &::placeholder {
    color: ${props => props.theme["gray-500"]}
  }


`

export const TaskInput = styled(BaseInput)`
flex: 1;


`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;

`

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

export const StartCountdownButton = styled.button`



background-color: ${({theme})  => theme["green-500"] };
color: ${props => props.theme["gray-100"]};
width: 100%;

border: 0;
box-shadow: 1px 3px 3px rgba(0, 0, 0, .3);
border-radius: 4px;
padding: 1rem;

display: flex;
align-items: center;
justify-content: center;
gap: 1rem;
font-weight: bold;
cursor: pointer;

&:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

&:not(:disabled):hover {
  background-color: ${props => props.theme["green-700"]};

}


`
