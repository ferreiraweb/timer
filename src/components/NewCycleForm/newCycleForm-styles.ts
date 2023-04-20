import styled from 'styled-components'


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
