import { produce } from 'immer'
import { ActionTypes } from "./Actions"

export interface Cycles {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?:Date
  }

interface CyclesState{
    cycles: Cycles[]
    activeCycleId: string | null
  }

export function CyclesReducer(state: CyclesState, action: any) {
    switch(action.type){
      case ActionTypes.ADD_NEW_CYCLE:
      return produce (state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
      case ActionTypes.INTERRUPT_CURRENT_CYCLE:{
        const currentCYcleIndex = state.cycles.findIndex((cycle) => {
          return cycle.id === state.activeCycleId
        })

        if(currentCYcleIndex > 0) {
          return state
        }
        return produce (state,(draft) => {
          draft.activeCycleId = null
          draft.cycles[currentCYcleIndex].interruptedDate = new Date()
        })
      }
        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISEHD:
          {
            const currentCYcleIndex = state.cycles.findIndex((cycle) => {
              return cycle.id === state.activeCycleId
            })
            if(currentCYcleIndex > 0) {
              return state
            }
            return produce (state,(draft) => {
              draft.activeCycleId = null
              draft.cycles[currentCYcleIndex].finishedDate = new Date()
            })
          }
          default:
            return state
        }
}

export { ActionTypes }
