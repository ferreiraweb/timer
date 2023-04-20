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


export const CountdownButtonBase = styled.button`

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



`



export const StartCountdownButton = styled(CountdownButtonBase)`

background-color: ${({theme})  => theme["green-500"] };



&:not(:disabled):hover {
  background-color: ${props => props.theme["green-700"]};

}

`


export const StopCountdownButton = styled(CountdownButtonBase)`

background-color: ${({theme})  => theme["red-700"] };

&:not(:disabled):hover {
  background-color: ${props => props.theme["red-500"]};

}


`
