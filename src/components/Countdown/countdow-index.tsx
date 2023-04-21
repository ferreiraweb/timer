import { differenceInSeconds } from "date-fns";
import { useContext, useEffect } from "react";
import { CycleContext } from "../../contexts/cycles-context";
import { CountdownContainer, SeparatorContainer } from "./countdown-styles";

export function Countdown() {
  //
  //

  const {
    activeCycle,
    activeCycleId,
    markCCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CycleContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference <= totalSeconds) {
          setSecondsPassed(secondsDifference);
        } else {
          markCCurrentCycleAsFinished();
          setSecondsPassed(0);
          //setActiveCycleId(null);
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [
    activeCycle,
    totalSeconds,
    markCCurrentCycleAsFinished,
    setSecondsPassed,
  ]);

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `Timer: ${minutes[0]}${minutes[1]}:${seconds[0]}${seconds[1]}`;
    }
  }, [amountSecondsPassed, activeCycle]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <SeparatorContainer>:</SeparatorContainer>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
