import { Play, TextUnderline } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, SeparatorContainer, StartCountdownButton, TaskInput } from "./home-styles";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

export function Home() {


  const formValidationSchema = zod.object({
    task: zod.string().min(1, 'tarefe deve ter no mínimo 1 caracter'),
    minutesDuration: zod.number()
    .min(5, 'duração mínima de 5 minutos')
    .max(60, 'duração máxima de 60 minutos')
  })


  const { 
    register, 
    handleSubmit, 
    watch, 
    formState } = useForm({
    resolver: zodResolver(formValidationSchema),
    
  });

  function handleCreateNewCycle(data: any) {
    console.log(data);
  }


  console.log('erros: ', formState.errors );

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            type="text" 
            id="task"
            placeholder="Dê um nome para seu projeto"
            {...register('task')}
          />

          <label htmlFor="minutesDuration">durante</label>
          <MinutesAmountInput 
          type="number" 
          id="minutesDuration" 
          min={1} 
          /* max={60}  */
          {...register('minutesDuration', { valueAsNumber: true})}
          />
          <span>minutos</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <SeparatorContainer>
            :
          </SeparatorContainer>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton  type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
