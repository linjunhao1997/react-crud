import QuestionStore from './QuestionStore'
import {createContext, useContext} from "react";

const context = createContext({
    QuestionStore: QuestionStore
})

export const useStores = () => useContext(context)