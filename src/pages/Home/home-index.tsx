import { HandPalm, Play } from "phosphor-react";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./home-styles";

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";
import { Countdown } from "../../components/Countdown/countdow-index";
import { NewCycleForm } from "../../components/NewCycleForm/newCycleForm-index";
import { CycleContext, ICycle } from "../../contexts/cycles-context";

export function Home() {
  const { activeCycleId, activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CycleContext);

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

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  function setSecondsPassed(value: number) {
    setAmountSecondsPassed(value);
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  //console.log("erros: ", formState.errors);

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
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
