import { ReactNode, createContext, useState } from "react";

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

const CycleContext = createContext({} as ICycleContext);

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

function setSecondsPassed(value: number) {
  setAmountSecondsPassed(value);
}

export function CycleContextProvider({ children }: any) {
  <CycleContext.Provider
    value={{
      activeCycle,
      activeCycleId,
      markCCurrentCycleAsFinished,
      amountSecondsPassed,
      setSecondsPassed,
    }}
  >
    {children}
  </CycleContext.Provider>;
}
