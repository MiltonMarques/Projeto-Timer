import { createContext, ReactNode, useState, useReducer, useEffect } from "react"
import {Cycles, CyclesReducer } from "../Reduce/cycles/Resducer"
import { addNewCycleAction, InterruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../Reduce/cycles/Actions"
import differenceInSeconds from "date-fns/differenceInSeconds"


interface CreateCycleData {
    task: string
    minutesAmount: number
}



interface CyclesContextType {
    cycles: Cycles[]
    activeCycle: Cycles | undefined
    activeCycleId: string | null
    amoutSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed:(seconds:number) => void
    CreateNewCycle: (data:CreateCycleData) => void
    InterruptCurrentCycle:() => void
  }

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProvideProps{
    children: ReactNode
}

export function CyclesContextProvider({ 
  children, 
}:CyclesContextProvideProps): JSX.Element{
    const [cyclesState, dispatch] = useReducer(
      CyclesReducer,
      {
      cycles: [],
      activeCycleId: null,
    },
    )
    const { cycles, activeCycleId } = cyclesState
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  
    const [amoutSecondsPassed, setAmoutSecondsPassed,] = useState(() => {
        if(activeCycle){
          return differenceInSeconds( new Date(), new Date(activeCycle.startDate))
        }
        return 0
    })

    
    function markCurrentCycleAsFinished() {
      dispatch(markCurrentCycleAsFinishedAction())
      }
    
      function setSecondsPassed(seconds:number){
        setAmoutSecondsPassed(seconds)
      }

      function CreateNewCycle(data: CreateCycleData ) {
        const id = String(new Date().getTime())

        const newCycle: Cycles = {
          id,
          task: data.task,
          minutesAmount: data.minutesAmount,
          startDate: new Date(),
        }
        dispatch(addNewCycleAction(newCycle))

        setAmoutSecondsPassed(0)

      }
      function InterruptCurrentCycle(){
        dispatch( InterruptCurrentCycleAction())
        
      }

    return (
        <CyclesContext.Provider 
        value ={{
            cycles,
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amoutSecondsPassed,
            setSecondsPassed,
            CreateNewCycle,
            InterruptCurrentCycle
            }}>
                {children}
        </CyclesContext.Provider>
    )
}
