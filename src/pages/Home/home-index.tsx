import { HandPalm, Play } from "phosphor-react";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./home-styles";

import { createContext, useState } from "react";
import { Countdown } from "../../components/Countdown/countdow-index";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { NewCycleForm } from "../../components/NewCycleForm/newCycleForm-index";

interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  fineshedDate?: Date;
}

// CyclesContextType
interface ICycleContext {
  activeCycle: ICycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCCurrentCycleAsFinished: () => void;
  setSecondsPassed: (value: number) => void;
}

export const CyCleContext = createContext<ICycleContext>({} as ICycleContext);

const formValidationSchema = zod.object({
  task: zod.string().min(1, "tarefe deve ter no mínimo 1 caracter"),
  minutesAmount: zod
    .number()
    .min(5, "duração mínima de 5 minutos")
    .max(60, "duração máxima de 60 minutos"),
});

type NewCycleFormData = zod.infer<typeof formValidationSchema>;

const newCycleForm = useForm<NewCycleFormData>({
  resolver: zodResolver(formValidationSchema),
  defaultValues: {
    task: "",
    minutesAmount: 0,
  },
});

const { handleSubmit, watch, formState, reset } = newCycleForm;

export function Home() {
  const [cycles, setCycles] = useState<ICycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find((cicle) => cicle.id === activeCycleId);

  function markCCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, fineshedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );

    //setActiveCycleId(null);
    setAmountSecondsPassed(0);
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );

    setActiveCycleId(null);
    setAmountSecondsPassed(0);
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: ICycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);

    reset();
  }

  function setSecondsPassed(value: number) {
    setAmountSecondsPassed(value);
  }

  //console.log(activeCycle);

  // console.log('erros: ', formState.errors );

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyCleContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyCleContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
