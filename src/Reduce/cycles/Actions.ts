import { Cycles } from "./Resducer";

export enum ActionTypes {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
    MARK_CURRENT_CYCLE_AS_FINISEHD = 'MARK_CURRENT_CYCLE_AS_FINISEHD',
  }

export function addNewCycleAction(newCycle:Cycles){
    return {
        type: ActionTypes.ADD_NEW_CYCLE,
        payload:{
         newCycle,
        },
    }
}

export function markCurrentCycleAsFinishedAction() {
    return {
        type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISEHD,
    }
}

export function InterruptCurrentCycleAction() {
    return {
        type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
    }
}