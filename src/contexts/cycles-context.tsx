import { ReactNode, createContext, useReducer, useState } from "react";

export interface ICreacteCycleData {
  task: string;
  minutesAmount: number;
}

export interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  fineshedDate?: Date;
}

// CyclesContextType
export interface ICycleContext {
  activeCycle: ICycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCCurrentCycleAsFinished: () => void;
  setSecondsPassed: (value: number) => void;
  createNewCycle: (data: ICreacteCycleData) => void;
  interruptCurrentCycle: () => void;
  cycles: ICycle[];
}

interface ICycleContextProviderProps {
  children: ReactNode;
}

type ICycleAction =
  | {
      type: "ADD_NEW_CYCLE";
      payload: { cycles: ICycle[] };
    }
  | {
      type: "INTERRUPT_CURRENT_CYCLE";
      payload: { activeCycleId: number | null };
    }
  | {
      type: "ADD_NEW_CYCLE";
      payload: { activeCycleId: number | null };
    };

interface ICyclesState {
  cycles: ICycle[];
  activeCycleId: string | null;
}

//
//
//
// ------------------------------------------------------------------------
//
//

export const CycleContext = createContext({} as ICycleContext);

export function CycleContextProvider({ children }: ICycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: ICyclesState, action: any) => {
      console.log(state);
      console.log(action);

      switch (action.type) {
        case "ADD_NEW_CYCLE":
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          };

        case "INTERRUPT_CURRENT_CYCLE":
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, interruptedDate: new Date() };
              } else {
                return cycle;
              }
            }),
            activeCycleId: null,
          };

        case "MARK_CURRENT_CYCLE_AS_FINISHED":
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, fineshedDate: new Date() };
              } else {
                return cycle;
              }
            }),
            activeCycleId: null,
          };
        default:
          return state;
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    }
  );

  const { cycles, activeCycleId } = cyclesState;

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find((cicle) => cicle.id === activeCycleId);

  function markCCurrentCycleAsFinished() {
    dispatch({
      type: "MARK_CURRENT_CYCLE_AS_FINISHED",
      payload: {
        activeCycleId,
      },
    });
    //setActiveCycleId(null);
    setAmountSecondsPassed(0);
  }

  function setSecondsPassed(value: number) {
    setAmountSecondsPassed(value);
  }

  /* **************************************** */
  function createNewCycle(data: ICreacteCycleData) {
    const id = String(new Date().getTime());

    const newCycle: ICycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch({
      type: "ADD_NEW_CYCLE",
      payload: {
        newCycle,
      },
    });

    setAmountSecondsPassed(0);

    //reset();
  }

  function interruptCurrentCycle() {
    dispatch({
      type: "INTERRUPT_CURRENT_CYCLE",
      payload: {
        activeCycleId,
      },
    });

    setAmountSecondsPassed(0);
  }

  return (
    <CycleContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        cycles,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
}
