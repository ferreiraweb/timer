import { Play, TextUnderline } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, SeparatorContainer, StartCountdownButton, TaskInput } from "./home-styles";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

export function Home() {


  const formValidationSchema = zod.object({
    task: zod.string().min(1, 'tarefe deve ter no mínimo 1 caracter'),
    minutesAmount: zod.number()
    .min(5, 'duração mínima de 5 minutos')
    .max(60, 'duração máxima de 60 minutos'),
    
  })

  type NewCycleFormData = zod.infer<typeof formValidationSchema>;


  const { 
    register, 
    handleSubmit, 
    watch, 
    formState,
    reset
  } = useForm<NewCycleFormData>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });

  function handleCreateNewCycle(data: any) {
    console.log(data);
    reset();
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

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput 
          type="number" 
          id="minutesAmount" 
          min={1} 
          /* max={60}  */
          {...register('minutesAmount', { valueAsNumber: true})}
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
