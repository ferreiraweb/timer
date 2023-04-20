import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyCleContext } from "../../pages/Home/home-index";
import {
  FormContainer,
  MinutesAmountInput,
  TaskInput,
} from "./newCycleForm-styles";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyCleContext);

  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        placeholder="Dê um nome para seu projeto"
        {...register("task")}
        disabled={!!activeCycle}
      />

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        min={1}
        /* max={60}  */
        {...register("minutesAmount", { valueAsNumber: true })}
        disabled={!!activeCycle}
      />
      <span>minutos</span>
    </FormContainer>
  );
}
