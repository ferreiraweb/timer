import { HandPalm, Play, TextUnderline } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, SeparatorContainer, StartCountdownButton, StopCountdownButton, TaskInput } from "./home-styles";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'



interface ICycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptedDate? : Date
}








export function Home() {

  const [cycles, setCycles] = useState<ICycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null >(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);


  const activeCycle = cycles.find(cicle => cicle.id === activeCycleId);

  useEffect(() => {

    let interval: number;

    if (activeCycle) {
     interval = setInterval(() => {
      setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
    }, 1000)
  }

  return () => clearInterval(interval);

  }, [activeCycle]) 






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

  function handleInterruptCycle() {

    setCycles(cycles.map(cycle => {

      if (cycle.id === activeCycleId) {
        return {...cycle, interruptedDate : new Date()}
      } else {
        return cycle;
      }

    }));

    setActiveCycleId(null);
    setAmountSecondsPassed(0);
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
   
    const id = String(new Date().getTime());

    const newCycle: ICycle = {
      
       id,
       task : data.task,
       minutesAmount : data.minutesAmount,
       startDate: new Date()
    }

    setCycles( (state) =>  [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);

    reset();
  }
  
  
  //console.log(activeCycle);



  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
  
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycle){
    document.title = `Timer: ${minutes[0]}${minutes[1]}:${seconds[0]}${seconds[1]}` 
    }
  }, [amountSecondsPassed, activeCycle])



 // console.log('erros: ', formState.errors );

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
            disabled={!!activeCycle}
          />

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput 
          type="number" 
          id="minutesAmount" 
          min={1} 
          /* max={60}  */
          {...register('minutesAmount', { valueAsNumber: true})}
          disabled={!!activeCycle}
          />
          <span>minutos</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <SeparatorContainer>
            :
          </SeparatorContainer>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {
          activeCycle ? (
            <StopCountdownButton  type="button" onClick={handleInterruptCycle} >
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
          ) : (
            <StartCountdownButton  type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
          ) }


       
      </form>
    </HomeContainer>
  );
}
